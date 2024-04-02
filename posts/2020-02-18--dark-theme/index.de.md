---
title: Es werde kein Licht
category: "web"
author: jo3rn
---

Diesem Blog ging ein Licht auf (oder aus). Du findest es in der rechten unteren Ecke. Mit einem Klick tauchst Du ein in die tiefe Nacht oder bräunst Dich vor deinem Bildschirm.

Dark Mode ist omnipräsent. Einzug erhielt er zuerst bei Programmen, die viel Bildschirmzeit beanspruchen, wie [Visual Studio Code](https://code.visualstudio.com/docs/getstarted/themes) oder [Photoshop](https://blogs.adobe.com/jkost/2019/01/choosing-a-color-theme-in-photoshop-cc.html), ja sogar [Microsoft Office](https://support.office.com/en-us/article/change-the-look-and-feel-of-office-63e65e1c-08d4-4dea-820e-335f54672310). Es folgten stark frequentierte Webseiten wie [Twitter](https://twitter.com/), [Reddit](https://www.reddit.com/) oder [Twitch](https://www.twitch.tv/). Unternehmen wie [Netflix](https://www.netflix.com/de/) haben sich einfach von Grund auf für dunkle Farben entschieden. Wikipedia zog noch nicht mit, aber hostet immerhin einen [Artikel](https://en.wikipedia.org/wiki/Light-on-dark_color_scheme) darüber. Apple und Google brachten mit den aktuellen Betriebsversionen [iOS 13](https://support.apple.com/en-us/HT210393#13) und [Android 10](https://developer.android.com/about/versions/10/features#darktheme) den systemweiten Dark Mode in die Handys.

Wenn auch keine Einigkeit über ergonomische Auswirkungen herrscht, so hilft es bei OLED Displays den [Stromverbrauch zu reduzieren](https://www.sueddeutsche.de/digital/smartphone-akkulaufzeit-dark-mode-1.4224875). Und zumindest anekdotenhaft vertreten in meinem Bekanntenkreis viele den Standpunkt: nur ein dunkles Design ist ein gutes Design. Menschen, die über [solche Memes](https://i.imgur.com/1Xvs3r3.png) lachen:

![Caption: "When someone shows you code on their light theme IDE", darunter werden einer Frau gewaltsam die Augen aufgehalten und sie muss in Richtung einer Lichtquelle schauen](/images/blog/2020-02-18-lightmeme.png)

Und um keinen Lacher auszulassen:

> Why do programmers prefer dark mode? Because light attracts bugs.

Stoße ich beim Surfen im Internet mal auf eine weiße Wand, mache ich mir das [Dark Reader Addon](https://darkreader.org/) zu Nutze. Doch automatisierte Konvertierungen liefern nicht immer optimale Ergebnisse. Deshalb entschied ich mich dazu, meine Seite für jeden Geschmack anzubieten. Zu Beginn speist sich das _Theme_ aus den Systemeinstellungen, kann aber manuell permanent auf _dunkel_ oder _hell_ gesetzt werden. Nun kannst Du selbst entscheiden. Damit Du beim nächsten Aufruf dieser Homepage nicht aus allen Wolken fällst, wird deine Präferenz im sogenannten [local storage](https://www.w3schools.com/html/html5_webstorage.asp) gespeichert. Das sieht so aus (_Triggerwarnung_: der folgende Screenshot ist nicht im Dark Mode):

![Screenshot des Eintrags "light" Theme im Webspeicher des Browsers](/images/blog/2020-02-18-localstorage.png)

Leider funktioniert das immer nur für den selben Browser, das heißt unter Umständen fällst Du doch aus allen Wolken. Aber Du weißt ja jetzt, wo Du das Theme ändern kannst.

Lediglich den Hintergrund einzuschwärzen war mir aber etwas zu banal. Im Zuge der Umgestaltung änderte ich deshalb auch gleich das Farbschema. Dieses basierte bislang auf dem [Basisprojekt](https://github.com/greglobinski/gatsby-starter-hero-blog), auf das diese Homepage (früher mal) aufsetzte. Nun ist es _gebrandet_. Bei der Farbauswahl orientierte ich mich am [Farbsystem von Material Design](https://material.io/design/color/). Es gibt eine Primärfarbe (braun) sowie eine Sekundärfarbe (grün). Diese werden je nach Theme in verschiedenen Varianten eingesetzt. Bei der Verwendung eines [Dark Themes](https://material.io/design/color/dark-theme.html#) sind es eher hellere Abstufungen, da der Hintergrund dunkel ist. Wenn wichtige Elemente ein zu hohes Deckvermögen gegenüber ihrem Hintergrund haben, schränkt das die Erkennbarkeit ein. Dies ist nur ein Kriterium der [Barrierefreiheit im Internet](https://www.w3.org/WAI/fundamentals/accessibility-intro/). Webentwickler sollten sich immer vor Augen halten, dass nicht alle Webseiten so betrachten und benutzen, wie man selbst.
