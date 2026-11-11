# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from generate_complete_exercises_all_21 import mc, fill

# Additional exercises for Book 2 (Chapters 10-21) covering all remaining atsakymai exercises

ch10_extra = [
    # Ex 6 & 8 Transport with Instrumental: Kuoju važiuoti?
    mc("Į darbą važiuoju ... (troleibusas).", ["troleibusu", "troleibusą", "troleibuse", "troleibuso"], "troleibusu", "Транспорт в значении средства передвижения стоит в творительном падеже (Įnagininkas): troleibusu."),
    mc("Į centrą važiuojame ... (autobusas).", ["autobusu", "autobusą", "autobuse", "autobuso"], "autobusu", "Įnagininkas: autobusu."),
    mc("Vasarą dažnai važinėju ... (dviratis).", ["dviračiu", "dviratį", "dviračio", "dviračiuose"], "dviračiu", "Įnagininkas: dviračiu."),
    mc("Į Klaipėdą jie važiuoja ... (traukinys).", ["traukiniu", "traukinį", "traukinyje", "traukinio"], "traukiniu", "Įnagininkas: traukiniu."),
    mc("Į Londoną mes skrendame ... (lėktuvas).", ["lėktuvu", "lėktuvą", "lėktuve", "lėktuvo"], "lėktuvu", "Įnagininkas: lėktuvu."),
    mc("Važiuoju ... (aštuntas autobusas).", ["aštuntu autobusu", "aštuntas autobusas", "aštunto autobuso", "aštuntą autobusą"], "aštuntu autobusu", "Порядковое числительное и существительное согласуются в творительном падеже: aštuntu autobusu."),
    mc("Važiuoju ... (penktas troleibusas).", ["penktu troleibusu", "penktas troleibusas", "penkto troleibuso", "penktą troleibusą"], "penktu troleibusu", "Įnagininkas: penktu troleibusu."),
    # Ex 10 Directions: pasukti, nueiti, išlipti
    mc("Stotelėje reikia ... iš autobuso. (išlipti)", ["išlipti", "įlipti", "perlipti", "nelipti"], "išlipti", "Выйти из транспорта — išlipti."),
    mc("Prie šviesoforo ... į dešinę. (pasukti - liepiamoji nuosaka)", ["pasukite", "pasukti", "pasuka", "pasukome"], "pasukite", "Повелительное наклонение вежливости: pasukite į dešinę (поверните направо)."),
    mc("Iki stoties galima ... pėsčiomis. (nueiti)", ["nueiti", "nuvažiuoti", "skristi", "plaukti"], "nueiti", "Пешком — nueiti pėsčiomis.")
]

ch11_extra = [
    # Ex 6 & 7 Subjunctive: norėti / galėti
    mc("Ar tu ... man padėti? (galėti - tariamoji)", ["galėtum", "galėčiau", "galėtų", "galėtume"], "galėtum", "Условное наклонение 2 л. ед. ч. — galėtum."),
    mc("Mes ... išsinuomoti automobilį. (norėti - tariamoji)", ["norėtume", "norėčiau", "norėtum", "norėtų"], "norėtume", "1 л. мн. ч. — norėtume (или norėtumėme)."),
    mc("Jie ... atvažiuoti rytoj. (galėti - tariamoji)", ["galėtų", "galėtum", "galėčiau", "galėtume"], "galėtų", "3 л. условного наклонения не изменяется по числам: jie galėtų."),
    # Ex 9 Time prepositions: po + Kilmininkas (Po ko?)
    mc("Išvažiuojame po ... (viena valanda).", ["vienos valandos", "vieną valandą", "vienoje valandoje", "viena valanda"], "vienos valandos", "Предлог 'po' требует родительного падежа времени: po vienos valandos."),
    mc("Mašiną suremontuos po ... (viena savaitė).", ["savaitės", "savaitę", "savaitėje", "savaitė"], "savaitės", "Po + Kilmininkas: po savaitės."),
    mc("Traukinys atvyks po ... (dešimt minučių).", ["dešimties minučių", "dešimt minutes", "dešimtyje minučių", "dešimčia minučių"], "dešimties minučių", "Po + Kilmininkas: po dešimties minučių."),
    # Ex 10 Duration Dative: kuriam laikui? (Naudininkas)
    mc("Noriu išsinuomoti automobilį vienai ... (para).", ["parai", "parą", "paros", "paroje"], "parai", "Время, на которое берется предмет, выражается дательным падежом (Naudininkas): vienai parai."),
    mc("Išsinuomosime mašiną dviem ... (savaitė).", ["savaitėms", "savaites", "savaičių", "savaitėmis"], "savaitėms", "Naudininkas множественного числа: dviem savaitėms."),
    mc("Bute apsistosime vienam ... (mėnuo).", ["mėnesiui", "mėnesį", "mėnesio", "mėnesiu"], "mėnesiui", "Naudininkas: vienam mėnesiui.")
]

