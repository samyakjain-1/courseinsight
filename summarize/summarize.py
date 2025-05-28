import json
import os
import time
from google.generativeai import configure, GenerativeModel
from dotenv import load_dotenv

# === CONFIG ===
INPUT_FILE = "./../json/filtered/filtered_course_posts1.json"
OUTPUT_FILE = "./../public/summarize/course_summaries_1.json"
CHUNK_CHAR_LIMIT = 4000
SLEEP_BETWEEN_REQUESTS = 1.5
MODEL_NAME = "gemini-2.0-flash"
# ==============

# Load Gemini API key
load_dotenv()
configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = GenerativeModel(MODEL_NAME)

def chunk_text(text, max_length):
    """Split text into chunks without cutting words."""
    words = text.split()
    chunks, current = [], []

    for word in words:
        if len(" ".join(current + [word])) <= max_length:
            current.append(word)
        else:
            chunks.append(" ".join(current))
            current = [word]
    if current:
        chunks.append(" ".join(current))
    return chunks

def summarize_chunk(chunk):
    prompt = f"Summarize the following Reddit discussion content for a college course:\n\n{chunk}"
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"⚠️ Error summarizing chunk: {e}")
        return ""

def summarize_course(post_list):
    all_text = []
    urls = []

    for post in post_list:
        combined = f"{post.get('title', '')}\n{post.get('selftext', '')}\n" + "\n".join(post.get("comments", []))
        all_text.append(combined)
        urls.append(post.get("url", ""))

    full_text = "\n\n".join(all_text)
    chunks = chunk_text(full_text, CHUNK_CHAR_LIMIT)

    chunk_summaries = []
    for i, chunk in enumerate(chunks):
        print(f"🧩 Summarizing chunk {i+1}/{len(chunks)}...")
        summary = summarize_chunk(chunk)
        if summary:
            chunk_summaries.append(summary)
        time.sleep(SLEEP_BETWEEN_REQUESTS)

    if not chunk_summaries:
        return {"summary": "No summary could be generated.", "source_urls": urls}

    print("🧠 Generating final summary from chunk summaries...")
    combined_summary_text = "\n\n".join(chunk_summaries)
    final_summary = summarize_chunk(combined_summary_text)
    time.sleep(SLEEP_BETWEEN_REQUESTS)

    return {
        "summary": final_summary,
        "source_urls": urls
    }

def main():
    with open(INPUT_FILE, "r") as f:
        data = json.load(f)

    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, "r") as f:
            existing = json.load(f)
    else:
        existing = {}

    output = existing.copy()
    all_courses = list(data.keys())
    
    # Find the index of COMPSCI400 to start from
    start_index = 0
    for idx, course_code in enumerate(all_courses):
        if course_code == "COMPSCI400":
            start_index = idx
            break
    
    courses_to_process = all_courses[start_index:]
    print(f"📚 Starting from COMPSCI400 with {len(courses_to_process)} courses to process...")

    for i, course_code in enumerate(courses_to_process):
        if course_code in output:
            print(f"✅ Skipping {course_code} (already summarized)")
            continue

        print(f"\n🔎 [{i+1}/{len(courses_to_process)}] Summarizing {course_code}...")
        posts = data[course_code]
        result = summarize_course(posts)
        output[course_code] = result

        # Save after every course
        with open(OUTPUT_FILE, "w") as f:
            json.dump(output, f, indent=2)

    print("\n🎉 Done summarizing all courses.")

if __name__ == "__main__":
    main()
