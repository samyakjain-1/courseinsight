import json
import re

# Load your course and alias data
with open("./json/madgrades_courses_detailed.json") as f:
    courses = json.load(f)

with open("./json/dept_alias_map.json") as f:
    alias_map = json.load(f)

def generate_aliases(dept, number):
    aliases = set()
    aliases.add(f"{dept}{number}".lower())  # compsci540
    aliases.add(f"{dept} {number}".lower())  # compsci 540

    for alias in alias_map.get(dept.upper(), []):
        alias_clean = alias.lower()
        aliases.add(f"{alias_clean}{number}")       # cs540
        aliases.add(f"{alias_clean} {number}")      # cs 540

    return list(aliases)

def normalize(text):
    if not isinstance(text, str):
        text = ""
    return re.sub(r"[^a-z0-9 ]", "", text.lower())

output = []

for code, meta in courses.items():
    dept = ''.join([c for c in code if c.isalpha()])
    num = ''.join([c for c in code if c.isdigit()])

    aliases = generate_aliases(dept, num)
    title = normalize(meta.get("title", ""))
    subject = normalize(" ".join(meta.get("subjects", [])))

    blob = " ".join(aliases + [title, subject])

    output.append({
        "code": code,
        "title": meta.get("title", ""),
        "subject": meta.get("subjects", []),
        "aliases": aliases,
        "search_blob": blob
    })

with open("courses_with_blob.json", "w") as f:
    json.dump(output, f, indent=2)

print("✅ Created search_blob and aliases for all courses.")
