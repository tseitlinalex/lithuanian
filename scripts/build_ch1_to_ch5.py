# -*- coding: utf-8 -*-
from generate_complete_exercises_all_21 import mc, fill

# ================= CHAPTER 1 =================
ch1_exercises = [
    mc("Parašykite pagal pavyzdį: «studentė» → ...", ["ji", "jis", "jie", "jos"], "ji", "Существительное 'studentė' женского рода ед. ч., заменяется местоимением 'ji' (она)."),
    mc("Parašykite pagal pavyzdį: «studentas ir studentė» → ...", ["jie", "jos", "mes", "jūs"], "jie", "Смешанная группа мужского и женского рода во множественном числе — 'jie' (они)."),
    mc("Parašykite pagal pavyzdį: «Marija ir Lina» → ...", ["jos", "jie", "mes", "ji"], "jos", "Группа лиц женского рода во множественном числе обозначается местоимением 'jos' (они)."),
    mc("Parašykite pagal pavyzdį: «aš ir tu» → ...", ["mes", "jūs", "jie", "jos"], "mes", "«Я и ты» объединяются в форму 1 лица множественного числа — 'mes' (мы)."),
    mc("Parašykite pagal pavyzdį: «dėstytojas ir studentas» → ...", ["jie", "jis", "jos", "mes"], "jie", "Лица мужского рода во множественном числе обозначаются 'jie' (они)."),
    mc("Parašykite pagal pavyzdį: «jis ir ji» → ...", ["jie", "jos", "mes", "jūs"], "jie", "Он и она вместе — 'jie' (они)."),
    fill("Įrašykite tinkamą žodį: «Ar ________ esate Paulius?»", "jūs", "Местоимение для esate", "С формой 'esate' согласуется местоимение 'jūs'.", ["Jūs"]),
    fill("Įrašykite tinkamą žodį: «________ esame čia.»", "Mes", "Местоимение для esame", "С глаголом 'esame' (1 лицо мн. ч.) согласуется местоимение 'mes' (мы).", ["mes"]),
    fill("Įrašykite tinkamą žodį: «________ yra švedas.»", "jis", "Местоимение м.р.", "Слово 'švedas' мужского рода, подлежащее — 'jis' (он).", ["Jis"]),
    fill("Įrašykite tinkamą žodį: «________ esu studentė.»", "Aš", "Местоимение для esu", "С глагольной формой 'esu' (1 лицо ед. ч.) согласуется местоимение 'aš' (я).", ["aš"]),
    fill("Įrašykite tinkamą žodį: «Čia yra Marija. ________ yra ispanė.»", "Ji", "Местоимение ж.р.", "Marija — лицо женского рода, местоимение 'ji' (она).", ["ji"]),
    fill("Įrašykite būti formą: «Ar jūs ________ Kristina?»", "esate", "Форма būti для jūs", "Для 'jūs' формой глагола būti в настоящем времени является 'esate'."),
    fill("Įrašykite būti formą: «Ar tu ________ studentas?»", "esi", "Форма būti для tu", "Для 'tu' форма глагола būti — 'esi'."),
    fill("Įrašykite būti formą: «Ji ________ studentė, o aš – dėstytoja.»", "yra", "Форма būti для ji", "Для 3-го лица (jis, ji, jie, jos) форма глагола būti — 'yra'."),
    fill("Įrašykite tinkamą formą: «Tomas ________ anglas, jis – vokietis.»", "nėra", "Отрицание (не является)", "Отрицательная форма глагола būti в 3-м лице — 'nėra'."),
    fill("– Ar tu esi vokietis? – Ne, ________ nesu vokietis.", "aš", "Подлежащее для nesu", "С глаголом 'nesu' согласуется местоимение 1 лица 'aš' (я).", ["Aš"]),
    fill("– Ar Paulius yra latvis? – Ne, ________ nėra latvis.", "jis", "Местоимение для Paulius", "Paulius заменяется местоимением мужского рода 'jis' (он).", ["Jis"]),
    fill("– Ar Andrius yra dėstytojas? – Ne, ________ nėra dėstytojas.", "jis", "Местоимение для Andrius", "Andrius заменяется местоимением 'jis' (он).", ["Jis"]),
    fill("– Ar jūs esate dėstytoja? – Ne, ________ nesu dėstytoja.", "aš", "Ответ от себя", "Ответ от первого лица ед. ч. — 'aš nesu'.", ["Aš"]),
    fill("– Ar Lina yra studentė? – Ne, ________ nėra studentė.", "ji", "Местоимение для Lina", "Lina — женский род, заменяется на 'ji' (она).", ["Ji"]),
    mc("Įrašykite klausiamąjį žodį: «________ jūs esate Lina? – Taip.»", ["Ar", "Koks", "Kas", "Kokia"], "Ar", "Общий вопрос, требующий ответа да/нет, начинается с частицы 'Ar'."),
    mc("Įrašykite klausiamąjį žodį: «________ jūs esate? – Aš esu dėstytoja.»", ["Kas", "Ar", "Koks", "Kokia"], "Kas", "Вопрос о профессии или личности («Кто вы?») задается словом 'Kas'."),
    mc("Įrašykite klausiamąjį žodį: «________ jūsų pavardė? – Mano pavardė Lankelytė.»", ["Kokia", "Koks", "Kas", "Ar"], "Kokia", "Слово 'pavardė' женского рода: 'Kokia jūsų pavardė?'."),
    mc("Įrašykite klausiamąjį žodį: «________ tavo vardas? – Mano vardas Jonas.»", ["Koks", "Kokia", "Kas", "Ar"], "Koks", "Слово 'vardas' мужского рода: 'Koks tavo vardas?'."),
    mc("Parinkite atsakymą: «Labai malonu!»", ["Man taip pat labai malonu.", "Nieko tokio!", "Iki!", "Prašom."], "Man taip pat labai malonu.", "На реплику 'Labai malonu!' отвечают: 'Man taip pat labai malonu'."),
    mc("Parinkite atsakymą: «Iki rytojaus!»", ["Iki!", "Nieko tokio!", "Ačiū.", "Laba diena!"], "Iki!", "На прощание 'Iki rytojaus!' отвечают 'Iki!'."),
    mc("Parinkite atsakymą: «Atsiprašau!»", ["Nieko tokio!", "Prašom.", "Iki!", "Labas rytas!"], "Nieko tokio!", "На извинение 'Atsiprašau!' принято отвечать 'Nieko tokio!' (Ничего страшного)."),
    mc("Parinkite atsakymą: «Ačiū!»", ["Prašom.", "Atsiprašau.", "Iki rytojaus!", "Labas!"], "Prašom.", "На благодарность 'Ačiū!' отвечают 'Prašom!' (Пожалуйста!).")
]

