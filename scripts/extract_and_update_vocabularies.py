# -*- coding: utf-8 -*-
"""
Updates lessonsData.json with the full vocabulary sets for all 21 chapters of Sėkmės! 1 & 2.
"""
import json
from scripts.vocab_data_part1 import VOCAB_CH1, VOCAB_CH2, VOCAB_CH3, VOCAB_CH4, VOCAB_CH5
from scripts.vocab_data_part2 import VOCAB_CH6, VOCAB_CH7, VOCAB_CH8, VOCAB_CH9, VOCAB_CH10
from scripts.vocab_data_part3 import VOCAB_CH11, VOCAB_CH12, VOCAB_CH13, VOCAB_CH14, VOCAB_CH15
from scripts.vocab_data_part4 import VOCAB_CH16, VOCAB_CH17, VOCAB_CH18, VOCAB_CH19, VOCAB_CH20, VOCAB_CH21

CHAPTER_VOCABS = {
    1: VOCAB_CH1,
    2: VOCAB_CH2,
    3: VOCAB_CH3,
    4: VOCAB_CH4,
    5: VOCAB_CH5,
    6: VOCAB_CH6,
    7: VOCAB_CH7,
    8: VOCAB_CH8,
    9: VOCAB_CH9,
    10: VOCAB_CH10,
    11: VOCAB_CH11,
    12: VOCAB_CH12,
    13: VOCAB_CH13,
    14: VOCAB_CH14,
    15: VOCAB_CH15,
    16: VOCAB_CH16,
    17: VOCAB_CH17,
    18: VOCAB_CH18,
    19: VOCAB_CH19,
    20: VOCAB_CH20,
    21: VOCAB_CH21,
}

def update_lessons_vocabulary(json_path='src/data/lessonsData.json'):
    with open(json_path, 'r', encoding='utf-8') as f:
        lessons = json.load(f)

    print(f"Loaded {len(lessons)} lessons from {json_path}")

    for lesson in lessons:
        ch_num = lesson.get('chapter')
        if ch_num in CHAPTER_VOCABS:
            old_count = len(lesson.get('vocabulary', []))
            new_vocab = CHAPTER_VOCABS[ch_num]
            lesson['vocabulary'] = new_vocab
            print(f"Chapter {ch_num} ({lesson.get('title')}): {old_count} -> {len(new_vocab)} words")

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(lessons, f, ensure_ascii=False, indent=2)

    print(f"Successfully updated {json_path} with full textbook vocabularies!")

if __name__ == '__main__':
    update_lessons_vocabulary()
