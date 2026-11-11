# -*- coding: utf-8 -*-
from generate_complete_exercises_all_21 import mc, fill

# ================= CHAPTER 11 =================
# Book 2, Ch 11 (p. 44-53) & Answers (p. 16-17):
# Geros kelionės! Mašinos nuoma, kelionė.
# Po + Kilmininkas (po savaitės, po mėnesio, po dviejų valandų)
# Norėti / Galėti tariamoji nuosaka (norėčiau, norėtum, norėtų, galėčiau, galėtum, galėtų...)
# Naudininkas laiko terminui (išsinuomoti savaitei, dienai, parai, mėnesiui)
ch11_exercises = [
    fill("Po + Kilmininkas: «Mašiną suremontuos po ________ (savaitė).»", "savaitės", "Kilmininkas (-ės)", "Предлог po (через) требует родительного падежа: savaitė → savaitės."),
    fill("Po + Kilmininkas: «Išvažiuojame po vieno ________ (mėnuo).»", "mėnesio", "Kilmininkas (-io)", "mėnuo → mėnesio."),
    fill("Po + Kilmininkas: «Susitiksime po dviejų ________ (valanda).»", "valandų", "Daugiskaitos kilmininkas (-ų)", "После числительных в родительном падеже (dviejų) существительное стоит в родительном падеже мн. ч.: valanda → valandų."),
    fill("Tariamoji nuosaka: «Aš ________ (galėti) vairuoti mašiną.»", "galėčiau", "1 лицо ед. ч.", "Сослагательное наклонение для 'aš' — 'galėčiau' (я мог бы / могла бы)."),
    fill("Tariamoji nuosaka: «Ar tu ________ (norėti) išsinuomoti mašiną?»", "norėtum", "2 лицо ед. ч.", "Сослагательное наклонение для 'tu' — 'norėtum' (ты хотел бы / хотела бы)."),
    fill("Tariamoji nuosaka: «Mes ________ (norėti) užsisakyti kambarį.»", "norėtume", "1 лицо мн. ч.", "Для 'mes' — 'norėtume' (или 'norėtumėme').", ["norėtumėme"]),
    fill("Tariamoji nuosaka: «Jūs ________ (galėti) parodyti vairuotojo pažymėjimą.»", "galėtumėte", "2 лицо мн. ч.", "Для 'jūs' — 'galėtumėte' (или 'galėtute').", ["galėtute"]),
    fill("Naudininkas trukmei: «Norėčiau išsinuomoti mašiną vienai ________ (diena).»", "dienai", "Naudininkas (-ai)", "Срок, на который берется аренда, выражается дательным падежом (Naudininkas): diena → dienai."),
    fill("Naudininkas trukmei: «Mašiną nuomojamės vienai ________ (para).»", "parai", "Naudininkas (-ai)", "para (сутки) → parai."),
    fill("Naudininkas trukmei: «Išsinuomojome savaitei ir vienam ________ (mėnuo).»", "mėnesiui", "Naudininkas (-iui)", "mėnuo → mėnesiui."),
    mc("Kaip palinkėti geros kelionės?", ["Geros kelionės!", "Skanaus!", "Į sveikatą!", "Su gimtadieniu!"], "Geros kelionės!", "«Geros kelionės!» — Счастливого пути!"),
    mc("Kas reikalinga norint išsinuomoti automobilį?", ["Vairuotojo pažymėjimas ir pasas", "Gydytojo receptas", "Studento bilietas", "Gimtadienio atvirukas"], "Vairuotojo pažymėjimas ir pasas", "Для аренды автомобиля необходимы водительские права (vairuotojo pažymėjimas) и паспорт.")
]

