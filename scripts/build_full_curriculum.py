import json

# Full definitions for all 21 chapters in rich detail
# Explanations in easy beginner Russian, declension tables, realistic dialogues, 20+ vocab, 6 exercises each.

with open('src/data/lessonsData.json', 'r') as f:
    existing = json.load(f)

print(f"Loaded existing {len(existing)} lessons.")