ch12_extra = [
    # Ex 3 Rooms & Apartment vocabulary
    mc("Kuriame kambaryje žmonės miega?", ["miegamajame", "virtuvėje", "vonios kambaryje", "koridoriuje"], "miegamajame", "Спальня по-литовски — miegamasis (miegamajame)."),
    mc("Kuriame kambaryje gaminamas maistas?", ["virtuvėje", "svetainėje", "miegamajame", "balkone"], "virtuvėje", "Кухня — virtuvė (virtuvėje)."),
    # Ex 4 Furniture
    mc("Kuris daiktas stovi miegamajame?", ["lova", "orkaitė", "šaldytuvas", "viryklė"], "lova", "Кровать — lova."),
    mc("Kuris daiktas stovi virtuvėje?", ["šaldytuvas", "lova", "rašomasis stalas", "vonia"], "šaldytuvas", "Холодильник — šaldytuvas."),
    # Ex 7 Prepositions of place: ant, po, prie, tarp
    mc("Knyga guli ... stalo. (на столе)", ["ant", "po", "prie", "tarp"], "ant", "На поверхности — предлог 'ant' + Kilmininkas."),
    mc("Katė miega ... stalu. (под столом)", ["po", "ant", "į", "už"], "po", "Под чем-то — предлог 'po' + Įnagininkas: po stalu."),
    mc("Stalas stovi ... lango. (около окна)", ["prie", "po", "į", "iš"], "prie", "Около — предлог 'prie' + Kilmininkas: prie lango."),
    # Ex 10 Ordinal numbers for floors (Kelintame aukšte?)
    mc("Aš gyvenu ... aukšte. (antras)", ["antrame", "antras", "antro", "antram"], "antrame", "Местный падеж порядкового числительного: antrame aukšte (на втором этаже)."),
    mc("Butas yra ... aukšte. (penktas)", ["penktame", "penktas", "penkto", "penktam"], "penktame", "Vietininkas: penktame aukšte.")
]

ch13_extra = [
    # Ex 3 Appliances & breakdown
    mc("Kuris prietaisas plauna indus?", ["indaplovė", "skalbyklė", "lygintuvas", "virdulys"], "indaplovė", "Посудомоечная машина — indaplovė."),
    mc("Kuris prietaisas skalbia drabužius?", ["skalbyklė", "indaplovė", "mikrobangų krosnelė", "orkaitė"], "skalbyklė", "Стиральная машина — skalbyklė."),
    mc("Arbatai užvirinti vandenį naudojame ...", ["virdulį", "lygintuvą", "dulkių siurblį", "šaldytuvą"], "virdulį", "Чайник — virdulys (virdulį)."),
    # Ex 5 Po + Įnagininkas (Po kuo?)
    mc("Reikia išvalyti po ... (lova).", ["lova", "lovos", "lovą", "lovoje"], "lova", "Предлог 'po' в значении места (под) требует творительного падежа (Įnagininkas): po lova."),
    mc("Šuo slepiasi po ... (stalas).", ["stalu", "stalo", "stalą", "stale"], "stalu", "Įnagininkas: po stalu."),
    # Ex 7 Nuo + Kilmininkas (Nuo ko?)
    mc("Prašom nuvalyti dulkes nuo ... (lentyna).", ["lentynos", "lentyną", "lentyna", "lentynoje"], "lentynos", "Предлог 'nuo' (с/от) требует родительного падежа (Kilmininkas): nuo lentynos."),
    mc("Nuvalyk dulkes nuo ... (stalas).", ["stalo", "stalą", "stalu", "stale"], "stalo", "Kilmininkas: nuo stalo."),
    # Ex 11 Verb aspect / commands: išjungti / įjungti
    mc("Išeidami iš namų ... šviesą! (išjungti - liepiamoji)", ["išjunkite", "įjunkite", "išjungti", "išjungė"], "išjunkite", "Повелительное наклонение: išjunkite šviesą (выключите свет)."),
    mc("Kai tamsu, prašom ... šviesą. (įjungti)", ["įjungti", "išjungti", "perjungti", "nujungti"], "įjungti", "Включить — įjungti.")
]