# ================= CHAPTER 2 =================
# Book 1, Ch 2 (p. 35-42) & Answers (p. 4-5):
# Ex 3: Šauksmininkas (Dmitrijau, Egle, Inga, Pauliau, Lukai, Viktorija, Ignai, Anatolijau, Dainiau, Viktorai, Ramune, Aleksandrai, Kristijanai, Juste)
# Ex 4: Sugrupuokite (Laba diena, Jonai! Čia yra Tomas...)
# Ex 5: Šalis -> sostinė genitive (iš Anglijos, iš Londono...)
# Ex 6: Tautybė ir kilmė (Viktorija yra belgė. Ji yra iš Belgijos...)
# Ex 7: Kalbos (Jis kalba čekiškai, daniškai, estiškai...)
# Ex 9: Įrašykite tinkamą žodį (suprantate, nesupranta, kalbame, yra, esi, esate)
# Ex 10: Kalbėti ir suprasti formos
# Ex 11: Įvardžiai (ji, jis, Mes, jūs, Aš)
# Ex 12: Sakinio dalys
# Ex 13: Dialogų poros
# Ex 14: Pokalbio pabaiga
ch2_exercises = [
    fill("Įrašykite šauksmininko formą: «Laba diena, ________ (Dmitrijus)!»", "Dmitrijau", "-us переходит в -au", "Имена на -us в звательном падеже принимают окончание -au: Dmitrijus → Dmitrijau!"),
    fill("Įrašykite šauksmininko formą: «Laba diena, ________ (Eglė)!»", "Egle", "-ė переходит в -e", "Имена на -ė в звательном падеже оканчиваются на -e: Eglė → Egle!"),
    fill("Įrašykite šauksmininko formą: «Laba diena, ________ (Paulius)!»", "Pauliau", "-us переходит в -au", "Имена на -ius/-us оканчиваются на -iau/-au: Paulius → Pauliau!"),
    fill("Įrašykite šauksmininko formą: «Laba diena, ________ (Lukas)!»", "Lukai", "-as переходит в -ai", "Мужские имена на -as в звательном падеже получают -ai: Lukas → Lukai!"),
    fill("Įrašykite šauksmininko formą: «Laba diena, ________ (Ignas)!»", "Ignai", "-as переходит в -ai", "Ignas → Ignai!"),
    fill("Įrašykite šauksmininko formą: «Laba diena, ________ (Viktoras)!»", "Viktorai", "-as переходит в -ai", "Viktoras → Viktorai!"),
    fill("Įrašykite šauksmininko formą: «Laba diena, ________ (Ramunė)!»", "Ramune", "-ė переходит в -e", "Ramunė → Ramune!"),
    fill("Įrašykite šauksmininko formą: «Laba diena, ________ (Justė)!»", "Juste", "-ė переходит в -e", "Justė → Juste!"),
    fill("Mano draugas yra iš ________ (Anglija).", "Anglijos", "iš + Kilmininkas (-os)", "Предлог 'iš' требует родительного падежа: Anglija → Anglijos."),
    fill("Mano draugas yra iš ________ (Prancūzija).", "Prancūzijos", "iš + Kilmininkas (-os)", "Prancūzija → Prancūzijos."),
    fill("Mano draugas yra iš ________ (Vokietija).", "Vokietijos", "iš + Kilmininkas (-os)", "Vokietija → Vokietijos."),
    fill("Mano draugas yra iš ________ (Londonas).", "Londono", "iš + Kilmininkas (-o)", "Существительные мужского рода на -as получают окончание -o: Londonas → Londono."),
    fill("Mano draugas yra iš ________ (Vilnius).", "Vilniaus", "iš + Kilmininkas (-iaus)", "Vilnius (на -ius) в родительном падеже имеет окончание -iaus: Vilniaus."),
    fill("Mano draugas yra iš ________ (Paryžius).", "Paryžiaus", "iš + Kilmininkas (-iaus)", "Paryžius → Paryžiaus."),
    mc("Viktorija, Belgija: «Viktorija yra ________. Ji yra iš Belgijos.»", ["belgė", "belgas", "belgiškai", "Belgija"], "belgė", "Виктория — женщина, поэтому национальность женского рода: 'belgė'."),
    mc("Marija, Amerika: «Marija yra ________. Ji yra iš Amerikos.»", ["amerikietė", "amerikietis", "amerikietiškai", "Amerika"], "amerikietė", "Женский род от amerikietis — 'amerikietė'."),
    mc("Janas, Lenkija: «Janas yra ________. Jis yra iš Lenkijos.»", ["lenkas", "lenkė", "lenkiškai", "Lenkija"], "lenkas", "Ян — мужчина, национальность мужского рода: 'lenkas'."),
    mc("Aleksandras, Italija: «Aleksandras yra ________. Jis yra iš Italijos.»", ["italas", "italė", "itališkai", "Italija"], "italas", "Александр — мужчина, национальность мужского рода: 'italas'."),
    mc("Žanas, Prancūzija: «Žanas yra ________. Jis yra iš Prancūzijos.»", ["prancūzas", "prancūzė", "prancūziškai", "Prancūzija"], "prancūzas", "Жан — мужчина, 'prancūzas'."),
    mc("Jis yra estas. Jis kalba ________.", ["estiškai", "estas", "estė", "Estija"], "estiškai", "Названия языков отвечают на вопрос Kaip? и оканчиваются на -iškai: estiškai."),
    mc("Ji yra lenkė. Ji kalba ________.", ["lenkiškai", "lenkas", "lenkė", "Lenkija"], "lenkiškai", "Говорить по-польски — 'kalbėti lenkiškai'."),
    mc("Jis yra vokietis. Jis kalba ________.", ["vokiškai", "vokietis", "vokietė", "Vokietija"], "vokiškai", "По-немецки — 'vokiškai'."),
    fill("Įrašykite tinkamą žodį: «Ar jūs ________ (suprasti) prancūziškai?»", "suprantate", "Форма suprantate для jūs", "С местоимением 'jūs' глагол suprasti имеет форму 'suprantate'."),
    fill("Įrašykite tinkamą žodį: «Lina ________ (nesuprasti) itališkai.»", "nesupranta", "3 лицо ед. ч.", "В 3-м лице глагол suprasti имеет форму 'supranta', с отрицанием — 'nesupranta'."),
    fill("Įrašykite tinkamą žodį: «Mes ________ (kalbėti) lietuviškai.»", "kalbame", "Форма для mes", "С местоимением 'mes' глагол kalbėti имеет форму 'kalbame'."),
    fill("Įrašykite tinkamą formą: «Ar tu ________ (kalbėti) lietuviškai?»", "kalbi", "Форма для tu", "Для 2 лица ед. ч. (tu) глагол kalbėti имеет форму 'kalbi'."),
    fill("Įrašykite tinkamą formą: «Kotryna ________ (kalbėti) angliškai.»", "kalba", "3 лицо", "Для 3 лица форма глагола kalbėti — 'kalba'."),
    fill("Įrašykite tinkamą formą: «Aš ________ (nesuprasti) rusiškai.»", "nesuprantu", "1 лицо ед. ч.", "Для 1 лица ед. ч. (aš) глагол suprasti: 'suprantu', отрицание — 'nesuprantu'."),
    mc("Sujunkite sakinio dalis: «Prašom ________!»", ["pakartoti!", "lėčiau.", "sekasi?", "kalbu."], "pakartoti!", "Устойчивая вежливая просьба: «Prašom pakartoti!» (Пожалуйста, повторите!)."),
    mc("Sujunkite sakinio dalis: «Atsiprašau, aš nesuprantu ________.»", ["lietuviškai.", "sekasi?", "jūs?", "kalbate angliškai?"], "lietuviškai.", "«Atsiprašau, aš nesuprantu lietuviškai» (Извините, я не понимаю по-литовски)."),
    mc("Sujunkite sakinio dalis: «Prašom kalbėti ________.»", ["lėčiau.", "pakartoti!", "sekasi?", "iš Portugalijos?"], "lėčiau.", "«Prašom kalbėti lėčiau» (Пожалуйста, говорите медленнее)."),
    mc("Sujunkite sakinio dalis: «Lina, kaip ________?»", ["sekasi?", "pakartoti!", "lėčiau.", "kalbu."], "sekasi?", "Вопрос о делах: «Kaip sekasi?» (Как дела?)."),
    mc("Parinkite atsakymą į klausimą: «Kaip sekasi?»", ["Ačiū, gerai!", "Aš esu estas.", "Mano vardas Emilija.", "Ne, nesuprantu."], "Ačiū, gerai!", "На вопрос 'Kaip sekasi?' стандартный ответ: 'Ačiū, gerai!' (Спасибо, хорошо!)."),
    mc("Parinkite atsakymą: «Ar jūs suprantate lietuviškai?»", [
        "Taip, suprantu truputį.",
        "Mano vardas Emilija.",
        "Aš esu estas.",
        "Ačiū, gerai!"
    ], "Taip, suprantu truputį.", "Логичный ответ о понимании языка: 'Taip, suprantu truputį' (Да, понимаю немного).")
]

