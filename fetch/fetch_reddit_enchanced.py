import praw
import json
import os
import time

# ==== CONFIGURATION ====
REDDIT = praw.Reddit(
    client_id="ABPe9vVeXWbzHfkKtfBijw",
    client_secret="nezJ9ZFZnj4xGbbbZ2LoasyQEODNCg",
    user_agent="windows:madgrades.reddit.fetcher:v1.0 (by /u/giggity_giggitty)"
)

COURSE_LIST_FILE = "courses_with_reddit_posts.json"  # list like ["COMPSCI540", "ECON101", ...]
ALIAS_MAP_FILE = "dept_alias_map.json"
OUTPUT_FILE = "reddit_course_posts_expanded5.json"

MAX_POSTS_PER_TERM = 65
SLEEP_BETWEEN_QUERIES = 0.85
START_FROM_COURSE = "MATH222"  # e.g., "PSYCH202"
# ========================


def load_json(filepath):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_json(filepath, data):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def normalize_search_terms(course_code, alias_map):
    dept = ''.join([c for c in course_code if c.isalpha()])
    num = ''.join([c for c in course_code if c.isdigit()])

    aliases = alias_map.get(dept.upper(), [dept])
    terms = set()

    for alias in aliases:
        terms.add(f"{alias}{num}")
        terms.add(f"{alias} {num}")

    terms.add(course_code)
    terms.add(f"{dept} {num}")

    return list(terms)

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

def main():
    courses = load_json(COURSE_LIST_FILE)  # this must be a list
    alias_map = load_json(ALIAS_MAP_FILE)
    existing_data = load_json(OUTPUT_FILE)

    print(f"📚 Starting with {len(courses)} total courses, {len(existing_data)} already done.")
    start = START_FROM_COURSE is None

    for idx, course_code in enumerate(courses):
        if not start:
            if course_code == START_FROM_COURSE:
                start = True
            else:
                continue

        if course_code in existing_data:
            print(f"✅ Skipping (already done): {course_code}")
            continue

        print(f"\n🔎 [{idx+1}/{len(courses)}] {course_code}")
        search_terms = normalize_search_terms(course_code, alias_map)
        all_posts = []

        for term in search_terms:
            print(f"🔍 Searching for: {term}")
            t0 = time.time()
            posts = fetch_reddit_data(term)
            t1 = time.time()
            print(f"⏱️ Took {t1 - t0:.2f} seconds — {len(posts)} posts")
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
        print(f"💾 Saved {len(unique_posts)} unique posts for {course_code}")

    print("\n🎉 Done! Expanded Reddit data collection complete.")

if __name__ == "__main__":
    main()
