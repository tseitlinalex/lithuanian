# -*- coding: utf-8 -*-
from generate_complete_exercises_all_21 import mc, fill

# ================= CHAPTER 17 =================
# Book 2, Ch 17 (p. 154-161) & Answers (p. 22):
# Prašom duoti vaistų nuo skausmo! Vaistinė, ligos.
# Sirgti + Įnagininkas (sirgti gripu, peršalimu, plaučių uždegimu)
# Alergiškas + Naudininkas (Aš esu alergiškas vaistams, dulkėms, medui)
# Vaistai nuo + Kilmininkas (vaistai nuo skausmo, nuo peršalimo, nuo kosulio)
ch17_exercises = [
    fill("Sirgti + Įnagininkas: «Tomas serga ________ (gripas).»", "gripu", "Įnagininkas (-u)", "Глагол sirgti (болеть чем-то) требует творительного падежа (Įnagininkas): gripas → gripu."),
    fill("Sirgti + Įnagininkas: «Vaikas serga sunkia ________ (angina).»", "angina", "Įnagininkas (-a)", "angina → angina."),
    fill("Sirgti + Įnagininkas: «Ji serga plaučių ________ (uždegimas).»", "uždegimu", "Įnagininkas (-u)", "uždegimas → uždegimu."),
    fill("Alergija + Naudininkas: «Aš esu alergiškas ________ (medus).»", "medui", "Naudininkas (-ui)", "Конструкция 'alergiškas' требует дательного падежа (kam?): medus → medui."),
    fill("Alergija + Naudininkas: «Ji yra alergiška ________ (pienas).»", "pienui", "Naudininkas (-ui)", "pienas → pienui."),
    fill("Alergija + Naudininkas: «Esu alergiškas šiems ________ (vaistai).»", "vaistams", "Daugiskaitos naudininkas (-ams)", "vaistai (мн. ч.) → vaistams."),
    fill("Nuo + Kilmininkas: «Prašom duoti vaistų nuo ________ (skausmas).»", "skausmo", "nuo + Kilmininkas (-o)", "Предлог nuo (от) требует родительного падежа: skausmas → nuo skausmo."),
    fill("Nuo + Kilmininkas: «Man reikia sirupo nuo ________ (kosulys).»", "kosulio", "nuo + Kilmininkas (-io)", "kosulys → nuo kosulio."),
    fill("Nuo + Kilmininkas: «Vaistai nuo ________ (karščiavimas).»", "karščiavimo", "nuo + Kilmininkas (-o)", "karščiavimas → nuo karščiavimo."),
    mc("Kaip išsikviesti greitąją pagalbą Lietuvoje?", ["Skambinti 112", "Skambinti 01", "Skambinti į banką", "Eiti į biblioteką"], "Skambinti 112", "Единый номер экстренных служб в Литве — 112."),
    mc("Kur perkami vaistai su receptu?", ["Vaistinėje", "Turguje", "Pašte", "Viešbutyje"], "Vaistinėje", "Лекарства по рецепту продаются в аптеке (vaistinėje).")
]