# ================= CHAPTER 12 =================
# Book 2, Ch 12 (p. 64-73) & Answers (p. 17-18):
# Butas, kambariai, baldai.
# Yra vs Nėra + Kilmininkas (Bute yra sofa, stalas; Bute nėra televizoriaus, balkono)
# Ant + Kilmininkas (ant stalo, ant sienos, ant grindų)
# Prie + Kilmininkas (prie lango, prie durų)
ch12_exercises = [
    fill("Bute yra (Vardininkas): «Kambaryje yra patogi ________ (sofa).»", "sofa", "Vardininkas (kas?)", "Конструкция 'yra' утверждает наличие предмета в именительном падеже: sofa."),
    fill("Bute yra (Vardininkas): «Svetainėje yra didelis ________ (stalas).»", "stalas", "Vardininkas (kas?)", "stalas."),
    fill("Bute nėra (Kilmininkas): «Virtuvėje nėra ________ (šaldytuvas).»", "šaldytuvo", "Kilmininkas (-o)", "Отрицание 'nėra' (нет) ВСЕГДА требует родительного падежа: šaldytuvas → šaldytuvo."),
    fill("Bute nėra (Kilmininkas): «Kambaryje nėra ________ (balkonas).»", "balkono", "Kilmininkas (-o)", "balkonas → balkono."),
    fill("Bute nėra (Kilmininkas): «Bute nėra ________ (skalbimo mašina).»", "skalbimo mašinos", "Kilmininkas (-os)", "mašina → mašinos."),
    fill("Bute nėra (Kilmininkas): «Svetainėje nėra ________ (televizorius).»", "televizoriaus", "Kilmininkas (-iaus)", "televizorius → televizoriaus."),
    fill("Ant + Kilmininkas: «Knyga guli ant ________ (stalas).»", "stalo", "ant + Kilmininkas (-o)", "Предлог ant (на поверхности) требует родительного падежа: stalas → ant stalo."),
    fill("Ant + Kilmininkas: «Paveikslas kaba ant ________ (siena).»", "sienos", "ant + Kilmininkas (-os)", "siena → ant sienos."),
    fill("Prie + Kilmininkas: «Kėdė stovi prie ________ (langas).»", "lango", "prie + Kilmininkas (-o)", "Предлог prie (у, возле) требует родительного падежа: langas → prie lango."),
    fill("Prie + Kilmininkas: «Spinta stovi prie ________ (durys).»", "durų", "prie + Daugiskaitos kilmininkas (-ų)", "durys (мн. ч.) → prie durų."),
    mc("Kaip paklausti: «Сколько комнат в квартире?»", ["Kelių kambarių butas?", "Koks buto adresas?", "Kur yra butas?", "Kiek kainuoja butas?"], "Kelių kambarių butas?", "«Kelių kambarių butas?» — стандартный вопрос о количестве комнат."),
    mc("Kuriame aukšte? «Gyvenu trečiame ________.»", ["aukšte", "aukštas", "aukšto", "aukštą"], "aukšte", "Вопрос 'Kuriame aukšte?' (на каком этаже?) требует местного падежа: aukštas → aukšte.")
]

