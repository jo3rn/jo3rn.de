---
title: Clean Code - A Handbook of Agile Software Craftsmanship
category: "coffee table"
author: jo3rn
---

**Clean Code** ist eines DER geflügelten Worte der Software Literatur, mit dem sich der Autor [Robert C. Martin](http://cleancoder.com) unsterblich gemacht hat. Schon in der Einleitung wird deutlich: was _Clean Code_ genau bedeutet, ist nicht in einem Satz zusammen zu fassen. Dieses Buch erhebt gar nicht den Anspruch einer vollumfänglichen Definition, sondern zeigt die Eigenschaften _sauberen Codes_ auf. Egal, ob man ihn dadurch leicht verstehen, effizient ausführen, schnell erweitern oder problemlos warten kann. Das Kredo: Clean Code ist professioneller Code.

![Das Buch "Clean Code - A Handbook of Agile Software Craftsmanship" auf einem Beistelltisch](/images/blog/2024-09-30-clean_code.jpg)

_Disclaimer_: Zugegeben, _Clean Code_ liest man nicht mal eben am _Coffee Table_ zwischendurch. Wenn man nichts mit Softwareentwicklung am Hut hat, legt man es spätestens nach dem ersten Kapitel beiseite. Ich würde noch nicht so weit gehen wie [dieser lesenswerte Artikel](https://qntm.org/clean) und _Clean Code_ generell nicht empfehlen. Aber zumindest alle, die gerade erst mit dem Programmieren anfangen, sollten lieber zu anderen Büchern greifen. Nicht alles kann für bare Münze genommen werden. Die Beispiele sind teilweise unnötig kompliziert. An manchen Stellen ist _Clean Code_ in die Jahre gekommen. Dort liest es sich so wie ein Buch über Luftfahrt aus dem 19. Jahrhundert. Geschichtsbücher sind lehrhaft, wenn man sie in ihren Kontext einordnen kann. Wie war es damals ohne allmächtige Entwicklungsumgebungen und als Hochsprachen wie Java noch in den Kinderschuhen steckten? Andere Stellen des Buches sind heute noch ein wahrer Fundus an Anhaltspunkten und Vorgehensweisen um bessere Software zu entwickeln. In diesem Post werde ich versuchen, für die Allgemeinheit Nützliches aus den einzelnen Kapiteln abzuleiten. Starten wir direkt mit dem ersten.

## Meaningful Names

Jörn ist kein viel sagender Name. Vielleicht kennt man jemanden der so heißt. Dann bringt man denjenigen mit dem Namen in Verbindung. Außerdem bedeutet er Bauer ([abgeleitet von Georg](https://de.wikipedia.org/wiki/J%C3%B6rn)). Das war's aber auch schon. Wenn ich ein Gerät erfinden würde, dass den beim Kochen entstehenden Dampf absaugt und filtert, und es _Jörn_ nennen würde, könnte sich niemand darunter etwas vorstellen. Deshalb wurde es stattdessen _Dunstabzugshaube_ getauft. Das ist ein **bedeutungsvoller** Name. Man hört ihn und weiß, was das damit benannte Objekt tut.

## Functions

Funktionen sind die Bausteine eines Programms. Dabei verhält es sich wie mit physischen Bausteinen. Ein Element, was einer gewissen Norm oder einem bekannten Standard entspricht, lässt sich leichter verbauen als eine schrullige Form. Das Kapitel **Functions** liefert viele Ideen für das Erstellen formschöner Bausteine.

> _Sie_: "Schatz gehst du bitte zum Kiosk an der Ecke um ein Brot zu holen? Und wenn sie Bananen haben, bring 6 Stück mit."
>
> Nach kurzer Zeit kommt er wieder zurück und hat 6 Brote dabei.
>
> _Sie_: "Aber warum hast du 6 Brote gekauft?"
> _Er_: "Sie hatten Bananen."

Nehmen wir an, wir entwickeln ein Programm. Es soll einen Roboter zum Einkaufen schicken. Wie können wir den Ausgang dieses Informatik-Witzes und sonstige unerwünschte Effekte verhindern?

Dass die Funktion möglichst sinnvoll benannt werden sollte, haben wir schon im vorherigen Kapitel gelernt. Nun schauen wir uns als nächstes die **Parameter** der Funktion an. Die folgende Implementierung hat einige Schwächen:

```javascript
function buy(item1, item2, item3) {
    ...
    searchShopFor(item1)
    searchShopFor(item2)
    searchShopFor(item3)
    ...
}

>>> buy(banana, apple, toast)
```

Wenn wir nun doch 4 oder nur 2 Artikel kaufen wollen, müssen wir diese Funktion abändern. Und was ist, wenn wir beim Schreiben des Programmms noch gar nicht wissen, wieviele Artikel gekauft werden sollen? Dann müssten wir für alle Möglichkeiten eine separate Funktion vorhalten. Wie kann diese Funktion robuster werden? Schauen wir uns eine andere Implementierung an:

```javascript
function buy(items) {
    ...
    for item in items {
        searchShopFor(item)
    }
    ...
}

>>> shoppingList = [banana, apple, toast]
>>> buy(shoppingList)
```

Robert C. Martins meint: Je weniger Argumente, desto besser. Allein schon der Übersichtlichkeit halber. Zumal hier alle Argumente (Banane, Apfel, Toast) gleich behandelt werden, macht es Sinn, sie zu einer Einheit (Einkaufsliste) zusammenzuführen. Nun ist es auch egal, wieviele Artikel man kaufen möchte.

Eine andere Sache, die in Funktionen besser vermieden werden sollte, sind Seiteneffekte (_side effects_). Eine Funktion sollte nichts außerhalb ihres eigenen Zustands verändern:

```javascript
function buy(items) {
    goToBank()
    withdrawCash()
    goToShop()
    ...
    payItems()
    goHome()
}
```

Unser Roboter geht vor dem Einkauf zur Bank `goToBank()`, um Geld abzuheben `withdrawCash()`. Dies beeinflusst einen externen Zustand (verfügbares Bargeld & Kontostand). Doch vielleicht muss gar nicht bei jedem Einkauf Geld abgehoben werden. Und vielleicht auch nicht immer bei der Bank. Und wieviel Geld sollte genau abgehoben werden? Am besten wäre den genauen Betrag als weiteres Argument der Funktion mitzugeben.

Das hätte einen weiteren Vorteil: Der gesamte Prozess des Geldbesorgens könnte in eine separate Funktion ausgelagert werden. Dadurch kann diese separat getestet werden. Denn was tun wir, wenn eine Funktion nicht das liefert, was wir wollen? In `buy()` passiert aktuell so viel, dass es schwer fällt, den Fehler einzugrenzen. War zu wenig Geld zur Verfügung? Hatte der Supermarkt nicht alle Artikel? Zwei separate Funktionen, z.B. `getMoney()` und `buy()` können einzeln getestet werden, wodurch man sich bei Fehlern nur noch mit der Hälfte des Codes befassen muss.

Auch die Fehlerbehandlung während des Aufrufs (d.h. zur _Laufzeit_) sollte berücksichtigt werden. Wenn wir einen Kuchen backen wollen und es kein Mehl im Supermarkt gibt, sollte der Roboter den Vorgang abbrechen und heim kommen. Das spart Ressourcen und der Roboter ist schneller wieder verfügbar. Wenn wir aber Limo machen wollen und es keine Zitronen gibt, könnte man sich überlegen, auf Orangen umzusteigen.

Man merkt, das Schreiben von Funktionen ist eine Kunst für sich. Und wie bei Kunstwerken gibt es nicht nur einen richtigen Weg. Was wir aber mitnehmen können: Funktionen sollten möglichst klein sein und nur eine Sache tun.

## Comments

Mein Abriss des Kommentar-Kapitels entspricht einem guten Kommentar selbst: er existiert nicht.

_(Ok, gelegentlich ist ein Kommentar sinnvoll, z.B. bei der Dokumentation von öffentlichen APIs. In den meisten Fällen sollte der Code aber selbsterklärend sein. Kommentare neigen im Laufe der Zeit dazu, irrelevant, widersprüchlich oder irreführend zu sein.)_

## Formatting

Die beste Analogie droppt der Autor selbst: Eine Tageszeitung ist kein einziger langer Prosa-Text, sondern in viele kleine Abschnitte aufgeteilt. Diese haben jeweils wieder eine Überschrift, Einleitung, Details, Fotos usw. Solch eine Zeitung lässt sich gut lesen. Die Augen bleiben beim Überfliegen quasi an den Überschriften kleben und man erahnt meist, ob der Rest unter der Überschrift lesenswert ist oder nicht.

Analog sollte sich die Anordnung von Code verhalten. Der Platz für Klassen- und Methodennamen, Parameter, Konstanten, Variablen und sonstige Elemente sollte stringent in allen Dateien gleich sein. So finden sich alle schnell zurecht. Wie diese Struktur genau aussieht, kann sich von Projekt zu Projekt unterscheiden. Wichtig ist nur, dass man sich an ein einmal festgelegtes Schema hält.

## Objects and Data Structures

Objekten befiehlt man, Datenstrukturen liest man.

Wir haben verschiedene Möglichkeiten unseren Roboter der Klasse `Robot` zu bewegen. Wir können kleinteilig im dreidimensionalen Raum mit `getKnee()`, `setKnee(x, y, z)` und anderen Körperteilen arbeiten. Doch das exponiert die Lauflogik und verlagert die Verantwortung dafür. Alterantiv kann eine Klasse `Robot` die Funktionen `step()` und `turn()` anbieten, die die detailierten Vorgänge einkapselt. Die klassische Aversion gegen Getter und Setter spricht sich für zweiteres aus - also für Objektorientierung.

Doch auch Datenstrukturen mit öffentlichen Attributen haben ihren Zweck. Nämlich zum Halten und Abrufen von Daten, z.B. als [Transferobjekte (DTOs)](https://de.wikipedia.org/wiki/Transferobjekt). Manche Programmiersprachen haben dafür dedizierte Konstrukte, z.B. [`data class`](https://kotlinlang.org/docs/data-classes.html) in Kotlin. Hier stolpert man auch nicht über das [Gesetz von Demeter](https://de.wikipedia.org/wiki/Gesetz_von_Demeter) und verursacht kein ["Zugunglück"](https://wiki.c2.com/?TrainWreck), da man i.d.R. mit Attributen hantiert, nicht mit Funktionen.

## Error Handling

Michael Feathers bringt sein Anliegen klar rüber: "use unchecked exceptions". Ich stimmer seiner Argumentation gegen umständliche `throws`-Ketten zu. Und möchte hinzufügen, dass dieser Boilerplate schnell in die Irre führt. Nämlich wenn die zugrunde liegende Exception gar nicht mehr geworfen wird, aber durch vergessenes Entfernen aus `throws` fälschlicherweise weiterhin "gewarnt" wird.

Checked Exceptions sind so unbeliebt, dass sie sogar als Grundlage [einens guten Aprilscherzes](https://blog.doubleslash.de/en/developer-blog/java-schafft-checked-exceptions-ab) dienen.

Danach formuliert er im Grunde, was irgendwann in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) gegossen wurde: im Falle eines Fehlers ausreichend Kontext liefern und an die Bedürfnisse der Aufrufenden anpassen.

Wildes Werfen von Exceptions kann unübersichtlicht werden. Da alle Exceptions behandelt werden wollen, sind Wiederholungen (Logging, Rückgabewerte generieren) fast unvermeidlich. Wenn auf eine Methode mehrere Exceptions einprasseln, versuche ihre Anzahl vorher durch einen Wrapper zu verringern.

Was auch immer Du codest, minimiere die Verwendung von `null` als Rückgabewert und bei der Übergabe als Argument. Nur ein einzelner fehlender `null`-Check zerschießt Dir Deinen Programmablauf. Alternativen sind:

- ein default Wert
- eine leere Liste
- ein ["special case" Objekt](https://www.martinfowler.com/eaaCatalog/specialCase.html)
- eine Programmiersprache mit [null-safety](https://en.wikipedia.org/wiki/Void_safety)

## Boundaries

Schnittstellen haben ein schier unlösbares Problem: 

- die anbietende Stelle möchte sie generisch halten, um viele Anwendungsfälle abzudecken, z.B. [Java Collections](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html)
- die konsumierende Stelle möchte sie spezifisch haben, um ihren Fall bestmöglich abzudecken, z.B. [Backend for Frontend](https://bff-patterns.com/)

Wenn wir Fremdcode integrieren, sind wir i.d.R. einem größer als benötigten Ökosystem ausgesetzt. Ein bisschen wie [Joe Armstrongs](https://de.wikipedia.org/wiki/Joe_Armstrong_(Informatiker)) Metapher: Du willst eine Banane, aber bekommst den Gorilla, der sie hält und den gesamten Dschungel dazu.

Unser Roboter braucht zum Einkaufen einen Einkaufskorb. Wir entscheiden uns, die Library `BeautifulBasket` dafür zu verwenden.

Wir sind interessiert an den Funktionen `add()`, `remove()` und `isFull()`. Aber da gibt es noch eine Menge mehr, z.B. `duplicate()`, `empty()`, `shareOnFacebook()`. In unserem Code haben wir jetzt viel mehr Möglichkeiten als nötig und müssen aufpassen, nicht aus Versehen von diesen Möglichkeiten Gebrauch zu machen.

Hinzu kommt: da wir `remove()` nicht selbst geschrieben haben, müssen wir über dessen Verhalten mit Hilfe der (hoffentlich vorhandenen) Dokumentation urteilen - oder wir schauen in dessen (hoffentlich verfügbaren) Quellcode. Ein dritter Weg wäre "learning tests" zu schreiben, welche die Funktion auf die Verhaltensweisen überprüft, die wir uns wünschen. Es ist also keine schlechte Idee, zu Forschungszwecken auch für Fremdcode Tests zu schreiben. Diese verifizieren bei Library-Updates auch gleich, dass das gewünschte Verhalten weiterhin auftritt.

Möglichst vermeiden wollen wir, dass `BeautifulBasket` zu sehr in unseren Code verwoben wird und Library-Updates Anpassungen an unerwarteten Stellen verlangen. Vorbeugend können wir daher ein eigenes `RobotBasket` Interface anbieten, als die einzige Brücke zum unkontrollierbaren `BeautifulBasket`. In unserem restlichen Code interagieren wir dann ausschließlich mit `RobotBasket`.

## Unit Tests

Tests und Produktivcode sind zwei Seiten der selben Medaille. Es gibt keinen Grund, Testcode einer geringeren Rigorosität zu unterziehen. Wer beim Tests schreiben Abkürzungen in Kauf nimmt, schießt sich langfristig selbst ins Knie.

Dass Code leicht veränderbar sein sollte, ist ein roter Faden, der sich durch das Buch zieht. Und Tests sind die Grundlage, damit dies funktioniert. Du kannst den tollsten Code haben, bei dem für jede erdenkliche Idee nur eine Zeile umgeschrieben werden muss. Wenn du keine Tests hast oder diese nur schwer ändern kannst, wirst du nie herausfinden, ob das tatsächlich stimmt. Flexibilität entsteht erst durch die Sicherheit, die Dir Tests geben.

Tests sollten zudem (schnell) lesbar sein. Der erste Schritt ist ein schlank gehaltenes Setup, dass nur die wirklich benötigten Rahmenbedingungen schafft. Außerdem muss nicht alles in die Testfunktion gepackt werden. Tests profitieren von Hilfsmethoden oder ganze Hilfsklassen, z.B. zum Erzeugen von Testobjekten oder Ausführen wiederkehrender Testschritte.

Der Lesbarkeit ist auch zuträglich, wenn die Tests nach einem einheitlichen Muster aufgebaut sind. Im Buch wird dies "Build-Operate-Check" genannt, also "Erstellen-Ausführen-Überprüfen". Die daraus resultierenden Testfälle lassen sich in natürlicher Sprache formulieren und sind damit selbst für nicht-technische Leser nachvollziehbar: _"given x, when y, then z"_.

In diesem Zusammenhang finde ich, dass der Autor zu viel Fokus auf die Lesbarkeit des _auszuführenden_ Testcodes legt. Während schon eine eindeutige _Benennung_ der Testfunktion bzw. des Testfalls für ein vollkommenes Verständnis ausreichend sein kann. Oder hast Du im folgenden Code noch den Drang, den mit "..." gekürzten Teil sehen zu müssen, um zu verstehen, was vor sich geht:

```javascript
describe('movement module', () => {
  test(
    'given supermarket is already closed, ' +
    'when arriving, ' +
    'then return back home',
    () => {
    ...
  });
});
```

Jeder Test sollte außerdem nur ein Konzept testen. Nehmen wir an, wir testen das Legen eines Artikels in den Einkaufskorb. Dabei können wir überprüfen, ob:

- der Artikel auch wirklich im Einkaufskorb gelandet ist
- das noch zur Verfügung stehende Budget verringert wurde
- der noch zur Verfügung stehende Platz im Einkaufskorb verringert wurde
- der Artikel von der Einkaufsliste gestrichen wurde
- usw.

Würden wir all diese Konzepte in einen Test packen, wissen wir beim Fehlschlagen des Tests gar nicht genau, wo wir zuerst nachschauen sollten. Oder schlimmer noch: ob sich Überprüfungen gegenseitig beeinflusst haben und der Test deshalb fehlschlägt. Manche gehen daher soweit, nur ein `assert` pro Test zu verlangen. Aber das kann auch unnötig stark einschränkend sein.

In Tests spielt Effizienz hingegen meistens eine untergeordnete Rolle. Im Gegensatz zum Produktivcode laufen die Tests vermutlich nicht auf einem ressourcenarmen eingebetteten System. Also sparen wir uns lange Sessions, um das letzte Quäntchen Memory- oder CPU-Performance aus unserem Testcode herauszupressen. Nichtsdestotrotz sollten Tests natürlich schnell genug laufen, sodass sie während der Entwicklung immer wieder ausgeführt werden können ohne lange Pausen zu verursachen.

## Classes

> If a test in the same package needs to call a function or access a variable, we'll make it protected or package scope.

Ich stimme dem nur insofern zu, als dass es sich dabei um utility-Funktionen handelt, die z.B. ein Objekt zusammenbauen. Die Sichtbarkeit einer Funktion zu vergrößern, nur um sie testen zu können, halte ich für falsch. Wenn alle Tests einer `public` Funktion grün sind, ist es egal, ob die zur Hilfe gezogenen `private` Funktionen so funktionieren wie gedacht. Anscheinend tun sie es in ausreichendem Maße. Ist diese Auffassung zu _[YAGNI](https://de.wikipedia.org/wiki/YAGNI)_?

Ansonsten sind in diesem Kapitel aber einige oft gehörte und sinnvolle Mantras (hauptsächlich aus dem [SOLID](https://de.wikipedia.org/wiki/Prinzipien_objektorientierten_Designs#SOLID-Prinzipien)-Bereich), wie:

> If we cannot derive a concise name for a class, then it's likely too big.

> a class or module should have one, and only one, reason to change    
>_[Single-Responsibility-Prinzip](https://de.wikipedia.org/wiki/Single-Responsibility-Prinzip)_

> A class in which each variable is used by each method is maximally cohesive. (...) we would like cohesion to be high.

> our classes should depend upon abstractions, not on concrete details    
> _[Dependency-Inversion-Prinzip](https://de.wikipedia.org/wiki/Dependency-Inversion-Prinzip)_

Ich mochte auch den Hinweis, dass es in einer Hinsicht keinen Unterschied macht, ob man wenige große oder viele kleine Klassen hat: die Anzahl beweglicher Komponenten bleibt gleich. Der Unterschied wird deutlicher, wenn man an eine große Lego-Kiste oder viele kleine, sortierte Lego-Kisten denkt.

## Systems

> Complexity kills.    
> _[Ray Ozzie](https://de.wikipedia.org/wiki/Ray_Ozzie)_

Nuff said? Naja, es gibt sicherlich unnötig komplexe Systeme. Aber ab einer gewissen Größe ist Komplexität unausweichlich. An diesem Punkt helfen verschiedene Wege, die negativen Auswirkungen der Komplexität zu mildern.

_Separation of Concerns_ bedeutet Bereiche klar voneinander zu trennen. Bei einem Hausbau sind Gewerke wie Rohbau, Fassade, Elektrik, Sanitär, etc. auch höchstens lose miteinander verbunden. Gleichfalls sollten bei unserem Roboter die Funktionen für Bewegung, Einkauf, Bezahlen, etc. getrennt sein. Auch sollte **startup** (Erstellen/Starten von `Robot`) unabhängig von der **run time** (`Robot` führt Befehle aus) sein.

Häufig müssen Objekte andere Objekte benutzen. Diese sollten sie nicht selbst erzeugen, sondern über [Dependency_Injection](https://de.wikipedia.org/wiki/Dependency_Injection) erhalten. So kann man auch im kleinen Fokus die Erstellung von der Nutzung trennen.

Anders als beim Hausbau benötigt eine Software-Projekt kein "Big Design Up Front". Die Architektur kann sich zu jeder Zeit ändern. Damit dies aber kein riesiges Unterfangen wird, müssen ein paar Weichen gestellt werden - "small design up front"? Im Idealfall greifen alle "unterstützenden" Funktionen danach kaum noch in die tägliche Arbeit, sodass sich die Entwicklung auf die Geschäftslogik konzentrieren kann.

Bei diesen "unterstützenden" [cross-cutting concerns](https://de.wikipedia.org/wiki/Cross-Cutting_Concern) fällt die Trennung schwer, weil sie in viele Bereiche des Codes greifen. Dies betrifft z.B. Logging, Caching, Authorisierung von Anfragen oder Persistierung von Daten. [Aspektorientierte Programmierung](https://de.wikipedia.org/wiki/Aspektorientierte_Programmierung) bietet eine Lösung, bei der solche Belange z.B. deklarativ in Konfigurationsdateien bestimmt werden. Ein Framework wie [Spring](https://de.wikipedia.org/wiki/Spring_(Framework)) übernimmt das "heavy lifting" (z.B. via [Proxys](https://de.wikipedia.org/wiki/Stellvertreter_(Entwurfsmuster)) und [Decorators](https://de.wikipedia.org/wiki/Decorator)) und trennt so den Code für die Geschäftslogik größtenteils vom sonstigen Code.

Gelegentlich müssen Entscheidungen mit Auswirkungen auf zukünftige Vorhaben getroffen werden. Ein guter Leitfaden dabei ist, diese Entscheidungen bis zum letztmöglichen Zeitpunkt hinauszuzögern. Bis dahin sollten wir mit dem bestehenden Projekt so viele Erfahrungen wie möglich sammeln, um eine informierte Entscheidung treffen zu können.

Etablierte Standard-Praktiken bieten eine Blaupause für das eigene Vorhaben. Doch bedenke, dass nicht jeder Standard zu jedem Projekt passt und sich gerade in unserem Feld viele vermeintliche Standards wandeln oder obsolet werden.

## Emergence

Das Kapitel startet mit [Kent Becks](https://de.wikipedia.org/wiki/Kent_Beck) "4 rules of simple design" (geordnet nach Wichtigkeit):

> 1. Runs all the tests

Klingt einleuchtend. Der Fokus liegt hier vermutlich auf _all_, d.h. es gibt ausreichend Tests um zu verifizieren, dass das System wie gewünscht agiert. In dieser einfachen Regel steckt aber auch, dass Systeme meist ein gutes Design aufweisen, wenn sie so entworfen werden, dass sie auch gut testbar sind.

> 2.  Has no duplicated logic

[Don't repeat yourself](https://de.wikipedia.org/wiki/Don%E2%80%99t_repeat_yourself)

> 3. States every intention important to the programmer

Dies ist besonders relevant für Software, deren Kosten hauptsächlich in der langfristigen Wartung liegen. Ohne hohe Ausdrucksfähigkeit wird jede Anpassung zu einem Rätsel. Abhilfe schaffen kleine Klassen & Funktionen, eindeutige Namen, Verwendung von Standards, anschauliche Unit Tests.

> 4. Has the fewest possible classes and methods

Dies mutet zunächst unvereinbar zum vorherigen Prinzip kleiner Klassen mit _single responsibility_ an. Doch _fewest possible_ meint eher jene Konstrukte zu vermeiden, die ohne Grund und nur aus Dogmatismus oder Prinzip entstehen, z.B. dass jede Klasse in Interface und Implementierung geteilt werden muss.

## Concurrency

Beim Einkauf geht unser Roboter die Liste durch, sucht die Artikel in den Regalen und legt sie in den Korb. Dies nimmt viel Zeit in Anspruch. Es wäre schneller, wenn unser Roboter für jeden Artikel auf der Liste einen kleinen Roboter hätte, der losgeschickt werden kann. Die kleinen Roboter können die Artikel dann parallel einsammeln. Der gesamte Zeiteinsatz wäre nur so groß, wie jenen Artikel zu holen, der am weitesten entfernt ist.

Dieser Zeitgewinn ist nicht gratis. Es erfordert zusätzlichen Aufwand, die kleinen Roboter zu koordinieren. Der Algorithmus hat sich grundlegend verändert, ist schwerer nachzuvollziehen und bietet mehr Raum für Fehler. Unser System ist durch die Einführung von _Concurrency_ komplexer geworden.

Fehlervermeidung sollte hier ein besonderer Stellenwert zugeschrieben werden. Denn zeitgleich verlaufende Sequenzen machen das Debugging extra schwierig. Einzelne Threads sollten so unabhängig wie möglich voneinander sein und keine Daten teilen. Ist ein Zugriff auf die selben Daten nötig, sollte dieser mit Mechanismen geschützt sein, sodass immer nur ein Prozess nach dem anderen liest oder schreibt. Versuche nebenläufigen Code vom Rest des Codes zu trennen, sodass du beide Teile isoliert testen kannst.

Die Begriffe [Deadlock](https://de.wikipedia.org/wiki/Deadlock_(Informatik)) und [Starvation](https://de.wikipedia.org/wiki/Verhungern_(Informatik)) zeigen: den Problemen der Nebenläufigkeit gewahr zu sein, ist überlebenswichtig. Zumindest für [Philosophen, die sich zum Essen treffen](https://de.wikipedia.org/wiki/Philosophenproblem).

Ein Teil dieses Kapitels dreht sich um Situationen, für die es inzwischen Lösungen gibt, z.B. [graceful shutdown](https://docs.spring.io/spring-boot/reference/web/graceful-shutdown.html) oder [concurrency testing](https://en.wikipedia.org/wiki/Concurrent_testing). Das Buch wurde aber auch zu Zeiten geschrieben, als man begeistert war von den neuen Features in Java 5 ([2004 veröffentlicht](https://en.wikipedia.org/wiki/Java_version_history)). Es ist daher interessant zu lesen, mit welchen Problemen man damals konfrontiert war.

## Successive Refinement

Dieses Kapitel ist größtenteils "hands-on" über ein Programm, dass übergebenen Argumente ausliest. Beispiel: wir nutzen [sort](https://de.wikipedia.org/wiki/Sort_(Unix)), um mit `sort -f -o sorted.txt unsorted.txt` die Zeilen in einer unsortierten Datei zu sortieren und sortiert in eine neue Datei zu schreiben. Dabei ignorieren wir Groß- und Kleinschreibung. Das Programm im Buch ist dazu da, `-f` als `boolean` Argument und `-o sorted.txt` als `string` Argument zu parsen, um das eigentliche Sortier-Programm mit diesen Parametern zu starten.

Zuerst wird der finale, wohl-formulierter Code gezeigt, der diese Aufgabe erfüllt. Dann wird ein erster Entwurf dieses Programms gezeigt, der nur `boolean` Argumente verarbeiten kann. Dieser erste Entwurf zeigt im Vergleich zum finalen Code bereits kleinere Schwächen. Aufgrund der limitierten Funktionalität ist er aber noch überschaubar. Nun werden weitere Entwürfe gezeigt, die zusätzliche Funktionalitäten hinzufügen und den Code immer "dreckiger" werden lassen. Ein Refactoring startet. Dabei wird großer Wert darauf gelegt, äußerst kleinschrittig erst dann mit der nächsten konzeptuellen Änderung fortzufahren, wenn alle vorhandenen Tests wieder erfolgreich sind.

Es ist ein gut nachvollziehbares Fallbeispiel, um zu zeigen, dass Programmieren ein iterativer Vorgang ist. Es ist ganz natürlich, dass erste Entwürfe keinem Ideal entsprechen. Wichtig ist nur, es nicht beim ersten Entwurf zu belassen.

## JUnit Internals

Dieses Kapitel behandelt wie das vorherige ein Code-Refactoring. In diesem Fall ist es fremder Code des [JUnit Frameworks](https://de.wikipedia.org/wiki/JUnit) und man sieht zuerst den Original-Code, der dann umgebaut wird. Das Refactoring hat es allerdings nicht in das Framework geschafft, [wo der Code immer noch fast so ist wie zu Beginn des Kapitels](https://github.com/junit-team/junit4/blob/main/src/main/java/junit/framework/ComparisonCompactor.java).

## Refactoring _SerialDate_

Und noch ein Refactoring. Dieses Mal die Klasse [SerialDate.java](https://github.com/jfree/jcommon/blob/master/src/main/java/org/jfree/date/SerialDate.java) der Open Source Java-Library _JCommon_.

Die Vorgehensweise ist etwas anders. Teile des Codes sind zu Beginn nicht getestet, sodass der Autor mit dem Schreiben von neuen Tests beginnt. Manche davon sind nicht erfolgreich und bringen kleine Bugs ans Licht. Er kommentiert alle fehlgeschlagenen Tests aus und ändert den Code schrittweise, bis alle Tests grün sind.

Dies ist die Basis, um nun die Klasse komplett umzugestalten. Dabei werden fragwürdige Praktiken eingeführt, z.B. [wildcard imports](https://stackoverflow.com/questions/147454/why-is-using-a-wild-card-with-a-java-import-statement-bad) um 2 Zeilen Code zu sparen. Aber es werden auch gute Punkte gemacht, z.B. das "Serial" im Klassennamen zu hinterfragen oder Variablen in Kind-Klassen zu verschieben, wenn sie nur dort benutzt werden. Basisklassen sollten allgemein nichts von ihren Derivaten wissen.

Und da es sich um Java handelt, darf natürlich auch eine [abstract factory](https://de.wikipedia.org/wiki/Abstrakte_Fabrik) nicht fehlen. Es gibt auch andere Ausflüge in Java-Eigenheiten, z.B. die Nutzung des `final` Schlüsselwortes oder die [Versionierung von `Serializable` Objekten](https://docs.oracle.com/javase/6/docs/platform/serialization/spec/version.html).

[Auch hier hat es das Refactoring allerdings nicht ins Repository geschafft.](https://github.com/jfree/jcommon/issues/2)

Zu allen drei Refactoring-Kapiteln muss ich leider gestehen, dass sie unabhängig vom Inhalt keine angenehme Erfahrung sind. Der Autor beschreibt alle Schritte präzise genug. Doch das ständige Wechseln zwischen Beschreibungstext, altem Code und neuem Code (der teilweise im Anhang ist) macht das Nachvollziehen mühsam. Es wurde besser, als ich den Code auf einem Bildschirm öffnete. Aber ein Video des Refactorings wäre meiner Meinung nach das bessere Medium gewesen. Abläufe, die man textuell in vielen Sätzen beschreiben muss, könnten so in wenigen Sekunden dargestellt werden.

Ich habe ja nichts gegen Code Snippets hier und da, aber dieses Kapitel besteht buchstäblich aus über 50 Seiten Code am Stück. Schwarz auf weiß, ohne Syntax-Highlighting (aber immerhin in `monospace`). Vielleicht ist der Autor der Auffassung, dass das Lesen puren Codes irgendwie eine notwendige Grundübung wie Liegestütze ist. Aber das ist einfach nur unnötig anstrengend.

## Smells and Heuristics

Dieses finale Kapitel ist ein Glossar aller Code-Unzulänglichkeiten, die in den Refactoring-Kapiteln verbessert oder in den anderen Kapiteln angesprochen wurden. Vieles davon erinnert an die Überprüfung von Tools zur [statischen Code-Analyse](https://de.wikipedia.org/wiki/Statische_Code-Analyse), wie z.B. in den Regeln von [SonarSource](https://rules.sonarsource.com/). Manche gehen darüber hinaus und erfordern zur Identifizierung (noch) einen "human actor".

Diese kompakte Liste zum gelegentlichen Auffrischen auf was man alles achten kann, rundet das durchwachsene Buch dann doch noch versöhnlich ab.
