# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from generate_complete_exercises_all_21 import mc, fill

# Additional exercises for Book 1 (Chapters 3-9) covering all remaining atsakymai exercises

ch3_extra = [
    # Ex 6 & 7 Verb conjugations: gyventi, dirbti, studijuoti
    mc("Įrašykite tinkamą formą: Kur jūs ...? (gyventi)", ["gyvenate", "gyvenu", "gyvena", "gyvename"], "gyvenate", "Глагол gyventi во 2 лице мн. ч. (jūs) имеет окончание -ate: gyvenate."),
    mc("Įrašykite tinkamą formą: Mes ... Vilniuje. (gyventi)", ["gyvename", "gyvenu", "gyvena", "gyvenate"], "gyvename", "1 лицо мн. ч. (mes) — gyvename."),
    mc("Įrašykite tinkamą formą: Kur tu ...? (gyventi)", ["gyveni", "gyvena", "gyvenu", "gyvenate"], "gyveni", "2 лицо ед. ч. (tu) — gyveni."),
    mc("Įrašykite tinkamą formą: Tomas ir Lina ... Kaune. (gyventi)", ["gyvena", "gyvename", "gyvenate", "gyvenu"], "gyvena", "3 лицо (jie / jos) имеет форму gyvena."),
    mc("Įrašykite tinkamą formą: Ar jūs ... ligoninėje? (dirbti)", ["dirbate", "dirbu", "dirba", "dirbame"], "dirbate", "Глагол dirbti во 2 лице мн. ч. (jūs) — dirbate."),
    mc("Įrašykite tinkamą formą: Aš ... universitete. (dirbti)", ["dirbu", "dirba", "dirbate", "dirbame"], "dirbu", "1 лицо ед. ч. (aš) — dirbu."),
    mc("Įrašykite tinkamą formą: Mes ... Vilniaus universitete. (studijuoti)", ["studijuojame", "studijuoju", "studijuoja", "studijuojate"], "studijuojame", "1 лицо мн. ч. (mes) — studijuojame."),
    mc("Įrašykite tinkamą formą: Ką tu ...? (studijuoti)", ["studijuoji", "studijuoja", "studijuoju", "studijuojate"], "studijuoji", "2 лицо ед. ч. (tu) — studijuoji."),
    # Ex 9 Locative case (Vietininkas): Kur?
    mc("Įrašykite vietininko galūnę: Aš gyvenu Klaipėda → ...", ["Klaipėdoje", "Klaipėdos", "Klaipėdą", "Klaipėdai"], "Klaipėdoje", "Существительные женского рода на -a в местном падеже (Vietininkas) получают окончание -oje."),
    mc("Įrašykite vietininko galūnę: Mes esame Lietuva → ...", ["Lietuvoje", "Lietuvos", "Lietuvą", "Lietuvai"], "Lietuvoje", "Существительные на -a в местном падеже (Vietininkas) получают окончание -oje."),
    mc("Įrašykite vietininko galūnę: Ji dirba parduotuvė → ...", ["parduotuvėje", "parduotuvės", "parduotuvę", "parduotuve"], "parduotuvėje", "Существительные на -ė в местном падеже получают окончание -ėje."),
    mc("Įrašykite vietininko galūnę: Tomas dirba ligoninė → ...", ["ligoninėje", "ligoninės", "ligoninę", "ligonine"], "ligoninėje", "Существительные на -ė в местном падеже: ligoninėje."),
    mc("Įrašykite vietininko galūnę: Petras yra bankas → ...", ["banke", "banko", "banką", "bankui"], "banke", "Существительные мужского рода на -as в местном падеже получают окончание -e: banke."),
    mc("Įrašykite vietininko galūnę: Studentai mokosi biblioteka → ...", ["bibliotekoje", "bibliotekos", "biblioteką", "bibliotekoje"], "bibliotekoje", "Существительное на -a в местном падеже: bibliotekoje."),
    # Ex 14 Street names with Locative (Gatvėje / Aikštėje)
    mc("Kur yra kavinė? (Universiteto gatvė)", ["Universiteto gatvėje", "Universiteto gatvė", "Universiteto gatvės", "Universiteto gatve"], "Universiteto gatvėje", "Для адреса используется предложно-местный падеж: Universiteto gatvėje."),
    mc("Kur yra teatras? (Rotušės aikštė)", ["Rotušės aikštėje", "Rotušės aikštė", "Rotušės aikštės", "Rotušės aikšte"], "Rotušės aikštėje", "Для площади используется форма местного падежа: Rotušės aikštėje."),
    mc("Kur gyvena Paulius? (Pilies gatvė)", ["Pilies gatvėje", "Pilies gatvė", "Pilies gatvės", "Pilies gatvę"], "Pilies gatvėje", "Местный падеж (Vietininkas): Pilies gatvėje."),
    mc("Kur yra bankas? (Saulėtekio alėja)", ["Saulėtekio alėjoje", "Saulėtekio alėja", "Saulėtekio alėją", "Saulėtekio alėjos"], "Saulėtekio alėjoje", "Местный падеж на -oje: Saulėtekio alėjoje."),
    # Ex 15 Genitive with 'prie' (Kur yra? Prie ko?)
    mc("Kavinė yra prie ... (universitetas).", ["universiteto", "universitetas", "universitete", "universitetą"], "universiteto", "Предлог 'prie' требует родительного падежа (Kilmininkas): prie universiteto."),
    mc("Stotelė yra prie ... (teatras).", ["teatro", "teatras", "teatre", "teatrą"], "teatro", "Предлог 'prie' + Kilmininkas мужского рода (-o): prie teatro."),
    mc("Automobilis stovi prie ... (stotis).", ["stoties", "stotis", "stotyje", "stotį"], "stoties", "Предлог 'prie' + Kilmininkas женского рода 3 склонения (-ies): prie stoties."),
    mc("Mes susitinkame prie ... (mokykla).", ["mokyklos", "mokykla", "mokykloje", "mokyklą"], "mokyklos", "Предлог 'prie' + Kilmininkas (-os): prie mokyklos."),
    mc("Namas yra prie ... (ežeras).", ["ežero", "ežeras", "ežere", "ežerą"], "ežero", "Предлог 'prie' + Kilmininkas (-o): prie ežero."),
    # Ex 17 Prie vs Vietininkas (prie Klaipėdos vs Klaipėdoje)
    mc("Jie gyvena ne mieste, o šalia: prie ... (Klaipėda).", ["Klaipėdos", "Klaipėdoje", "Klaipėdą", "Klaipėda"], "Klaipėdos", "С предлогом 'prie' употребляется родительный падеж (Klaipėdos)."),
    mc("Jie gyvena pačiame mieste: ... (Klaipėda).", ["Klaipėdoje", "Klaipėdos", "Klaipėdą", "Klaipėda"], "Klaipėdoje", "Внутри города употребляется местный падеж (Klaipėdoje)."),
    # Numbers
    mc("Koks čia skaičius: 32?", ["trisdešimt du", "dvidešimt trys", "trylika", "trisdešimt"], "trisdešimt du", "32 по-литовски — 'trisdešimt du'."),
    mc("Koks čia skaičius: 66?", ["šešiasdešimt šeši", "šešiasdešimt septyni", "penkiasdešimt šeši", "septyniasdešimt šeši"], "šešiasdešimt šeši", "66 по-литовски — 'šešiasdešimt šeši'."),
    mc("Koks čia skaičius: 81?", ["aštuoniasdešimt vienas", "devyniasdešimt vienas", "aštuoniolika", "aštuoniasdešimt du"], "aštuoniasdešimt vienas", "81 — 'aštuoniasdešimt vienas'.")
]

