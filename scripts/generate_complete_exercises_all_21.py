# -*- coding: utf-8 -*-
"""
Module defining the complete exercise questions for Chapters 1-21
parsed from Sėkmės! 1 & 2 textbooks and official answer keys.
"""
import json

def mc(q, opts, ans, exp, hint=""):
    assert ans in opts, f"Answer '{ans}' not in options {opts} for question: {q}"
    return {
        "type": "mc",
        "question": q,
        "options": opts,
        "answer": ans,
        "explanation": exp,
        "hint": hint
    }

def fill(q, ans, hint, exp, acceptable=None):
    acc = [ans]
    if acceptable:
        for a in acceptable:
            if a not in acc:
                acc.append(a)
    return {
        "type": "fill",
        "question": q,
        "answer": ans,
        "acceptableAnswers": acc,
        "hint": hint,
        "explanation": exp
    }

print("Base definitions loaded successfully.")
