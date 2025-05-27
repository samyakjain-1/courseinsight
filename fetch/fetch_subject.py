import requests
import time
import json
import os

API_KEY = "296e34419a8f4465ad3014e8d918aad1"  # 🔐 Replace with your Madgrades API key
OUTPUT_FILE = "madgrades_courses_detailed.json"
TOTAL_PAGES = 450

HEADERS = {
    "Authorization": f"Token token={API_KEY}"
}

def fetch_page(page_num):
    url = f"https://api.madgrades.com/v1/courses?page={page_num}"
    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"⚠️ Error on page {page_num}: {e}")
        return None

def extract_course_entries(results):
    course_map = {}
    for course in results:
        number = course.get("number")
        name = course.get("name", "")
        subjects = course.get("subjects", [])
        subject_names = [s.get("name", "") for s in subjects]
        for subj in subjects:
            abbreviation = subj.get("abbreviation", "").replace(" ", "").upper()
            if abbreviation and number:
                course_code = f"{abbreviation}{number}"
                course_map[course_code] = {
                    "title": name,
                    "subjects": subject_names
                }
    return course_map

def load_existing_data():
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, "r") as f:
            return json.load(f)
    return {}

def save_data(course_data):
    with open(OUTPUT_FILE, "w") as f:
        json.dump(course_data, f, indent=2)

def main():
    all_courses = load_existing_data()
    print(f"🔄 Resuming with {len(all_courses)} courses already saved.")

    for page in range(1, TOTAL_PAGES + 1):
        print(f"🔎 Fetching page {page}...")
        data = fetch_page(page)
        if not data:
            continue

        new_courses = extract_course_entries(data.get("results", []))
        all_courses.update(new_courses)
        print(f"✅ Page {page}: added {len(new_courses)} new entries. Total: {len(all_courses)}")

        # Optional delay to avoid throttling
        time.sleep(0.25)

        # Save progress after every page
        save_data(all_courses)

    print(f"\n🎉 Done! Total course entries: {len(all_courses)} saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