ch4_extra = [
    # Ex 3 Days of the week
    mc("Kokia savaitės diena eina po pirmadienio?", ["antradienis", "trečiadienis", "sekmadienis", "penktadienis"], "antradienis", "После понедельника (pirmadienis) идет вторник (antradienis)."),
    mc("Kokia savaitės diena eina po trečiadienio?", ["ketvirtadienis", "penktadienis", "antradienis", "šeštadienis"], "ketvirtadienis", "После среды (trečiadienis) идет четверг (ketvirtadienis)."),
    mc("Kokia savaitės diena yra paskutinė savaitės diena?", ["sekmadienis", "šeštadienis", "penktadienis", "pirmadienis"], "sekmadienis", "Седьмой день недели — воскресенье (sekmadienis)."),
    # Ex 4 Accusative of destination (Į kur?) vs Locative (Kur?)
    mc("Į kur tu važiuoji? Aš važiuoju į ... (bažnyčia).", ["bažnyčią", "bažnyčioje", "bažnyčios", "bažnyčiai"], "bažnyčią", "Предлог 'į' с направлением требует винительного падежа (Galininkas): į bažnyčią."),
    mc("Į kur jūs einate? Mes einame į ... (teatras).", ["teatrą", "teatre", "teatro", "teatrui"], "teatrą", "Предлог 'į' + Galininkas мужского рода (-ą): į teatrą."),
    mc("Kur susitinkame? Susitinkame ... (prekybos centras).", ["prekybos centre", "prekybos centrą", "prekybos centro", "prekybos centre"], "prekybos centre", "Место ответа на вопрос 'Kur?' — местный падеж (Vietininkas): prekybos centre."),
    mc("Kur jie yra? Jie yra ... (oro uostas).", ["oro uoste", "oro uostą", "oro uosto", "oro uostui"], "oro uoste", "Местный падеж (Vietininkas): oro uoste."),
    # Ex 5 Preposition 'pas' + Accusative (pas ką?)
    mc("Einu pas ... (profesorius).", ["profesorių", "profesoriuje", "profesoriaus", "profesoriui"], "profesorių", "Предлог 'pas' требует винительного падежа лица (Galininkas): pas profesorių."),
    mc("Einu pas ... (kolegė).", ["kolegę", "kolegėje", "kolegės", "kolege"], "kolegę", "Предлог 'pas' + Galininkas женского рода: pas kolegę."),
    mc("Paulius eina pas ... (administratorius).", ["administratorių", "administratoriuje", "administratoriaus", "administratoriui"], "administratorių", "Предлог 'pas' + Galininkas: pas administratorių."),
    mc("Einu pas ... (Vilius ir Inga).", ["Vilių ir Ingą", "Viliuje ir Ingoje", "Viliaus ir Ingos", "Viliui ir Ingai"], "Vilių ir Ingą", "Винительный падеж имен собственных: Vilių ir Ingą."),
    # Ex 8 Eiti į ...
    mc("Įrašykite praleistą žodį: Mes ... į universitetą. (eiti)", ["einame", "einu", "eina", "einate"], "einame", "Форма 1 лица множественного числа от 'eiti' — 'einame'."),
    mc("Įrašykite praleistą žodį: Kur tu ...? (eiti)", ["eini", "eina", "einu", "einate"], "eini", "Форма 2 лица единственного числа от 'eiti' — 'eini'."),
    mc("Įrašykite praleistą žodį: Studentai ... į biblioteką. (eiti)", ["eina", "einame", "einate", "einu"], "eina", "Форма 3 лица от 'eiti' — 'eina'."),
    # Ex 9 Verbs: skubėti, vėluoti
    mc("Įrašykite formą: Aš labai ..., atsiprašau! (skubėti)", ["skubu", "skubi", "skuba", "skubame"], "skubu", "1 лицо ед. ч. от skubėti — skubu."),
    mc("Įrašykite formą: Traukinys ... dešimt minučių. (vėluoti)", ["vėluoja", "vėluoju", "vėluoji", "vėluojame"], "vėluoja", "3 лицо глагола vėluoti — vėluoja."),
    # Ex 17 Question words
    mc("Pasirinkite klausiamąjį žodį: ... tu eini? – Į kiną.", ["Kur", "Kas", "Kada", "Koks"], "Kur", "Направление 'Į kiną' отвечает на вопрос 'Kur?' (Куда?)."),
    mc("Pasirinkite klausiamąjį žodį: ... susitinkame? – Penktadienį.", ["Kada", "Kur", "Kas", "Kaip"], "Kada", "День недели отвечает на вопрос времени 'Kada?' (Когда?)."),
    mc("Pasirinkite klausiamąjį žodį: ... valandą susitinkame? – Penktą.", ["Kelintą", "Kiek", "Kada", "Kur"], "Kelintą", "Для указания точного часа используется вопрос 'Kelintą valandą?' (В котором часу?)."),
    mc("Pasirinkite klausiamąjį žodį: ... jūs esate? – Iš Prancūzijos.", ["Iš kur", "Kur", "Kas", "Kada"], "Iš kur", "Происхождение 'Iš Prancūzijos' отвечает на вопрос 'Iš kur?' (Откуда?).")
]