# ================= CHAPTER 3 =================
# Book 1, Ch 3 (p. 53-63) & Answers (p. 5-7):
# Ex 8 & 9: Vietininkas vs Vardininkas (gyvena Vilniuje, Kaune, Lietuvoje, parduotuvėje, ligoninėje, banke...)
# Ex 10: Kas kur gyvena (Tomas gyvena Vokietijoje, Ana gyvena Portugalijoje...)
# Ex 11: Klausimai (Kur gyvena? Kur dirba?)
# Ex 12: Numeriai ir adresai (Vilniaus gatvė 12, butas 4...)
# Ex 13: Prie + Kilmininkas (prie banko, prie stoties, prie universiteto...)
# Ex 14: Vietininkas formos
ch3_exercises = [
    fill("Išbraukite netinkamas formas: «Paulius gyvena ________ (Vilnius).»", "Vilniuje", "Местный падеж Kur?", "Вопрос Kur? (где?) требует местного падежа: Vilnius (-us) → Vilniuje."),
    fill("Išbraukite netinkamas formas: «Kristina gyvena ________ (Klaipėda).»", "Klaipėdoje", "Местный падеж Kur?", "Klaipėda (-a) → Klaipėdoje."),
    fill("Išbraukite netinkamas formas: «Jie gyvena ________ (Lietuva).»", "Lietuvoje", "Местный падеж Kur?", "Lietuva → Lietuvoje."),
    fill("Išbraukite netinkamas formas: «Aš esu ________ (parduotuvė).»", "parduotuvėje", "Местный падеж Kur?", "Существительные на -ė в местном падеже имеют окончание -ėje: parduotuvė → parduotuvėje."),
    fill("Išbraukite netinkamas formas: «Ji dirba ________ (ligoninė).»", "ligoninėje", "Местный падеж Kur?", "ligoninė → ligoninėje."),
    fill("Išbraukite netinkamas formas: «Viktoras dirba ________ (ambasada).»", "ambasadoje", "Местный падеж Kur?", "ambasada → ambasadoje."),
    fill("Išbraukite netinkamas formas: «Ar tu dabar esi ________ (bankas)?»", "banke", "Местный падеж Kur?", "bankas (-as) → banke."),
    fill("Išbraukite netinkamas formas: «Mes dirbame ________ (biblioteka).»", "bibliotekoje", "Местный падеж Kur?", "biblioteka → bibliotekoje."),
    fill("Tomas, Vokietija: «Tomas gyvena ________.»", "Vokietijoje", "Vokietija в местном падеже", "Vokietija → Vokietijoje."),
    fill("Ana, Portugalija: «Ana gyvena ________.»", "Portugalijoje", "Portugalija в местном падеже", "Portugalija → Portugalijoje."),
    fill("Karolina, Amerika: «Karolina gyvena ________.»", "Amerikoje", "Amerika в местном падеже", "Amerika → Amerikoje."),
    fill("Džonas, Anglija: «Džonas gyvena ________.»", "Anglijoje", "Anglija в местном падеже", "Anglija → Anglijoje."),
    fill("Dmitrijus, Rusija: «Dmitrijus gyvena ________.»", "Rusijoje", "Rusija в местном падеже", "Rusija → Rusijoje."),
    fill("Inga, Latvija: «Inga gyvena ________.»", "Latvijoje", "Latvija в местном падеже", "Latvija → Latvijoje."),
    fill("Luka, Italija: «Luka gyvena ________.»", "Italijoje", "Italija в местном падеже", "Italija → Italijoje."),
    fill("Gatvė prie ________ (bankas).", "banko", "prie + Kilmininkas (-o)", "Предлог prie (около, возле) требует родительного падежа: bankas → prie banko."),
    fill("Viešbutis prie ________ (stotis).", "stoties", "prie + Kilmininkas (-ies)", "stotis (3 склонение) в родительном падеже имеет окончание -ies: stoties."),
    fill("Kavinė prie ________ (universitetas).", "universiteto", "prie + Kilmininkas (-o)", "universitetas → prie universiteto."),
    fill("Namas prie ________ (parkas).", "parko", "prie + Kilmininkas (-o)", "parkas → prie parko."),
    fill("Stotelė prie ________ (mokykla).", "mokyklos", "prie + Kilmininkas (-os)", "mokykla → prie mokyklos."),
    mc("Pasirinkite teisingą klausiamąjį žodį: «– ________ gyvena Tomas? – Vokietijoje.»", ["Kur", "Kas", "Koks", "Kada"], "Kur", "Вопрос о месте («Где?») — 'Kur'."),
    mc("Pasirinkite teisingą klausiamąjį žodį: «– ________ tavo adresas? – Gedimino pr. 5.»", ["Koks", "Kur", "Kas", "Kokia"], "Koks", "Слово 'adresas' мужского рода: 'Koks tavo adresas?'."),
    mc("Pasirinkite teisingą klausimą: «– ________ tavo telefono numeris?»", ["Koks", "Kokia", "Kur", "Kas"], "Koks", "Слово 'numeris' мужского рода: 'Koks tavo telefono numeris?'."),
    mc("Parašykite skaičių žodžiu: «15»", ["penkiolika", "penki", "penkiasdešimt", "penktas"], "penkiolika", "Числительное 15 по-литовски — 'penkiolika' (суффикс -lika для чисел 11-19)."),
    mc("Parašykite skaičių žodžiu: «20»", ["dvidešimt", "dvylika", "du", "dvidešimtas"], "dvidešimt", "Числительное 20 по-литовски — 'dvidešimt'.")
]