# ================= CHAPTER 18 =================
# Book 2, Ch 18 (p. 171-179) & Answers (p. 23):
# Kur jūs dirbate? Profesijos, darbo vieta, darbo laikas.
# Nuo ... iki + Kilmininkas (Dirbu nuo aštuonių iki penkių)
# Dirbti kuo? (Dirbu vadybininku, programuotoju, mokytoja)
# Dirbti kur? (Dirbu įmonėje, mokykloje, ligoninėje, banke)
ch18_exercises = [
    fill("Dirbti kuo (Įnagininkas): «Tomas dirba IT ________ (specialistas).»", "specialistu", "Įnagininkas (-u)", "Профессия с глаголом dirbti ставится в творительный падеж (kuo?): specialistas → specialistu."),
    fill("Dirbti kuo: «Lina dirba anglų kalbos ________ (mokytoja).»", "mokytoja", "Įnagininkas (-a)", "mokytoja → mokytoja."),
    fill("Dirbti kuo: «Mano tėtis dirba ligoninės ________ (gydytojas).»", "gydytoju", "Įnagininkas (-u)", "gydytojas → gydytoju."),
    fill("Dirbti kuo: «Andrius dirba banko ________ (vadybininkas).»", "vadybininku", "Įnagininkas (-u)", "vadybininkas → vadybininku."),
    fill("Darbo laikas (nuo... iki...): «Biuras dirba nuo ________ (devinta) valandos.»", "devintos", "nuo + Kilmininkas (-os)", "Предлог nuo требует родительного падежа: devinta → nuo devintos valandos."),
    fill("Darbo laikas (nuo... iki...): «Dirbame iki ________ (šešta) valandos vakaro.»", "šeštos", "iki + Kilmininkas (-os)", "Предлог iki требует родительного падежа: šešta → iki šeštos valandos."),
    fill("Darbo vieta (Vietininkas): «Aš dirbu tarptautinėje ________ (įmonė).»", "įmonėje", "Vietininkas (-ėje)", "Вопрос Kur? (где?) требует местного падежа: įmonė → įmonėje."),
    fill("Darbo vieta (Vietininkas): «Mano sesuo dirba universiteto ________ (biblioteka).»", "bibliotekoje", "Vietininkas (-oje)", "biblioteka → bibliotekoje."),
    mc("Kaip paklausti apie profesiją?", ["Kuo jūs dirbate?", "Kur jūs einate?", "Kiek tai kainuoja?", "Kada susitinkame?"], "Kuo jūs dirbate?", "«Kuo jūs dirbate?» — кем вы работаете?"),
    mc("Kaip pasakyti: «Я ищу работу»?", ["Aš ieškau darbo.", "Aš turiu darbą.", "Aš esu darbas.", "Man patinka darbas."], "Aš ieškau darbo.", "Глагол ieškoti (искать) требует родительного падежа: darbas → darbo.")
]

# ================= CHAPTER 19 =================
# Book 2, Ch 19 (p. 187-195) & Answers (p. 23-24):
# Ką tu studijuoji? Studijos, universitetas, kalbų mokymasis.
# Mokytis + Kilmininkas (mokausi lietuvių kalbos, matematikos, istorijos)
# Studijuoti + Galininkas (studijuoju ekonomiką, mediciną, teisę)
# Įstoti į + Galininkas (įstoti į universitetą, į kolegiją)
ch19_exercises = [
    fill("Mokytis + Kilmininkas: «Aš universitete mokausi ________ (lietuvių kalba).»", "lietuvių kalbos", "Kilmininkas (-os)", "Возвратный глагол mokytis (учиться чему-то) требует родительного падежа: kalba → kalbos."),
    fill("Mokytis + Kilmininkas: «Studentai mokosi sunkios ________ (gramatika).»", "gramatikos", "Kilmininkas (-os)", "gramatika → gramatikos."),
    fill("Mokytis + Kilmininkas: «Mes mokomės naujų ________ (žodžiai).»", "žodžių", "Daugiskaitos kilmininkas (-ių)", "žodžiai (мн. ч.) → žodžių."),
    fill("Studijuoti + Galininkas: «Tomas studijuoja ________ (medicina).»", "mediciną", "Galininkas (-ą)", "Глагол studijuoti требует винительного падежа (Galininkas): medicina → mediciną."),
    fill("Studijuoti + Galininkas: «Lina universitete studijuoja ________ (teisė).»", "teisę", "Galininkas (-ę)", "teisė → teisę."),
    fill("Studijuoti + Galininkas: «Andrius studijuoja ________ (ekonomika).»", "ekonomiką", "Galininkas (-ą)", "ekonomika → ekonomiką."),
    fill("Kursas (Vietininkas): «Aš studijuoju antrame ________ (kursas).»", "kurse", "Vietininkas (-e)", "kursas → kurse."),
    mc("Kuo skiriasi «studijuoti» ir «mokytis»?", [
        "Studijuoti vartojama su galininku (studijuoju teisę), o mokytis — su kilmininku (mokausi kalbos).",
        "Jie reiškia visiškai tą patį ir reikalauja vardininko.",
        "Studijuoti reiškia dirbti.",
        "Mokytis reiškia atostogauti."
    ], "Studijuoti vartojama su galininku (studijuoju teisę), o mokytis — su kilmininku (mokausi kalbos).", "Грамматическое различие: studijuoti + Galininkas, mokytis + Kilmininkas."),
    mc("Kuriame universitete? «Studijuoju Vilniaus ________.»", ["universitete", "universitetas", "universiteto", "universitetą"], "universitete", "Вопрос Kur? требует местного падежа: universitetas → universitete.")
]