ch14_extra = [
    # Ex 3 Clothing vocabulary
    mc("Ką dėvime žiemą ant galvos?", ["kepurę", "šaliką", "batus", "pirštines"], "kepurę", "Шапка — kepurė."),
    mc("Ką mauname ant rankų, kai šalta?", ["pirštines", "koines", "kelines", "batus"], "pirštines", "Перчатки / варежки — pirštinės."),
    mc("Kuris drabužis yra vyriškas kostiumo elementas?", ["švarkas", "suknelė", "sijonas", "palaidinė"], "švarkas", "Пиджак — švarkas."),
    # Ex 5 Verb dėvėti / nešioti / apsivilkti
    mc("Ką tu šiandien ...? (dėvėti)", ["dėvi", "dėviu", "dėvi", "dėvime"], "dėvi", "2 л. ед. ч. от dėvėti — dėvi."),
    mc("Aš ... šiltą megztinį. (vilkėti)", ["velkuosi / vilkiu", "velkasi", "vilkite", "vilkime"], "velkuosi / vilkiu", "1 л. ед. ч.: vilkiu / velkuosi."),
    # Ex 7 Shopping sizes: dydis, tinka, netinka
    mc("Šios kelnės man per ... (didelis).", ["didelės", "didelis", "dideli", "didele"], "didelės", "Kelnės — pluralia tantum женского рода: per didelės."),
    mc("Ar šis dydis jums ...? (tikti)", ["tinka", "tinku", "tinki", "tinkame"], "tinka", "3 л. глагола tikti — tinka (подходит)."),
    mc("Noriu ... šią suknelę. (pasimatuoti)", ["pasimatuoti", "nusirengti", "pasisiūti", "pataisyti"], "pasimatuoti", "Померить — pasimatuoti.")
]

ch15_extra = [
    # Ex 4 Materials & Adjectives
    mc("Diržas pagamintas iš odos, jis yra ...", ["odinis", "vilnonis", "auksinis", "medinis"], "odinis", "Кожаный — odinis."),
    mc("Megztinis iš vilnos yra ...", ["vilnonis", "odinis", "auksinis", "šilkinis"], "vilnonis", "Шерстяной — vilnonis."),
    mc("Žiedas iš aukso yra ...", ["auksinis", "sidabrinis", "medinis", "odinis"], "auksinis", "Золотой — auksinis."),
    # Ex 7 Comparative adjectives: -esnis už + Galininkas
    mc("Diržas yra ... (brangus) už šukas.", ["brangesnis", "brangus", "brangiausias", "brangesnė"], "brangesnis", "Сравнительная степень мужского рода: brangesnis už..."),
    mc("Kuprinė yra ... (pigus) už rankinę.", ["pigesnė", "pigus", "pigesnis", "pigiausia"], "pigesnė", "Сравнительная степень женского рода: pigesnė negu / už..."),
    mc("Akiniai yra ... (pigus) už laikrodį.", ["pigesni", "pigesnis", "pigus", "pigesnė"], "pigesni", "Множественное число: akiniai yra pigesni už laikrodį."),
    # Ex 8 Man reikia + Genitive (Reikia ko?)
    mc("Man reikia ... (didesni batai).", ["didesnių batų", "didesnius batus", "didesniais batais", "didesniems batams"], "didesnių batų", "Конструкция 'man reikia' требует родительного падежа: didesnių batų."),
    mc("Man reikia ... (siauresnis diržas).", ["siauresnio diržo", "siauresnį diržą", "siauresniu diržu", "siauresniam diržui"], "siauresnio diržo", "Kilmininkas: siauresnio diržo."),
    # Ex 9 Tailoring / Measurements (Centimetrai)
    mc("Prašom patrumpinti kelnes tris ... (centimetras).", ["centimetrus", "centimetrai", "centimetrų", "centimetrais"], "centimetrus", "Винительный падеж меры: tris centimetrus.")
]