# ================= CHAPTER 4 =================
# Book 1, Ch 4 (p. 74-83) & Answers (p. 7-8):
# Kada? Dni nedeli: pirmadienį, antradienį, trečiadienį, ketvirtadienį, penktadienį, šeštadienį, sekmadienį (Galininkas -į).
# Kelintą valandą? pirmą valandą, antrą, trečią, dešimtą...
# Į (kryptis) + Galininkas (į teatrą, į kiną, į universitetą, į kavinę...)
# Pas + Galininkas (pas gydytoją, pas draugą...)
ch4_exercises = [
    fill("Kada? «Susitinkame ________ (pirmadienis).»", "pirmadienį", "Galininkas (-į)", "Дни недели при ответе на вопрос Kada? (Когда?) ставятся в винительный падеж: pirmadienis → pirmadienį."),
    fill("Kada? «Paskaita bus ________ (antradienis).»", "antradienį", "Galininkas (-į)", "antradienis → antradienį."),
    fill("Kada? «Koncertas vyks ________ (trečiadienis).»", "trečiadienį", "Galininkas (-į)", "trečiadienis → trečiadienį."),
    fill("Kada? «Eisiu į kiną ________ (ketvirtadienis).»", "ketvirtadienį", "Galininkas (-į)", "ketvirtadienis → ketvirtadienį."),
    fill("Kada? «Savaitgalis prasideda ________ (penktadienis).»", "penktadienį", "Galininkas (-į)", "penktadienis → penktadienį."),
    fill("Kada? «Ilsėsimės ________ (šeštadienis).»", "šeštadienį", "Galininkas (-į)", "šeštadienis → šeštadienį."),
    fill("Kada? «Būsime namie ________ (sekmadienis).»", "sekmadienį", "Galininkas (-į)", "sekmadienis → sekmadienį."),
    fill("Kelintą valandą susitinkame? «Susitinkame ________ (pirma) valandą.»", "pirmą", "Galininkas (-ą)", "Время (Kelintą valandą?) выражается порядковым числительным в винительном падеже: pirma → pirmą valandą."),
    fill("Kelintą valandą prasideda filmas? «Prasideda ________ (šešta) valandą.»", "šeštą", "Galininkas (-ą)", "šešta → šeštą valandą."),
    fill("Kelintą valandą baigiasi pamoka? «Baigiasi ________ (aštunta) valandą.»", "aštuntą", "Galininkas (-ą)", "aštunta → aštuntą valandą."),
    fill("Kur eini? «Einu į ________ (teatras).»", "teatrą", "į + Galininkas (-ą)", "Предлог į (в) выражает направление и требует винительного падежа (Galininkas): teatras → į teatrą."),
    fill("Kur eini? «Einu į ________ (kinas).»", "kiną", "į + Galininkas (-ą)", "kinas → į kiną."),
    fill("Kur važiuoji? «Važiuoju į ________ (universitetas).»", "universitetą", "į + Galininkas (-ą)", "universitetas → į universitetą."),
    fill("Kur eini? «Einu į ________ (kavinė).»", "kavinę", "į + Galininkas (-ę)", "kavinė (-ė) → į kavinę (-ę)."),
    fill("Kur eini? «Einu į ________ (biblioteka).»", "biblioteką", "į + Galininkas (-ą)", "biblioteka (-a) → į biblioteką (-ą)."),
    fill("Pas ką eini? «Einu pas ________ (draugas).»", "draugą", "pas + Galininkas (-ą)", "Предлог pas (к кому-то) требует винительного падежа: draugas → pas draugą."),
    fill("Pas ką eini? «Einu pas ________ (gydytojas).»", "gydytoją", "pas + Galininkas (-ą)", "gydytojas → pas gydytoją."),
    mc("Kuris klausimas tinka atsakymui: «Penktadienį vakare.»?", ["Kada susitinkame?", "Kur susitinkame?", "Kas čia yra?", "Koks tavo vardas?"], "Kada susitinkame?", "Ответ 'Penktadienį vakare' указывает на время, вопрос — 'Kada?' (Когда?)."),
    mc("Kuris klausimas tinka atsakymui: «Kavinėje prie universiteto.»?", ["Kur susitinkame?", "Kada susitinkame?", "Koks jūsų adresas?", "Ar kalbate lietuviškai?"], "Kur susitinkame?", "Ответ 'Kavinėje prie universiteto' указывает на место, вопрос — 'Kur?' (Где?)."),
    mc("Išverskite: «В половине шестого (17:30)»", ["pusė šešių", "pusė penkių", "šešta valanda", "penkios trisdešimt"], "pusė šešių", "В литовском языке половина обозначается словом 'pusė' + родительный падеж следующего часа: pusė šešių.")
]

