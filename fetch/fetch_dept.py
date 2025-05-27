import requests
import time
import json
import os

API_KEY = "296e34419a8f4465ad3014e8d918aad1"
TOTAL_PAGES = 9
OUTPUT_FILE = "dept_map.json"

HEADERS = {
    "Authorization": f"Token token={API_KEY}"
}

def fetch_page(page_num):
    url = f"https://api.madgrades.com/v1/subjects?page={page_num}"
    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"⚠️ Error on page {page_num}: {e}")
        return None

def normalize_abbreviation(abbr):
    # Example rules to convert Madgrades to Reddit-style
    abbr = abbr.replace(" ", "").upper()
    manual_map = {
        "COMPSCI": "CS",
        "COMP_SCI": "CS",
        "BIOLOGY": "BIO",
        "STAT": "STAT",
        "PHYSICS": "PHYS",
        "SOC": "SOC",
        "ZOOLOGY": "BIO",
        "LITTRANS": "LIT",
        "MKT": "MARKETING",
        # Add more overrides as needed
    }
    return manual_map.get(abbr, abbr)

def main():
    dept_map = {}

    for page in range(1, TOTAL_PAGES + 1):
        print(f"🔎 Fetching page {page}...")
        data = fetch_page(page)
        if not data:
            continue

        for subject in data.get("results", []):
            abbr = subject.get("abbreviation", "").replace(" ", "").upper()
            name = subject.get("name", "")
            normalized = normalize_abbreviation(abbr)
            dept_map[abbr] = normalized

        time.sleep(0.25)

    with open(OUTPUT_FILE, "w") as f:
        json.dump(dept_map, f, indent=2)

    print(f"\n🎉 Saved {len(dept_map)} department mappings to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