ch16_extra = [
    # Ex 4 Body parts
    mc("Kurį organą naudojame regėjimui?", ["akį / akis", "ausį", "nosį", "burną"], "akį / akis", "Глаз / глаза — akis."),
    mc("Kurį organą naudojame klausymui?", ["ausį / ausis", "akį", "nosį", "koją"], "ausį / ausis", "Ухо / уши — ausis."),
    # Ex 6 & 7 Skauda ką? vs Neskauda ko?
    mc("Man skauda ... (galva).", ["galvą", "galvos", "galvai", "galvoje"], "galvą", "Выражение 'skauda' требует винительного падежа (ką?): skauda galvą."),
    mc("Jam skauda ... (dantis).", ["dantį", "danties", "dančiui", "dantyje"], "dantį", "Винительный падеж (Galininkas): skauda dantį."),
    mc("Man neskauda ... (galva).", ["galvos", "galvą", "galvai", "galvoje"], "galvos", "При отрицании 'neskauda' употребляется родительный падеж (ko?): neskauda galvos."),
    mc("Ligoniui neskauda ... (širdis).", ["širdies", "širdį", "širdžiai", "širdyje"], "širdies", "Отрицание neskauda + Kilmininkas: neskauda širdies."),
    mc("Vaikui skauda ... (gerklė).", ["gerklę", "gerklės", "gerklei", "gerklėje"], "gerklę", "Skauda + Galininkas: gerklę."),
    mc("Sportininkui skauda ... (nugara).", ["nugarą", "nugaros", "nugarai", "nugaroje"], "nugarą", "Skauda + Galininkas: nugarą."),
    # Ex 9 Dative for illness / age (Kam skauda? Kiek kam metų?)
    mc("Gydytojas paklausė: Ką ... skauda? (jūs)", ["jums", "jūs", "jus", "jumis"], "jums", "Дательный падеж (Naudininkas): Ką jums skauda?"),
    mc("... skauda dantį. (mama)", ["Mamai", "Mama", "Mamos", "Mamą"], "Mamai", "Naudininkas: Mamai skauda dantį."),
    mc("... skauda pilvą. (sūnus)", ["Sūnui", "Sūnus", "Sūnaus", "Sūnų"], "Sūnui", "Naudininkas: Sūnui skauda pilvą."),
    mc("Kiek metų ... tėčiui? (tėtis)", ["tavo", "tavęs", "tau", "tavimi"], "tavo", "Притяжательное: tavo tėčiui.")
]

ch17_extra = [
    # Ex 3 Pharmacy & Medicine vocabulary
    mc("Ką geriame nuo galvos skausmo?", ["vaistus", "salotų", "sulčių", "arbatpinigių"], "vaistus", "Лекарства — vaistai (vaistus)."),
    mc("Ką lašiname į nosį nuo slogos?", ["lašus", "tepalą", "sirupą", "tabletes"], "lašus", "Капли для носа — lašai (lašus)."),
    mc("Nuo kosulio vaikams dažnai duodamas ...", ["sirupas", "kepsnys", "tepalas", "lašai"], "sirupas", "Сироп от кашля — sirupas."),
    # Ex 5 Vaistai nuo + Kilmininkas (Vaistai nuo ko?)
    mc("Prašom duoti vaistų nuo ... (skausmas).", ["skausmo", "skausmą", "skausme", "skausmui"], "skausmo", "Предлог 'nuo' требует родительного падежа (Kilmininkas): nuo skausmo."),
    mc("Ar turite tablečių nuo ... (temperatūra)?", ["temperatūros", "temperatūrą", "temperatūroje", "temperatūrai"], "temperatūros", "Nuo + Kilmininkas: nuo temperatūros."),
    mc("Vaistai nuo ... (sloga).", ["slogos", "slogą", "slogoje", "slogai"], "slogos", "Nuo + Kilmininkas: nuo slogos."),
    mc("Kapsulės nuo ... (kosulys).", ["kosulio", "kosulį", "kosulyje", "kosuliui"], "kosulio", "Nuo + Kilmininkas: nuo kosulio."),
    # Ex 7 Past tense of gerti / jaustis
    mc("Vakar aš ... vaistus tris kartus. (gerti - būtasis laikas)", ["gėriau", "gėrei", "gėrė", "gėrėme"], "gėriau", "Прошедшее время 1 л. ед. ч. от gerti — gėriau."),
    mc("Kaip jūs vakar ...? (jaustis - būtasis laikas)", ["jautėtės", "jaučiuosi", "jautėsi", "jautėmės"], "jautėtės", "Прошедшее время 2 л. мн. ч. возвратного глагола — jautėtės.")
]

