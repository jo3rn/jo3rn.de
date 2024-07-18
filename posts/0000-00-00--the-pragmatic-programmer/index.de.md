---
title: The Pragmatic Programmer - your journey to mastery
category: "coffee table"
author: jo3rn
---

Glücklicherweise hat das Unternehmen, für das ich momentan arbeite, erkannt, dass Wissen ein wesentlicher Bestandteil in der Softwareentwicklung ist. Mir wird daher Zeit für verschiedene Bildungsmaßnahmen eingeräumt, z.B. ein Buch wie [The Pragmatic Programmer, 20th Anniversary Edition](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) zu lesen.

_Pragmatic Programmer_ ist überfüllt mit wertvollen Tipps, zu denen man jeweils einen eigene Abhandlung verfassen könnte. Ich empfehle die Lektüre jedem Software-Entwickler uneingeschränkt. Ich konzentriere mich hier auf die Aspekte, die mir in letzter Zeit selbst über den Weg liefen. So gesehen ist dieser Beitrag als fremdgeleitetes Tagebuch zu sehen.

## 1. A Pragmatic Philosophy

### The Cat Ate My Source Code

#### Verantwortung

> How do you react when someone - such as a bank teller - comes to you with a lame excuse? What do you think of them and their company as a result?
>
> _page 5_

Wenn man Verantwortung übernimmt, sollte man auch zu Fehlern stehen. Schuldzuweisungen sind nicht hilfreich. Natürlich gibt es höhere Gewalt, aber die meisten "technischen Probleme" oder "Verzögerungen im Betriebsablauf" lassen sich unter der Lupe auf konkrete Unzulänglichkeiten festnageln.

Selbst vermeintlich externe Faktoren können manchmal auf interne zurückgeführt werden. Klar, die bösen Hacker haben die Festplatten verschlüsselt. Aber ich habe die ausgenutzte Schwachstelle monatelang vernachlässigt.

Was wäre besser?

1. **Transparenz herstellen**. Klar und zielgruppengerecht kommunizieren. Betroffene nicht für dumm verkaufen, aber auch nicht überfordern.
2. **Alternativen vorschlagen**. Wenn sich das zugrundelegende Problem nicht lösen lässt, kann der Zielzustand auch anders hergestellt oder angenähert werden?
3. **Resilienz erhöhen**. Aus Problemen lernen, um sie in Zukunft zu vermeiden.

### Software Entropy

