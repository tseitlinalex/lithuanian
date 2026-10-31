# -*- coding: utf-8 -*-
import json

def get_full_21_chapters():
    def mc(q, opts, ans, exp):
        return {"type": "mc", "question": q, "options": opts, "answer": ans, "explanation": exp}

    def fill(q, ans, hint, exp):
        return {"type": "fill", "question": q, "answer": ans, "hint": hint, "explanation": exp}

    chapters = []

    # Include chapters 1 to 5 from part1
    from curriculum_data_part1 import generate_curriculum
    chapters.extend(generate_curriculum())

    # ================= CHAPTER 6 =================
    chapters.append({
        "id": "ch-6",
        "book": 1,
        "chapter": 6,
        "level": "A1.1",
        "title": "Mano sesers vardas yra Lina",
        "title_ru": "Мою сестру зовут Лина",
        "title_en": "My sister's name is Lina",
        "summary_ru": "Родительный падеж принадлежности (Kieno? Чей? Имя сестры, мамы, папы), притяжательные местоимения и степени сравнения прилагательных.",
        "summary_en": "Possessive Genitive (Kieno?), possessive pronouns, and comparison of adjectives.",
        "grammar": [
            {
                "topic": "1. Родительный падеж принадлежности (Kieno? - Чей? Чья? Чьё?)",
                "explanation_ru": "Чтобы сказать, чья это вещь или как кого-то зовут через принадлежность, используется Родительный падеж (Kilmininkas):\n• mano mamos vardas (имя моей мамы, mama → mamos)\n• mano tėčio vardas (имя моего папы, tėtis → tėčio)\n• mano sesers vardas (имя моей сестры, sesuo → sesers)\n• mano brolio vardas (имя моего брата, brolis → brolio)\nВопросительное слово: 'Kieno?' (Чей? Чья? Чьё? Чьи?).",
                "table": [
                    {"lt": "Kieno čia knyga?", "ru": "Чья здесь книга?", "note": "Kieno? (Чей?)"},
                    {"lt": "Čia yra mano sesers knyga.", "ru": "Это книга моей сестры.", "note": "sesuo → sesers"},
                    {"lt": "Mano brolio vardas yra Tomas.", "ru": "Имя моего брата — Томас.", "note": "brolis → brolio"}
                ]
            },
            {
                "topic": "2. Степени сравнения прилагательных (jaunesnis, vyresnis)",
                "explanation_ru": "Сравнительная степень образуется суффиксом -esnis (м.р.) / -esnė (ж.р.):\n• jaunas (молодой) → jaunesnis / jaunesnė (младше)\n• senas (старый) → senesnis / senesnė (старше)\n• didelis (большой) → didesnis / didesnė (больше)\n• mažas (маленький) → mažesnis / mažesnė (меньше)\nДля сравнения с кем-то используется предлог 'už' + Galininkas:\n«Jis yra vyresnis už mane» (Он старше меня).",
                "table": [
                    {"lt": "Aš esu jaunesnis už brolį.", "ru": "Я младше брата.", "note": "už + Galininkas"},
                    {"lt": "Mano sesuo yra vyresnė už mane.", "ru": "Моя сестра старше меня.", "note": "vyresnė (старше)"}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Kieno ši nuotrauka? (Чья эта фотография?)",
                "lines": [
                    {"speaker": "Tomas", "lt": "Kieno ši nuotrauka, Lina?", "ru": "Чья это фотография, Лина?"},
                    {"speaker": "Lina", "lt": "Čia mano šeimos nuotrauka. Štai mano tėtis ir mama.", "ru": "Это фотография моей семьи. Вот мои папа и мама."},
                    {"speaker": "Tomas", "lt": "O koks tavo brolio vardas?", "ru": "А как имя твоего брата?"},
                    {"speaker": "Lina", "lt": "Mano brolio vardas Mantas. Jis yra jaunesnis už mane.", "ru": "Имя моего брата Мантас. Он младше меня."}
                ]
            }
        ],
        "vocabulary": [
            {"word": "Kieno?", "translation": "Чей? Чья? Чьё?", "transcription": "Ке́но?", "category": "Вопрос"},
            {"word": "mano", "translation": "мой / моя / моё", "transcription": "ма́но", "category": "Местоимение"},
            {"word": "tavo", "translation": "твой / твоя / твоё", "transcription": "та́во", "category": "Местоимение"},
            {"word": "jo", "translation": "его", "transcription": "йо", "category": "Местоимение"},
            {"word": "jos", "translation": "её", "transcription": "йос", "category": "Местоимение"},
            {"word": "mūsų", "translation": "наш / наша / наше", "transcription": "му́су", "category": "Местоимение"},
            {"word": "jūsų", "translation": "ваш / ваша / ваше", "transcription": "ю́су", "category": "Местоимение"},
            {"word": "jų", "translation": "их", "transcription": "ю", "category": "Местоимение"},
            {"word": "jaunas", "translation": "молодой", "transcription": "я́унас", "category": "Прилагательное"},
            {"word": "senas", "translation": "старый", "transcription": "ся́нас", "category": "Прилагательное"},
            {"word": "didelis", "translation": "большой", "transcription": "ди́дялис", "category": "Прилагательное"},
            {"word": "mažas", "translation": "маленький", "transcription": "ма́жас", "category": "Прилагательное"},
            {"word": "vyresnis", "translation": "старше", "transcription": "вирясни́с", "category": "Сравнение"},
            {"word": "jaunesnis", "translation": "младше", "transcription": "яунясни́с", "category": "Сравнение"},
            {"word": "už", "translation": "чем / за", "transcription": "уж", "category": "Предлог"}
        ],
        "exercises": [
            mc("Какое вопросительное слово переводится как «Чей / Чья»?", ["Kieno", "Koks", "Kas", "Kur"], "Kieno", "Вопросительное слово принадлежности — Kieno? (Чей?)."),
            fill("Поставьте слово в родительный падеж принадлежности: «Mano ________ vardas yra Lina.» (sesuo - сестры)", "sesers", "sesuo → sesers", "Форма родительного падежа от sesuo — sesers."),
            mc("Как сказать: «Он старше меня»?", ["Jis yra vyresnis už mane.", "Jis yra vyresnis negu aš.", "Jis yra senas už mane.", "Jis yra mažas mane."], "Jis yra vyresnis už mane.", "Конструкция сравнения: vyresnis už + Galininkas (mane)."),
            fill("Вставьте местоимение «его»: «Čia yra ________ brolis.» (его)", "jo", "jo = его", "Местоимение 3 лица мужского рода — 'jo' (его)."),
            mc("Выберите форму родительного падежа от слова mama:", ["mamos", "mamą", "mamoje", "mamai"], "mamos", "Mama в родительном падеже имеет окончание -os: mamos."),
            fill("Вставьте форму: «Mano tėtis yra vyresnis ________ mamą.» (чем / старше мамы)", "už", "Предлог сравнения už", "Предлог 'už' используется для сравнения: vyresnis už mamą.")
        ]
    })

    # ================= CHAPTER 7 =================
    chapters.append({
        "id": "ch-7",
        "book": 1,
        "chapter": 7,
        "level": "A1.1",
        "title": "Labai skanu!",
        "title_ru": "Очень вкусно!",
        "title_en": "Delicious!",
        "summary_ru": "Продукты питания, спряжение глаголов типа -o (valgyti, gerti), винительный vs родительный падеж еды, частичный родительный (Dalies kilmininkas: Imk sūrio!).",
        "summary_en": "Food and drinks, -o type verbs (valgyti, gerti), Accusative vs Genitive of food, partitive Genitive.",
        "grammar": [
            {
                "topic": "1. Спряжение глаголов valgyti (есть) и gerti (пить) — тип -o",
                "explanation_ru": "Глаголы valgyti и gerti в настоящем времени имеют основу на -o:\n• aš valgau / geriu\n• tu valgai / geri\n• jis, ji valgo / geria\n• mes valgome / geriame\n• jūs valgote / geriate\n• jie, jos valgo / geria",
                "table": [
                    {"lt": "aš valgau / geriu", "ru": "я ем / пью", "note": "1 л. ед.ч."},
                    {"lt": "tu valgai / geri", "ru": "ты ешь / пьешь", "note": "2 л. ед.ч."},
                    {"lt": "jis, ji valgo / geria", "ru": "он, она ест / пьет", "note": "3 л."},
                    {"lt": "mes valgome / geriame", "ru": "мы едим / пьем", "note": "1 л. мн.ч."},
                    {"lt": "jūs valgote / geriate", "ru": "вы едите / пьете", "note": "2 л. мн.ч."}
                ]
            },
            {
                "topic": "2. Винительный падеж еды vs Отрицательный родительный",
                "explanation_ru": "В утверждении: ем ЧТО? — винительный падеж (Galininkas):\nAš valgau duoną (Я ем хлеб). Aš geriu arbatą (Я пью чай).\nВ отрицании: не ем ЧЕГО? — родительный падеж (Kilmininkas):\nAš nevalgau duonos (Я не ем хлеба). Aš negeriu arbatos (Я не пью чая).",
                "table": [
                    {"lt": "Aš valgau picą.", "ru": "Я ем пиццу.", "note": "Galininkas (ką?)"},
                    {"lt": "Aš nevalgau picos.", "ru": "Я не ем пиццу.", "note": "Kilmininkas (ko?)"},
                    {"lt": "Aš geriu kavą.", "ru": "Я пью кофе.", "note": "kava → kavą"},
                    {"lt": "Aš negeriu kavos.", "ru": "Я не пью кофе.", "note": "kava → kavos"}
                ]
            },
            {
                "topic": "3. Частичный родительный падеж (Dalies kilmininkas)",
                "explanation_ru": "Когда мы предлагаем угощение или берем часть чего-то, используется родительный падеж (как в русском «выпей чаю, съешь сыру»):\n• Imk sūrio! (Возьми сыра!)\n• Prašom vandens! (Пожалуйста, воды!)",
                "table": [
                    {"lt": "Prašom arbatos!", "ru": "Пожалуйста, чаю!", "note": "arbata → arbatos"},
                    {"lt": "Noriu vandens.", "ru": "Хочу воды.", "note": "vanduo → vandens"}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Pusryčiai (Завтрак)",
                "lines": [
                    {"speaker": "Mantas", "lt": "Ką valgysi pusryčiams, Lina?", "ru": "Что ты будешь есть на завтрак, Лина?"},
                    {"speaker": "Lina", "lt": "Aš valgysiu sumuštinį su sūriu ir gersiu kavą. O tu?", "ru": "Я съем бутерброд с сыром и выпью кофе. А ты?"},
                    {"speaker": "Mantas", "lt": "Aš rytais negeriu kavos. Noriu žalios arbatos.", "ru": "Я по утрам не пью кофе. Хочу зеленого чая."},
                    {"speaker": "Lina", "lt": "Prašom, štai arbata! Labai skanu!", "ru": "Пожалуйста, вот чай! Очень вкусно!"}
                ]
            }
        ],
        "vocabulary": [
            {"word": "valgyti", "translation": "есть / кушать", "transcription": "ва́льгити", "category": "Глагол"},
            {"word": "gerti", "translation": "пить", "transcription": "гя́рти", "category": "Глагол"},
            {"word": "skanu", "translation": "вкусно", "transcription": "скану́", "category": "Наречие"},
            {"word": "Labai skanu!", "translation": "Очень вкусно!", "transcription": "Лаба́й скану́!", "category": "Фраза"},
            {"word": "duona", "translation": "хлеб", "transcription": "ду́она", "category": "Еда"},
            {"word": "sūris", "translation": "сыр", "transcription": "су́рис", "category": "Еда"},
            {"word": "sviestas", "translation": "сливочное масло", "transcription": "све́стас", "category": "Еда"},
            {"word": "mėsa", "translation": "мясо", "transcription": "меса́", "category": "Еда"},
            {"word": "žuvis", "translation": "рыба", "transcription": "жуви́с", "category": "Еда"},
            {"word": "kava", "translation": "кофе", "transcription": "кава́", "category": "Напитки"},
            {"word": "arbata", "translation": "чай", "transcription": "арбата́", "category": "Напитки"},
            {"word": "vanduo", "translation": "вода", "transcription": "вандуо́", "category": "Напитки"},
            {"word": "pienas", "translation": "молоко", "transcription": "пе́нас", "category": "Напитки"},
            {"word": "cukrus", "translation": "сахар", "transcription": "цу́крус", "category": "Еда"},
            {"word": "sumuštinis", "translation": "бутерброд", "transcription": "сумушти́нис", "category": "Еда"}
        ],
        "exercises": [
            mc("Выберите верную форму в отрицании: «Aš negeriu ________.» (kava - кофе)", ["kavos", "kavą", "kava", "kavoje"], "kavos", "При отрицании глагола gerti существительное ставится в родительный падеж (kava → kavos)."),
            fill("Вставьте форму глагола valgyti (1 л. ед.ч.): «Aš ________ duoną ir sūrį.» (ем)", "valgau", "Окончание -au для valgyti", "Форма 1-го лица ед. ч. — 'valgau'."),
            mc("Как правильно предложить угощение: «Возьми сыра!»?", ["Imk sūrio!", "Imk sūris!", "Imk sūrį!", "Imk sūryje!"], "Imk sūrio!", "Частичный родительный падеж требует формы sūrio."),
            fill("Вставьте винительный падеж: «Ryte aš geriu ________.» (arbata - чай)", "arbatą", "arbata → arbatą", "В утверждении используется винительный падеж: arbatą."),
            mc("Что означает фраза «Skanaus!»?", ["Приятного аппетита!", "Доброе утро!", "Спасибо!", "До свидания!"], "Приятного аппетита!", "Skanaus! переводится как «Приятного аппетита!»."),
            fill("Вставьте форму глагола gerti для 'mes': «Mes ________ vandenį.»", "geriame", "Форма для mes", "Для 'mes' глагол gerti имеет форму 'geriame'.")
        ]
    })

    # ================= CHAPTER 8 =================
    chapters.append({
        "id": "ch-8",
        "book": 1,
        "chapter": 8,
        "level": "A1.1",
        "title": "Šiandien eisiu į turgų",
        "title_ru": "Сегодня я пойду на рынок",
        "title_en": "Today I will go to the market",
        "summary_ru": "Покупки на рынке, овощи и фрукты, будущее время глаголов (Būsimasis laikas), родительный падеж множественного числа с числительными (dešimt pomidorų).",
        "summary_en": "Shopping at the market, fruits and vegetables, future tense, plural Genitive with numerals.",
        "grammar": [
            {
                "topic": "1. Будущее время глаголов (Būsimasis laikas)",
                "explanation_ru": "Будущее время в литовском языке образуется очень просто: берется неопределенная форма (инфинитив), убирается окончание -ti, добавляется буква -s- и личные окончания:\n• aš bū-s-iu / ei-s-iu / dirb-s-iu\n• tu bū-s-i / ei-s-i / dirb-s-i\n• jis, ji bū-s / ei-s / dirb-s (в 3-м лице окончания нет, только буква s!)\n• mes bū-s-ime / ei-s-ime\n• jūs bū-s-ite / ei-s-ite\n• jie, jos bū-s / ei-s",
                "table": [
                    {"lt": "aš eisiu / pirksiu", "ru": "я пойду / куплю", "note": "1 л. ед.ч. -siu"},
                    {"lt": "tu eisi / pirksi", "ru": "ты пойдешь / купишь", "note": "2 л. ед.ч. -si"},
                    {"lt": "jis, ji eis / pirks", "ru": "он, она пойдет / купит", "note": "3 л. только -s!"},
                    {"lt": "mes eisime / pirksime", "ru": "мы пойдем / купим", "note": "1 л. мн.ч. -sime"},
                    {"lt": "jūs eisite / pirkite", "ru": "вы пойдете / купите", "note": "2 л. мн.ч. -site"}
                ]
            },
            {
                "topic": "2. Родительный падеж множественного числа с числами (10, 20...)",
                "explanation_ru": "С круглыми десятками (10, 20, 30...) и числами от 11 до 19 существительное ставится в родительный падеж множественного числа (окончание -ų):\n• dešimt pomidorų (десять помидоров, pomidoras → pomidorų)\n• dvidešimt obuolių (двадцать яблок, obuolys → obuolių)\n• kilogramas morkų (килограмм моркови, morkos → morkų).",
                "table": [
                    {"lt": "Prašom duoti dešimt kiaušinių.", "ru": "Пожалуйста, дайте десять яиц.", "note": "kiaušinis → kiaušinių"},
                    {"lt": "Du kilogramai obuolių.", "ru": "Два килограмма яблок.", "note": "obuolys → obuolių"}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Turguje (На рынке)",
                "lines": [
                    {"speaker": "Pirkėjas", "lt": "Laba diena! Kiek kainuoja pomidorai?", "ru": "Добрый день! Сколько стоят помидоры?"},
                    {"speaker": "Pardavėjas", "lt": "Laba diena! Du eurus už kilogramą.", "ru": "Добрый день! Два евро за килограмм."},
                    {"speaker": "Pirkėjas", "lt": "Prašom duoti du kilogramus pomidorų ir kilogramą obuolių.", "ru": "Пожалуйста, дайте два килограмма помидоров и килограмм яблок."},
                    {"speaker": "Pardavėjas", "lt": "Prašom! Ar dar ko nors norėsite?", "ru": "Пожалуйста! Что-нибудь еще пожелаете?"},
                    {"speaker": "Pirkėjas", "lt": "Ne, ačiū, viskas. Kiek iš viso?", "ru": "Нет, спасибо, всё. Сколько всего?"}
                ]
            }
        ],
        "vocabulary": [
            {"word": "turgus", "translation": "рынок", "transcription": "ту́ргус", "category": "Магазин"},
            {"word": "pardavėjas", "translation": "продавец", "transcription": "пардаве́яс", "category": "Профессия"},
            {"word": "pirkėjas", "translation": "покупатель", "transcription": "пирке́яс", "category": "Профессия"},
            {"word": "obuolys", "translation": "яблоко", "transcription": "обули́с", "category": "Фрукты"},
            {"word": "pomidoras", "translation": "помидор", "transcription": "помидо́рас", "category": "Овощи"},
            {"word": "agurkas", "translation": "огурец", "transcription": "агу́ркас", "category": "Овощи"},
            {"word": "morka", "translation": "морковь", "transcription": "мо́рка", "category": "Овощи"},
            {"word": "bulvė", "translation": "картофель", "transcription": "бу́льве", "category": "Овощи"},
            {"word": "kiaušiniai", "translation": "яйца", "transcription": "кяуши́няй", "category": "Еда"},
            {"word": "kilogramas", "translation": "килограмм", "transcription": "килогра́мас", "category": "Мера"},
            {"word": "Kiek kainuoja?", "translation": "Сколько стоит?", "transcription": "Кек кайну́оя?", "category": "Покупки"},
            {"word": "Kiek iš viso?", "translation": "Сколько всего?", "transcription": "Кек иш ви́со?", "category": "Покупки"},
            {"word": "pirkti", "translation": "покупать", "transcription": "пи́ркти", "category": "Глагол"}
        ],
        "exercises": [
            mc("Как сказать в будущем времени: «Завтра я пойду в магазин»?", ["Rytoj aš eisiu į parduotuvę.", "Rytoj aš einu į parduotuvę.", "Rytoj aš ėjau į parduotuvę.", "Rytoj aš eiti į parduotuvę."], "Rytoj aš eisiu į parduotuvę.", "Будущее время для 1 лица ед. ч. образуется суффиксом -siu: eisiu."),
            fill("Вставьте окончание множественного числа родительного падежа: «Prašom duoti dešimt pomidor________.» (-ų)", "ų", "Окончание -ų для родительного падежа множественного числа", "pomidoras во множественном числе родительного падежа: pomidorų."),
            mc("Какая форма 3-го лица будущего времени глагола dirbti (он будет работать)?", ["dirbs", "dirbsi", "dirbsiu", "dirbsime"], "dirbs", "В 3-м лице будущего времени глаголы оканчиваются просто на -s: dirbs."),
            fill("Вставьте вопрос о стоимости: «Kiek ________ šie obuoliai?» (стоят)", "kainuoja", "kainuoti в 3 лице", "Вопрос о цене: 'Kiek kainuoja?' (Сколько стоит?)."),
            mc("Что означает фраза «Kiek iš viso?»?", ["Сколько всего (к оплате)?", "Где выход?", "Кто следующий?", "Сколько времени?"], "Сколько всего (к оплате)?", "'Kiek iš viso?' переводится как 'Сколько всего?'."),
            fill("Поставьте глагол būti в будущее время (мы будем): «Rytoj mes ________ namuose.»", "būsime", "būti для mes в будущем времени", "Форма для mes в будущем времени: 'būsime'.")
        ]
    })

    # ================= CHAPTER 9 =================
    chapters.append({
        "id": "ch-9",
        "book": 1,
        "chapter": 9,
        "level": "A1.1",
        "title": "Norėčiau kavos",
        "title_ru": "Я бы хотел кофе",
        "title_en": "I would like some coffee",
        "summary_ru": "Заказ в кафе и ресторане, сослагательное наклонение (Norėčiau), прошедшее время глаголов (Būtasis kartinis laikas), предлоги su (с + įnagininkas) и be (без + kilmininkas).",
        "summary_en": "Ordering in cafes, conditional mood (norėčiau), past tense, prepositions su and be.",
        "grammar": [
            {
                "topic": "1. Вежливый заказ: Norėčiau (Я бы хотел / хотела)",
                "explanation_ru": "В кафе или ресторане для вежливой просьбы используется форма сослагательного наклонения 'Norėčiau...' (Я бы хотел/хотела) + Родительный падеж (Ko?):\n• Norėčiau kavos (Я бы хотел кофе)\n• Norėčiau arbatos (Я бы хотела чая)\n• Norėčiau sulčių (Я бы хотел сока)\n• Norėčiau meniu (Я бы хотел меню)",
                "table": [
                    {"lt": "Norėčiau kavos su pienu.", "ru": "Я бы хотел кофе с молоком.", "note": "Norėčiau + Kilmininkas"},
                    {"lt": "Norėčiau vandens be dujų.", "ru": "Я бы хотел негазированной воды.", "note": "be dujų (без газа)"}
                ]
            },
            {
                "topic": "2. Предлог su (с) + Творительный (Įnagininkas) и be (без) + Родительный (Kilmininkas)",
                "explanation_ru": "• 'su' переводится 'с' и требует творительного падежа (Kuo?):\nkava su pienu (кофе с молоком), arbata su citrina (чай с лимоном), sumuštinis su sūriu (бутерброд с сыром).\n• 'be' переводится 'без' и требует родительного падежа (Ko?):\nkava be pieno (кофе без молока), arbata be cukraus (чай без сахара).",
                "table": [
                    {"lt": "kava su cukrumi", "ru": "кофе с сахаром", "note": "su + Įnagininkas"},
                    {"lt": "kava be cukraus", "ru": "кофе без сахара", "note": "be + Kilmininkas"}
                ]
            },
            {
                "topic": "3. Прошедшее однократное время (Būtasis kartinis laikas)",
                "explanation_ru": "Прошедшее время показывает действие, произошедшее в прошлом (vakar — вчера, anksčiau — раньше):\nГлагол būti в прошедшем времени: aš buvau (я был), tu buvai (ты был), jis/ji buvo (он/она был/была), mes buvome (мы были), jūs buvote (вы были), jie/jos buvo (они были).",
                "table": [
                    {"lt": "aš buvau / valgiau", "ru": "я был / ел", "note": "1 л. ед.ч."},
                    {"lt": "tu buvai / valgei", "ru": "ты был / ел", "note": "2 л. ед.ч."},
                    {"lt": "jis, ji buvo / valgė", "ru": "он, она был(а) / ел(а)", "note": "3 л."},
                    {"lt": "mes buvome / valgėme", "ru": "мы были / ели", "note": "1 л. мн.ч."}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Kavinėje (В кафе)",
                "lines": [
                    {"speaker": "Padavėjas", "lt": "Laba diena! Ką norėsite užsisakyti?", "ru": "Добрый день! Что пожелаете заказать?"},
                    {"speaker": "Klientas", "lt": "Laba diena! Norėčiau juodos kavos be cukraus ir obuolių pyrago.", "ru": "Добрый день! Я бы хотел черный кофе без сахара и яблочный пирог."},
                    {"speaker": "Padavėjas", "lt": "Ar norėsite vandens?", "ru": "Пожелаете воды?"},
                    {"speaker": "Klientas", "lt": "Taip, prašom stiklinę mineralinio vandens su citrina.", "ru": "Да, пожалуйста, стакан минеральной воды с лимоном."},
                    {"speaker": "Padavėjas", "lt": "Tuojau atnešiu!", "ru": "Сейчас принесу!"}
                ]
            }
        ],
        "vocabulary": [
            {"word": "Norėčiau", "translation": "Я хотел(а) бы", "transcription": "Норе́чяу", "category": "Заказ"},
            {"word": "kavinė", "translation": "кафе", "transcription": "кавине́", "category": "Место"},
            {"word": "restoranas", "translation": "ресторан", "transcription": "рястора́нас", "category": "Место"},
            {"word": "padavėjas", "translation": "официант", "transcription": "падаве́яс", "category": "Профессия"},
            {"word": "meniu", "translation": "меню", "transcription": "меню́", "category": "Ресторан"},
            {"word": "sąskaita", "translation": "счет", "transcription": "са́скайта", "category": "Ресторан"},
            {"word": "su", "translation": "с", "transcription": "су", "category": "Предлог"},
            {"word": "be", "translation": "без", "transcription": "бя", "category": "Предлог"},
            {"word": "pienas", "translation": "молоко", "transcription": "пе́нас", "category": "Напитки"},
            {"word": "cukrus", "translation": "сахар", "transcription": "цу́крус", "category": "Еда"},
            {"word": "citrina", "translation": "лимон", "transcription": "цитрина́", "category": "Еда"},
            {"word": "pyragas", "translation": "пирог / торт", "transcription": "пира́гас", "category": "Еда"},
            {"word": "vakar", "translation": "вчера", "transcription": "ва́кар", "category": "Время"},
            {"word": "buvau", "translation": "я был / была", "transcription": "бува́у", "category": "Глагол"}
        ],
        "exercises": [
            mc("Как вежливо сказать официанту: «Я бы хотел кофе с молоком»?", ["Norėčiau kavos su pienu.", "Noriu kava ir pienas.", "Valgysiu kavą be pieno.", "Geriu kavoje su pienu."], "Norėčiau kavos su pienu.", "Norėčiau требует родительного падежа (kavos), а предлог su — творительного (pienu)."),
            fill("Вставьте предлог «без»: «Prašom kavos ________ cukraus.» (без)", "be", "Предлог 'без'", "Предлог 'be' (без) требует родительного падежа (cukraus)."),
            mc("Какая форма прошедшего времени глагола būti подходит для 'aš' (вчера я был)?", ["buvau", "buvai", "buvo", "buvome"], "buvau", "Для 1 лица ед. ч. прошедшего времени форма глагола būti — 'buvau'."),
            fill("Как попросить счёт в ресторане: «Prašom ________.» (счет)", "sąskaitą", "sąskaita в винительном падеже", "Вежливая фраза: 'Prašom sąskaitą!' (Пожалуйста, счет!)."),
            mc("Какое окончание получает слово citrina с предлогом su (с лимоном)?", ["citrina", "citrinos", "citrina", "citriną"], "citrina", "Слово женского рода на -a в творительном падеже имеет окончание -a: arbata su citrina."),
            fill("Поставьте глагол būti в прошедшее время: «Vakar mes ________ kavinėje.» (были)", "buvome", "būti для mes в прошлом времени", "Для 'mes' форма прошедшего времени — 'buvome'.")
        ]
    })

    # ================= CHAPTER 10 =================
    chapters.append({
        "id": "ch-10",
        "book": 2,
        "chapter": 10,
        "level": "A1.2",
        "title": "Kaip nuvažiuoti į universitetą?",
        "title_ru": "Как доехать до университета?",
        "title_en": "How to get to the university?",
        "summary_ru": "Городской транспорт, ориентирование в городе, творительный падеж средства передвижения (Įnagininkas: važiuoti autobusu), порядковые числительные и глагол reikia.",
        "summary_en": "Public transport, city navigation, Instrumental case for transport, ordinal numbers, and the verb reikia.",
        "grammar": [
            {
                "topic": "1. Творительный падеж транспорта (Priemonės įnagininkas)",
                "explanation_ru": "Чтобы сказать, на чем вы едете, в литовском языке используется творительный падеж (Įnagininkas - Kuo?) БЕЗ всяких предлогов:\n• autobusas → važiuoju autobusu (еду на автобусе)\n• troleibusas → važiuoju troleibusu (еду на троллейбусе)\n• automobilis / mašina → važiuoju automobiliu / mašina (еду на машине)\n• traukinys → važiuoju traukiniu (еду на поезде)\n• dviratis → važiuoju dviračiu (еду на велосипеде)\n• pėsčiomis → einu pėsčiomis (иду пешком).",
                "table": [
                    {"lt": "važiuoju autobusu", "ru": "еду автобусом (на автобусе)", "note": "autobusas → autobusu"},
                    {"lt": "važiuoju automobiliu", "ru": "еду на автомобиле", "note": "automobilis → automobiliu"},
                    {"lt": "važiuoju antru troleibusu", "ru": "еду на втором троллейбусе", "note": "antras → antru"}
                ]
            },
            {
                "topic": "2. Глагол reikia (нужно / надо) с инфинитивом",
                "explanation_ru": "Конструкция 'reikia + инфинитив' указывает на необходимость:\n• Reikia važiuoti antru troleibusu (Нужно ехать на втором троллейбусе).\n• Reikia pasukti į dešinę (Нужно повернуть направо).\n• Reikia eiti tiesiai (Нужно идти прямо).",
                "table": [
                    {"lt": "Kaip nuvažiuoti į stotį?", "ru": "Как доехать до вокзала?", "note": "Вопрос"},
                    {"lt": "Reikia persėsti.", "ru": "Нужно сделать пересадку.", "note": "reikia + veiksmažodis"}
                ]
            }
        ],
        "dialogues": [
            {
                "title": "Viešajame transporte (В общественном транспорте)",
                "lines": [
                    {"speaker": "Keleivis", "lt": "Atsiprašau, ar trečias troleibusas važiuoja į stotį?", "ru": "Простите, третий троллейбус идет до вокзала?"},
                    {"speaker": "Praeivis", "lt": "Ne, trečias važiuoja į centrą. Į stotį važiuoja septintas troleibusas.", "ru": "Нет, третий идет в центр. До вокзала идет седьмой троллейбус."},
                    {"speaker": "Keleivis", "lt": "Kur yra stotelė?", "ru": "Где находится остановка?"},
                    {"speaker": "Praeivis", "lt": "Stotelė yra ten, už kampo. Reikia paeiti tiesiai ir pasukti į kairę.", "ru": "Остановка там, за углом. Нужно пройти прямо и повернуть налево."},
                    {"speaker": "Keleivis", "lt": "Labai ačiū!", "ru": "Большое спасибо!"}
                ]
            }
        ],
        "vocabulary": [
            {"word": "Kaip nuvažiuoti?", "translation": "Как доехать?", "transcription": "Кайп нуважю́оти?", "category": "Транспорт"},
            {"word": "Kaip nueiti?", "translation": "Как дойти?", "transcription": "Кайп нуэ́йти?", "category": "Транспорт"},
            {"word": "autobusas", "translation": "автобус", "transcription": "ауто́бусас", "category": "Транспорт"},
            {"word": "troleibusas", "translation": "троллейбус", "transcription": "троле́йбусас", "category": "Транспорт"},
            {"word": "traukinys", "translation": "поезд", "transcription": "траукини́с", "category": "Транспорт"},
            {"word": "automobilis", "translation": "автомобиль", "transcription": "аутомоби́лис", "category": "Транспорт"},
            {"word": "dviratis", "translation": "велосипед", "transcription": "дви́ратис", "category": "Транспорт"},
            {"word": "stotelė", "translation": "остановка", "transcription": "стотяле́", "category": "Транспорт"},
            {"word": "bilietas", "translation": "билет", "transcription": "биле́тас", "category": "Транспорт"},
            {"word": "tiesiai", "translation": "прямо", "transcription": "тесе́й", "category": "Направление"},
            {"word": "į kairę", "translation": "налево", "transcription": "и кайре́", "category": "Направление"},
            {"word": "į dešinę", "translation": "направо", "transcription": "и дя́шине", "category": "Направление"},
            {"word": "reikia", "translation": "надо / нужно", "transcription": "ре́йкя", "category": "Слово"}
        ],
        "exercises": [
            mc("Как правильно сказать: «Я еду на работу на автобусе»?", ["Į darbą važiuoju autobusu.", "Į darbą važiuoju ant autobuso.", "Į darbą važiuoju autobuse.", "Į darbą važiuoju autobusą."], "Į darbą važiuoju autobusu.", "Транспортное средство используется в творительном падеже без предлога: autobusu."),
            fill("Поставьте слово traukinys в форму творительного падежа: «Mes važiuojame ________.» (поездом)", "traukiniu", "traukinys → traukiniu", "Существительное traukinys в творительном падеже: traukiniu."),
            mc("Что означает фраза: «Reikia pasukti į kairę»?", ["Нужно повернуть налево", "Нужно повернуть направо", "Нужно идти прямо", "Нужно остановиться"], "Нужно повернуть налево", "'į kairę' переводится 'налево' ('į dešinę' — направо)."),
            fill("Вставьте слово «нужно»: «Į centrą ________ važiuoti ketvirtu autobusu.» (нужно)", "reikia", "Слово 'надо/нужно'", "Безличная форма необходимости — 'reikia'."),
            mc("Каким номером троллейбуса вы едете: «Važiuoju ________ troleibusu.» (antras - вторым)?", ["antru", "antras", "antrame", "antrą"], "antru", "Порядковое числительное согласуется в творительном падеже: antru troleibusu."),
            fill("Вставьте направление: «Eikite ________ ir pamatysite stotį.» (прямо)", "tiesiai", "Прямо по-литовски", "'tiesiai' означает 'прямо'.")
        ]
    })

    # Generate remaining chapters (11 to 21)
    ch_configs = [
        (11, "Geros kelionės!", "Счастливого пути!", "Have a nice trip!",
         "Автосервис, аренда автомобиля, заправка, предлог po + Kilmininkas (через / после), дательный падеж времени (parai - на сутки).",
         [
             {"topic": "1. Предлог po (после / через) + Kilmininkas", "explanation_ru": "Предлог 'po' в значении времени требует родительного падежа: po darbo (после работы), po penkių minučių (через пять минут), po valandos (через час).", "table": [{"lt": "Būsiu po valandos.", "ru": "Буду через час.", "note": "valanda → valandos"}]},
             {"topic": "2. Дательный падеж назначения (Naudininkas)", "explanation_ru": "Когда мы говорим о сроке, на который что-то арендуем или берем: kaina parai (цена за сутки), nuoma dviem paroms (аренда на двое суток).", "table": [{"lt": "Kokia kaina parai?", "ru": "Какова цена за сутки?", "note": "para → parai"}]}
         ],
         [{"word": "kelionė", "translation": "путешествие / поездка"}, {"word": "degalinė", "translation": "заправка"}, {"word": "degalai", "translation": "топливо / бензин"}, {"word": "nuoma", "translation": "аренда"}, {"word": "para", "translation": "сутки"}, {"word": "po", "translation": "после / через"}],
         [mc("Как сказать: «Буду через пять минут»?", ["Būsiu po penkių minučių.", "Būsiu per penkios minutės.", "Būsiu po penkios minutės.", "Būsiu po penkioms minutėms."], "Būsiu po penkių minučių.", "Предлог po требует родительного падежа: po penkių minučių."),
          fill("Вставьте предлог «после / через»: «Susitiksime ________ darbo.» (после)", "po", "Предлог po", "po darbo = после работы.")]),

        (12, "Koks jaukus butas!", "Какая уютная квартира!", "What a cozy apartment!",
         "Аренда жилья, мебель, комнаты, конструкция yra + Vardininkas / nėra + Kilmininkas, предлог ant + Kilmininkas.",
         [
             {"topic": "1. Есть и нет в доме: Yra vs Nėra", "explanation_ru": "В утверждении: Namuose yra internetas (Дома есть интернет - именительный). В отрицании: Namuose nėra interneto (Дома нет интернета - родительный).", "table": [{"lt": "Yra balkonas.", "ru": "Есть балкон.", "note": "Vardininkas"}, {"lt": "Nėra balkono.", "ru": "Нет балкона.", "note": "Kilmininkas"}]},
             {"topic": "2. Предлог ant (на) + Kilmininkas", "explanation_ru": "Предлог 'ant' (на поверхности) требует родительного падежа: knyga ant stalo (книга на столе, stalas → stalo).", "table": [{"lt": "Knyga yra ant stalo.", "ru": "Книга на столе.", "note": "ant stalo"}]}
         ],
         [{"word": "butas", "translation": "квартира"}, {"word": "kambarys", "translation": "комната"}, {"word": "virtuvė", "translation": "кухня"}, {"word": "vonia", "translation": "ванная"}, {"word": "stalas", "translation": "стол"}, {"word": "kėdė", "translation": "стул"}, {"word": "sofa", "translation": "диван"}, {"word": "lova", "translation": "кровать"}],
         [mc("Как сказать «Книга на столе»?", ["Knyga yra ant stalo.", "Knyga yra ant stalas.", "Knyga yra staloje.", "Knyga yra prie stalą."], "Knyga yra ant stalo.", "Предлог 'ant' требует родительного падежа: ant stalo."),
          fill("Вставьте отрицание: «Čia nėra ________.» (internetas - интернета)", "interneto", "internetas → interneto", "Слово nėra требует родительного падежа: interneto.")]),

        (13, "Reikia meistro!", "Нужен мастер!", "A repairman is needed!",
         "Бытовые поломки, вызов мастера, бытовая техника, глаголы ремонта с винительным падежом (pataisyti šaldytuvą), предлог nuo + Kilmininkas.",
         [
             {"topic": "1. Глаголы ремонта и уборки + Galininkas", "explanation_ru": "Глаголы pataisyti (починить), sutvarkyti (убрать/навести порядок) требуют винительного падежа: Reikia pataisyti šaldytuvą (Нужно починить холодильник).", "table": [{"lt": "pataisyti skalbimo mašiną", "ru": "починить стиральную машину", "note": "Galininkas"}]}
         ],
         [{"word": "meistras", "translation": "мастер"}, {"word": "šaldytuvas", "translation": "холодильник"}, {"word": "skalbimo mašina", "translation": "стиральная машина"}, {"word": "viryklė", "translation": "плита"}, {"word": "pataisyti", "translation": "починить"}, {"word": "sutvarkyti", "translation": "привести в порядок"}],
         [mc("Как сказать: «Нужно починить холодильник»?", ["Reikia pataisyti šaldytuvą.", "Reikia pataisyti šaldytuvo.", "Reikia pataisyti šaldytuve.", "Reikia meistras."], "Reikia pataisyti šaldytuvą.", "Глагол pataisyti требует винительного падежа: šaldytuvą."),
          fill("Вставьте слово «мастер»: «Man skubiai reikia ________.» (meistras - мастера)", "meistro", "reikia + Kilmininkas", "С глаголом reikia сущ. стоит в родительном падеже: meistro.")]),

        (14, "Važiuojame apsipirkti?", "Едем за покупками?", "Going shopping?",
         "Одежда, обувь, цвета, материалы, глагол tinka (подходит) с дательным падежом (Man tinka šis kostiumas).",
         [
             {"topic": "1. Глагол tinka (подходить кому-то)", "explanation_ru": "Глагол tinka требует дательного падежа (Naudininkas - Kam?):\n• Man tinka (Мне подходит)\n• Tau tinka (Тебе подходит)\n• Jums tinka (Вам подходит)\n«Ši suknelė tau labai tinka!» (Это платье тебе очень идёт!).", "table": [{"lt": "Man netinka juoda spalva.", "ru": "Мне не подходит черный цвет.", "note": "Man (мне)"}]}
         ],
         [{"word": "drabužiai", "translation": "одежда"}, {"word": "batai", "translation": "обувь / ботинки"}, {"word": "suknelė", "translation": "платье"}, {"word": "kelnės", "translation": "брюки"}, {"word": "marškiniai", "translation": "рубашка"}, {"word": "tinka", "translation": "подходит / к лицу"}],
         [mc("Как сказать «Тебе очень подходит это платье»?", ["Tau labai tinka ši suknelė.", "Tu labai tinka šį suknelę.", "Tave tinka suknelė.", "Tau tikti suknelėje."], "Tau labai tinka ši suknelė.", "Глагол tinka согласуется с дательным местоимением 'tau'."),
          fill("Вставьте местоимение «мне»: «________ netinka šie batai.» (Мне не подходят эти ботинки)", "Man", "Дательный падеж 'мне'", "Дательный падеж от 'aš' — 'Man'.")]),

        (15, "Kada galėsiu atsiimti?", "Когда я смогу забрать?", "When can I pick it up?",
         "Возврат и обмен товаров, ремонт одежды, сравнительная степень прилагательных (didesnis, mažesnis), измерение в сантиметрах.",
         [
             {"topic": "1. Сравнительная степень (didesnis, mažesnis)", "explanation_ru": "Для одежды часто требуются размеры: Man reikia didesnio megztinio (Мне нужен свитер побольше), mažesnių batų (ботинки поменьше).", "table": [{"lt": "Reikia didesnio dydžio.", "ru": "Нужен больший размер.", "note": "didesnis"}]}
         ],
         [{"word": "atsiimti", "translation": "забрать"}, {"word": "grąžinti", "translation": "вернуть"}, {"word": "pakeisti", "translation": "поменять / обменять"}, {"word": "dydis", "translation": "размер"}, {"word": "didesnis", "translation": "побольше / больший"}, {"word": "mažesnis", "translation": "поменьше / меньший"}],
         [mc("Что означает фраза: «Noriu pakeisti prekę»?", ["Хочу обменять товар", "Хочу купить товар", "Где касса?", "Сколько стоит?"], "Хочу обменять товар", "'Pakeisti prekę' переводится как обменять товар."),
          fill("Вставьте слово «больший»: «Man reikia ________ megztinio.» (didesnis - побольше)", "didesnio", "родительный падеж didesnis", "Reikia требует родительного падежа: didesnio.")]),

        (16, "Kada dirba šeimos gydytojas?", "Когда принимает семейный врач?", "When is the family doctor working?",
         "У врача, части тела, самочувствие, конструкция skauda (болит + Galininkas: Man skauda galvą), возраст в дательном падеже.",
         [
             {"topic": "1. Конструкция Man skauda (У меня болит)", "explanation_ru": "В литовском языке то, ЧТО болит, стоит в ВИНИТЕЛЬНОМ падеже (Galininkas):\n• Man skauda galvą (У меня болит голова, galva → galvą)\n• Man skauda gerklę (У меня болит горло)\n• Man skauda dantį (У меня болит зуб)\nВ отрицании — родительный падеж:\n• Man neskauda galvos (У меня не болит голова).", "table": [{"lt": "Man skauda galvą.", "ru": "У меня болит голова.", "note": "galva → galvą"}, {"lt": "Man neskauda galvos.", "ru": "У меня не болит голова.", "note": "galva → galvos"}]}
         ],
         [{"word": "gydytojas", "translation": "врач / доктор"}, {"word": "skauda", "translation": "болит"}, {"word": "galva", "translation": "голова"}, {"word": "gerklė", "translation": "горло"}, {"word": "dantis", "translation": "зуб"}, {"word": "temperatūra", "translation": "температура"}, {"word": "vaistai", "translation": "лекарства"}],
         [mc("Как сказать: «У меня болит голова»?", ["Man skauda galvą.", "Man skauda galva.", "Aš skauda galvą.", "Man skauda galvos."], "Man skauda galvą.", "Конструкция 'Man skauda' требует винительного падежа (galva → galvą)."),
          fill("Вставьте форму в отрицании: «Man neskauda ________.» (galva - головы)", "galvos", "Родительный падеж galva → galvos", "Отрицание neskauda требует родительного падежа: galvos.")]),

        (17, "Prašom duoti vaistų nuo skausmo!", "Дайте, пожалуйста, лекарство от боли!", "Please give me painkillers!",
         "В аптеке, симптомы, болезни, глагол sirgti (болеть + įnagininkas: sergu gripu), аллергия (alergiškas medui).",
         [
             {"topic": "1. Глагол sirgti (болеть чем-то) + Įnagininkas", "explanation_ru": "Глагол sirgti требует творительного падежа (Kuo?):\n• Sergu gripu (Болею гриппом)\n• Sergu bronchitu (Болею бронхитом)\nЛекарства 'ОТ чего-то': vaistai NUO + Kilmininkas (vaistai nuo skausmo - лекарство от боли).", "table": [{"lt": "sergu gripu", "ru": "болею гриппом", "note": "gripas → gripu"}, {"lt": "vaistai nuo temperatūros", "ru": "лекарство от температуры", "note": "nuo + Kilmininkas"}]}
         ],
         [{"word": "vaistinė", "translation": "аптека"}, {"word": "vaistai", "translation": "лекарства"}, {"word": "receptas", "translation": "рецепт"}, {"word": "skausmas", "translation": "боль"}, {"word": "sirgti", "translation": "болеть"}, {"word": "gripas", "translation": "грипп"}],
         [mc("Как сказать «Я болею гриппом»?", ["Aš sergu gripu.", "Aš sergu gripas.", "Aš sergu į gripą.", "Man yra gripas."], "Aš sergu gripu.", "Глагол sirgti требует творительного падежа: gripu."),
          fill("Вставьте предлог «от боли»: «Prašom duoti vaistų ________ skausmo.» (от)", "nuo", "Предлог 'nuo' (от)", "Предлог nuo требует родительного падежа: nuo skausmo.")]),

        (18, "Kur jūs dirbate?", "Где вы работаете?", "Where do you work?",
         "Профессии, рабочее место, график работы (nuo ... iki ...), рабочее время (komandiruotėje būsiu dvi dienas).",
         [
             {"topic": "1. График работы: nuo (от) ... iki (до) ... + Kilmininkas", "explanation_ru": "Время работы выражается конструкцией nuo ... iki + Kilmininkas:\n• Dirbu nuo aštuntos iki penktos valandos (Работаю с восьми до пяти часов).", "table": [{"lt": "Dirbu nuo 9 iki 18 valandos.", "ru": "Работаю с 9 до 18 часов.", "note": "nuo ... iki"}]}
         ],
         [{"word": "darbas", "translation": "работа"}, {"word": "biuras", "translation": "офис"}, {"word": "įmonė", "translation": "компания / предприятие"}, {"word": "direktorius", "translation": "директор"}, {"word": "kolega", "translation": "коллега"}, {"word": "nuo", "translation": "от / с"}, {"word": "iki", "translation": "до"}],
         [mc("Как сказать: «Я работаю с девяти до шести часов»?", ["Dirbu nuo devintos iki šeštos valandos.", "Dirbu nuo devynios iki šešios.", "Dirbu devintą ir šeštą.", "Dirbu apie devintą valandą."], "Dirbu nuo devintos iki šeštos valandos.", "Конструкция времени: nuo ... iki + родительный падеж."),
          fill("Вставьте предлог «до»: «Parduotuvė dirba nuo aštuonių ________ dešimtos valandos.» (до)", "iki", "Предлог iki", "nuo ... iki = от ... до.")]),

        (19, "Ką tu studijuoji?", "Что ты изучаешь?", "What do you study?",
         "Учёба, университет, студенческая жизнь, спряжение возвратного глагола mokytis (учиться), аудитории (dvidešimt antroje auditorijoje).",
         [
             {"topic": "1. Возвратный глагол mokytis (учиться чему-то)", "explanation_ru": "Глагол mokytis требует родительного падежа предмета обучения (Ko?):\n• Aš mokausi lietuvių kalbos (Я учу литовский язык)\n• Mes mokomės universitete (Мы учимся в университете).", "table": [{"lt": "Aš mokausi lietuvių kalbos.", "ru": "Я учу литовский язык.", "note": "mokytis + Kilmininkas"}]}
         ],
         [{"word": "studijuoti", "translation": "изучать / учиться в вузе"}, {"word": "mokytis", "translation": "учиться"}, {"word": "paskaita", "translation": "лекция"}, {"word": "egzaminas", "translation": "экзамен"}, {"word": "auditorija", "translation": "аудитория"}, {"word": "knyga", "translation": "книга"}],
         [mc("Что требует глагол mokytis в предложении «Aš mokausi ________ kalbos»?", ["lietuvių", "lietuviškai", "lietuvis", "lietuvių kalbą"], "lietuvių", "Mokytis требует родительного падежа: lietuvių kalbos."),
          fill("Вставьте форму глагола mokytis (1 л. ед.ч.): «Aš ________ universitete.» (учусь)", "mokausi", "1 л. ед.ч. mokytis", "Форма 1-го лица ед. ч. — 'mokausi'.")]),

        (20, "Ką mėgsti veikti laisvalaikiu?", "Чем ты любишь заниматься в свободное время?", "What do you like to do in your free time?",
         "Хобби, спорт, музыкальные инструменты (groti pianinu - на пианино), времена года, глаголы mėgti, patikti, mokėti.",
         [
             {"topic": "1. Глаголы mėgti (любить) и mokėti (уметь) с инфинитивом", "explanation_ru": "• Aš mėgstu skaityti knygas (Я люблю читать книги)\n• Aš moku plaukti (Я умею плавать)\n• Aš nemoku slidinėti (Я не умею кататься на лыжах)\nИнструменты: groti + творительный падеж (groti gitara - играть на гитаре, groti pianinu - играть на пианино).", "table": [{"lt": "Aš mėgstu sportuoti.", "ru": "Я люблю заниматься спортом.", "note": "mėgti + bendratis"}, {"lt": "Jis groja gitara.", "ru": "Он играет на гитаре.", "note": "groti + Įnagininkas"}]}
         ],
         [{"word": "laisvalaikis", "translation": "свободное время / досуг"}, {"word": "mėgti", "translation": "любить / нравиться"}, {"word": "sportuoti", "translation": "заниматься спортом"}, {"word": "keliauti", "translation": "путешествовать"}, {"word": "skaityti", "translation": "читать"}, {"word": "žiūrėti filmą", "translation": "смотреть фильм"}, {"word": "groti", "translation": "играть (на инструменте)"}],
         [mc("Как сказать: «Он играет на гитаре»?", ["Jis groja gitara.", "Jis groja gitarą.", "Jis groja ant gitaros.", "Jis groti gitaroje."], "Jis groja gitara.", "Глагол groti требует творительного падежа без предлога: gitara."),
          fill("Вставьте форму глагола mėgti (1 л. ед.ч.): «Aš labai ________ keliauti.» (люблю)", "mėgstu", "mėgti для aš", "Форма для 'aš' — 'mėgstu'.")]),

        (21, "Su gimtadieniu!", "С днем рождения!", "Happy Birthday!",
         "Праздники, поздравления, выражение дат (kovo aštuntą dieną), пожелания с родительным падежом (Linkiu laimės ir sveikatos!), подарки.",
         [
             {"topic": "1. Пожелания: Linkiu (Желаю) + Kilmininkas", "explanation_ru": "Глагол linkėti ВСЕГДА требует родительного падежа того, чего вы желаете:\n• Linkiu laimės (Желаю счастья, laimė → laimės)\n• Linkiu sveikatos (Желаю здоровья, sveikata → sveikatos)\n• Linkiu sėkmės (Желаю удачи, sėkmė → sėkmės!).\nБлагодарность: Ačiū už + Galininkas (Ačiū už dovaną! - Спасибо за подарок!).", "table": [{"lt": "Su gimtadieniu!", "ru": "С днем рождения!", "note": "Поздравление"}, {"lt": "Linkiu sėkmės ir laimės!", "ru": "Желаю удачи и счастья!", "note": "Linkėti + Kilmininkas"}, {"lt": "Ačiū už dovaną!", "ru": "Спасибо за подарок!", "note": "už + Galininkas"}]}
         ],
         [{"word": "gimtadienis", "translation": "день рождения"}, {"word": "šventė", "translation": "праздник"}, {"word": "dovana", "translation": "подарок"}, {"word": "sveikinti", "translation": "поздравлять"}, {"word": "linkėti", "translation": "желать"}, {"word": "laimė", "translation": "счастье"}, {"word": "sveikata", "translation": "здоровье"}, {"word": "sėkmė", "translation": "удача / успех"}],
         [mc("Как правильно пожелать удачи на литовском языке?", ["Linkiu sėkmės!", "Linkiu sėkmė!", "Linkiu sėkme!", "Linkėti sėkmę!"], "Linkiu sėkmės!", "Глагол linkėti требует родительного падежа: sėkmės!"),
          fill("Вставьте предлог «за»: «Ačiū ________ gražią dovaną!» (за)", "už", "Предлог už", "Ačiū už + Galininkas = Спасибо за..."),
          mc("Что означает фраза: «Su gimtadieniu!»?", ["С днем рождения!", "С Новым годом!", "Приятного аппетита!", "Счастливого пути!"], "С днем рождения!", "Su gimtadieniu! = С днем рождения!"),
          fill("Вставьте родительный падеж слова sveikata (здоровья): «Linkiu laimės ir ________!»", "sveikatos", "sveikata → sveikatos", "После linkiu существительное стоит в родительном падеже: sveikatos.")])
    ]

    for ch_num, title, title_ru, title_en, summ_ru, gram_list, vocab_list, exercises_list in ch_configs:
        # Add basic dialogue
        dial = [
            {
                "title": f"Pokalbis: {title} (Диалог по теме)",
                "lines": [
                    {"speaker": "Agnė", "lt": f"Labas! Šiandien mokomės temą: {title}.", "ru": f"Привет! Сегодня учим тему: {title_ru}."},
                    {"speaker": "Tomas", "lt": "Puiku! Man labai patinka ši tema.", "ru": "Отлично! Мне очень нравится эта тема."}
                ]
            }
        ]
        # Enrich vocab with category
        rich_vocab = []
        for v in vocab_list:
            rich_vocab.append({
                "word": v["word"],
                "translation": v["translation"],
                "category": "Словарь главы"
            })
        chapters.append({
            "id": f"ch-{ch_num}",
            "book": 2,
            "chapter": ch_num,
            "level": "A1.2",
            "title": title,
            "title_ru": title_ru,
            "title_en": title_en,
            "summary_ru": summ_ru,
            "summary_en": title_en,
            "grammar": gram_list,
            "dialogues": dial,
            "vocabulary": rich_vocab,
            "exercises": exercises_list
        })

    return chapters

if __name__ == '__main__':
    all_ch = get_full_21_chapters()
    with open('src/data/lessonsData.json', 'w', encoding='utf-8') as f:
        json.dump(all_ch, f, ensure_ascii=False, indent=2)
    print(f"Successfully generated {len(all_ch)} enriched chapters in lessonsData.json!")
