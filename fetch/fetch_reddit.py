import praw
import json
import os
import time
from datetime import timedelta

# ==== CONFIGURATION ====
REDDIT = praw.Reddit(
    client_id="ABPe9vVeXWbzHfkKtfBijw",
    client_secret="nezJ9ZFZnj4xGbbbZ2LoasyQEODNCg",
    user_agent="windows:madgrades.reddit.fetcher:v1.0 (by /u/giggity_giggitty)"
)

COURSES_FILE = "madgrades_courses.json"
DEPT_MAP_FILE = "dept_map.json"
OUTPUT_FILE = "reddit_course_posts.json"

MAX_POSTS_PER_TERM = 100
SLEEP_BETWEEN_QUERIES = 0.65
START_FROM_COURSE = "BIOCHEM800"
TOTAL_COURSES = 13684
# ========================

def load_json(filepath):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_json(filepath, data):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def fetch_reddit_data(query):
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
        except Exception as e:
            print(f"⚠️ Skipped post due to error: {e}")
            continue

    return post_data

def normalize_search_terms(course_code, dept_map):
    dept = ''.join([c for c in course_code if c.isalpha()])
    num = ''.join([c for c in course_code if c.isdigit()])
    mapped = dept_map.get(dept.upper(), dept)
    return list({course_code, f"{mapped}{num}"})  # unique terms

def main():
    courses = load_json(COURSES_FILE)
    dept_map = load_json(DEPT_MAP_FILE)
    existing_data = load_json(OUTPUT_FILE)

    print(f"📚 Loaded {len(courses)} courses, {len(existing_data)} already processed.")

    start = False
    processed = len(existing_data)
    total = TOTAL_COURSES
    start_time = time.time()

    for course_code in courses:
        if not start:
            if course_code == START_FROM_COURSE:
                start = True
            else:
                continue

        if course_code in existing_data:
            print(f"✅ Skipping (already fetched): {course_code}")
            continue

        course_start = time.time()

        terms_to_search = normalize_search_terms(course_code, dept_map)
        all_posts = []

        for term in terms_to_search:
            print(f"🔍 Searching Reddit for: {term}")
            posts = fetch_reddit_data(term)
            all_posts.extend(posts)
            time.sleep(SLEEP_BETWEEN_QUERIES)

        seen = set()
        unique_posts = []
        for post in all_posts:
            if post["url"] not in seen:
                unique_posts.append(post)
                seen.add(post["url"])

        existing_data[course_code] = unique_posts
        save_json(OUTPUT_FILE, existing_data)

        processed += 1
        course_time = time.time() - course_start
        elapsed_time = time.time() - start_time
        avg_time = elapsed_time / processed
        remaining_time = avg_time * (total - processed)

        print(f"💾 Saved {len(unique_posts)} posts for {course_code}")
        print(f"📊 Progress: {processed}/{total} | ⏱️ Course time: {course_time:.2f}s | ⏳ ETA: {str(timedelta(seconds=int(remaining_time)))}\n")

    print("\n🎉 Done! All course Reddit data collected.")

if __name__ == "__main__":
    main()