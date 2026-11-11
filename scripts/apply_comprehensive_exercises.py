# -*- coding: utf-8 -*-
"""
Applies the comprehensive 527 interactive exercises to src/data/lessonsData.json.
Ensures each lesson preserves its existing metadata, grammar, tables, vocabulary,
dialogues, etc., while updating the `exercises` array with all converted questions.
Assigns explicit unique IDs (`id`: "ch{ch_num}-ex-{idx}") to every exercise item.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from build_all_exercises import chapter_exercises_map

LESSONS_FILE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'lessonsData.json')

with open(LESSONS_FILE, 'r', encoding='utf-8') as f:
    lessons = json.load(f)

print(f"Loaded {len(lessons)} lessons from {LESSONS_FILE}")

total_applied = 0
for lesson in lessons:
    ch_num = lesson.get('number') or int(lesson['id'].replace('ch-', ''))
    if ch_num in chapter_exercises_map:
        raw_exs = chapter_exercises_map[ch_num]
        processed_exs = []
        for idx, ex in enumerate(raw_exs, start=1):
            ex_copy = dict(ex)
            ex_copy['id'] = f"ch{ch_num}-ex-{idx}"
            processed_exs.append(ex_copy)

        lesson['exercises'] = processed_exs
        total_applied += len(processed_exs)
        print(f"Lesson {lesson['id']} (Chapter {ch_num}): updated with {len(processed_exs)} exercises")
    else:
        print(f"Warning: Chapter {ch_num} not found in exercise map!")

with open(LESSONS_FILE, 'w', encoding='utf-8') as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print(f"\nSuccessfully wrote updated lessonsData.json with {total_applied} exercises across {len(lessons)} chapters.")
