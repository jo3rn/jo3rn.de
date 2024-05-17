---
title: Umzug von gatsby zu next.js
category: "innovation"
author: jo3rn
---

Angefangen hat diese Webseite, wie sehr viele Webseiten, mit [WordPress](https://wordpress.com/). Irgendwann wollte ich ein bisschen mehr Gestaltungsspielraum und bin auf [Gatsby](https://www.gatsbyjs.com/) umgestiegen. Dabei nahm ich einen [Starter](https://www.gatsbyjs.com/starters/) als Grundlage, der aber mit viel Code-Ballast kam, den ich gar nicht brauchte. Irgendwann wurde es zu unübersichtlich. Außerdem nagten ideologische Änderungswünsche bzgl. Inhalt und Aufarbeitung an mir. Deshalb startete ich in mehreren Nachtschichten "from scratch" mit [Next.js](https://nextjs.org/).

## 1. Corporate Entfesselung

Ich weiß noch genau, als im Jahr 2008 Facebook in Deutschland verfügbar wurde. Als einer der ersten in meinem Freundeskreis warb ich mit glühender Begeisterung für das soziale Netzwerk, während wir alle auf studiVZ, meinVZ, wer-kennt-wen, und diversen regionalen Plattformen verstreut waren. Endlich eine zentrale Anlaufstelle mit coolen neuen Funktionen, auf der sogar Bekannte aus dem Ausland vertreten waren. Die Welt stand offen.

Eine Weile lief das super. Man konnte Inhalte teilen, Termine planen, Gruppen bilden, News verfolgen, Diskussionen führen... Eben alles, wofür das Internet sein sollte.

Selbst als [Facebooks Börsengang](https://en.wikipedia.org/wiki/Initial_public_offering_of_Facebook) bevorstand, war ich voll dabei. Ich hielt sogar einen Vortrag an der Uni darüber, wie jetzt bestimmt alles noch besser wird.

*"Wenn du nicht für das Produkt zahlen musst, bist du das Produkt."* fingen die ersten an zu mahnen. Aber ich war gerne das Produkt. Es hatte ja so viele Vorteile.

Den Begriff [Enshittification](https://en.wikipedia.org/wiki/Enshittification) gab es damals nicht. Aber genau das passierte: Tracking- und Werbeinteressen schlichen sich langsam ein. Erst dezent irgendwo am Rand, dann immer aggressiver. Die Inhalte meiner Freunde im Feed musste ich mir mit Wühlen durch "Vorschläge" erarbeiten.

Mit jedem Login veränderte sich "der Algorithmus" zum Schlechteren. Langsam aber sicher fühlte ich mich wirklich als Produkt. Aber ich kann hier nicht weg, hier sind inzwischen alle meine Freunde. Zu manchen habe ich ansonsten gar keinen Kontakt mehr. [Lock-in-Effekt](https://de.wikipedia.org/wiki/Lock-in-Effekt) par excellence.

Der [Cambridge-Analytica Fall](https://en.wikipedia.org/wiki/Facebook%E2%80%93Cambridge_Analytica_data_scandal) schlug allerdings den letzten Nagel in den Sarg. Kein Vorteil kann so groß sein, wenn ich im Gegenzug solche Machenschaften unterstützen muss. Facebook war zu diesem Zeitpunkt sowieso nur noch ein Schatten seines selbst.

Man sollte meinen, ich hätte daraus gelernt. Aber wie ein guter Network-Junkie klebte ich schon bald an den nächsten Konzernen, hauptsächlich Twitter und Reddit. Und natürlich WhatsApp (das von Facebook gekauft wurde). Es vergingen mehrere weitere Jahre, bis es letztendlich "Klick" gemacht hatte.

Jetzt ist mein Kredo: Wann immer möglich freie Software und offene Standards verwenden. Leider lässt sich das nicht leicht mit der Realität vereinbaren, aber wir sind auf einem guten Weg.

Was hat dieser Tagebucheintrag nun mit dem Thema des Beitrags zu tun? Nun ja, wenn ich die Webseite sowieso schon technisch umgestalte, kann ich auch die Inhalte anpassen. Was heißt das genau?

### keine Amazon Affiliate Links

Ein düsteres Kapitel, was ich mit der neuen Webseite schließe, ist die Kooperation mit Amazon. Damals war es so verlockend: mit der Online-Präsenz ein wenig Geld verdienen, indem ich hier und da einen [affiliate Link](https://de.wikipedia.org/wiki/Affiliate-Marketing) in den Text einstreue. Auf den ersten Blick eine Win-Win-Win-Situation. Und tatsächlich habe ich im Laufe der Jahre einen niedrigen dreistelligen Betrag erhalten, der zumindest die Serverkosten deckte.

Doch wenn dein Geschäftspartner eine [eigene Wikipedia-Seite mit Kritikpunkten](https://en.wikipedia.org/wiki/Criticism_of_Amazon) hat, die die Community als *"too long to read and navigate comfortably"* markiert, wird es Zeit nachzudenken.

Oder wie es Die PARTEI [im Programm zur Bundestagswahl ausdrückte](https://www.die-partei.de/regierungsprogramm/):

> Wegen nachhaltigen Marktmisserfolgs müssen wir Amazon leider schließen. 2020 haben die Versager mit 44 Mrd. Rekordumsatz (EU) einen Verlust von 1,2 Mrd. erwirtschaftet (aber nur am Steuersitz Luxemburg, Smiley!). Steuerforderung: 0 Mrd.

Deshalb bin ich alle Blog-Posts durchgegangen (ok, `Strg+F` hat geholfen), um jegliche Amazon-Links mit äquivalenten, neutralen Links zu z.B. der Hersteller-Webseite zu ersetzen. Ja, mir entgehen dadurch vielleicht 5€ im Monat, aber ich schlafe etwas ruhiger :)

### keine Links zu Twitter/X

Das sollte inzwischen selbsterklärender sein als Amazon. Nutzt Alternativen, z.B. [Mastodon](https://de.wikipedia.org/wiki/Mastodon_(Software)). Dort findet ihr mich übrigens [hier](https://mastodon.social/@jo3rn).

### keine Links zu YouTube

Um die Privatsphäre etwas zu erhöhen, sind Links zu YouTube durch Links zu [piped.video](https://piped.video/) ersetzt worden. [Piped](https://github.com/TeamPiped/Piped) ist ein alternatives Frontend für YouTube-Videos, bei dem Google Eure Interaktionen nicht trackt.

## 2. dependencies

Kommen wir zum technischen Teil.

Zugegeben, die Webseite habe ich lange stiefmütterlich behandelt. Regelmäßig wurden dependabot alerts ignoriert. Da die Webseite damals wie heute nur eine statische Seite ist, betrafen die alerts nur das build tooling und hatten daher für mich keine Dringlichkeit.

Als ich irgendwann doch mal aufräumen wollte, sah ich mich mehreren major-version-bumps entgegengesetzt. Nach ein paar Stunden rumprobieren, gab ich es auf und beschloss einen Neuanfang mit einem "schlankeren" Setup, in das die vorhandenen Inhalte überführt werden sollten. Dies bedeutet, dass ich (aktuell) mit deutlich weniger Abhängigkeiten hantiere, nämlich:

- [clsx](https://github.com/lukeed/clsx) um CSS-Klassennamen zu erzeugen
- [gray-matter](https://github.com/jonschlinkert/gray-matter) zum Parsen von frontmatter
- [remark](https://github.com/remarkjs/remark) und [remark-html](https://github.com/remarkjs/remark-html) um Markdown-Dateien in HTML umzuwandeln
- [date-fns](https://github.com/date-fns/date-fns) zum vereinfachten Arbeiten mit Datumsangaben
- [react-icons](https://react-icons.github.io/react-icons/) für Icons
- [next-translate](https://github.com/aralroca/next-translate) für Übersetzungen / Interationalisierung (i18n)