ch5_extra = [
    # Ex 5 Genitive of negation with 'neturėti' (Neturiu ko?)
    mc("Įrašykite neiginio formą: Aš neturiu ... (sesuo).", ["sesers", "seserį", "seseriai", "sesuo"], "sesers", "Отрицание 'neturiu' требует родительного падежа (Kilmininkas): neturiu sesers."),
    mc("Įrašykite neiginio formą: Jonas neturi ... (draugas).", ["draugo", "draugą", "drauge", "draugui"], "draugo", "Отрицание требует родительного падежа мужского рода (-o): draugo."),
    mc("Įrašykite neiginio formą: Lina neturi ... (draugė).", ["draugės", "draugę", "drauge", "draugei"], "draugės", "Отрицание женского рода на -ė в Kilmininkas: draugės."),
    mc("Įrašykite neiginio formą: Mes neturime ... (senelis).", ["senelio", "senelį", "seneliu", "senelis"], "senelio", "Kilmininkas от senelis: senelio."),
    mc("Įrašykite neiginio formą: Jis neturi ... (duktė).", ["dukters", "dukterį", "dukteriai", "duktė"], "dukters", "Особое склонение 'duktė' в Kilmininkas имеет форму 'dukters'."),
    mc("Įrašykite neiginio formą: Ji neturi ... (vyras).", ["vyro", "vyrą", "vyru", "vyrui"], "vyro", "Kilmininkas мужского рода: vyro."),
    mc("Įrašykite neiginio formą: Jis neturi ... (žmona).", ["žmonos", "žmoną", "žmonoje", "žmonai"], "žmonos", "Kilmininkas женского рода на -a: žmonos."),
    # Ex 6 Accusative with 'turėti' (Turiu ką?)
    mc("Įrašykite teiginio formą: Aš turiu ... (teta).", ["tetą", "tetos", "tetoje", "tetai"], "tetą", "Глагол turėti в утверждении требует винительного падежа (Galininkas): turiu tetą."),
    mc("Įrašykite teiginio formą: Tomas turi ... (sesuo).", ["seserį", "sesers", "seseriai", "seserimi"], "seserį", "Винительный падеж (Galininkas) от sesuo: seserį."),
    mc("Įrašykite teiginio formą: Mes turime ... (duktė).", ["dukterį", "dukters", "dukteriai", "duktė"], "dukterį", "Винительный падеж (Galininkas) от duktė: dukterį."),
    mc("Įrašykite teiginio formą: Ji turi ... (sūnus).", ["sūnų", "sūnaus", "sūnui", "sūnumi"], "sūnų", "Винительный падеж существительного на -us: sūnų."),
    # Ex 7 Plural forms (Daugiskaita)
    mc("Parašykite daugiskaitos formą: viena sesuo → dvi ...", ["seserys", "seserės", "seserų", "seseris"], "seserys", "Множественное число от sesuo — seserys."),
    mc("Parašykite daugiskaitos formą: viena duktė → dvi ...", ["dukterys", "dukterės", "dukterų", "dukteris"], "dukterys", "Множественное число от duktė — dukterys."),
    mc("Parašykite daugiskaitos formą: vienas sūnus → du ...", ["sūnūs", "sūniai", "sūnų", "sūnus"], "sūnūs", "Существительные мужского рода 4 склонения на -us во мн. ч. имеют долгую -ūs: sūnūs."),
    mc("Parašykite daugiskaitos formą: viena katė → dvi ...", ["katės", "kačių", "katėms", "kates"], "katės", "Множественное число на -ės: katės."),
    mc("Parašykite daugiskaitos formą: viena pilis → dvi ...", ["pilys", "pilių", "pilims", "pilis"], "pilys", "Существительные женского рода на -is во мн. ч. имеют окончание -ys: pilys."),
    # Ex 15 & 16 Verb conjugations: mylėti, turėti, sėdėti, žiūrėti, stovėti
    mc("Įrašykite formą: Aš labai ... savo šeimą. (mylėti)", ["myliu", "myli", "mylime", "mylite"], "myliu", "Глагол mylėti (e-тип спряжения): аš myliu."),
    mc("Įrašykite formą: Tėvai ... savo vaikus. (mylėti)", ["myli", "myliu", "mylime", "mylite"], "myli", "Форма 3 лица: jie myli."),
    mc("Įrašykite formą: Vaikai ... televizorių. (žiūrėti)", ["žiūri", "žiūriu", "žiūrime", "žiūrite"], "žiūri", "3 лицо от žiūrėti — žiūri."),
    mc("Įrašykite formą: Kur jūs dabar ...? (sėdėti)", ["sėdite", "sėdi", "sėdžiu", "sėdime"], "sėdite", "2 лицо мн. ч. (jūs) — sėdite."),
    mc("Įrašykite formą: Mes ... prie stalo. (stovėti)", ["stovime", "stoviu", "stovi", "stovite"], "stovime", "1 лицо мн. ч. (mes) — stovime.")
]