# ================= CHAPTER 5 =================
# Book 1, Ch 5 (p. 93-101) & Answers (p. 8-9):
# Turėti (turiu, turi, turi, turime, turite, turi) + Galininkas
# Neturėti (neturiu, neturi, neturi, neturime, neturite, neturi) + Kilmininkas
# Šeimos nariai: tėvas, motina, brolis, sesuo, vyras, žmona, sūnus, duktė...
ch5_exercises = [
    fill("Įrašykite turėti formą: «Aš ________ (turėti) brolį ir seserį.»", "turiu", "1 лицо ед. ч.", "Для 'aš' форма глагола turėti — 'turiu'."),
    fill("Įrašykite turėti formą: «Ar tu ________ (turėti) šunį?»", "turi", "2 лицо ед. ч.", "Для 'tu' форма глагола turėti — 'turi'."),
    fill("Įrašykite turėti formą: «Tomas ________ (turėti) didelę šeimą.»", "turi", "3 лицо", "Для 3 лица (jis, ji, jie, jos) форма глагола turėti — 'turi'."),
    fill("Įrašykite turėti formą: «Mes ________ (turėti) dvi kates.»", "turime", "1 лицо мн. ч.", "Для 'mes' форма — 'turime'."),
    fill("Įrašykite turėti formą: «Ar jūs ________ (turėti) vaikų?»", "turite", "2 лицо мн. ч.", "Для 'jūs' форма — 'turite'."),
    fill("Įrašykite reikiamą linksnį: «Aš turiu ________ (brolis).»", "brolį", "Galininkas (-į)", "Утвердительный глагол turėti требует винительного падежа (Galininkas): brolis → brolį."),
    fill("Įrašykite reikiamą linksnį: «Aš turiu ________ (sesuo).»", "seserį", "Galininkas (-erį)", "Слово sesuo в винительном падеже имеет форму 'seserį'."),
    fill("Įrašykite reikiamą linksnį: «Tomas turi ________ (sūnus).»", "sūnų", "Galininkas (-ų)", "sūnus (4 склонение) в винительном падеже имеет окончание -ų: sūnų."),
    fill("Įrašykite reikiamą linksnį: «Lina turi ________ (duktė).»", "dukterį", "Galininkas (-erį)", "duktė в винительном падеже — 'dukterį'."),
    fill("Neigimas + Kilmininkas: «Aš neturiu ________ (brolis).»", "brolio", "Kilmininkas (-io)", "Отрицательный глагол neturėti ВСЕГДА требует родительного падежа (Kilmininkas): brolis → brolio."),
    fill("Neigimas + Kilmininkas: «Aš neturiu ________ (sesuo).»", "sesers", "Kilmininkas (-ers)", "sesuo в родительном падеже имеет форму 'sesers'."),
    fill("Neigimas + Kilmininkas: «Mes neturime ________ (automobilis).»", "automobilio", "Kilmininkas (-io)", "automobilis → automobilio."),
    fill("Neigimas + Kilmininkas: «Ji neturi ________ (laikas).»", "laiko", "Kilmininkas (-o)", "laikas → laiko."),
    fill("Neigimas + Kilmininkas: «Ar tu neturi ________ (telefonas)?»", "telefono", "Kilmininkas (-o)", "telefonas → telefono."),
    mc("Kaip pasakyti: «У меня есть семья»?", ["Aš turiu šeimą.", "Aš turiu šeimos.", "Aš esu šeima.", "Mano yra šeima."], "Aš turiu šeimą.", "Правильная конструкция: «Aš turiu» + Galininkas ('šeimą')."),
    mc("Kaip pasakyti: «У меня нет времени»?", ["Aš neturiu laiko.", "Aš neturiu laiką.", "Aš nesu laikas.", "Man nėra laikas."], "Aš neturiu laiko.", "С отрицанием 'neturiu' используется родительный падеж (Kilmininkas): 'laiko'.")
]

print("Chapters 1-5 defined successfully.")