# ================= CHAPTER 13 =================
# Book 2, Ch 13 (p. 82-91) & Answers (p. 18-19):
# Reikia meistro! Buitiniai gedimai ir remontas.
# Sugedo (sugedo maišytuvas, skalbimo mašina, spyna...)
# Reikia pataisyti / pakeisti + Galininkas
ch13_exercises = [
    fill("Gedimas: «Vonios kambaryje sugedo ________ (maišytuvas / kranas).»", "maišytuvas", "Vardininkas (kas?)", "maišytuvas (подлежащее в именительном падеже).", ["kranas"]),
    fill("Gedimas: «Neveikia elektros ________ (jungiklis).»", "jungiklis", "Vardininkas", "jungiklis."),
    fill("Gedimas: «Užsikimšo virtuvės ________ (kriauklė).»", "kriauklė", "Vardininkas", "kriauklė."),
    fill("Reikia pataisyti + Galininkas: «Reikia skubiai pataisyti ________ (spyna).»", "spyną", "Galininkas (-ą)", "Глагол pataisyti требует винительного падежа прямого дополнения: spyna → spyną."),
    fill("Reikia pataisyti + Galininkas: «Meistras turi pakeisti ________ (rozetė).»", "rozetę", "Galininkas (-ę)", "rozetė → rozetę."),
    fill("Reikia pataisyti + Galininkas: «Reikia suremontuoti ________ (šaldytuvas).»", "šaldytuvą", "Galininkas (-ą)", "šaldytuvas → šaldytuvą."),
    mc("Kaip išsikviesti meistrą telefonu?", [
        "Laba diena, man reikia meistro, sugedo skalbimo mašina.",
        "Ačiū, buvo labai skanu!",
        "Kada atvažiuos autobusas?",
        "Geros kelionės!"
    ], "Laba diena, man reikia meistro, sugedo skalbimo mašina.", "Стандартное телефонное обращение при бытовой аварии."),
    mc("Kaip paklausti apie remonto kainą?", ["Kiek kainuos remontas?", "Kada prasideda filmas?", "Koks jūsų vardas?", "Ar kalbate vokiškai?"], "Kiek kainuos remontas?", "«Kiek kainuos remontas?» — вопрос о стоимости починки.")
]

# ================= CHAPTER 14 =================
# Book 2, Ch 14 (p. 101-109) & Answers (p. 19-20):
# Važiuojame apsipirkti? Drabužiai, avalynė, dydžiai, spalvos.
# Tinka / Netinka + Naudininkas (Šis dydis man tinka / netinka)
# Būdvardžių ir daiktavardžių derinimas (juodos kelnės, balta palaidinė)
ch14_exercises = [
    fill("Tinka + Naudininkas: «Šis švarkas ________ (aš) labai tinka.»", "man", "Naudininkas (kam?)", "Глагол tikti (подходить) требует дательного падежа: aš → man."),
    fill("Tinka + Naudininkas: «Ar šie batai ________ (tu) tinka?»", "tau", "Naudininkas (kam?)", "tu → tau."),
    fill("Tinka + Naudininkas: «Ši suknelė ________ (ji) per maža.»", "jai", "Naudininkas (kam?)", "ji → jai."),
    fill("Tinka + Naudininkas: «Šis kostiumas ________ (jis) per didelis.»", "jam", "Naudininkas (kam?)", "jis → jam."),
    fill("Derinimas: «Noriu pasimatuoti šią ________ (balta) suknelę.»", "baltą", "Galininkas (-ą)", "Прилагательное согласуется с существительным в винительном падеже: balta → baltą."),
    fill("Derinimas: «Man patinka šie ________ (juodas) bateliai.»", "juodi", "Vardininkas dgs.", "juodi bateliai."),
    mc("Kaip paklausti apie primatavimo kabiną?", ["Kur yra pasimatavimo kabina?", "Kiek kainuoja bilietas?", "Kada atvažiuos traukinys?", "Koks jūsų adresas?"], "Kur yra pasimatavimo kabina?", "«Kur yra pasimatavimo kabina?» — Где примерочная?"),
    mc("Kaip paprašyti kito dydžio?", ["Ar turite mažesnį / didesnį dydį?", "Skanaus!", "Prašom sąskaitą!", "Atsiprašau, aš nesuprantu."], "Ar turite mažesnį / didesnį dydį?", "«Ar turite mažesnį / didesnį dydį?» — Есть ли меньший/больший размер?")
]

