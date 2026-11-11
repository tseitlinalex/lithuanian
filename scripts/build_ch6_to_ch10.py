# -*- coding: utf-8 -*-
from generate_complete_exercises_all_21 import mc, fill

# ================= CHAPTER 6 =================
# Book 1, Ch 6 (p. 111-119) & Answers (p. 9-10):
# Kieno? Kilmininkas (mano tėvo, mamos, brolio, sesers vardas...)
# Būdvardžių laipsniavimas (jaunesnis už mane, vyresnis, didesnis, mažesnis...)
ch6_exercises = [
    fill("Įrašykite Kieno? formą: «Mano ________ (mama) vardas yra Ona.»", "mamos", "Kilmininkas (-os)", "Вопрос 'Kieno vardas?' требует родительного падежа: mama → mamos."),
    fill("Įrašykite Kieno? formą: «Mano ________ (tėvas) vardas yra Jonas.»", "tėvo", "Kilmininkas (-o)", "tėvas → tėvo."),
    fill("Įrašykite Kieno? formą: «Mano ________ (brolis) vardas yra Tomas.»", "brolio", "Kilmininkas (-io)", "brolis → brolio."),
    fill("Įrašykite Kieno? formą: «Mano ________ (sesuo) vardas yra Lina.»", "sesers", "Kilmininkas (-ers)", "sesuo в родительном падеже — 'sesers'."),
    fill("Įrašykite Kieno? formą: «Mano ________ (draugė) pavardė yra Kazlauskaitė.»", "draugės", "Kilmininkas (-ės)", "draugė → draugės."),
    fill("Įrašykite Kieno? formą: «Čia yra mano ________ (vyras) automobilis.»", "vyro", "Kilmininkas (-o)", "vyras → vyro."),
    fill("Įrašykite Kieno? formą: «Čia yra mano ________ (žmona) telefonas.»", "žmonos", "Kilmininkas (-os)", "žmona → žmonos."),
    mc("Palyginimas: «Mano brolis yra jaunesnis ________ mane.»", ["už", "negu", "prie", "iš"], "už", "Для сравнения с местоимением используется предлог 'už' + Galininkas: 'jaunesnis už mane' (моложе меня)."),
    mc("Palyginimas: «Mano sesuo yra vyresnė ________ mane.»", ["už", "prie", "iš", "po"], "už", "«vyresnė už mane» (старше меня)."),
    mc("Sudarykite aukštesnįjį laipsnį: «senas» → ...", ["senesnis", "seniausias", "senas", "seniau"], "senesnis", "Сравнительная степень мужского рода образуется суффиксом -esnis: senas → senesnis."),
    mc("Sudarykite aukštesnįjį laipsnį: «didelis» → ...", ["didesnis", "didelis", "didžiausias", "didis"], "didesnis", "didelis → didesnis (больше)."),
    mc("Sudarykite aukštesnįjį laipsnį: «mažas» → ...", ["mažesnis", "mažas", "mažiausias", "mažiau"], "mažesnis", "mažas → mažesnis (меньше).")
]

