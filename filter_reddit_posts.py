import json
import re

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def generate_variants(dept, num, aliases):
    patterns = set()
    aliases = [dept] + aliases.get(dept, [])
    for alias in aliases:
        patterns.update([
            f"{alias}{num}",
            f"{alias} {num}",
            f"{alias.upper()}{num}",
            f"{alias.upper()} {num}"
        ])
    return patterns

def is_relevant(post, variants):
    content = (post["title"] + " " + post["selftext"]).lower()
    return any(var.lower() in content for var in variants)

def filter_reddit_data(input_path, output_path, dept_alias_path):
    data = load_json(input_path)
    alias_map = load_json(dept_alias_path)
    filtered_data = {}

    for course_code, posts in data.items():
        dept = ''.join([c for c in course_code if c.isalpha()])
        num = ''.join([c for c in course_code if c.isdigit()])
        variants = generate_variants(dept, num, alias_map)

        relevant_posts = [p for p in posts if is_relevant(p, variants)]

        if relevant_posts:
            filtered_data[course_code] = relevant_posts
            print(f"✅ {course_code}: kept {len(relevant_posts)} of {len(posts)}")

    save_json(output_path, filtered_data)
    print(f"\n🎉 Saved filtered data to {output_path}")

# Example usage:
filter_reddit_data(
    input_path="reddit_course_posts_expanded5.json",
    output_path="filtered_course_posts5.json",
    dept_alias_path="dept_alias_map.json"
)
