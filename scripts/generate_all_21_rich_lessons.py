# -*- coding: utf-8 -*-
"""
Script to generate ultra-rich, beginner-friendly curriculum for Lithuanian A1 (Sėkmės! 1 & 2)
Focus:
- Explanations in crystal-clear Russian designed for absolute beginners (how endings work, why cases change, memory tricks).
- Structured declension/conjugation tables with Lithuanian forms and Russian meanings.
- Rich flashcard vocabulary (15-20+ per chapter) with context notes.
- Realistic textbook dialogues in Lithuanian with Russian side-by-side translations.
- 5+ interactive exercises per lesson (Multiple Choice & Fill-in-the-blank).
- Expanded A1 exam questions and mock tests.
"""

import json

# Define the comprehensive 21 chapters curriculum
lessons = [
    {
        "id": "ch-1",
        "book": 1,
        "chapter": 1,
        "level": "A1.1",
        "title": "Koks jūsų vardas?",
        "title_ru": "Как вас зовут?",
        "title_en": "What is your name?",
        "summary_ru": "Знакомство, приветствия, личные местоимения, род существительных и спряжение важнейшего глагола būti (быть).",
        "summary_en": "Introductions, greetings, personal pronouns, noun genders, and the present tense of būti (to be).",
        "grammar": [
            {
                "topic": "1. Личные местоимения (Asmeniniai įvardžiai)",
                "explanation_ru": "В литовском языке местоимения очень похожи на славянские, но имеют свои особенности. Обратите внимание: для вежливого обращения к одному человеку или к группе людей используется 'jūs' (Вы). В 3-м лице есть разделение по родам: jis (он), ji (она), jie (они — мужчины или смешанная группа), jos (они — только женщины).",
                "explanation_en": "Personal pronouns in Lithuanian. Note 'jūs' is used for polite singular address as well as plural 'you'.",
                "table": [
                    {"lt": "aš", "ru": "я", "note": "1-е лицо ед.ч."},
                    {"lt": "tu", "ru": "ты", "note": "2-е лицо ед.ч. (неформально)"},
                    {"lt": "jis", "ru": "он", "note": "3-е лицо муж. род"},
                    {"lt": "ji", "ru": "она", "note": "3-е лицо жен. род"},
                    {"lt": "mes", "ru": "мы", "note": "1-е лицо мн.ч."},
                    {"lt": "jūs", "ru": "вы / Вы", "note": "2-е лицо мн.ч. или вежливо к одному"},
                    {"lt": "jie", "ru": "они (мужчины/смешанные)", "note": "3-е лицо мн.ч. муж.р."},
                    {"lt": "jos", "ru": "они (только женщины)", "note": "3-е лицо мн.ч. жен.р."}
                ]
            },
            {
                "topic": "2. Глагол būti (быть) в настоящем времени",
                "explanation_ru": "В отличие от русского языка, где глагол-связка 'быть' обычно опускается (мы говорим 'Я студент'), в литовском языке связка ОБЯЗАТЕЛЬНА: 'Aš esu studentas'. Отрицательная форма образуется добавлением приставки ne- прямо к глаголу (nesu, nesi, nėra). В 3-м лице форма 'yra' (и 'nėra') одинакова для он, она и они!",
                "explanation_en": "The verb būti (to be) is mandatory in sentences like 'Aš esu studentas' (I am a student).",
                "table": [
                    {"lt": "aš esu / nesu", "ru": "я есть / меня нет (не являюсь)", "note": "Aš esu Jonas."},
                    {"lt": "tu esi / nesi", "ru": "ты есть / не есть", "note": "Tu esi studentas."},
                    {"lt": "jis, ji yra / nėra", "ru": "он, она есть / не есть", "note": "Ji yra dėstytoja."},
                    {"lt": "mes esame / nesame", "ru": "мы есть / не есть", "note": "Mes esame čia."},
                    {"lt": "jūs esate / nesate", "ru": "вы есть / не есть", "note": "Ar jūs esate Lina?"},
                    {"lt": "jie, jos yra / nėra", "ru": "они есть / не есть", "note": "Jie yra studentai."}
                ]
            },
            {
                "topic": "3. Род существительных (Giminė)",
                "explanation_ru": "Все литовские существительные делятся на мужской и женский род. Как определить род по окончанию в именительном падеже:\n• Мужской род (Vyriškoji giminė): заканчивается на -as (Tomas, studentas), -is (Igoris, brolis), -ys (Kastytis), -us (Paulius, sūnus).\n• Женский род (Moteriškoji giminė): заканчивается на -a (Lina, mama), -ė (Eglė, studentė).\nНазвания национальностей и профессий имеют парные окончания: studentas (студент) – studentė (студентка), lietuvis (литовец) – lietuvė (литовка).",
                "explanation_en": "Noun genders: Masculine nouns typically end in -as, -is, -ys, -us. Feminine nouns end in -a, -ė.",
                "table": [
                    {"lt": "studentas / studentė", "ru": "студент / студентка", "note": "окончания -as / -ė"},
                    {"lt": "dėstytojas / dėstytoja", "ru": "преподаватель / преподавательница", "note": "окончания -as / -a"},
                    {"lt": "lietuvis / lietuvė", "ru": "литовец / литовка", "note": "окончания -is / -ė"},
                    {"lt": "lenkas / lenkė", "ru": "поляк / полька", "note": "окончания -as / -ė"},
                    {"lt": "ukrainietis / ukrainietė", "ru": "украинец / украинка", "note": "окончания -ietis / -ietė"}
                ]
            },
            {
                "topic": "4. Вопросительные слова Kas (Кто/Что) и Ar (Ли)",
                "explanation_ru": "• 'Kas' означает 'кто' или 'что'. 'Kas jis yra?' (Кто он?), 'Kas čia yra?' (Что это здесь?).\n• 'Ar' ставится в начале общего вопроса, когда ответ 'да' (taip) или 'нет' (ne). Пример: 'Ar tu esi studentas?' (Ты студент? / Студент ли ты?).",
                "explanation_en": "Question particle 'Ar' forms yes/no questions. 'Kas' means who/what.",
                "table": [
                    {"lt": "Ar jūs esate Andrius?", "ru": "Вы Андрюс? (Да/Нет вопрос)", "note": "– Taip, aš esu Andrius."},
                    {"lt": "Kas yra ši mergina?", "ru": "Кто эта девушка?", "note": "– Ji yra Lina, studentė."}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Susipažinimas universitete (Знакомство в университете)",
                "lines": [
                    {"speaker": "Tomas", "lt": "Labas rytas! Mano vardas Tomas. O koks jūsų vardas?", "ru": "Доброе утро! Меня зовут Томас. А как ваше имя?"},
                    {"speaker": "Rasa", "lt": "Labas rytas, Tomai! Mano vardas yra Rasa. Labai malonu.", "ru": "Доброе утро, Томас! Мое имя — Раса. Очень приятно."},
                    {"speaker": "Tomas", "lt": "Man taip pat labai malonu! Ar jūs esate studentė?", "ru": "Мне тоже очень приятно! Вы студентка?"},
                    {"speaker": "Rasa", "lt": "Taip, aš esu studentė. O kas jūs esate?", "ru": "Да, я студентка. А кто вы?"},
                    {"speaker": "Tomas", "lt": "Aš taip pat esu studentas. Aš esu estas iš Talino.", "ru": "Я тоже студент. Я эстонец из Таллина."}
                ]
            },
            {
                "title": "Atsiprašymas ir mandagumas (Вежливость и извинения)",
                "lines": [
                    {"speaker": "Andrius", "lt": "Atsiprašau, ar jūs esate dėstytojas Povilas?", "ru": "Прошу прощения, вы преподаватель Повилас?"},
                    {"speaker": "Povilas", "lt": "Ne, aš nesu dėstytojas. Aš esu studentas.", "ru": "Нет, я не преподаватель. Я студент."},
                    {"speaker": "Andrius", "lt": "Atsiprašau!", "ru": "Извините!"},
                    {"speaker": "Povilas", "lt": "Nieko tokio! Viskas gerai.", "ru": "Ничего страшного! Всё в порядке."}
                ]
            }
        ],
        "vocabulary": [
            {"word": "Labas rytas", "translation": "Доброе утро", "transcription": "Ла́бас ри́тас", "category": "Приветствие"},
            {"word": "Laba diena", "translation": "Добрый день", "transcription": "Лаба́ дена́", "category": "Приветствие"},
            {"word": "Labas vakaras", "translation": "Добрый вечер", "transcription": "Ла́бас ва́карас", "category": "Приветствие"},
            {"word": "Labas", "translation": "Привет", "transcription": "Ла́бас", "category": "Приветствие"},
            {"word": "Viso gero", "translation": "До свидания / Всего хорошего", "transcription": "Ви́со гя́ро", "category": "Прощание"},
            {"word": "Iki", "translation": "Пока / До скорого", "transcription": "Ики́", "category": "Прощание"},
            {"word": "Iki pasimatymo", "translation": "До встречи", "transcription": "Ики́ пасимати́мо", "category": "Прощание"},
            {"word": "Ačiū", "translation": "Спасибо", "transcription": "А́чу", "category": "Вежливость"},
            {"word": "Prašom", "translation": "Пожалуйста", "transcription": "Пра́шом", "category": "Вежливость"},
            {"word": "Nėra už ką", "translation": "Не за что", "transcription": "Не́ра уж ка́", "category": "Вежливость"},
            {"word": "Atsiprašau", "translation": "Прошу прощения / Извините", "transcription": "Аципраша́у", "category": "Вежливость"},
            {"word": "Nieko tokio", "translation": "Ничего страшного", "transcription": "Не́ко то́кё", "category": "Вежливость"},
            {"word": "vardas", "translation": "имя", "transcription": "ва́рдас", "category": "Существительное"},
            {"word": "pavardė", "translation": "фамилия", "transcription": "паварде́", "category": "Существительное"},
            {"word": "studentas", "translation": "студент (мужчина)", "transcription": "студя́нтас", "category": "Существительное"},
            {"word": "studentė", "translation": "студентка", "transcription": "студя́нте", "category": "Существительное"},
            {"word": "dėstytojas", "translation": "преподаватель", "transcription": "де́ститояс", "category": "Существительное"},
            {"word": "dėstytoja", "translation": "преподавательница", "transcription": "де́ститоя", "category": "Существительное"},
            {"word": "taip", "translation": "да", "transcription": "тайп", "category": "Частица"},
            {"word": "ne", "translation": "нет", "transcription": "ня", "category": "Частица"},
            {"word": "labai malonu", "translation": "очень приятно", "transcription": "лаба́й малону́", "category": "Знакомство"}
        ],
        "exercises": [
            {
                "type": "mc",
                "question": "Как сказать: «Я студентка»?",
                "options": ["Aš esu studentė.", "Aš esi studentė.", "Aš yra studentė.", "Aš esame studentė."],
                "answer": "Aš esu studentė.",
                "explanation": "С местоимением 'aš' (я) глагол būti имеет форму 'esu'."
            },
            {
                "type": "fill",
                "question": "Вставьте правильную форму глагола būti: «Mes ________ studentai.» (Мы студенты)",
                "answer": "esame",
                "hint": "Форма для mes (мы)",
                "explanation": "Для 'mes' правильная форма глагола būti — 'esame'."
            },
            {
                "type": "mc",
                "question": "Выберите правильный вопрос к ответу: «Mano vardas Tomas.»",
                "options": ["Koks tavo vardas?", "Kas tu esi?", "Ar tu studentas?", "Kokia tavo pavardė?"],
                "answer": "Koks tavo vardas?",
                "explanation": "Вопрос о том, как зовут человека: 'Koks tavo vardas?' (Как твое имя?)."
            },
            {
                "type": "fill",
                "question": "Вставьте отрицательную форму: «Aš ________ lietuvis, aš esu latvis.» (Я не литовец)",
                "answer": "nesu",
                "hint": "Отрицание būti для aš",
                "explanation": "Отрицательная форма būti для 1 лица ед. ч. (aš) — 'nesu'."
            },
            {
                "type": "mc",
                "question": "Какое существительное женского рода (Moteriškoji giminė)?",
                "options": ["dėstytoja", "studentas", "Igoris", "sūnus"],
                "answer": "dėstytoja",
                "explanation": "Окончание -a указывает на женский род (dėstytoja). Слова на -as, -is, -us мужского рода."
            },
            {
                "type": "fill",
                "question": "Какая вопросительная частица начинает общий вопрос (Да/Нет): «________ jūs esate Lina?»",
                "answer": "Ar",
                "hint": "Частица 'Ли'",
                "explanation": "Общие вопросы в литовском языке начинаются с вопросительной частицы 'Ar'."
            }
        ]
    },
    {
        "id": "ch-2",
        "book": 1,
        "chapter": 2,
        "level": "A1.1",
        "title": "Čia mano draugas",
        "title_ru": "Это мой друг",
        "title_en": "Here is my friend",
        "summary_ru": "Звательный падеж (обращение по имени), происхождение с предлогом iš + Kilmininkas (родительный падеж), спряжение глаголов настоящего времени на -a и языки на -iškai.",
        "summary_en": "Vocative case for greetings, origin with iš + Genitive, present tense -a verbs, and adverbs for languages.",
        "grammar": [
            {
                "topic": "1. Звательный падеж (Šauksmininkas) — как правильно обращаться по имени",
                "explanation_ru": "В литовском языке при обращении к человеку окончание имени ВСЕГДА меняется! Нельзя сказать 'Labas, Jonas', нужно звательное окончание:\n• -as превращается в -ai: Jonas → Jonai! Tomas → Tomai!\n• -is превращается в -i: Igoris → Igori! Rytis → Ryti!\n• -ys превращается в -y: Balys → Baly!\n• -us превращается в -au: Paulius → Pauliau! Andrius → Andriau!\n• -ė превращается в -e: Eglė → Egle!\n• -a остаётся -a: Lina → Lina! Milda → Milda!\nИсключение: вежливое 'ponas' (господин) в звательном падеже имеет форму 'pone': Pone Tomai!",
                "explanation_en": "Vocative case (Šauksmininkas) transforms endings: -as -> -ai, -us -> -au, -ė -> -e.",
                "table": [
                    {"lt": "Tomas → Tomai!", "ru": "Томас → Томас!", "note": "Окончание -as переходит в -ai"},
                    {"lt": "Paulius → Pauliau!", "ru": "Паулюс → Паулюс!", "note": "Окончание -us переходит в -au"},
                    {"lt": "Igoris → Igori!", "ru": "Игорь → Игорь!", "note": "Окончание -is переходит в -i"},
                    {"lt": "Eglė → Egle!", "ru": "Эгле → Эгле!", "note": "Окончание -ė переходит в -e"},
                    {"lt": "ponas → pone!", "ru": "господин → господин!", "note": "Laba diena, pone Jonai!"}
                ]
            },
            {
                "topic": "2. Предлог iš (из) + Родительный падеж (Kilmininkas)",
                "explanation_ru": "Чтобы сказать, откуда вы родом ('Iš kur jūs esate?'), используется предлог 'iš' + Родительный падеж (Kilmininkas, вопрос Ko? - Кого/Чего):\n• Страны на -ija получают окончание -ijos: Lietuva → Lietuvos, Anglija → Anglijos, Vokietija → Vokietijos, Latvija → Latvijos.\n• Города мужского рода на -as получают -o: Vilnius → Vilniaus, Kaunas → Kauno, Berlynas → Berlyno.\n• Города/страны женского рода на -a получают -os: Ryga → Rygos, Varšuva → Varšuvos.",
                "explanation_en": "Origin: iš + Genitive (iš kur? iš Lietuvos, iš Vilniaus).",
                "table": [
                    {"lt": "Aš esu iš Lietuvos.", "ru": "Я из Литвы.", "note": "Lietuva → Lietuvos"},
                    {"lt": "Jis yra iš Vilniaus.", "ru": "Он из Вильнюса.", "note": "Vilnius → Vilniaus"},
                    {"lt": "Mes esame iš Vokietijos.", "ru": "Мы из Германии.", "note": "Vokietija → Vokietijos"},
                    {"lt": "Ji yra iš Rygos.", "ru": "Она из Риги.", "note": "Ryga → Rygos"}
                ]
            },
            {
                "topic": "3. Спряжение глаголов типа -a (kalbėti, suprasti)",
                "explanation_ru": "Глаголы типа -a в 3-м лице имеют окончание -a. Самый важный глагол этой группы — kalbėti (говорить):\n• aš kalbu (я говорю)\n• tu kalbi (ты говоришь)\n• jis, ji kalba (он/она говорит)\n• mes kalbame (мы говорим)\n• jūs kalbate (вы говорите)\n• jie, jos kalba (они говорят)\nОтрицание: приставка ne- (nekalbu, nesuprantu).",
                "explanation_en": "Conjugation of -a type verbs: kalbu, kalbi, kalba, kalbame, kalbate, kalba.",
                "table": [
                    {"lt": "aš kalbu / suprantu", "ru": "я говорю / понимаю", "note": "1 л. ед.ч."},
                    {"lt": "tu kalbi / supranti", "ru": "ты говоришь / понимаешь", "note": "2 л. ед.ч."},
                    {"lt": "jis, ji kalba / supranta", "ru": "он, она говорит / понимает", "note": "3 л. ед.ч."},
                    {"lt": "mes kalbame / suprantame", "ru": "мы говорим / понимаем", "note": "1 л. мн.ч."},
                    {"lt": "jūs kalbate / suprantate", "ru": "вы говорите / понимаете", "note": "2 л. мн.ч."},
                    {"lt": "jie, jos kalba / supranta", "ru": "они говорят / понимают", "note": "3 л. мн.ч."}
                ]
            },
            {
                "topic": "4. Языки на наречиях (-iškai)",
                "explanation_ru": "Когда мы говорим 'говорить по-литовски, по-русски, по-английски', в литовском языке используется наречие с суффиксом -iškai:\n• lietuviškai (по-литовски)\n• angliškai (по-английски)\n• rusiškai (по-русски)\n• vokiškai (по-немецки)\n• lenkiškai (по-польски)\nВопрос: 'Kaip jūs kalbate?' (На каких языках вы говорите? / Как вы говорите?).",
                "explanation_en": "Languages as adverbs ending in -iškai: lietuviškai, angliškai, rusiškai.",
                "table": [
                    {"lt": "Ar tu kalbi lietuviškai?", "ru": "Ты говоришь по-литовски?", "note": "– Taip, truputį."},
                    {"lt": "Aš suprantu rusiškai.", "ru": "Я понимаю по-русски.", "note": "suprasti + adverb"}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Kaip sekasi? (Как дела?)",
                "lines": [
                    {"speaker": "Andrius", "lt": "Labas, Rūta! Kaip sekasi?", "ru": "Привет, Рута! Как дела?"},
                    {"speaker": "Rūta", "lt": "Ačiū, Andriau, puikiai! O kaip tau?", "ru": "Спасибо, Андрюс, отлично! А как тебе?"},
                    {"speaker": "Andrius", "lt": "Ačiū, taip pat labai gerai. Susipažink, čia mano draugas Džonas.", "ru": "Спасибо, тоже очень хорошо. Познакомься, это мой друг Джон."},
                    {"speaker": "Rūta", "lt": "Labai malonu, Džonai! Iš kur jūs esate?", "ru": "Очень приятно, Джон! Откуда вы?"},
                    {"speaker": "Džonas", "lt": "Aš esu iš Anglijos, iš Londono. O jūs?", "ru": "Я из Англии, из Лондона. А вы?"},
                    {"speaker": "Rūta", "lt": "Aš esu iš Lietuvos, iš Kauno.", "ru": "Я из Литвы, из Каунаса."}
                ]
            },
            {
                "title": "Kalbos (Знание языков)",
                "lines": [
                    {"speaker": "Dėstytojas", "lt": "Ar jūs kalbate lietuviškai, Tomai?", "ru": "Вы говорите по-литовски, Томас?"},
                    {"speaker": "Tomas", "lt": "Taip, bet tik truputį. Aš gerai kalbu angliškai ir vokiškai.", "ru": "Да, но только чуть-чуть. Я хорошо говорю по-английски и по-немецки."},
                    {"speaker": "Dėstytojas", "lt": "O ar suprantate rusiškai?", "ru": "А по-русски понимаете?"},
                    {"speaker": "Tomas", "lt": "Suprantu, bet nekalbu.", "ru": "Понимаю, но не говорю."}
                ]
            }
        ],
        "vocabulary": [
            {"word": "Kaip sekasi?", "translation": "Как дела?", "transcription": "Кайп ся́каси", "category": "Приветствие"},
            {"word": "Ačiū, gerai", "translation": "Спасибо, хорошо", "transcription": "А́чу, гяра́й", "category": "Фраза"},
            {"word": "puikiai", "translation": "отлично / великолепно", "transcription": "пу́йкей", "category": "Наречие"},
            {"word": "labai gerai", "translation": "очень хорошо", "transcription": "лаба́й гяра́й", "category": "Фраза"},
            {"word": "blogai", "translation": "плохо", "transcription": "блога́й", "category": "Наречие"},
            {"word": "čia", "translation": "здесь / вот это", "transcription": "чя", "category": "Наречие"},
            {"word": "draugas", "translation": "друг", "transcription": "дра́угас", "category": "Люди"},
            {"word": "draugė", "translation": "подруга", "transcription": "дра́уге", "category": "Люди"},
            {"word": "ponas", "translation": "господин", "transcription": "по́нас", "category": "Обращение"},
            {"word": "ponia", "translation": "госпожа", "transcription": "поня́", "category": "Обращение"},
            {"word": "Iš kur?", "translation": "Откуда?", "transcription": "Иш кур?", "category": "Вопрос"},
            {"word": "Lietuva", "translation": "Литва", "transcription": "Летува́", "category": "Страна"},
            {"word": "iš Lietuvos", "translation": "из Литвы", "transcription": "иш Летуво́с", "category": "Грамматика"},
            {"word": "kalbėti", "translation": "говорить", "transcription": "калбе́ти", "category": "Глагол"},
            {"word": "suprasti", "translation": "понимать", "transcription": "супра́сти", "category": "Глагол"},
            {"word": "lietuviškai", "translation": "по-литовски", "transcription": "лету́вишкай", "category": "Язык"},
            {"word": "angliškai", "translation": "по-английски", "transcription": "а́нглишкай", "category": "Язык"},
            {"word": "rusiškai", "translation": "по-русски", "transcription": "ру́сишкай", "category": "Язык"},
            {"word": "truputį", "translation": "чуть-чуть / немного", "transcription": "тру́пути", "category": "Наречие"},
            {"word": "bet", "translation": "но", "transcription": "бят", "category": "Союз"}
        ],
        "exercises": [
            {
                "type": "mc",
                "question": "Как правильно обратиться к человеку по имени Jonas (звательный падеж)?",
                "options": ["Labas, Jonai!", "Labas, Jonas!", "Labas, Jonu!", "Labas, Jonie!"],
                "answer": "Labas, Jonai!",
                "explanation": "Мужские имена на -as в звательном падеже (обращении) оканчиваются на -ai (Jonas → Jonai)."
            },
            {
                "type": "fill",
                "question": "Поставьте имя Paulius в форму обращения (звательный падеж): «Labas rytas, ________!»",
                "answer": "Pauliau",
                "hint": "Имена на -us в звательном падеже оканчиваются на -au",
                "explanation": "Имена на -us в звательном падеже принимают окончание -au: Paulius → Pauliau."
            },
            {
                "type": "mc",
                "question": "Выберите правильную форму: «Aš esu iš ________.» (Lietuva)",
                "options": ["Lietuvos", "Lietuvoje", "Lietuvą", "Lietuva"],
                "answer": "Lietuvos",
                "explanation": "Предлог 'iš' требует родительного падежа (Kilmininkas): Lietuva → Lietuvos."
            },
            {
                "type": "fill",
                "question": "Вставьте форму глагола kalbėti: «Mes ________ lietuviškai ir angliškai.»",
                "answer": "kalbame",
                "hint": "Форма для mes (мы)",
                "explanation": "Для 'mes' глагол kalbėti имеет форму 'kalbame'."
            },
            {
                "type": "mc",
                "question": "Как перевести «Я немного говорю по-литовски»?",
                "options": ["Aš truputį kalbu lietuviškai.", "Aš blogai kalbu Lietuva.", "Aš kalbame lietuvis.", "Aš supranti kalba."],
                "answer": "Aš truputį kalbu lietuviškai.",
                "explanation": "'Truputį kalbu lietuviškai' = 'немного говорю по-литовски'."
            },
            {
                "type": "fill",
                "question": "Вставьте пропущенное слово: «– Kaip sekasi? – Ačiū, ________!» (хорошо)",
                "answer": "gerai",
                "hint": "хорошо по-литовски",
                "explanation": "Стандартный ответ: 'Ačiū, gerai!' (Спасибо, хорошо!)."
            }
        ]
    }
]

print("Script template ready.")