ch6_extra = [
    # Ex 2 & 3 Adjective opposites and attributes
    mc("Kokia priešinga reikšmė: didelis ↔ ...", ["mažas", "senas", "gražus", "protingas"], "mažas", "Антоним слова didelis (большой) — mažas (маленький)."),
    mc("Kokia priešinga reikšmė: jaunas ↔ ...", ["senas", "mažas", "trumpas", "blogas"], "senas", "Антоним слова jaunas (молодой) — senas (старый)."),
    mc("Kokia priešinga reikšmė: aukštas ↔ ...", ["žemas", "didelis", "geras", "naujas"], "žemas", "Антоним слова aukštas (высокий) — žemas (низкий)."),
    # Ex 5 Adjective agreement (Giminė ir derinimas)
    mc("Parinkite tinkamą būdvardžio formą: ... vyras (aukštas / aukšta)", ["aukštas", "aukšta", "aukšti", "aukštos"], "aukštas", "Мужской род ед. ч. — aukštas vyras."),
    mc("Parinkite tinkamą būdvardžio formą: ... mama (gražus / graži)", ["graži", "gražus", "gražios", "gražūs"], "graži", "Женский род ед. ч. — graži mama."),
    mc("Parinkite tinkamą būdvardžio formą: ... sesuo (protingas / protinga)", ["protinga", "protingas", "protingos", "protingi"], "protinga", "Женский род ед. ч. — protinga sesuo."),
    mc("Parinkite tinkamą būdvardžio formą: ... vaikas (draugiškas / draugiška)", ["draugiškas", "draugiška", "draugiški", "draugiškos"], "draugiškas", "Слово vaikas мужского рода — draugiškas vaikas."),
    # Ex 7 Genitive of possession: Kieno?
    mc("Kieno čia knyga? Tai yra mano ... (sesuo) knyga.", ["sesers", "seseriai", "seserį", "seserimi"], "sesers", "Принадлежность (родительный падеж) от sesuo: sesers."),
    mc("Kieno čia automobilis? Tai yra mano ... (brolis) automobilis.", ["brolio", "brolį", "broliui", "broliu"], "brolio", "Родительный падеж мужского рода: brolio."),
    mc("Koks tavo mamos vardas? Mano ... (mama) vardas yra Lina.", ["mamos", "mamą", "mamai", "mamoje"], "mamos", "Родительный падеж женского рода: mamos."),
    mc("Koks tavo tėčio vardas? Mano ... (tėtis) vardas yra Jonas.", ["tėčio", "tėtį", "tėčiui", "tėčiu"], "tėčio", "Окончание родительного падежа от tėtis: tėčio."),
    # Ex 8 & 9 Pronoun possession: jo, jos, jų
    mc("Petras turi šunį. ... šuo yra labai draugiškas.", ["Jo", "Jos", "Jų", "Mano"], "Jo", "Притяжательное местоимение от jis (он) — 'Jo' (его)."),
    mc("Rūta turi katę. ... katė yra balta.", ["Jos", "Jo", "Jų", "Tavo"], "Jos", "Притяжательное местоимение от ji (она) — 'Jos' (её)."),
    mc("Mokiniai sėdi klasėje. ... mokytoja yra labai gera.", ["Jų", "Jo", "Jos", "Mano"], "Jų", "Притяжательное местоимение от jie/jos (они) — 'Jų' (их).")
]

