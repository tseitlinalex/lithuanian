# -*- coding: utf-8 -*-
import json
import os

LESSONS_FILE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'lessonsData.json')

with open(LESSONS_FILE, 'r', encoding='utf-8') as f:
    lessons = json.load(f)

assert len(lessons) == 21, f"Expected 21 lessons, got {len(lessons)}"

total_exercises = 0
all_ids = set()

for l_idx, lesson in enumerate(lessons, start=1):
    exs = lesson.get('exercises', [])
    assert len(exs) > 0, f"Lesson {lesson['id']} has no exercises!"
    total_exercises += len(exs)

    for q_idx, ex in enumerate(exs, start=1):
        ex_id = ex.get('id')
        assert ex_id, f"Missing id in lesson {lesson['id']} exercise #{q_idx}"
        assert ex_id not in all_ids, f"Duplicate exercise id {ex_id}"
        all_ids.add(ex_id)

        assert ex.get('question'), f"Missing question in {ex_id}"
        assert ex.get('answer'), f"Missing answer in {ex_id}"
        assert ex.get('explanation'), f"Missing explanation in {ex_id}"
        assert ex.get('type') in ['mc', 'fill', 'choice'], f"Unknown type in {ex_id}: {ex.get('type')}"

        if ex.get('type') == 'mc':
            options = ex.get('options', [])
            assert len(options) >= 2, f"Expected >=2 options in {ex_id}, got {len(options)}"
            assert ex.get('answer') in options, f"Answer '{ex.get('answer')}' not in options {options} in {ex_id}"

print(f"Validation SUCCESS: {len(lessons)} lessons, {total_exercises} total exercises verified.")
print("All IDs are unique, all questions/answers/options/explanations conform to schema.")