# ================= CHAPTER 7 =================
# Book 1, Ch 7 (p. 132-141) & Answers (p. 10-11):
# Valgyti / gerti (valgau, valgai, valgo, valgome, valgote, valgo)
# Ko norite? Norėčiau kavos, arbatos, sriubos (Kilmininkas dalies)
# Mėgstu blynus, picą (Galininkas) vs Nemėgstu blynų, picos (Kilmininkas)
ch7_exercises = [
    fill("Įrašykite valgyti formą: «Aš pusryčiams ________ (valgyti) kiaušinienę.»", "valgau", "1 лицо ед. ч.", "Для 'aš' глагол valgyti имеет форму 'valgau'."),
    fill("Įrašykite valgyti formą: «Ką tu paprastai ________ (valgyti) pietums?»", "valgai", "2 лицо ед. ч.", "Для 'tu' форма глагола valgyti — 'valgai'."),
    fill("Įrašykite valgyti formą: «Tomas ir Lina ________ (valgyti) salotas.»", "valgo", "3 лицо мн. ч.", "Для 3 лица форма глагола valgyti — 'valgo'."),
    fill("Įrašykite gerti formą: «Aš ryte ________ (gerti) juodą kavą.»", "geriu", "1 лицо ед. ч.", "Для 'aš' форма глагола gerti — 'geriu'."),
    fill("Įrašykite gerti formą: «Mes kavinėje ________ (gerti) arbatą.»", "geriame", "1 лицо мн. ч.", "Для 'mes' форма — 'geriame'."),
    fill("Įrašykite dalies kilmininką: «Aš norėčiau ________ (kava).»", "kavos", "Kilmininkas (-os)", "При вежливом заказе вещества/напитка употребляется родительный падеж (dalies kilmininkas): kava → kavos."),
    fill("Įrašykite dalies kilmininką: «Prašom duoti ________ (vanduo).»", "vandens", "Kilmininkas (-ens)", "vanduo в родительном падеже имеет форму 'vandens'."),
    fill("Įrašykite dalies kilmininką: «Norėčiau karštos ________ (sriuba).»", "sriubos", "Kilmininkas (-os)", "sriuba → sriubos."),
    fill("Mėgti + Galininkas: «Aš labai mėgstu ________ (pica).»", "picą", "Galininkas (-ą)", "Глагол mėgti (любить что-то) в утверждении требует винительного падежа: pica → picą."),
    fill("Mėgti + Galininkas: «Tomas mėgsta itališkus ________ (ledai).»", "ledus", "Daugiskaitos galininkas (-us)", "ledai (мн. ч.) в винительном падеже — 'ledus'."),
    fill("Nemėgti + Kilmininkas: «Aš nemėgstu ________ (žuvis).»", "žuvies", "Kilmininkas (-ies)", "С отрицанием 'nemėgti' ВСЕГДА используется родительный падеж: žuvis → žuvies."),
    fill("Nemėgti + Kilmininkas: «Lina nemėgsta saldžios ________ (kava).»", "kavos", "Kilmininkas (-os)", "kava → kavos."),
    mc("Parinkite tinkamą padavėjo frazę: «– Ko norėtumėte? – ...»", ["Norėčiau vištienos su ryžiais.", "Aš esu Jonas.", "Iki rytojaus!", "Nieko tokio."], "Norėčiau vištienos su ryžiais.", "Стандартная фраза заказа в ресторане: «Norėčiau...»."),
    mc("Kaip pasakyti: «Приятного аппетита!»?", ["Skanaus!", "Į sveikatą!", "Labai malonu!", "Prašom pakartoti!"], "Skanaus!", "Традиционное пожелание приятного аппетита в Литве — 'Skanaus!'."),
    mc("Kaip padėkoti už valgį: «Спасибо, было очень вкусно!»?", ["Ačiū, buvo labai skanu!", "Ačiū, gerai!", "Labas rytas!", "Prašom valgyti!"], "Ačiū, buvo labai skanu!", "«Ačiū, buvo labai skanu!» (Спасибо, было очень вкусно!).")
]

