import praw
import json
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Lock
import signal
import sys

# ==== CONFIG ====
REDDIT = praw.Reddit(
    client_id="ABPe9vVeXWbzHfkKtfBijw",
    client_secret="nezJ9ZFZnj4xGbbbZ2LoasyQEODNCg",
    user_agent="windows:madgrades.reddit.fetcher:v1.0 (by /u/giggity_giggitty)"
)

COURSES_FILE = "madgrades_courses.json"
DEPT_MAP_FILE = "dept_map.json"
OUTPUT_FILE = "reddit_course_posts.json"

MAX_POSTS_PER_TERM = 80
NUM_THREADS = 10
# =================

lock = Lock()

def load_json(path):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def normalize_search_terms(course_code, dept_map):
    dept = ''.join([c for c in course_code if c.isalpha()])
    num = ''.join([c for c in course_code if c.isdigit()])
    mapped = dept_map.get(dept.upper(), dept)
    return list({course_code, f"{mapped}{num}"})

def fetch_reddit_data(query):
    try:
        subreddit = REDDIT.subreddit("UWMadison")
        results = subreddit.search(query, limit=MAX_POSTS_PER_TERM, sort="new", params={"restrict_sr": 1})

        post_data = []
        for post in results:
            try:
                post.comments.replace_more(limit=None)
                comments = [c.body for c in post.comments.list()]
                post_data.append({
                    "title": post.title,
                    "url": f"https://reddit.com{post.permalink}",
                    "score": post.score,
                    "author": str(post.author),
                    "created_utc": post.created_utc,
                    "selftext": post.selftext,
                    "num_comments": post.num_comments,
                    "comments": comments
                })
            except:
                continue

        return post_data
    except Exception as e:
        print(f"⚠️ Failed to fetch for {query}: {e}")
        return []

def process_course(course_code, dept_map, output_data):
    search_terms = normalize_search_terms(course_code, dept_map)
    all_posts = []

    for term in search_terms:
        posts = fetch_reddit_data(term)
        all_posts.extend(posts)
        time.sleep(1)

    # Deduplicate
    seen = set()
    unique_posts = []
    for post in all_posts:
        if post["url"] not in seen:
            unique_posts.append(post)
            seen.add(post["url"])

    with lock:
        output_data[course_code] = unique_posts
        print(f"✅ {course_code}: {len(unique_posts)} posts")

output_data = {}

def main():
    global output_data
    all_courses = load_json(COURSES_FILE)
    dept_map = load_json(DEPT_MAP_FILE)
    output_data = load_json(OUTPUT_FILE)

    remaining_courses = [c for c in all_courses if c not in output_data]
    print(f"🔁 Resuming from course {len(output_data)} of {len(all_courses)}")
    print(f"🎯 Processing {len(remaining_courses)} remaining courses in parallel")

    with ThreadPoolExecutor(max_workers=NUM_THREADS) as executor:
        futures = [executor.submit(process_course, code, dept_map, output_data) for code in remaining_courses]

        for future in as_completed(futures):
            pass

    save_json(OUTPUT_FILE, output_data)
    print(f"\n🎉 Done! Fetched Reddit posts for all remaining courses.")

def handle_interrupt(signal_num, frame):
    print("\n🛑 Caught keyboard interrupt! Saving current in-memory data...")
    save_json(OUTPUT_FILE, output_data)
    print("✅ Saved. Exiting safely.")
    sys.exit(0)

# Catch Ctrl+C
signal.signal(signal.SIGINT, handle_interrupt)

if __name__ == "__main__":
    main()