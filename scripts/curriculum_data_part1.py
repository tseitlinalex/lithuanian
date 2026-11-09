# -*- coding: utf-8 -*-
import json

def generate_curriculum():
    lessons = []

    # helper to make exercise
    def mc(q, opts, ans, exp):
        return {"type": "mc", "question": q, "options": opts, "answer": ans, "explanation": exp}

    def fill(q, ans, hint, exp):
        return {"type": "fill", "question": q, "answer": ans, "hint": hint, "explanation": exp}

    # ------------------ CHAPTER 1 ------------------
    lessons.append({
        "id": "ch-1",
        "book": 1,
        "chapter": 1,
        "level": "A1.1",
        "title": "Koks jūsų vardas?",
        "title_ru": "Как вас зовут?",
        "title_en": "What is your name?",
        "summary_ru": "Знакомство, приветствия, личные местоимения, род существительных и важнейший глагол būti (быть).",
        "summary_en": "Introductions, greetings, pronouns, noun genders, and the verb būti.",
        "grammar": [
            {
                "topic": "1. Личные местоимения (Asmeniniai įvardžiai)",
                "explanation_ru": "В литовском языке местоимения понятны и логичны. Обратите внимание: для вежливого обращения к одному человеку или к группе людей используется 'jūs' (Вы). В 3-м лице во множественном числе есть разделение: jie (они мужчины или мужчины и женщины) и jos (только женщины).",
                "table": [
                    {"lt": "aš", "ru": "я", "note": "1-е лицо ед.ч."},
                    {"lt": "tu", "ru": "ты", "note": "2-е лицо ед.ч."},
                    {"lt": "jis", "ru": "он", "note": "3-е лицо муж.р."},
                    {"lt": "ji", "ru": "она", "note": "3-е лицо жен.р."},
                    {"lt": "mes", "ru": "мы", "note": "1-е лицо мн.ч."},
                    {"lt": "jūs", "ru": "вы / Вы", "note": "2-е лицо мн.ч. или вежливо к одному"},
                    {"lt": "jie", "ru": "они (мужчины/смешанные)", "note": "3-е лицо мн.ч."},
                    {"lt": "jos", "ru": "они (только женщины)", "note": "3-е лицо мн.ч."}
                ]
            },
            {
                "topic": "2. Глагол būti (быть) в настоящем времени",
                "explanation_ru": "В русском языке связка 'быть' обычно опускается («Я студент»), но в литовском она ВСЕГДА произносится: «Aš esu studentas». В отрицании частица ne- пишется слитно с глаголом: nesu, nesi, nėra. Форма 3-го лица (yra / nėra) не меняется — она одинакова и для 'он/она', и для 'они'!",
                "table": [
                    {"lt": "aš esu / nesu", "ru": "я есть / не есть", "note": "Aš esu Tomas."},
                    {"lt": "tu esi / nesi", "ru": "ты есть / не есть", "note": "Tu esi studentė."},
                    {"lt": "jis, ji yra / nėra", "ru": "он, она есть / не есть", "note": "Ji yra dėstytoja."},
                    {"lt": "mes esame / nesame", "ru": "мы есть / не есть", "note": "Mes esame čia."},
                    {"lt": "jūs esate / nesate", "ru": "вы есть / не есть", "note": "Ar jūs esate Lina?"},
                    {"lt": "jie, jos yra / nėra", "ru": "они есть / не есть", "note": "Jie yra studentai."}
                ]
            },
            {
                "topic": "3. Род существительных (Giminė)",
                "explanation_ru": "Мужской род (Vyriškoji giminė) обычно заканчивается на согласный + s: -as (Tomas), -is (brolis), -ys (Kastytis), -us (Paulius).\nЖенский род (Moteriškoji giminė) оканчивается на гласные: -a (Lina, mama) и -ė (Eglė, studentė).\nНазвания профессий и национальностей парные: studentas (студент) / studentė (студентка), lietuvis (литовец) / lietuvė (литовка).",
                "table": [
                    {"lt": "studentas / studentė", "ru": "студент / студентка", "note": "окончания -as / -ė"},
                    {"lt": "dėstytojas / dėstytoja", "ru": "преподаватель / преподавательница", "note": "окончания -as / -a"},
                    {"lt": "lietuvis / lietuvė", "ru": "литовец / литовка", "note": "окончания -is / -ė"},
                    {"lt": "lenkas / lenkė", "ru": "поляк / полька", "note": "окончания -as / -ė"}
                ]
            },
            {
                "topic": "4. Вопросительные слова Kas (Кто/Что) и Ar (Ли)",
                "explanation_ru": "Вопросительное слово 'Kas' универсально означает и 'Кто', и 'Что'.\nЧастица 'Ar' начинает вопросы, требующие ответа «да» (taip) или «нет» (ne): «Ar jūs esate studentas?» (Вы студент?).",
                "table": [
                    {"lt": "Kas jūs esate?", "ru": "Кто вы?", "note": "– Aš esu dėstytoja."},
                    {"lt": "Ar tu esi Lina?", "ru": "Ты Лина? (Да/Нет)", "note": "– Taip, aš esu Lina."}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Susipažinimas (Знакомство)",
                "lines": [
                    {"speaker": "Tomas", "lt": "Labas rytas! Mano vardas Tomas. O koks jūsų vardas?", "ru": "Доброе утро! Меня зовут Томас. А как ваше имя?"},
                    {"speaker": "Rasa", "lt": "Labas rytas, Tomai! Mano vardas yra Rasa. Labai malonu.", "ru": "Доброе утро, Томас! Мое имя — Раса. Очень приятно."},
                    {"speaker": "Tomas", "lt": "Man taip pat labai malonu! Ar jūs esate studentė?", "ru": "Мне тоже очень приятно! Вы студентка?"},
                    {"speaker": "Rasa", "lt": "Taip, aš esu studentė. O kas jūs esate?", "ru": "Да, я студентка. А кто вы?"},
                    {"speaker": "Tomas", "lt": "Aš taip pat esu studentas. Aš esu estas iš Talino.", "ru": "Я тоже студент. Я эстонец из Таллина."}
                ]
            },
            {
                "title": "Atsiprašymas (Извинения)",
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
            {"word": "Iki pasimatymo", "translation": "До встречи", "transcription": "Ики́ пасимати́мо", "category": "Прощание"},
            {"word": "Ačiū", "translation": "Спасибо", "transcription": "А́чу", "category": "Вежливость"},
            {"word": "Prašom", "translation": "Пожалуйста", "transcription": "Пра́шом", "category": "Вежливость"},
            {"word": "Atsiprašau", "translation": "Прошу прощения / Извините", "transcription": "Аципраша́у", "category": "Вежливость"},
            {"word": "Nieko tokio", "translation": "Ничего страшного", "transcription": "Не́ко то́кё", "category": "Вежливость"},
            {"word": "vardas", "translation": "имя", "transcription": "ва́рдас", "category": "Существительное"},
            {"word": "pavardė", "translation": "фамилия", "transcription": "паварде́", "category": "Существительное"},
            {"word": "studentas", "translation": "студент", "transcription": "студя́нтас", "category": "Профессия"},
            {"word": "studentė", "translation": "студентка", "transcription": "студя́нте", "category": "Профессия"},
            {"word": "dėstytojas", "translation": "преподаватель", "transcription": "де́ститояс", "category": "Профессия"},
            {"word": "dėstytoja", "translation": "преподавательница", "transcription": "де́ститоя", "category": "Профессия"},
            {"word": "taip", "translation": "да", "transcription": "тайп", "category": "Частица"},
            {"word": "ne", "translation": "нет", "transcription": "ня", "category": "Частица"},
            {"word": "labai malonu", "translation": "очень приятно", "transcription": "лаба́й малону́", "category": "Знакомство"},
            {"word": "kas", "translation": "кто / что", "transcription": "кас", "category": "Вопрос"}
        ],
        "exercises": [
            mc("Как сказать: «Я студентка»?", ["Aš esu studentė.", "Aš esi studentė.", "Aš yra studentė.", "Aš esame studentė."], "Aš esu studentė.", "С местоимением 'aš' (я) глагол būti имеет форму 'esu'."),
            fill("Вставьте форму būti: «Mes ________ studentai.» (Мы студенты)", "esame", "Форма для mes", "Для 'mes' правильная форма глагола būti — 'esame'."),
            mc("Выберите правильный вопрос к ответу: «Mano vardas Tomas.»", ["Koks tavo vardas?", "Kas tu esi?", "Ar tu studentas?", "Kokia tavo pavardė?"], "Koks tavo vardas?", "Вопрос о том, как зовут: 'Koks tavo vardas?'."),
            fill("Вставьте отрицание: «Aš ________ lietuvis, aš esu latvis.» (Я не литовец)", "nesu", "Отрицание būti для aš", "Отрицательная форма būti для 1 лица ед. ч. (aš) — 'nesu'."),
            mc("Какое существительное женского рода (Moteriškoji giminė)?", ["dėstytoja", "studentas", "Igoris", "sūnus"], "dėstytoja", "Окончание -a указывает на женский род (dėstytoja)."),
            fill("С какой частицы начинается общий вопрос: «________ jūs esate Lina?»", "Ar", "Частица 'Ли'", "Общие вопросы в литовском языке начинаются с частицы 'Ar'.")
        ]
    })

    # ------------------ CHAPTER 2 ------------------
    lessons.append({
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
                "explanation_ru": "В литовском языке при обращении к человеку окончание имени ВСЕГДА меняется! Нельзя сказать 'Labas, Jonas', обязательно нужно использовать звательную форму:\n• -as переходит в -ai: Jonas → Jonai! Tomas → Tomai!\n• -is переходит в -i: Igoris → Igori!\n• -ys переходит в -y: Balys → Baly!\n• -us переходит в -au: Paulius → Pauliau! Andrius → Andriau!\n• -ė переходит в -e: Eglė → Egle!\n• -a остаётся -a: Lina → Lina!\nИсключение: вежливое 'ponas' (господин) в звательном падеже имеет форму 'pone': Pone Tomai!",
                "table": [
                    {"lt": "Tomas → Tomai!", "ru": "Томас → Томас!", "note": "-as переходит в -ai"},
                    {"lt": "Paulius → Pauliau!", "ru": "Паулюс → Паулюс!", "note": "-us переходит в -au"},
                    {"lt": "Igoris → Igori!", "ru": "Игорь → Игорь!", "note": "-is переходит в -i"},
                    {"lt": "Eglė → Egle!", "ru": "Эгле → Эгле!", "note": "-ė переходит в -e"},
                    {"lt": "ponas → pone!", "ru": "господин → господин!", "note": "Laba diena, pone Jonai!"}
                ]
            },
            {
                "topic": "2. Предлог iš (из) + Родительный падеж (Kilmininkas)",
                "explanation_ru": "Чтобы сказать, откуда вы («Iš kur jūs esate?»), используется предлог 'iš' + Родительный падеж (Kilmininkas, вопрос Ko? - Кого/Чего):\n• Страны на -ija получают окончание -ijos: Lietuva → Lietuvos, Anglija → Anglijos, Vokietija → Vokietijos, Latvija → Latvijos.\n• Города мужского рода на -as получают -o: Vilnius → Vilniaus, Kaunas → Kauno.\n• Города/страны женского рода на -a получают -os: Ryga → Rygos, Varšuva → Varšuvos.",
                "table": [
                    {"lt": "Aš esu iš Lietuvos.", "ru": "Я из Литвы.", "note": "Lietuva → Lietuvos"},
                    {"lt": "Jis yra iš Vilniaus.", "ru": "Он из Вильнюса.", "note": "Vilnius → Vilniaus"},
                    {"lt": "Mes esame iš Vokietijos.", "ru": "Мы из Германии.", "note": "Vokietija → Vokietijos"},
                    {"lt": "Ji yra iš Rygos.", "ru": "Она из Риги.", "note": "Ryga → Rygos"}
                ]
            },
            {
                "topic": "3. Спряжение глаголов типа -a (kalbėti, suprasti)",
                "explanation_ru": "Глагол kalbėti (говорить) в настоящем времени имеет основу на -a. Посмотрите на окончания: -u (я), -i (ты), -a (он/она/они), -ame (мы), -ate (вы).",
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
                "topic": "4. Названия языков (наречия на -iškai)",
                "explanation_ru": "Когда мы говорим «говорить на каком-то языке», в литовском всегда используется форма наречия с суффиксом -iškai:\n• lietuviškai (по-литовски)\n• angliškai (по-английски)\n• rusiškai (по-русски)\n• vokiškai (по-немецки)\n• lenkiškai (по-польски)",
                "table": [
                    {"lt": "Ar tu kalbi lietuviškai?", "ru": "Ты говоришь по-литовски?", "note": "– Taip, truputį."},
                    {"lt": "Aš gerai suprantu rusiškai.", "ru": "Я хорошо понимаю по-русски.", "note": "suprasti + adverb"}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Kaip sekasi? (Как дела?)",
                "lines": [
                    {"speaker": "Andrius", "lt": "Labas, Rūta! Kaip sekasi?", "ru": "Привет, Рута! Как дела?"},
                    {"speaker": "Rūta", "lt": "Ačiū, Andriau, puikiai! O kaip tau?", "ru": "Спасибо, Андрюс, отлично! А тебе?"},
                    {"speaker": "Andrius", "lt": "Ačiū, taip pat labai gerai. Čia mano draugas Džonas.", "ru": "Спасибо, тоже отлично. Это мой друг Джон."},
                    {"speaker": "Rūta", "lt": "Labai malonu, Džonai! Iš kur jūs esate?", "ru": "Очень приятно, Джон! Откуда вы?"},
                    {"speaker": "Džonas", "lt": "Aš esu iš Anglijos, iš Londono. O jūs?", "ru": "Я из Англии, из Лондона. А вы?"},
                    {"speaker": "Rūta", "lt": "Aš esu iš Lietuvos, iš Kauno.", "ru": "Я из Литвы, из Каунаса."}
                ]
            }
        ],
        "vocabulary": [
            {"word": "Kaip sekasi?", "translation": "Как дела?", "transcription": "Кайп ся́каси", "category": "Приветствие"},
            {"word": "Ačiū, gerai", "translation": "Спасибо, хорошо", "transcription": "А́чу, гяра́й", "category": "Фраза"},
            {"word": "puikiai", "translation": "отлично", "transcription": "пу́йкей", "category": "Наречие"},
            {"word": "labai gerai", "translation": "очень хорошо", "transcription": "лаба́й гяра́й", "category": "Фраза"},
            {"word": "blogai", "translation": "плохо", "transcription": "блога́й", "category": "Наречие"},
            {"word": "čia", "translation": "здесь / вот это", "transcription": "чя", "category": "Наречие"},
            {"word": "draugas", "translation": "друг", "transcription": "дра́угас", "category": "Люди"},
            {"word": "draugė", "translation": "подруга", "transcription": "дра́уге", "category": "Люди"},
            {"word": "ponas", "translation": "господин", "transcription": "по́нас", "category": "Обращение"},
            {"word": "ponia", "translation": "госпожа", "transcription": "поня́", "category": "Обращение"},
            {"word": "Iš kur?", "translation": "Откуда?", "transcription": "Иш кур?", "category": "Вопрос"},
            {"word": "iš Lietuvos", "translation": "из Литвы", "transcription": "иш Летуво́с", "category": "Фраза"},
            {"word": "kalbėti", "translation": "говорить", "transcription": "калбе́ти", "category": "Глагол"},
            {"word": "suprasti", "translation": "понимать", "transcription": "супра́сти", "category": "Глагол"},
            {"word": "lietuviškai", "translation": "по-литовски", "transcription": "лету́вишкай", "category": "Язык"},
            {"word": "angliškai", "translation": "по-английски", "transcription": "а́нглишкай", "category": "Язык"},
            {"word": "rusiškai", "translation": "по-русски", "transcription": "ру́сишкай", "category": "Язык"},
            {"word": "vokiškai", "translation": "по-немецки", "transcription": "во́кишкай", "category": "Язык"},
            {"word": "truputį", "translation": "чуть-чуть / немного", "transcription": "тру́пути", "category": "Наречие"},
            {"word": "bet", "translation": "но", "transcription": "бят", "category": "Союз"}
        ],
        "exercises": [
            mc("Как правильно обратиться к Jonas в звательном падеже?", ["Labas, Jonai!", "Labas, Jonas!", "Labas, Jonu!", "Labas, Jonie!"], "Labas, Jonai!", "Мужские имена на -as в звательном падеже получают окончание -ai."),
            fill("Поставьте имя Paulius в звательный падеж: «Labas rytas, ________!»", "Pauliau", "Имена на -us получают окончание -au", "Имена на -us в звательном падеже принимают окончание -au."),
            mc("Выберите верный вариант: «Aš esu iš ________.» (Lietuva)", ["Lietuvos", "Lietuvoje", "Lietuvą", "Lietuva"], "Lietuvos", "Предлог 'iš' требует формы родительного падежа (Lietuva → Lietuvos)."),
            fill("Вставьте форму глагола kalbėti: «Mes ________ lietuviškai ir angliškai.»", "kalbame", "Форма для mes (мы)", "Для 'mes' глагол kalbėti имеет окончание -ame: kalbame."),
            mc("Как перевести «Я немного говорю по-литовски»?", ["Aš truputį kalbu lietuviškai.", "Aš blogai kalbu Lietuva.", "Aš kalbame lietuvis.", "Aš supranti kalba."], "Aš truputį kalbu lietuviškai.", "'Truputį kalbu lietuviškai' означает 'немного говорю по-литовски'."),
            fill("Вставьте пропущенное слово: «– Kaip sekasi? – Ačiū, ________!» (хорошо)", "gerai", "хорошо по-литовски", "Стандартный ответ: 'Ačiū, gerai!'.")
        ]
    })

    # ------------------ CHAPTER 3 ------------------
    lessons.append({
        "id": "ch-3",
        "book": 1,
        "chapter": 3,
        "level": "A1.1",
        "title": "Koks tavo adresas?",
        "title_ru": "Какой твой адрес?",
        "title_en": "What is your address?",
        "summary_ru": "Местный падеж (Vietininkas - Kur?), предлог prie + Kilmininkas, числительные 0-100, адреса и телефонные номера.",
        "summary_en": "Locative case (Vietininkas), preposition prie + Genitive, numbers 0-100, addresses, and phone numbers.",
        "grammar": [
            {
                "topic": "1. Местный падеж (Vietininkas) — где вы живёте? (Kur?)",
                "explanation_ru": "Чтобы сказать 'где?' (Kur?), в литовском языке используется местный падеж (Vietininkas) без предлогов:\n• Мужской род: Vilnius → Vilniuje, Kaunas → Kaune, bendrabutis → bendrabutyje, kambarys → kambaryje.\n• Женский род: Lietuva → Lietuvoje, gatvė → gatvėje, Palanga → Palangoje, mokykla → mokykloje.",
                "table": [
                    {"lt": "Vilnius → Vilniuje", "ru": "Вильнюс → в Вильнюсе", "note": "окончание -e / -yje"},
                    {"lt": "Kaunas → Kaune", "ru": "Каунас → в Каунасе", "note": "окончание -e"},
                    {"lt": "Lietuva → Lietuvoje", "ru": "Литва → в Литве", "note": "окончание -oje"},
                    {"lt": "Vilniaus gatvė → Vilniaus gatvėje", "ru": "улица Вильняус → на улице Вильняус", "note": "окончание -ėje"}
                ]
            },
            {
                "topic": "2. Предлог prie (возле / около) + Kilmininkas",
                "explanation_ru": "Предлог 'prie' переводится как 'около, рядом с, у' и всегда требует родительного падежа (Ko?):\n• prie parko (у парка, parkas → parko)\n• prie universiteto (у университета, universitetas → universiteto)\n• prie stoties (у вокзала, stotis → stoties)",
                "table": [
                    {"lt": "Aš gyvenu prie parko.", "ru": "Я живу возле парка.", "note": "parkas → parko"},
                    {"lt": "Namas yra prie upės.", "ru": "Дом находится у реки.", "note": "upė → upės"}
                ]
            },
            {
                "topic": "3. Числительные 0–20 (Skaitvardžiai)",
                "explanation_ru": "Счет от 0 до 10: nulis (0), vienas (1), du (2), trys (3), keturi (4), penki (5), šeši (6), septyni (7), aštuoni (8), devyni (9), dešimt (10).\nОт 11 до 19 добавляется суффикс -lika: vienuolika (11), dvylika (12), trylika (13), keturiolika (14)... dvidešimt (20).",
                "table": [
                    {"lt": "vienas, du, trys", "ru": "один, два, три", "note": "1, 2, 3"},
                    {"lt": "keturi, penki, šeši", "ru": "четыре, пять, шесть", "note": "4, 5, 6"},
                    {"lt": "septyni, aštuoni, devyni, dešimt", "ru": "семь, восемь, девять, десять", "note": "7, 8, 9, 10"},
                    {"lt": "vienuolika, dvylika ... dvidešimt", "ru": "одиннадцать, двенадцать ... двадцать", "note": "11-20"}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Adresas ir telefonas (Адрес и телефон)",
                "lines": [
                    {"speaker": "Lina", "lt": "Kur tu gyveni, Tomai?", "ru": "Где ты живешь, Томас?"},
                    {"speaker": "Tomas", "lt": "Aš gyvenu Vilniuje, Gedimino prospekte, dešimtame name.", "ru": "Я живу в Вильнюсе, на проспекте Гедиминаса, в десятом доме."},
                    {"speaker": "Lina", "lt": "Koks tavo telefono numeris?", "ru": "Какой твой номер телефона?"},
                    {"speaker": "Tomas", "lt": "Mano numeris yra +370 612 34567. O koks tavo adresas?", "ru": "Мой номер +370 612 34567. А какой твой адрес?"},
                    {"speaker": "Lina", "lt": "Aš gyvenu Kaune, prie universiteto.", "ru": "Я живу в Каунасе, возле университета."}
                ]
            }
        ],
        "vocabulary": [
            {"word": "Kur?", "translation": "Где?", "transcription": "Кур?", "category": "Вопрос"},
            {"word": "gyventi", "translation": "жить", "transcription": "гивя́нти", "category": "Глагол"},
            {"word": "adresas", "translation": "адрес", "transcription": "а́дрясас", "category": "Город"},
            {"word": "gatvė", "translation": "улица", "transcription": "га́тве", "category": "Город"},
            {"word": "namas", "translation": "дом", "transcription": "на́мас", "category": "Город"},
            {"word": "butas", "translation": "квартира", "transcription": "бу́тас", "category": "Город"},
            {"word": "miestas", "translation": "город", "transcription": "ме́стас", "category": "Город"},
            {"word": "prie", "translation": "около / возле / у", "transcription": "пре", "category": "Предлог"},
            {"word": "parkas", "translation": "парк", "transcription": "па́ркас", "category": "Город"},
            {"word": "universitetas", "translation": "университет", "transcription": "унивярсите́тас", "category": "Город"},
            {"word": "stotis", "translation": "вокзал / станция", "transcription": "стоти́с", "category": "Город"},
            {"word": "centras", "translation": "центр", "transcription": "ця́нтрас", "category": "Город"},
            {"word": "telefono numeris", "translation": "номер телефона", "transcription": "тяляфо́но ну́мярис", "category": "Связь"},
            {"word": "vienas", "translation": "один", "transcription": "ве́нас", "category": "Числительное"},
            {"word": "du", "translation": "два", "transcription": "ду", "category": "Числительное"},
            {"word": "trys", "translation": "три", "transcription": "трис", "category": "Числительное"},
            {"word": "dešimt", "translation": "десять", "transcription": "дя́шимт", "category": "Числительное"},
            {"word": "dvidešimt", "translation": "двадцать", "transcription": "дви́дяшимт", "category": "Числительное"},
            {"word": "šimtas", "translation": "сто", "transcription": "ши́мтас", "category": "Числительное"}
        ],
        "exercises": [
            mc("Как сказать: «Я живу в Вильнюсе»?", ["Aš gyvenu Vilniuje.", "Aš gyvenu Vilnius.", "Aš gyvenu Vilniaus.", "Aš gyvenu Vilnių."], "Aš gyvenu Vilniuje.", "В местном падеже (Vietininkas): Vilnius → Vilniuje."),
            fill("Поставьте слово в местный падеж: «Mes gyvename ________.» (Lietuva)", "Lietuvoje", "Lietuva в местном падеже (-oje)", "Слова на -a в местном падеже получают окончание -oje: Lietuva → Lietuvoje."),
            mc("Какое окончание требует предлог 'prie' в предложении: «Aš gyvenu prie ________.» (parkas)?", ["parko", "parke", "parką", "parku"], "parko", "Предлог 'prie' требует родительного падежа (Kilmininkas): parkas → parko."),
            fill("Вставьте вопросительное слово: «________ tu gyveni? – Vilniuje.» (Где)", "Kur", "Где по-литовски", "Вопрос о месте — 'Kur?' (Где?)."),
            mc("Сколько это: «penkiolika»?", ["15", "5", "50", "14"], "15", "Числительное penkiolika = 15 (-lika означает +10)."),
            fill("Вставьте форму глагола gyventi (1 л. ед.ч.): «Aš ________ Kaune.» (Я живу)", "gyvenu", "Окончание -u для aš", "Для 'aš' глагол gyventi имеет форму 'gyvenu'.")
        ]
    })

    # ------------------ CHAPTER 4 ------------------
    lessons.append({
        "id": "ch-4",
        "book": 1,
        "chapter": 4,
        "level": "A1.1",
        "title": "Kada ir kur susitinkame?",
        "title_ru": "Когда и где встретимся?",
        "title_en": "When and where do we meet?",
        "summary_ru": "Дни недели, время, часы, винительный падеж времени (Galininkas - Kada?), предлоги направления į и pas.",
        "summary_en": "Days of the week, time, telling the hour, Accusative for time expressions, prepositions į and pas.",
        "grammar": [
            {
                "topic": "1. Дни недели и выражение времени (Kada? - Galininkas)",
                "explanation_ru": "В литовском языке ответ на вопрос «Когда?» (Kada?) в днях недели стоит в ВИНИТЕЛЬНОМ падеже (Galininkas, окончание -į):\n• pirmadienis (понедельник) → pirmadienį (в понедельник)\n• antradienis → antradienį (во вторник)\n• trečiadienis → trečiadienį (в среду)\n• ketvirtadienis → ketvirtadienį (в четверг)\n• penktadienis → penktadienį (в пятницу)\n• šeštadienis → šeštadienį (в субботу)\n• sekmadienis → sekmadienį (в воскресенье)\n• savaitgalis → savaitgalį (в выходные)",
                "table": [
                    {"lt": "pirmadienis → pirmadienį", "ru": "понедельник → в понедельник", "note": "Kada? -į"},
                    {"lt": "penktadienis → penktadienį", "ru": "пятница → в пятницу", "note": "Kada? -į"},
                    {"lt": "savaitgalis → savaitgalį", "ru": "выходные → на выходных", "note": "Kada? -į"}
                ]
            },
            {
                "topic": "2. Который час? (Kelintą valandą?)",
                "explanation_ru": "Чтобы назвать время встречи («Во сколько часов?»), используются порядковые числительные в винительном падеже:\n• pirmą valandą (в час)\n• antrą valandą (в два часа)\n• trečią valandą (в три часа)\n• penktą valandą (в пять часов)\n• aštuntą valandą ryto / vakaro (в восемь утра / вечера).",
                "table": [
                    {"lt": "Kelintą valandą susitinkame?", "ru": "В котором часу мы встречаемся?", "note": "Kelintą valandą?"},
                    {"lt": "Susitinkame šeštą valandą vakaro.", "ru": "Встретимся в шесть вечера.", "note": "шесть часов"}
                ]
            },
            {
                "topic": "3. Направление: предлоги į (в/на) и pas (к)",
                "explanation_ru": "• 'į' + Galininkas (куда?): einu į universitetą (иду в университет), važiuoju į centrą (еду в центр), einu į teatrą (иду в театр).\n• 'pas' + Galininkas (к кому-то): einu pas draugą (иду к другу), einu pas gydytoją (иду к врачу).",
                "table": [
                    {"lt": "einu į darbą", "ru": "иду на работу", "note": "į + Galininkas"},
                    {"lt": "einu pas draugę", "ru": "иду к подруге", "note": "pas + Galininkas"}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Susitikimas (Встреча)",
                "lines": [
                    {"speaker": "Jonas", "lt": "Labas, Egle! Kada susitinkame?", "ru": "Привет, Эгле! Когда встретимся?"},
                    {"speaker": "Eglė", "lt": "Gal penktadienį vakare?", "ru": "Может быть, в пятницу вечером?"},
                    {"speaker": "Jonas", "lt": "Puiku! Kelintą valandą?", "ru": "Отлично! В котором часу?"},
                    {"speaker": "Eglė", "lt": "Susitinkame septintą valandą prie kino teatro.", "ru": "Встретимся в семь часов возле кинотеатра."},
                    {"speaker": "Jonas", "lt": "Gerai, iki penktadienio!", "ru": "Хорошо, до пятницы!"}
                ]
            }
        ],
        "vocabulary": [
            {"word": "Kada?", "translation": "Когда?", "transcription": "Када́?", "category": "Вопрос"},
            {"word": "Kelintą valandą?", "translation": "В котором часу?", "transcription": "Кяли́нта валанду́?", "category": "Вопрос"},
            {"word": "pirmadienis", "translation": "понедельник", "transcription": "пи́рмаденис", "category": "Дни недели"},
            {"word": "antradienis", "translation": "вторник", "transcription": "а́нтраденис", "category": "Дни недели"},
            {"word": "trečiadienis", "translation": "среда", "transcription": "трячя́денис", "category": "Дни недели"},
            {"word": "ketvirtadienis", "translation": "четверг", "transcription": "кятви́ртаденис", "category": "Дни недели"},
            {"word": "penktadienis", "translation": "пятница", "transcription": "пя́нктаденис", "category": "Дни недели"},
            {"word": "šeštadienis", "translation": "суббота", "transcription": "шяшта́денис", "category": "Дни недели"},
            {"word": "sekmadienis", "translation": "воскресенье", "transcription": "сякма́денис", "category": "Дни недели"},
            {"word": "savaitgalis", "translation": "выходные", "transcription": "савайтга́лис", "category": "Время"},
            {"word": "rytas", "translation": "утро", "transcription": "ри́тас", "category": "Время"},
            {"word": "diena", "translation": "день", "transcription": "дена́", "category": "Время"},
            {"word": "vakaras", "translation": "вечер", "transcription": "ва́карас", "category": "Время"},
            {"word": "naktis", "translation": "ночь", "transcription": "накти́с", "category": "Время"},
            {"word": "valanda", "translation": "час", "transcription": "валанда́", "category": "Время"},
            {"word": "susitikti", "translation": "встретиться", "transcription": "сусити́кти", "category": "Глагол"},
            {"word": "eiti", "translation": "идти", "transcription": "э́йти", "category": "Глагол"}
        ],
        "exercises": [
            mc("Как правильно сказать: «В пятницу»?", ["penktadienį", "penktadienis", "penktadienyje", "penktadienio"], "penktadienį", "Дни недели на вопрос 'Kada?' ставятся в винительный падеж с окончанием -į."),
            fill("Вставьте день недели в винительный падеж: «Mes susitinkame ________.» (šeštadienis - в субботу)", "šeštadienį", "окончание -į", "šeštadienis → šeštadienį."),
            mc("Куда вы идете (направление į + Galininkas): «Einu į ________.» (universitetas)?", ["universitetą", "universitete", "universiteto", "universitetui"], "universitetą", "Предлог 'į' требует винительного падежа (Galininkas): universitetą."),
            fill("Вставьте вопрос «Во сколько часов?»: «________ valandą susitinkame?»", "Kelintą", "Kelintą valandą", "Вопрос о времени встречи: 'Kelintą valandą?'."),
            mc("Как перевести: «В шесть часов вечера»?", ["šeštą valandą vakaro", "šeši valandos vakaras", "šeštame valande vakarą", "šeštą valanda vakare"], "šeštą valandą vakaro", "Порядковое числительное и слово 'valandą' стоят в винительном падеже."),
            fill("Вставьте предлог «к другу»: «Einu ________ draugo / draugą.» (к)", "pas", "Предлог 'к'", "К человеку идут с предлогом 'pas' (pas draugą).")
        ]
    })

    # ------------------ CHAPTER 5 ------------------
    lessons.append({
        "id": "ch-5",
        "book": 1,
        "chapter": 5,
        "level": "A1.1",
        "title": "Čia mano šeima",
        "title_ru": "Это моя семья",
        "title_en": "Here is my family",
        "summary_ru": "Члены семьи, спряжение глаголов типа -i (turėti), конструкция обладания turėti + Galininkas vs neturėti + Kilmininkas.",
        "summary_en": "Family members, -i type verbs, turėti + Accusative vs neturėti + Genitive.",
        "grammar": [
            {
                "topic": "1. Глагол turėti (иметь) и отрицание neturėti (не иметь)",
                "explanation_ru": "Золотое правило литовского языка:\n• В утверждении: turėti требует ВИНИТЕЛЬНОГО падежа (Ką?):\nAš turiu brolį (У меня есть брат). Jis turi seserį (У него есть сестра).\n• В отрицании: neturėti ВСЕГДА требует РОДИТЕЛЬНОГО падежа (Ko?):\nAš neturiu brolio (У меня нет брата). Jis neturi sesers (У него нет сестры).",
                "table": [
                    {"lt": "Aš turiu brolį.", "ru": "У меня есть брат.", "note": "turėti + Galininkas (ką?)"},
                    {"lt": "Aš neturiu brolio.", "ru": "У меня нет брата.", "note": "neturėti + Kilmininkas (ko?)"},
                    {"lt": "Ji turi mašiną.", "ru": "У неё есть машина.", "note": "mašina → mašiną"},
                    {"lt": "Ji neturi mašinos.", "ru": "У неё нет машины.", "note": "mašina → mašinos"}
                ]
            },
            {
                "topic": "2. Спряжение глагола turėti (тип -i)",
                "explanation_ru": "Глаголы типа -i имеют основу на -i. Спряжение turėti:\n• aš turiu (у меня есть)\n• tu turi (у тебя есть)\n• jis, ji turi (у него/неё есть)\n• mes turime (у нас есть)\n• jūs turite (у вас есть)\n• jie, jos turi (у них есть).",
                "table": [
                    {"lt": "aš turiu / neturiu", "ru": "я имею / не имею", "note": "1 л. ед.ч."},
                    {"lt": "tu turi / neturi", "ru": "ты имеешь / не имеешь", "note": "2 л. ед.ч."},
                    {"lt": "jis, ji turi / neturi", "ru": "он, она имеет / не имеет", "note": "3 л. ед.ч."},
                    {"lt": "mes turime / neturime", "ru": "мы имеем / не имеем", "note": "1 л. мн.ч."},
                    {"lt": "jūs turite / neturite", "ru": "вы имеете / не имеете", "note": "2 л. мн.ч."},
                    {"lt": "jie, jos turi / neturi", "ru": "они имеют / не имеют", "note": "3 л. мн.ч."}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Apie šeimą (О семье)",
                "lines": [
                    {"speaker": "Tomas", "lt": "Ar tu turi didelę šeimą?", "ru": "У тебя большая семья?"},
                    {"speaker": "Lina", "lt": "Taip, mano šeima didelė. Aš turiu tėtį, mamą, du brolius ir seserį.", "ru": "Да, моя семья большая. У меня есть папа, мама, два брата и сестра."},
                    {"speaker": "Tomas", "lt": "O ar turi šunį arba katę?", "ru": "А у тебя есть собака или кошка?"},
                    {"speaker": "Lina", "lt": "Turiu šunį, bet neturiu katės. O tu?", "ru": "Есть собака, но нет кошки. А у тебя?"},
                    {"speaker": "Tomas", "lt": "Aš neturiu brolio, bet turiu seserį.", "ru": "У меня нет брата, но есть сестра."}
                ]
            }
        ],
        "vocabulary": [
            {"word": "šeima", "translation": "семья", "transcription": "шейма́", "category": "Семья"},
            {"word": "tėvai", "translation": "родители", "transcription": "тева́й", "category": "Семья"},
            {"word": "tėtis", "translation": "папа", "transcription": "те́тис", "category": "Семья"},
            {"word": "mama", "translation": "мама", "transcription": "мама́", "category": "Семья"},
            {"word": "brolis", "translation": "брат", "transcription": "бро́лис", "category": "Семья"},
            {"word": "sesuo", "translation": "сестра", "transcription": "сясуо́", "category": "Семья"},
            {"word": "sūnus", "translation": "сын", "transcription": "суну́с", "category": "Семья"},
            {"word": "duktė", "translation": "дочь", "transcription": "дукте́", "category": "Семья"},
            {"word": "vyras", "translation": "муж / мужчина", "transcription": "ви́рас", "category": "Семья"},
            {"word": "žmona", "translation": "жена", "transcription": "жмона́", "category": "Семья"},
            {"word": "vaikas", "translation": "ребенок", "transcription": "ва́йкас", "category": "Семья"},
            {"word": "senelis", "translation": "дедушка", "transcription": "сяне́лис", "category": "Семья"},
            {"word": "močiutė", "translation": "бабушка", "transcription": "мочю́те", "category": "Семья"},
            {"word": "šuo", "translation": "собака", "transcription": "шуо́", "category": "Животные"},
            {"word": "katė", "translation": "кошка", "transcription": "кате́", "category": "Животные"},
            {"word": "turėti", "translation": "иметь", "transcription": "туре́ти", "category": "Глагол"}
        ],
        "exercises": [
            mc("Выберите верную форму в утверждении: «Aš turiu ________.» (brolis - брата)", ["brolį", "brolio", "brolis", "broliui"], "brolį", "Утвердительный глагол turėti требует винительного падежа (ką?): brolį."),
            fill("Вставьте форму в отрицании: «Aš neturiu ________.» (brolis - брата)", "brolio", "neturėti требует родительного падежа (ko?)", "Отрицательный глагол neturėti всегда требует родительного падежа: brolio."),
            mc("Как сказать: «У неё нет кошки»?", ["Ji neturi katės.", "Ji neturi katę.", "Ji neturi katė.", "Ji neturi katėje."], "Ji neturi katės.", "Отрицание требует родительного падежа (katė → katės)."),
            fill("Вставьте форму глагола turėti для 'mes': «Mes ________ didelę šeimą.»", "turime", "Форма для mes", "Для 'mes' глагол turėti — 'turime'."),
            mc("Кто такой 'senelis'?", ["дедушка", "бабушка", "дядя", "племянник"], "дедушка", "Senelis переводится как 'дедушка' (močiutė — бабушка)."),
            fill("Вставьте утвердительную форму: «Jis turi gerą ________.» (draugas - друга)", "draugą", "Винительный падеж draugas → draugą", "Глагол turi требует винительного падежа: draugą.")
        ]
    })

    # Save initial chapters to verify
    return lessons

print("Base generator script ready.")