ch7_extra = [
    # Ex 2 & 3 Food vocabulary
    mc("Kuris žodis čia netinka: kava, arbata, sultys, dešra?", ["dešra", "kava", "arbata", "sultys"], "dešra", "Dešra (колбаса) — это еда, а остальные — напитки (gėrimai)."),
    mc("Kuris žodis čia netinka: sviestas, sūris, pienas, obuolys?", ["obuolys", "sviestas", "sūris", "pienas"], "obuolys", "Obuolys (яблоко) — это фрукт, а остальные — молочные продукты (pieno produktai)."),
    # Ex 5 & 6 Past tense / Present of valgyti, gerti, norėti
    mc("Įrašykite tinkamą formą: Ką tu ryte ...? (valgyti)", ["valgai", "valgau", "valgo", "valgome"], "valgai", "2 лицо ед. ч. от valgyti — valgai."),
    mc("Įrašykite tinkamą formą: Mes pusryčiams ... košę. (valgyti)", ["valgome", "valgau", "valgai", "valgote"], "valgome", "1 лицо мн. ч. от valgyti — valgome."),
    mc("Įrašykite tinkamą formą: Aš noriu ... vandens. (gerti)", ["gerti", "geriu", "geri", "geria"], "gerti", "После глагола norėti употребляется инфинитив: gerti."),
    mc("Įrašykite tinkamą formą: Ar jūs ... kavą be cukraus? (gerti)", ["geriate", "geriu", "geri", "geriame"], "geriate", "2 лицо мн. ч. — geriate."),
    # Ex 10 Genitive with food/drink partitives (Ko norite?)
    mc("Ko norėtumėte atsigerti? Norėčiau ... (arbatos / arbata).", ["arbatos", "arbata", "arbatą", "arbatoje"], "arbatos", "После norėti / norėčiau употребляется родительный падеж (Kilmininkas): arbatos."),
    mc("Ko norėtumėte? Norėčiau šalto ... (vanduo).", ["vandens", "vandenį", "vanduo", "vandenyje"], "vandens", "Родительный падеж от vanduo — vandens."),
    mc("Prašom duoti juodos ... (duona).", ["duonos", "duoną", "duona", "duonai"], "duonos", "Родительный падеж женского рода: duonos."),
    mc("Noriu gabalėlio ... (sūris).", ["sūrio", "sūrį", "sūris", "sūryje"], "sūrio", "Родительный падеж: sūrio."),
    mc("Vaikas nori saldaus ... (pienas).", ["pieno", "pieną", "pienas", "piene"], "pieno", "Родительный падеж: pieno."),
    # Ex 18 Skanus, karštas, šaltas agreement
    mc("Kava yra labai ... (karštas / karšta).", ["karšta", "karštas", "karšti", "karštos"], "karšta", "Kava — женский род, поэтому karšta kava."),
    mc("Kepsnys yra labai ... (skanus / skani).", ["skanus", "skani", "skanūs", "skanios"], "skanus", "Kepsnys — мужской род: skanus kepsnys."),
    mc("Sriuba yra ... (šaltas / šalta).", ["šalta", "šaltas", "šalti", "šaltos"], "šalta", "Sriuba — женский род: šalta sriuba.")
]

