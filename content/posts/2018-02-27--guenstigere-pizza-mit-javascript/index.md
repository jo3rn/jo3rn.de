---
title: Günstigere Pizza mit JavaScript
category: "web"
cover: pizza.jpg
author: jo3rn
---

Im [pizza.de-Casino](https://pizza.de/casino/) kannst du dein Glück am einarmigen Banditen versuchen – oder in der Entwickler-Konsole (F12). Dank dem [Quellcode zu casino.js](https://pizza.de/casino/js/casino.js?ver=1.1.9), der nicht nur prüft, ob du gewonnen hast, sondern auch direkt die `function win()` offenbart. (Die verlinkten Seiten sind leider nicht mehr verfügbar, da die Aktion vorbei ist.)

[Klicke hier für eine Animation, wie man über die Entwickleroptionen im Browser die Funktion win() aufrufen konnte um einen Pizza Gutschein zu gewinnen.](./free_pizza.gif)

[#theydidthemath](https://twitter.com/search?q=%23theydidthemath):

Somit schießt du deine Gewinnchancen auf satte (im wahrsten Sinne des Wortes) 100%. Die Webseite selbst gönnt dir pro Versuch nur 5%. Solltest du schonmal gewonnen haben, verbleiben lediglich 3% (window.win_chance = 0.03;). Bei 7 Versuchen ergibt das 1-0,95<sup>7</sup> bzw. 1-0,97<sup>7</sup>, also etwa 20-30%.

Dennoch werden Dorfkinder selbst mit diesem Trick nicht die Gelegenheit bekommen, whopping 2€ zu sparen…

![Ein Screenshot der Lieferantensuche auf pizza.de, welche keine Treffer liefert](./no_pizza.png)