# ================= CHAPTER 8 =================
# Book 1, Ch 8 (p. 152-161) & Answers (p. 11-12):
# Būsimasis laikas (virsiu, virsi, virs, virsime, virsite, virs)
# Daugiskaitos kilmininkas po skaičių (10 pomidorų, 20 eurų, 5 obuoliai vs 10 obuolių)
# Turgus: kilogramas obuolių, litras pieno, butelis aliejaus...
ch8_exercises = [
    fill("Būsimasis laikas: «Rytoj aš ________ (eiti) į turgų.»", "eisiu", "1 лицо ед. ч.", "Будущее время для 'aš' имеет суффикс -siu: eiti → eisiu."),
    fill("Būsimasis laikas: «Ką tu rytoj ________ (veikti)?»", "veiksi", "2 лицо ед. ч.", "Для 'tu' в будущем времени суффикс -si: veikti → veiksi."),
    fill("Būsimasis laikas: «Tomas rytoj ________ (pirkti) daržovių.»", "pirks", "3 лицо", "Для 3-го лица в будущем времени окончание -s: pirkti → pirks."),
    fill("Būsimasis laikas: «Mes rytoj ________ (virti) skanią sriubą.»", "virsime", "1 лицо мн. ч.", "Для 'mes' суффикс -sime: virti → virsime."),
    fill("Būsimasis laikas: «Ar jūs rytoj ________ (būti) namie?»", "būsite", "2 лицо мн. ч.", "Для 'jūs' суффикс -site: būti → būsite."),
    fill("Kilmininkas po 10, 20: «Prašom duoti dešimt ________ (kiaušinis).»", "kiaušinių", "Daugiskaitos kilmininkas (-ių)", "Числительные на -dešimt (10, 20...) требуют родительного падежа множественного числа: kiaušinis → kiaušinių."),
    fill("Kilmininkas po 10, 20: «Prašom sverti du kilogramus ________ (pomidoras).»", "pomidorų", "Daugiskaitos kilmininkas (-ų)", "pomidoras → pomidorų."),
    fill("Kilmininkas po 10, 20: «Tai kainuoja dvidešimt ________ (euras).»", "eurų", "Daugiskaitos kilmininkas (-ų)", "euras → eurų."),
    fill("Kilmininkas po 10, 20: «Nusipirkau penkis kilogramus ________ (bulvė).»", "bulvių", "Daugiskaitos kilmininkas (-ių)", "bulvė → bulvių."),
    fill("Kiekis: «Vienas litras ________ (pienas).»", "pieno", "Kilmininkas (-o)", "После меры объёма (litras) используется родительный падеж: pienas → pieno."),
    fill("Kiekis: «Vienas butelis ________ (aliejus).»", "aliejaus", "Kilmininkas (-aus)", "aliejus → aliejaus."),
    mc("Kiek kainuoja? «– Kiek kainuoja braškės? – ...»", ["Trys eurai už kilogramą.", "Aš esu turguje.", "Rytoj virsiu sriubą.", "Skanaus!"], "Trys eurai už kilogramą.", "Ответ на вопрос о цене: «Trys eurai už kilogramą» (3 евро за килограмм)."),
    mc("Kuris skaitvardis reikalauja vardininko (kas?): «du ...»?", ["obuoliai", "obuolių", "obuolio", "obuolyje"], "obuoliai", "После числительных 2-9 в именительном падеже существительное стоит в именительном падеже множественного числа (du obuoliai).")
]

# ================= CHAPTER 9 =================
# Book 1, Ch 9 (p. 172-181) & Answers (p. 13-14):
# Su + Įnagininkas (su pienu, su cukrumi, su citrina)
# Be + Kilmininkas (be pieno, be cukraus, be citrinos)
# Būtasis kartinis laikas (buvau, buvai, buvo, buvome, buvote, buvo; gėriau, valgiau...)
ch9_exercises = [
    fill("Su + Įnagininkas: «Aš geriu kavą su ________ (pienas).»", "pienu", "Įnagininkas (-u)", "Предлог su (с) требует творительного падежа (Įnagininkas): pienas → su pienu."),
    fill("Su + Įnagininkas: «Arbatą geriu su ________ (citrina).»", "citrina", "Įnagininkas (-a)", "citrina → su citrina."),
    fill("Su + Įnagininkas: «Kavą geriu su ________ (cukrus).»", "cukrumi", "Įnagininkas (-umi)", "cukrus (4 скл.) в творительном падеже — 'cukrumi': su cukrumi."),
    fill("Be + Kilmininkas: «Prašom kavos be ________ (pienas).»", "pieno", "Kilmininkas (-o)", "Предлог be (без) требует родительного падежа (Kilmininkas): pienas → be pieno."),
    fill("Be + Kilmininkas: «Arbatos be ________ (cukrus).»", "cukraus", "Kilmininkas (-aus)", "cukrus → be cukraus."),
    fill("Be + Kilmininkas: «Vandens be ________ (dujos).»", "dujų", "Kilmininkas (-ų)", "dujos → be dujų (негазированная вода)."),
    fill("Būtasis laikas: «Vakar aš ________ (būti) kavinėje.»", "buvau", "1 лицо ед. ч.", "Прошедшее время глагола būti для 'aš' — 'buvau' (я был/была)."),
    fill("Būtasis laikas: «Kur tu vakar ________ (būti)?»", "buvai", "2 лицо ед. ч.", "Для 'tu' прошедшее время глагола būti — 'buvai'."),
    fill("Būtasis laikas: «Tomas vakar ________ (gerti) skanią kavą.»", "gėrė", "3 лицо", "Прошедшее время глагола gerti для 3 лица — 'gėrė'."),
    fill("Būtasis laikas: «Mes vakar restorane ________ (valgyti) žuvį.»", "valgėme", "1 лицо мн. ч.", "Для 'mes' форма прошедшего времени — 'valgėme'."),
    fill("Būtasis laikas: «Ką jūs vakar ________ (veikti)?»", "veikėte", "2 лицо мн. ч.", "Для 'jūs' форма прошедшего времени — 'veikėte'."),
    mc("Kaip paprašyti sąskaitos kavinėje?", ["Prašom sąskaitą!", "Skanaus!", "Labai malonu!", "Kiek valandų?"], "Prašom sąskaitą!", "Вежливая фраза для расчета: «Prašom sąskaitą!» (Счет, пожалуйста!)."),
    mc("Kaip paklausti apie atsiskaitymo būdą?", ["Ar galima mokėti kortele?", "Ar jūs esate padavėjas?", "Koks jūsų vardas?", "Kur yra kavinė?"], "Ar galima mokėti kortele?", "«Ar galima mokėti kortele?» (Можно ли оплатить картой?).")
]