ch8_extra = [
    # Ex 4 Fruits and vegetables grouping
    mc("Kuris iš šių yra vaisius (фрукт)?", ["apelsinas", "morka", "bulvė", "agurkas"], "apelsinas", "Apelsinas (апельсин) — фрукт, остальные — овощи."),
    mc("Kuris iš šių yra daržovė (овощ)?", ["kopūstas", "bananas", "obuolys", "kriaušė"], "kopūstas", "Kopūstas (капуста) — овощ, остальные — фрукты."),
    # Ex 16 Genitive plural in market shopping: Prašom duoti ko?
    mc("Prašom duoti vieną kilogramą ... (obuoliai).", ["obuolių", "obuolius", "obuoliams", "obuoliais"], "obuolių", "Родительный падеж множественного числа (Daugiskaitos kilmininkas): obuolių."),
    mc("Prašom pasverti du kilogramus ... (bulvės).", ["bulvių", "bulves", "bulvėms", "bulvėmis"], "bulvių", "Daugiskaitos kilmininkas: bulvių."),
    mc("Noriu nusipirkti saldžių ... (braškės).", ["braškių", "braškes", "braškėms", "braškėmis"], "braškių", "Daugiskaitos kilmininkas: braškių."),
    mc("Prašom duoti kilogramą ... (pomidorai).", ["pomidorų", "pomidorus", "pomidorams", "pomidoruose"], "pomidorų", "Daugiskaitos kilmininkas: pomidorų."),
    mc("Nupirk maišelį ... (morkos).", ["morkų", "morkas", "morkoms", "morkomis"], "morkų", "Daugiskaitos kilmininkas: morkų."),
    # Ex 17 Numbers with Accusative plural (du, trys, keturi... ką?)
    mc("Prašom duoti ... (du / moliūgas).", ["du moliūgus", "du moliūgai", "du moliūgų", "dvi moliūgas"], "du moliūgus", "С числительными 2-9 в функции дополнения употребляется винительный падеж мн. ч.: du moliūgus."),
    mc("Prašom duoti ... (trys / morka).", ["tris morkas", "trys morkos", "trijų morkų", "trimis morkomis"], "tris morkas", "Женский род: tris morkas."),
    mc("Prašom duoti ... (keturi / agurkas).", ["keturis agurkus", "keturi agurkai", "keturių agurkų", "keturiems agurkams"], "keturis agurkus", "Мужской род: keturis agurkus."),
    mc("Prašom duoti ... (dvi / kriaušė).", ["dvi kriaušes", "du kriaušes", "dvejų kriaušių", "dviem kriaušėms"], "dvi kriaušes", "Числительное dvi женского рода: dvi kriaušes."),
    # Ex 18 Euro currency with numbers
    mc("Kiek kainuoja? – Tai kainuoja 21 ...", ["eurą", "eurai", "eurų", "eurus"], "eurą", "С числительными, оканчивающимися на 1 (кроме 11), употребляется именительный ед. ч. (или винительный eurus/eurą): 21 euras / eurą."),
    mc("Kiek kainuoja? – Tai kainuoja 5 ...", ["eurus / eurų", "eurai", "euras", "eurui"], "eurus / eurų", "С 5 обычно употребляется форма eurų / eurus.")
]