Die [Broken-Windows-Theorie](https://de.wikipedia.org/wiki/Broken-Windows-Theorie) ist in ihrem ursprünglichen Sinne umstritten. Für die Softwareentwicklung bietet sie aber eine gutes Sinnbild: ein einziges zerbrochenens Fenster (in Form von vernachlässigtem Code, schlechtem Design, etc.) kann einen Teufelskreis des Verfalls starten. Dieser hat zwei Ausprägungen:

1. **psychologisch**: "An anderer Stelle wurde bereits gepfuscht, also nehme ich es hier auch nicht so genau".
2. **fundamental**: "Weil an diesen Stellen bereits gepfuscht wurde, kann ich hier nun auch nicht sauber arbeiten."

Dabei können kleine Entscheidungen einen [Schmetterlings-Effekt](https://de.wikipedia.org/wiki/Schmetterlingseffekt) auslösen. Was soll schon schief gehen, wenn ich die gleiche Variable einmal `topic` und einmal `target` nenne?

- _Hoppla_, nun wird sie an verschiedenen Schnittstellen anders genannt.
- _Oh nein_, in den Einstellungen und den Nutzungsdaten jetzt auch.
- _Schande_, in der Dokumentation eines neuen Services wird plötzlich zwischen `topic` und `target` unterschieden.
- _Wow_, jetzt sitze ich in einem einstündigen Meeting mit 10 Personen, um herauszufinden, wann etwas ein `topic` ist und wann ein `target`…

### Communicate!

Betrachte die nachfolgenden Release Notes zweier Apps und überlege, auf welches sich das Zitat aus dem Buch beziehen würde.

> This isn't communicating: it's just talking, and it's annoying.
>
> _page 20_

[Release notes: Bugfixes and performance improvements.](https://mastodon.social/@zackwhittaker/109928692642064312)

![Screenshot der "Release Notes" der Apps Mastodon & Google Kalender](/images/blog/2024-08-30-release-notes.png)
[source](https://mastodon.social/@zackwhittaker/109928692642064312)

Der wesentliche Bestandteil von Kommunikation ist es, das zu übermitteln, was man übermitteln will. Wenn man nichts übermitteln will ("bugfixes and improvements"), dann sollte man auch einfach nichts übermitteln ("").

Hat man hingegen etwas mitzuteilen, dann sollte man das tunlichst tun: "Manchmal ist die App gecrasht, wenn du Fotos öffnen wolltest. Wir hatten ein Problem mit langen Dateinamen. Jetzt kannst du die Fotos wieder ansehen."

Aber selbst wenn Du etwas zu übermitteln hast, kommt es auch auf das _WIE_ an. Das Produktmanagement wird vielleicht höflich nicken, wenn du erzählst, dass Du nun dank Feature-Flagging eine JSON-Datei in den Produktivbetrieb anbinden kannst ohne die Deployment-Pipeline zu triggern. Was für sie interessant ist: "ihr könnt jetzt das Texterkennungs-Feature in Echtzeit an- und ausschalten oder nur bestimmten Usern zur Verfügung stellen. Und wenn ihr den Rabattcode doch 2 Tage länger laufen lassen wollt, können wir das auch nach Release noch ändern."

## 2. A Pragmatic Approach

### The Essence of Good Design

> Good design is easier to change than bad design.
>
> _page 28_

Leicht gesagt. Bedeutet es doch, dass man zukünftige Änderungen voraussehen soll. Über die Zeit entwickelt sich zwar eine gewisse Intuition, aber harte Prinzipien abzuleiten fällt schwer.

Ich bin mir nicht sicher, ob sie sich bewusst für "_easier_ to change" entschieden haben (anstatt "_easy_"). Diese Wortwahl führt eine weitere Ebene ein: oft gibt es keinen _einfachen_ Weg. Aber von verschiedenenen Wegen gibt es _einfachere_. In diesem Sinne sollte man ihre Wortwahl umdrehen und den Weg gehen, der das System _am wenigsten unveränderbar_ macht.

Bei Unsicherheiten ist es zumindest besser, wenn man grob in die richtige Richtung läuft. Dabei helfen die bekannten "best practices", z.B. Komponenten einheitlich und unabhängig voneinander zu gestalten.

### DRY - The Evils of Duplication

Das [DRY-Prinzip](https://de.wikipedia.org/wiki/Don%E2%80%99t_repeat_yourself) ist leicht verständlich und in aller Munde. Die Autoren beleuchten aber einige weniger besprochene Aspekte des an sich simplen Prinzips:

1. Code-Duplikate sollte semantisch geprüft werden, nicht syntaktisch.

   Die Beispiel-Methoden `validate_age()` und `validate_quantity()` machen das exakt gleiche: sie prüfen, dass der Eingabewert größer 0 und vom Typ `integer` ist. Sie zu einer Methode zusammenzuführen wäre aber kontraproduktiv, denn die Anforderungen sind andere. Die Methoden sind nur zufällig gleich, könnten aus unterschiedlichen Gründen geändert werden und sollten daher getrennt bleiben.

2. > Where possible, always use accessor functions to read and write the attributes of objects.
   >
   > _page 36_

   Zugegeben, das hat nicht mehr allzu viel mit DRY zu tun. Aber in modernen Programmiersprachen kann man properties zu Funktionen aufblähen, z.B. in [Kotlin](kotlinlang.org/docs/properties.html) oder C++. Das kann allerdings Missverständnisse erzeugen. Der Zugriff auf eine Eigenschaft sollte z.B. keine Exception werfen und keine ressourenintensiven Algorithmen auslösen.

3. > (...) 10.000 programs that each contained a different version of Social Security Number validation code (...)
   >
   > _page 38_

   Wieviel Hirnschmalz und Lebenszeit wurde in Code gesteckt, den mindestens ein anderes Team bereits erfolgreich gemeistert hat? Ist Vielfach-Implementierung ein unausweichlicher Fluch großer Unternehmen? Nicht unbedingt, wenn man es von Anfang an berücksichtigt:

   > What you're trying to do is foster an environment where it's easier to find and use existing stuff than to write yourself.
   >
   > _page 38_

   Natürlich verursacht das Koordinationsaufwand. Und wenn der Karren erstmal im Dreck steckt, fällt das Herausziehen schwer. Da muss man nicht mal organisationsweit blicken: [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html) würde viele Redundanzen und nuancierte Unterschiede in unserem 3-Familienpizzen Team auflösen, aber uns gelang eine Einführung bislang aus verschiedenen Gründen nicht (Altlasten, developer buy-in,..).

### Tracer Bullets

Die militärische Metapher bringt eine unnötige Aggresivität in den Diskurs. Zusätzlich empfinde ich sie als nicht ganz passend. Die Essenz dieses Kapitels ist aber etwas, was ich schon lange als hilfreich empfand: wenn man ein neues Projekt angeht, sollte das erste Ziel eine **end-to-end connection** zwischen allen Komponenten sein (z.B. UI -> Auth -> Business Logic -> Datenmodell -> Datenbank). Ein für sich stehendes Minimalfeature, das alle Layer berührt **und** funktioniert. So wird ein roter Faden gedrillt, auf den alles weitere aufbauen kann (z.B. "wie funktioniert das Error Handling nochmal?").

Erkenntnisse, auf die man bei der Entwicklung dieser _Tracer Bullet_ (Leuchtspurmunition) stößt, fließen direkt in zukünftige Iterationen ein. Fehler macht man so nur einmal - im Vergleich zu einer parallelen Entwicklung ("ups, das Response-Format passt doch nicht, jetzt müssen wir es an 7 Stellen ändern..."). Gleichzeitig hat man frühzeitig etwas Fertiges zum Vorzeigen, anstatt mehrere lose Fäden, die alle zu 90% abgeschlossen sind, aber eben doch noch nicht ganz.

Eine wichtige Abgrenzung setzen die Autoren zu Protoyping. Prototypen haben eine andere Bestimmung, nämlich schnell eine Idee zu prüfen - und ggf. zu verwerfen. Selbst wenn man sich dazu entscheidet, die Idee weiter zu verfolgen, wird der Prototyp i.d.R. weggeschmissen und neu "richtig" implementiert. Bei "Tracer Bullets" hingegen steht die korrekte Implementierung direkt im Vordergrund.

## 3. The Basic Tools

Die Einleitung dieses Kapitels erinnerte mich stark an den Lehrplan von [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/). Es ist egal, wie gut deine Gedankengänge sind, wenn dir das Werkzeug fehlt, um sie zu manifestieren. Im Fall von Softwareentwicklung sind das z.B. ein Editor, Versionskontrolle oder Debugging-Hilfsmittel.

- > Keep knowledge in plain text
  >
  > page 75

  Alle, die schon mal einen Screenshot verflucht haben, weil sie daraus keinen Text copy-pasten konnten, heben jetzt die Hand. Und ja, Microsoft Word, du bist nicht besser.

- > Use the Power of Command Shells
  >
  > page 79

  Die Kraft zu nutzen erfordert zu wissen, dass sie existiert. Häufig ist es nicht notwendig zu wissen, wie etwas geht, sondern nur, dass es möglich ist. Bei aller angebrachter Verachtung für die jüngsten Entwicklungen im AI-Segment, sehe ich hier tatsächlich großes Potential. Wer nicht regelmäßig mit `grep`, `sed`, `awk` und Co. hantiert, wühlt entweder ewig in Dokumentation oder trial-and-error'd zum Ziel. Alternativ kann nun auch das LLM der Wahl konsultiert werden: "Ich will eine Liste der 2nd-level dependencies dieser library." (und schneller an eine falsche Antwort kommen :P)

- > Achieve Editor Fluency
  >
  > page 81

  Ich fühle mich ertappt. Klar, ich habe meine Handvoll Shortcuts, die mir das Leben leichter machen. Aber es gibt viele Aufgaben, die ich immer noch sträflich stümperhaft absolviere: Maus-Klicks, die zu tief im Muskelgedächtnis sitzen; vernachlässigte Editor-Features; ein nicht vorhandenes Window-Management...

  Die Autoren bieten eine Lösung: das eigene Verhalten minutiös beobachten und jede unnötig umständlich erscheinende Handlung notieren, um eine bessere Alternative zu erörtern. Oder: der Sprung ins kalte Wasser und bestimmte Funktionalitäten eine Zeit lang komplett sperren (z.B. keine Maus oder keine Löschen-Taste nutzen).

- > Always Use Version Control
  > 
  > page 85

  Schon wieder eine Schwachstelle erwischt! Ja, natürlich nutzen wir Git in der Softwareentwicklung und ich habe Backups von meiner Dateien. Aber das lokale Entwicklungssetup falls der PC abraucht? Ein paar (veraltete) dotfiles könnte ich wiederherstellen, genauso wie ein (lange nicht geprüftes) Skript ausführen, welches ein paar Programme installiert. Aber alles darüber hinaus wäre manuelle Arbeit.

## 4. Pragmatic Paranoia

## 5. Bend, or Break

## 6. Concurrency

## 7. While You Are Coding

## 8. Before the Project

## 9. Pragmatic Projects