# ================= CHAPTER 20 =================
# Book 2, Ch 20 (p. 206-215) & Answers (p. 24):
# Ką mėgsti veikti laisvalaikiu? Pomėgiai, sportas, laisvalaikis.
# Mėgti / Patikti / Mokėti + bendratis (mėgstu skaityti, plaukioti, šokti; moku slidinėti)
# Žaisti + Galininkas (žaisti futbolą, krepšinį, tenisą, šachmatais)
# Domėtis + Įnagininkas (domiuosi muzika, menu, fotografija)
ch20_exercises = [
    fill("Bendratis po mėgti: «Laisvalaikiu aš labai mėgstu ________ (skaityti) knygas.»", "skaityti", "Bendratis (инфинитив)", "После глагола mėgti действие выражается инфинитивом: skaityti."),
    fill("Bendratis po mokėti: «Ar tu moki gerai ________ (plaukti)?»", "plaukti", "Bendratis", "mokėti + plaukti."),
    fill("Bendratis po patikti: «Man labai patinka kalnuose ________ (slidinėti).»", "slidinėti", "Bendratis", "patikti + slidinėti."),
    fill("Žaisti + Galininkas: «Vaikinai kieme žaidžia ________ (krepšinis).»", "krepšinį", "Galininkas (-į)", "Названия спортивных игр с мячом ставятся в винительный падеж: krepšinis → krepšinį."),
    fill("Žaisti + Galininkas: «Savaitgalį žaidžiame ________ (futbolas).»", "futbolą", "Galininkas (-ą)", "futbolas → futbolą."),
    fill("Žaisti + Galininkas: «Mano draugas žaidžia stalo ________ (tenisas).»", "tenisą", "Galininkas (-ą)", "tenisas → tenisą."),
    fill("Domėtis + Įnagininkas: «Aš labai domiuosi klasikine ________ (muzika).»", "muzika", "Įnagininkas (-a)", "Глагол domėtis (интересоваться) требует творительного падежа (kuo?): muzika → muzika."),
    fill("Domėtis + Įnagininkas: «Tomas domisi moderniuoju ________ (menas).»", "menu", "Įnagininkas (-u)", "menas → menu."),
    fill("Domėtis + Įnagininkas: «Ji domisi Lietuvos ________ (istorija).»", "istorija", "Įnagininkas (-a)", "istorija → istorija."),
    mc("Kaip paklausti apie pomėgius?", ["Ką mėgsti veikti laisvalaikiu?", "Koks jūsų telefono numeris?", "Kur yra artimiausia vaistinė?", "Kiek kainuoja bilietas?"], "Ką mėgsti veikti laisvalaikiu?", "«Ką mėgsti veikti laisvalaikiu?» — Чем любишь заниматься в свободное время?"),
    mc("Kaip pakviesti draugą kartu praleisti laiką?", [
        "Gal norėtum šiandien eiti į kiną?",
        "Prašom sąskaitą!",
        "Man skauda galvą.",
        "Kuo jūs dirbate?"
    ], "Gal norėtum šiandien eiti į kiną?", "Вежливое приглашение: «Gal norėtum...?» (Может, ты хотел бы...?).")
]

