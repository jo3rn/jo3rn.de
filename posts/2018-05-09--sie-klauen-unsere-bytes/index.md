---
title: Sie klauen unsere Bytes
category: "computer science"
author: jo3rn
---

Im letzten Beitrag konntest du sehen, dass eine 275GB SSD unter Windows mit 256GB angezeigt wird. Ein Ärgernis, das sicherlich jedem bekannt ist, der schonmal einen USB Stick gekauft hat. Wie es dazu kommt, erfährst du jetzt.

![South Park Meme eines Hinterwäldlers mit der Beschriftung "Sie klauen unsere Bytes"](/images/blog/2018-05-09-sie_klauen_unsere_bytes.jpg)

[Präfixe](https://de.wikipedia.org/wiki/Vors%C3%A4tze_f%C3%BCr_Ma%C3%9Feinheiten) wie Milli-, Kilo-, Giga-,… sind hinlänglich bekannt. Sie werden benutzt, um beim Ausschreiben nicht so viele Ziffern zu verwenden, z.B. 1 Kilogramm statt 1000 Gramm oder 1 Gigatonne statt 1000000000 Tonnen. Denn: diese ganzen Nullen zählen – [ain’t nobody got time for that!](https://en.wikipedia.org/wiki/Ain%27t_Nobody_Got_Time_for_That)

Das [Système international d’unités](https://de.wikipedia.org/wiki/Internationales_Einheitensystem) wird weltweit verwendet und gesetzlich vorgeschrieben (bis auf ein paar abgeschiedene Nationen wie den USA). __Kilo-__ entspricht dabei immer dem 10³-fachen der Ursprungsmaßeinheit, __Mega-__ dem 10⁶-fachen usw.

Für uns Menschen ist das super, denn wir rechnen im Dezimalsystem. Die rückständigen Computer rechnen hingegen nur mit zwei Zahlen (Binärsystem), weshalb sie niemals die Herrschaft über uns erlangen können (falls doch: das war grad nicht so gemeint, heil Skynet!). Diese Zählweise führt allerdings dazu, dass sich in der Datenverarbeitung für die gleichen Präfixnamen eine andere Rechenweise verbreitet hat, bei dem ein __Kilo-__ das 2¹⁰-fache ergibt, ein __Mega-__ das 2²⁰-fache usw.

Im Fall meiner Festplatte (275GB) führt dies zu zwei möglichen Auslegungen:

1. der korrekte Binär-Wert

    ```
    275GB = 275 * 2³⁰ Byte = 275 * 1 073 741 824 Byte
    = 295 279 001 600 Byte
    ```

2. der für Werbung besser geeignete Dezimal-Wert
    ```
    275GB = 275 * 10⁹ Byte = 275 * 1 000 000 000 Byte
    = 275 000 000 000 Byte
    ```

Bereits bei dieser recht kleinen Festplatte kommt dadurch also ein Unterschied von ca. 20'000'000'000 Bytes zustande, wofür man [im Jahr 2000 etwa 20 Dollar hingelegt hätte](http://www.mkomo.com/cost-per-gigabyte). Die im Explorer angezeigten 256GB lassen sich dann so erklären, dass sie binär berechnet (`256*2³⁰ = 274 877 906 944 Byte`), aber dezimal ausgewiesen wurden (`274 877 906 944 / 10⁹ ≈ 275 GB`).

Die IEC moniert dies schon seit 1996 und zusammen mit der ISO gibt es inzwischen den [IEC 80000-13:2008 Standard](https://www.iso.org/standard/31898.html). Der führt für die binäre Rechnung [abgewandelte Präfixe](https://de.wikipedia.org/wiki/Bin%C3%A4rpr%C3%A4fix) (Kibi, Mebi,...) ein und legitimiert somit die Praxis der Marketing-Abteilungen. Allerdings hält sich kaum einer dran, sonst hieße es hier GiB (Gibibyte) anstatt GB (Gigabyte):

![Screenshot aus Windows 10, der fälschlicherweise GB statt GiB anzeigt](/images/blog/2018-05-09-gb_statt_gib.png)