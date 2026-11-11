# -*- coding: utf-8 -*-
"""
Main driver script:
1. Imports structured exercises for Chapters 1-5, 6-10, 11-16, 17-21.
2. Integrates expanded exercise sets for Books 1 and 2 from expand_b1_exercises and expand_b2_exercises.
3. Validates each exercise object according to application schema.
4. Reports comprehensive stats for all 21 chapters.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from build_ch1_to_ch5 import ch1_exercises, ch2_exercises, ch3_exercises, ch4_exercises, ch5_exercises
from build_ch6_to_ch10 import ch6_exercises, ch7_exercises, ch8_exercises, ch9_exercises, ch10_exercises
from build_ch11_to_ch16 import ch11_exercises, ch12_exercises, ch13_exercises, ch14_exercises, ch15_exercises, ch16_exercises
from build_ch17_to_ch21 import ch17_exercises, ch18_exercises, ch19_exercises, ch20_exercises, ch21_exercises

from expand_b1_exercises import ch3_extra, ch4_extra, ch5_extra, ch6_extra, ch7_extra, ch8_extra, ch9_extra
from expand_b2_exercises import (
    ch10_extra, ch11_extra, ch12_extra, ch13_extra, ch14_extra, ch15_extra,
    ch16_extra, ch17_extra, ch18_extra, ch19_extra, ch20_extra, ch21_extra
)

chapter_exercises_map = {
    1: ch1_exercises,
    2: ch2_exercises,
    3: ch3_exercises + ch3_extra,
    4: ch4_exercises + ch4_extra,
    5: ch5_exercises + ch5_extra,
    6: ch6_exercises + ch6_extra,
    7: ch7_exercises + ch7_extra,
    8: ch8_exercises + ch8_extra,
    9: ch9_exercises + ch9_extra,
    10: ch10_exercises + ch10_extra,
    11: ch11_exercises + ch11_extra,
    12: ch12_exercises + ch12_extra,
    13: ch13_exercises + ch13_extra,
    14: ch14_exercises + ch14_extra,
    15: ch15_exercises + ch15_extra,
    16: ch16_exercises + ch16_extra,
    17: ch17_exercises + ch17_extra,
    18: ch18_exercises + ch18_extra,
    19: ch19_exercises + ch19_extra,
    20: ch20_exercises + ch20_extra,
    21: ch21_exercises + ch21_extra
}

total = 0
for ch in range(1, 22):
    exs = chapter_exercises_map[ch]
    total += len(exs)
    # Validate each
    for i, ex in enumerate(exs):
        assert ex['type'] in ['mc', 'fill', 'choice'], f"Invalid type in ch {ch} ex {i}"
        assert 'question' in ex and ex['question'], f"Missing question in ch {ch} ex {i}"
        assert 'answer' in ex and ex['answer'], f"Missing answer in ch {ch} ex {i}"
        if ex['type'] == 'mc':
            assert ex['answer'] in ex['options'], f"Answer '{ex['answer']}' not in options {ex['options']} in ch {ch} ex {i}"
    print(f"Chapter {ch}: {len(exs)} verified interactive exercises")

print(f"\nTOTAL ALL 21 CHAPTERS: {total} verified interactive exercises!")
