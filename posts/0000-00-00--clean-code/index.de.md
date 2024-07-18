---
title: Clean Code - A Handbook of Agile Software Craftsmanship
category: "coffee table"
author: jo3rn
---

*Clean Code* ist einer DER Klassiker der Software Literatur, mit dem sich der Autor [Robert C. Martin](http://cleancoder.com) unsterblich gemacht hat. Schon in der Einleitung wird deutlich: was _Clean Code_ genau bedeutet, ist nicht in einem Satz zusammen zu fassen. Dieses Buch erhebt gar nicht den Anspruch einer vollumfänglichen Definition, sondern zeigt die Eigenschaften _sauberen Codes_ auf. Egal, ob man ihn dadurch leicht verstehen, effizient ausführen, schnell erweitern oder zielführend warten kann. Das Kredo: Clean Code ist professioneller Code. Wer Interesse hat, den Menschen hinter diesem Buch kennen zu lernen, dem sei [dieses Video](https://cleancoders.com/video-details/clean-code-episode-1) ans Herz gelegt.

![Das Buch "Clean Code - A Handbook of Agile Software Craftsmanship" auf einem Beistelltisch](/images/blog/0000-00-00-clean_code.jpg)

Zugegeben, _Clean Code_ liest man nicht mal eben am _Coffee Table_ zwischendurch. Wenn man nichts mit Softwareentwicklung am Hut hat, wird man es spätestens nach dem ersten Kapitel beiseite legen. Für alle anderen ist es ein wahrer Fundus an Anhaltspunkten und Vorgehensweisen um bessere Software zu entwickeln. In diesem Post werde ich dennoch versuchen, auch für die Allgemeinheit Nützliches aus den einzelnen Kapiteln abzuleiten. Starten wir direkt mit dem ersten.

## Meaningful Names

Jörn ist kein viel sagender Name. Vielleicht kennt man jemanden der so heißt. Dann bringt man denjenigen mit dem Namen in Verbindung. Außerdem bedeutet er Bauer ([abgeleitet von Georg](https://de.wikipedia.org/wiki/J%C3%B6rn)). Das war's aber auch schon. Wenn ich ein Gerät erfinden würde, dass den beim Kochen entstehenden Dampf absaugt und filtert, und es _Jörn_ nennen würde, könnte sich niemand darunter etwas vorstellen. Deshalb wurde es stattdessen _Dunstabzugshaube_ getauft. Das ist ein **bedeutungsvoller** Name. Man hört ihn und weiß, was das damit benannte Objekt tut.

## Functions

Funktionen sind die Bausteine eines Programms. Dabei verhält es sich wie mit physischen Bausteinen. Ein Element, was einer gewissen Norm oder einem bekannten Standard entspricht, lässt sich leichter verbauen als eine schrullige Form. Das Kapitel **Functions** liefert viele Ideen für das Erstellen eines formschönen Bausteins.

> \> Sie: "Schatz gehst du bitte zum Kiosk an der Ecke um ein Brot zu holen? Und wenn sie Eier haben, bring 6 Stück mit."    
> Nach kurzer Zeit kommt er wieder zurück und hat 6 Brote dabei.    
> \> Sie: "Aber warum hast du 6 Brote gekauft?"    
> \> Er: "Sie hatten Eier."    

Nehmen wir an, wir entwickeln ein Programm. Es soll einen Roboter zum Einkaufen schicken. Wie können wir den Ausgang dieses Informatik-Witzes und sonstige unerwünschte Effekte verhindern?

Dass die Funktion möglichst sinnvoll benannt werden sollte, haben wir schon im vorherigen Kapitel gelernt. Nun schauen wir uns als nächstes die **Argumente** der Funktion an. Die folgende Implementierung hat einige Schwächen:

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

Eine andere Sache, die in Funktionen besser vermieden werden sollte, sind Seiteneffekte (*side effects*). Sie sollte nichts außerhalb ihres eigenen Zustands verändern:

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

Unser Roboter geht vor dem Einkauf zur Bank `goToBank()`, um Geld abzuheben `withdrawCash()`. Dies beeinflusst einen externen Zustand (verfügbares Bargeld & Kontostand). Doch vielleicht muss gar nicht bei jedem Einkauf Geld abgehoben werden. Und wenn doch, wieviel Geld sollte genau abgehoben werden? Am besten wäre der genaue Betrag, der für den Einkauf nötig ist. So würde zumindest der Zustand des verfügbaren Bargelds am Ende der Funktion derselbe sein wie bei Funktionsaufruf. Vielleicht sollten wir aber auch im Zuge eines Refactorings auf Kartenzahlung umsteigen. Oder das benötigte Geld als weiteres Argument der Funktion mitgeben.

Letzteres hätte einen weiteren Vorteil: Der gesamte Prozess des Geldbesorgens könnte in eine separate Funktion ausgelagert werden. Dadurch kann diese separat getestet werden. Denn was tun wir, wenn eine Funktion nicht das liefert, was wir wollen? In `buy()` passiert aktuell so viel, dass es schwer fällt, den Fehler einzugrenzen. War zu wenig Geld zur Verfügung, hatte der Supermarkt nicht alle Artikel? Zwei separate Funktionen, z.B. `getMoney()` und `buy()` können einzeln getestet werden, wodurch schneller deutlich wird an welcher Stelle etwas schief lief.

Auch die Fehlerbehandlung während des Aufrufs (d.h. zur *runtime*) sollte berücksichtigt werden. Wenn wir einen Kuchen backen wollen und es kein Mehl im Supermarkt gibt, sollte der Roboter den Vorgang abbrechen und heim kommen. Das spart Ressourcen und der Roboter ist schneller wieder verfügbar. Wenn wir aber Limo machen wollen und es keine Zitronen gibt, könnte man sich überlegen, auf Orangen umzusteigen.

Man merkt, das Schreiben von Funktionen ist eine Kunst für sich. Und wie bei Kunstwerken gibt es nicht nur einen richtigen Weg. Was wir aber mitnehmen können: Funktionen sollten möglichst klein sein und nur eine Sache tun.

## Comments

Mein Abriss des Kommentar-Kapitels entspricht einem guten Kommentar selbst: er existiert nicht.

(Ok, gelegentlich ist ein Kommentar sinnvoll, z.B. bei der Dokumentation von öffentlichen APIs. In den meisten Fällen sollte der Code aber selbsterklärend sein. Kommentare neigen im Laufe der Zeit dazu, irrelevant, widersprüchlich oder irreführend zu sein.)

## Formatting

Die beste Analogie droppt der Autor selbst: Eine Tageszeitung ist kein einziger langer Prosa-Text, sondern in viele kleine Abschnitte aufgeteilt. Diese haben jeweils wieder eine Überschrift, Einleitung, Details, Fotos usw. Solch eine Zeitung lässt sich gut lesen. Die Augen bleiben beim Überfliegen quasi an den Überschriften kleben und man erahnt meist, ob der Rest unter der Überschrift lesenswert ist oder nicht.

Analog sollte sich die Anordnung von Code verhalten. Der Platz für Klassen- und Methodennamen, Parameter, Konstanten, Variablen und sonstige Elemente sollte stringent in allen Dateien gleich sein. So finden sich alle schnell zurecht. Wie diese Struktur genau aussieht, kann sich von Projekt zu Projekt unterscheiden. Wichtig ist nur, dass man sich an ein einmal festgelegtes Schema hält.

## Objects and Data Structures

## Error Handling

## Boundaries

## Unit Tests

## Classes

## Systems

## Emergence

## Concurrency

## Successive Refinement

## JUnit Internals

## Refactoring _SerialDate_

## Smells and Heuristics