ch18_extra = [
    # Ex 3 & 4 Professions & Workplace
    mc("Kas gydo žmones ligoninėje?", ["gydytojas", "vairuotojas", "pardavėjas", "aktorius"], "gydytojas", "Врач — gydytojas."),
    mc("Kas moko mokinius mokykloje?", ["mokytojas", "virėjas", "padavėjas", "teisininkas"], "mokytojas", "Учитель — mokytojas."),
    mc("Kas gamina maistą restorane?", ["virėjas", "kirpėjas", "advokatas", "inžinierius"], "virėjas", "Повар — virėjas."),
    mc("Kas vaidina teatre ir filmuose?", ["aktorius", "gydytojas", "buhalteris", "statybininkas"], "aktorius", "Актёр — aktorius."),
    # Ex 6 Dirbti kuo? (Dirbu kuo? - Įnagininkas)
    mc("Aš dirbu ... (gydytojas).", ["gydytoju", "gydytojas", "gydytoją", "gydytojo"], "gydytoju", "Профессия с глаголом dirbti ставится в творительном падеже (Įnagininkas): dirbu gydytoju."),
    mc("Lina dirba ... (mokytoja).", ["mokytoja", "mokytoją", "mokytojos", "mokytojoje"], "mokytoja", "Įnagininkas женского рода: dirba mokytoja."),
    mc("Mano tėtis dirba ... (inžinierius).", ["inžinieriumi", "inžinierių", "inžinieriaus", "inžinieriuje"], "inžinieriumi", "Įnagininkas: dirba inžinieriumi."),
    # Ex 10 Work hours and schedule
    mc("Mano darbo diena prasideda ... valandą. (aštuntas)", ["aštuntą", "aštunta", "aštuoni", "aštuntoje"], "aštuntą", "Время начала действия отвечает на вопрос 'Kelintą valandą?' — aštuntą valandą."),
    mc("Pietų pertrauka trunka vieną ... (valanda).", ["valandą", "valanda", "valandos", "valandoje"], "valandą", "Продолжительность: vieną valandą.")
]

ch19_extra = [
    # Ex 3 Study subjects & University
    mc("Ką studijuoja būsimieji teisininkai?", ["teisę", "mediciną", "fiziką", "istoriją"], "teisę", "Право / юриспруденция — teisė (teisę)."),
    mc("Ką studijuoja būsimieji vadybininkai?", ["vadybą", "chemiją", "dailę", "muziką"], "vadybą", "Менеджмент — vadyba (vadybą)."),
    mc("Ką studijuoja būsimieji gydytojai?", ["mediciną", "teisę", "filologiją", "ekonomiką"], "mediciną", "Медицина — medicina (mediciną)."),
    # Ex 6 Mokytis / Studijuoti (Mokytis ko? vs Studijuoti ką?)
    mc("Aš mokausi ... (lietuvių kalba).", ["lietuvių kalbos", "lietuvių kalbą", "lietuvių kalboje", "lietuvių kalbai"], "lietuvių kalbos", "Возвратный глагол 'mokytis' требует родительного падежа предмета (Kilmininkas): mokausi kalbos."),
    mc("Tomas universitete studijuoja ... (ekonomika).", ["ekonomiką", "ekonomikos", "ekonomikoje", "ekonomikai"], "ekonomiką", "Глагол 'studijuoti' требует винительного падежа (Galininkas): studijuoja ekonomiką."),
    mc("Mes mokomės ... (nauji žodžiai).", ["naujų žodžių", "naujus žodžius", "naujuose žodžiuose", "naujiems žodžiams"], "naujų žodžių", "Mokytis + Kilmininkas: naujų žodžių."),
    # Ex 10 Paskaita, egzaminas, sesija
    mc("Rytoj studentai laiko sunkų ... (egzaminas).", ["egzaminą", "egzaminas", "egzamino", "egzamine"], "egzaminą", "Galininkas: laiko egzaminą.")
]

