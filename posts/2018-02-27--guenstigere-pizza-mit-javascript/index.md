---
title: Günstigere Pizza mit JavaScript
category: "web"
author: jo3rn
---

Im [pizza.de-Casino](https://pizza.de/casino/) kannst du dein Glück am einarmigen Banditen versuchen – oder in der Entwickler-Konsole (F12). Dank des [Quellcodes zu casino.js](https://pizza.de/casino/js/casino.js?ver=1.1.9), der nicht nur prüft, ob du gewonnen hast, sondern auch direkt die `function win()` offenbart.

Die verlinkten Seiten sind leider nicht mehr verfügbar, da die Aktion vorbei ist. Aber dieses GIF demonstriert den quick win:

![Eine Demonstration, wie man über die Entwickleroptionen im Browser die Funktion win() aufrufen konnte um einen Pizza Gutschein zu gewinnen.](/images/blog/2018-02-27-free_pizza.gif)

[#theyDidTheMath](https://mastodon.social/tags/theydidthemath) & [#reverseEngineering](https://mastodon.social/tags/reverseengineering):

Somit schießt du deine Gewinnchancen auf satte (im wahrsten Sinne des Wortes) **100%**. Die Webseite selbst gönnt dir pro Versuch nur 5%. Solltest du schonmal gewonnen haben, verbleiben lediglich 3% (Danke, `window.win_chance = 0.03;`!). Bei 7 Versuchen ergibt das `win = 1 - 0.95⁷` bzw. `win = 1 - 0.97⁷`. Also etwa 20-30%.

Dennoch werden Dorfkinder in der Lieferwüste selbst mit diesem Trick nicht die Gelegenheit bekommen, whopping 2€ zu sparen:

![Ein Screenshot der Lieferantensuche auf pizza.de, welche keine Treffer liefert](/images/blog/2018-02-27-no_pizza.png)