# ================= CHAPTER 15 =================
# Book 2, Ch 15 (p. 119-127) & Answers (p. 20-21):
# Kada galėsiu atsiimti? Paslaugos (valykla, batų taisykla, siuvykla).
# Kada bus paruošta? (Po dviejų dienų, rytoj vakare)
# Būdvardžių aukštesnysis laipsnis su Kilmininku (Reikia mažesnio dydžio)
ch15_exercises = [
    fill("Aukštesniojo laipsnio kilmininkas: «Man reikia ________ (mažas) dydžio.»", "mažesnio", "Kilmininkas (-esnio)", "Существительное 'dydžio' стоит в родительном падеже, прилагательное согласуется: mažas → mažesnio."),
    fill("Aukštesniojo laipsnio kilmininkas: «Ieškau ________ (didelis) batų.»", "didesnių", "Daugiskaitos kilmininkas (-esnių)", "batai (мн. ч. genitive) → didesnių."),
    fill("Laikas atsiimti: «Drabužius galėsite atsiimti po trijų ________ (diena).»", "dienų", "Daugiskaitos kilmininkas (-ų)", "После числительного trijų в родительном падеже существительное стоит в родительном падеже мн. ч.: diena → dienų."),
    fill("Veiksmažodis: «Ar galite išvalyti šią ________ (dėmė)?»", "dėmę", "Galininkas (-ę)", "išvalyti dėmę (винительный падеж)."),
    mc("Kaip paklausti: «Когда я смогу забрать заказ?»", ["Kada galėsiu atsiimti?", "Kur yra kavinė?", "Kiek tai kainuoja?", "Koks jūsų vardas?"], "Kada galėsiu atsiimti?", "«Kada galėsiu atsiimti?» — стандартный вопрос при сдаче вещей в сервис."),
    mc("Kur nešami valyti drabužiai?", ["Į sauso valymo valyklą", "Į vaistinę", "Į biblioteką", "Į autoservisą"], "Į sauso valymo valyklą", "В химчистку — į sauso valymo valyklą.")
]

# ================= CHAPTER 16 =================
# Book 2, Ch 16 (p. 137-147) & Answers (p. 21-22):
# Kada dirba šeimos gydytojas? Sveikata, poliklinika.
# Man skauda + Vardininkas (Man skauda galvą, gerklę, dantį, pilvą, nugarą)
# Kūno dalys: galva, gerklė, dantis, akis, širdis, nugara, koja, ranka...
ch16_exercises = [
    fill("Skauda + Vardininkas: «Man labai skauda ________ (galva).»", "galvą", "Литовская норма: Galininkas (-ą)", "В литовском языке в конструкции с глаголом skaudėti орган чаще стоит в винительном падеже: galvą (или galva).", ["galva"]),
    fill("Skauda: «Vaikui skauda ________ (gerklė).»", "gerklę", "Galininkas (-ę)", "gerklė → gerklę.", ["gerklė"]),
    fill("Skauda: «Vyrui skauda ________ (dantis).»", "dantį", "Galininkas (-į)", "dantis → dantį.", ["dantis"]),
    fill("Skauda: «Močiutei skauda ________ (nugara).»", "nugarą", "Galininkas (-ą)", "nugara → nugarą.", ["nugara"]),
    fill("Skauda: «Man skauda ________ (pilvas).»", "pilvą", "Galininkas (-ą)", "pilvas → pilvą.", ["pilvas"]),
    fill("Temperatūra: «Ligonis turi aukštą ________ (temperatūra).»", "temperatūrą", "Galininkas (-ą)", "turėti temperatūrą (винительный падеж)."),
    mc("Kaip užsiregistruoti pas šeimos gydytoją?", [
        "Noriu užsiregistruoti pas šeimos gydytoją.",
        "Prašom sąskaitą!",
        "Geros kelionės!",
        "Kelių kambarių butas?"
    ], "Noriu užsiregistruoti pas šeimos gydytoją.", "Стандартная фраза в регистратуре поликлиники."),
    mc("Kaip gydytojas klausia paciento: «На что жалуетесь?»", ["Kuo skundžiatės?", "Kiek kainuoja?", "Kada atvažiuosite?", "Koks jūsų adresas?"], "Kuo skundžiatės?", "«Kuo skundžiatės?» — классический вопрос врача.")
]

print("Chapters 11-16 defined successfully.")