# ================= CHAPTER 10 =================
# Book 2, Ch 10 (p. 25-33) & Answers (p. 15-16):
# Priemonės įnagininkas (važiuoti autobusu, troleibusu, taksi, automobiliu, dviračiu, paspirtuku, pėsčiomis)
# Reikia + bendratis (reikia nuvažiuoti, nueiti, nusipirkti bilietą)
# Numeriai: aštuonioliktu autobusu, trečiu troleibusu...
ch10_exercises = [
    fill("Įrašykite transporto įnagininką: «Į universitetą važiuoju ________ (autobusas).»", "autobusu", "Įnagininkas (-u)", "Вид транспорта в значении средства передвижения стоит в творительном падеже: autobusas → autobusu."),
    fill("Įrašykite transporto įnagininką: «Į darbą važiuoju ________ (troleibusas).»", "troleibusu", "Įnagininkas (-u)", "troleibusas → troleibusu."),
    fill("Įrašykite transporto įnagininką: «Į centrą važiuoju ________ (dviratis).»", "dviračiu", "Įnagininkas (-iu)", "dviratis → dviračiu."),
    fill("Įrašykite transporto įnagininką: «Vaikas važiuoja ________ (paspirtukas).»", "paspirtuku", "Įnagininkas (-u)", "paspirtukas → paspirtuku."),
    fill("Įrašykite transporto įnagininką: «Į Kauną važiuojame ________ (traukinys).»", "traukiniu", "Įnagininkas (-iu)", "traukinys → traukiniu."),
    fill("Įrašykite transporto įnagininką: «Važiuojame ________ (automobilis).»", "automobiliu", "Įnagininkas (-iu)", "automobilis → automobiliu."),
    fill("Numeris: «Važiuoju trečiu ________ (troleibusas).»", "troleibusu", "Įnagininkas (-u)", "troleibusas → troleibusu."),
    fill("Reikia + bendratis: «Man reikia ________ (nusipirkti) bilietą.»", "nusipirkti", "Bendratis (инфинитив)", "Конструкция 'reikia' требует неопределенной формы глагола (инфинитива): nusipirkti."),
    fill("Reikia + bendratis: «Mums reikia ________ (pakeisti) autobusą.»", "pakeisti", "Bendratis", "reikia + pakeisti."),
    mc("Kaip pasakyti «идти пешком»?", ["eiti pėsčiomis", "važiuoti autobusu", "važiuoti mašina", "skristi lėktuvu"], "eiti pėsčiomis", "«eiti pėsčiomis» — идти пешком."),
    mc("Kaip paklausti kelio: «Как доехать до вокзала?»", ["Kaip nuvažiuoti į stotį?", "Kur yra mano draugas?", "Kada atvažiuos traukinys?", "Kiek kainuoja bilietas?"], "Kaip nuvažiuoti į stotį?", "«Kaip nuvažiuoti į stotį?» — стандартный вопрос о маршруте."),
    mc("Kur perkamas bilietas viešajam transportui?", ["kioske arba programėlėje", "ligoninėje", "ambasadoje", "banke"], "kioske arba programėlėje", "Билеты на общественный транспорт покупают в киоске (kioske) или через приложение.")
]

print("Chapters 6-10 defined successfully.")