# ================= CHAPTER 21 =================
# Book 2, Ch 21 (p. 225-234) & Answers (p. 24-25):
# Su gimtadieniu! Šventės, sveikinimai, dovanos.
# Linkėti + Kilmininkas (Linkiu sveikatos, laimės, sėkmės, džiaugsmo, meilės)
# Su + Įnagininkas (Sveikinu su gimtadieniu, su šventėmis, su Naujaisiais metais)
# Dovanoti + Galininkas (Dovanoju gėlių puokštę, knygą, bilietą)
ch21_exercises = [
    fill("Su + Įnagininkas: «Nuoširdžiai sveikinu su ________ (gimtadienis)!»", "gimtadieniu", "Įnagininkas (-iu)", "Предлог su требует творительного падежа: gimtadienis → su gimtadieniu!"),
    fill("Su + Įnagininkas: «Sveikiname su didžiąja ________ (šventė)!»", "švente", "Įnagininkas (-e)", "šventė → su švente!"),
    fill("Su + Įnagininkas: «Sveikinu su Naujaisiais ________ (metai)!»", "metais", "Daugiskaitos įnagininkas (-ais)", "metai (мн. ч.) → su Naujaisiais metais!"),
    fill("Linkėti + Kilmininkas: «Gimtadienio proga linkiu daug ________ (sveikata).»", "sveikatos", "Kilmininkas (-os)", "Глагол linkėti (желать) ВСЕГДА требует родительного падежа (ko?): sveikata → sveikatos."),
    fill("Linkėti + Kilmininkas: «Linkiu didelės ________ (laimė).»", "laimės", "Kilmininkas (-ės)", "laimė → laimės."),
    fill("Linkėti + Kilmininkas: «Linkime profesinės ________ (sėkmė).»", "sėkmės", "Kilmininkas (-ės)", "sėkmė → sėkmės."),
    fill("Linkėti + Kilmininkas: «Linkiu gražios ________ (meilė).»", "meilės", "Kilmininkas (-ės)", "meilė → meilės."),
    fill("Linkėti + Kilmininkas: «Linkime daug ________ (džiaugsmas).»", "džiaugsmo", "Kilmininkas (-o)", "džiaugsmas → džiaugsmo."),
    fill("Dovanoti + Galininkas: «Dovanoju tau šią įdomią ________ (knyga).»", "knygą", "Galininkas (-ą)", "Прямое дополнение к dovanoti стоит в винительном падеже: knyga → knygą."),
    fill("Dovanoti + Galininkas: «Nupirkome gražią gėlių ________ (puokštė).»", "puokštę", "Galininkas (-ę)", "puokštė → puokštę."),
    mc("Kaip pasveikinti su gimtadieniu?", ["Su gimtadieniu!", "Skanaus!", "Į sveikatą!", "Geros kelionės!"], "Su gimtadieniu!", "«Su gimtadieniu!» — С днем рождения!"),
    mc("Ką reiškia tostų šūkis «Į sveikatą!»?", ["За здоровье! (тост или при чихании)", "Приятного аппетита!", "До свидания!", "Счастливого пути!"], "За здоровье! (тост или при чихании)", "«Į sveikatą!» — За здоровье!"),
    mc("Kaip atsakyti į gražų sveikinimą?", ["Ačiū už gražius žodžius ir sveikinimus!", "Atsiprašau, aš nesuprantu.", "Kiek kainuoja bilietas?", "Kelių kambarių butas?"], "Ačiū už gražius žodžius ir sveikinimus!", "Вежливая благодарность за поздравление.")
]

print("Chapters 17-21 defined successfully.")