ch20_extra = [
    # Ex 4 Hobbies & Free time activities
    mc("Ką galima veikti laisvalaikiu stadione?", ["bėgioti / sportuoti", "miegoti", "skaityti", "gaminti"], "bėgioti / sportuoti", "Бегать / заниматься спортом — bėgioti, sportuoti."),
    mc("Ką galima veikti laisvalaikiu ežere ar baseine?", ["plaukioti", "čiuožti", "bėgioti", "dainuoti"], "plaukioti", "Плавать — plaukioti."),
    mc("Ką galima veikti teatre ar kine?", ["žiūrėti filmą / spektaklį", "sportuoti", "maudytis", "miegot"], "žiūrėti filmą / spektaklį", "Смотреть фильм / спектакль — žiūrėti filmą."),
    # Ex 6 Mėgti + Bendratis (Mėgstu ką veikti?)
    mc("Aš labai mėgstu ... knygas. (skaityti)", ["skaityti", "skaitau", "skaito", "skaitome"], "skaityti", "После mėgti идет инфинитив (bendratis): mėgstu skaityti."),
    mc("Ar tu mėgsti ... dviračiu? (važinėti)", ["važinėti", "važinėji", "važinėju", "važinėja"], "važinėti", "Инфинитив: mėgsti važinėti dviračiu."),
    mc("Vaikai mėgsta ... kompiuterinius žaidimus. (žaisti)", ["žaisti", "žaidžia", "žaidžiu", "žaidi"], "žaisti", "Инфинитив: mėgsta žaisti."),
    # Ex 10 Patinka + Naudininkas (Kam patinka?)
    mc("... patinka klausytis muzikos. (aš)", ["Man", "Aš", "Mano", "Mane"], "Man", "Конструкция с patinka требует дательного падежа (Naudininkas): Man patinka."),
    mc("Ar ... patinka keliauti? (tu)", ["tau", "tu", "tavo", "tave"], "tau", "Naudininkas: Ar tau patinka?"),
    mc("... labai patinka šokti. (ji)", ["Jai", "Ji", "Jos", "Ją"], "Jai", "Naudininkas от ji — Jai patinka."),
    mc("... patinka žaisti krepšinį. (jie)", ["Jiems", "Jie", "Jų", "Juos"], "Jiems", "Naudininkas от jie — Jiems patinka.")
]

ch21_extra = [
    # Ex 3 Celebrations vocabulary: gimtadienis, Naujieji metai, Kalėdos
    mc("Kokia šventė švenčiama gruodžio 25–26 dienomis?", ["Kalėdos", "Velykos", "Joninės", "Gimtadienis"], "Kalėdos", "Рождество — Kalėdos."),
    mc("Kokia pavasario šventė švenčiama su margučiais?", ["Velykos", "Kalėdos", "Naujieji metai", "Joninės"], "Velykos", "Пасха — Velykos."),
    mc("Šventė, kai žmogus mini savo gimimo dieną:", ["gimtadienis", "vardadienis", "vestuvės", "krikštynos"], "gimtadienis", "День рождения — gimtadienis."),
    # Ex 6 Sveikinti su + Įnagininkas (Sveikinu su kuo?)
    mc("Sveikinu su ... (gimtadienis)!", ["gimtadieniu", "gimtadienį", "gimtadienio", "gimtadieniuose"], "gimtadieniu", "Предлог 'su' требует творительного падежа (Įnagininkas): su gimtadieniu!"),
    mc("Sveikiname su ... (Naujieji metai)!", ["Naujaisiais metais", "Naujus metus", "Naujųjų metų", "Naujuose metuose"], "Naujaisiais metais", "Įnagininkas daugiskaita: su Naujaisiais metais!"),
    mc("Sveikinu su ... (šventė)!", ["švente", "šventę", "šventės", "šventėje"], "švente", "Įnagininkas vienaskaita: su švente!"),
    # Ex 10 Linkėti + Kilmininkas (Linkiu ko?)
    mc("Linkiu tau ... (sveikata ir laimė)!", ["sveikatos ir laimės", "sveikatą ir laimę", "sveikatai ir laimei", "sveikatoje ir laimėje"], "sveikatos ir laimės", "Глагол linkėti требует родительного падежа (Kilmininkas): sveikatos ir laimės!"),
    mc("Linkime jums didelės ... (sėkmė)!", ["sėkmės", "sėkmę", "sėkmei", "sėkme"], "sėkmės", "Kilmininkas: linkime didelės sėkmės!"),
    mc("Linkiu gerų ... (atostogos)!", ["atostogų", "atostogas", "atostogoms", "atostogomis"], "atostogų", "Родительный падеж мн. ч.: gerų atostogų!"),
    # Ex 14 Dovanoti / Gauti dovanų
    mc("Ką tu ... dovanų gimtadienio proga? (gauti - būtasis)", ["gavai", "gavau", "gavo", "gavome"], "gavai", "Прошедшее время 2 л. ед. ч. от gauti — gavai."),
    mc("Aš draugui ... gražią knygą. (padovanoti - būtasis)", ["padovanojau", "padovanojai", "padovanojo", "padovanojome"], "padovanojau", "Прошедшее время 1 л. ед. ч.: padovanojau.")
]