ch9_extra = [
    # Ex 4 Restaurant orders: Su kuo? (Įnagininkas)
    mc("Norėčiau kavos su ... (pienas).", ["pienu", "pieną", "piene", "pieno"], "pienu", "Предлог 'su' требует творительного падежа (Įnagininkas): su pienu."),
    mc("Norėčiau arbatos su ... (citrina).", ["citrina", "citriną", "citrinos", "citrinoje"], "citrina", "Предлог 'su' + творительный падеж (Įnagininkas): su citrina."),
    mc("Užsisakiau blynelių su ... (uogienė).", ["uogiene", "uogienę", "uogienės", "uogienei"], "uogiene", "Įnagininkas женского рода на -ė: su uogiene."),
    mc("Man patinka kava be ... (cukrus).", ["cukraus", "cukrų", "cukrumi", "cukruje"], "cukraus", "Предлог 'be' (без) требует родительного падежа (Kilmininkas): be cukraus."),
    # Ex 10 Verb norėti (Present & Conditional norėčiau)
    mc("Aš ... užsisakyti sriubos. (norėti - tariamoji nuosaka)", ["norėčiau", "norėtum", "norėtų", "norėtume"], "norėčiau", "Вежливая форма условного наклонения 1 лица ед. ч. — norėčiau (я хотел(а) бы)."),
    mc("Ką jūs ... užsisakyti? (norėti - tariamoji nuosaka)", ["norėtumėte", "norėčiau", "norėtum", "norėtų"], "norėtumėte", "Форма 2 лица мн. ч. вежливости — norėtumėte."),
    # Ex 14 Bill / Payment in cafe
    mc("Padavėjau, ar galėtumėte atnešti ...?", ["sąskaitą", "sąskaita", "sąskaitos", "sąskaitoje"], "sąskaitą", "Винительный падеж дополнения: atnešti sąskaitą (счёт)."),
    mc("Kaip mokėsite? – Mokėsiu ... (kortelė).", ["kortele", "kortelę", "kortelės", "kortelėje"], "kortele", "Орудие действия / способ оплаты передается творительным падежом: kortele (картой)."),
    mc("Ar galima mokėti ... (grynieji pinigai)?", ["grynaisiais", "grynus", "grynuose", "grynųjų"], "grynaisiais", "Mokėti grynaisiais — платить наличными.")
]
