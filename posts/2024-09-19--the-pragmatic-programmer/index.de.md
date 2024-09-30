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

![Screenshot der "Release Notes" der Apps Mastodon & Google Kalender](/images/blog/2024-09-19-release-notes.png)
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

> Keep knowledge in plain text    
> _page 75_

Alle, die schon mal einen Screenshot verflucht haben, weil sie daraus keinen Text copy-pasten konnten, heben jetzt die Hand. Und ja, Microsoft Word, du bist nicht besser.

> Use the Power of Command Shells    
> _page 79_

Die Kraft zu nutzen erfordert zu wissen, dass sie existiert. Häufig ist es nicht notwendig zu wissen, wie etwas geht, sondern nur, dass es möglich ist. Bei aller angebrachter Verachtung für die jüngsten Entwicklungen im AI-Segment, sehe ich hier tatsächlich großes Potential. Wer nicht regelmäßig mit `grep`, `sed`, `awk` und Co. hantiert, wühlt entweder ewig in Dokumentation oder trial-and-error'd zum Ziel. Alternativ kann nun auch das LLM der Wahl konsultiert werden: "Ich will eine Liste der 2nd-level dependencies dieser library." (und schneller an eine falsche Antwort kommen :P)

> Achieve Editor Fluency    
> _page 81_

Ich fühle mich ertappt. Klar, ich habe meine Handvoll Shortcuts, die mir das Leben leichter machen. Aber es gibt viele Aufgaben, die ich immer noch sträflich stümperhaft absolviere: Maus-Klicks, die zu tief im Muskelgedächtnis sitzen; vernachlässigte Editor-Features; ein nicht vorhandenes Window-Management...

Die Autoren bieten eine Lösung: das eigene Verhalten minutiös beobachten und jede unnötig umständlich erscheinende Handlung notieren, um eine bessere Alternative zu erörtern. Oder: der Sprung ins kalte Wasser und bestimmte Funktionalitäten eine Zeit lang komplett sperren (z.B. keine Maus oder keine Löschen-Taste nutzen).

> Always Use Version Control    
> _page 85_

Schon wieder eine Schwachstelle erwischt! Ja, natürlich nutzen wir Git in der Softwareentwicklung und ich habe Backups von meiner Dateien. Aber das lokale Entwicklungssetup falls der PC abraucht? Ein paar (veraltete) dotfiles könnte ich wiederherstellen, genauso wie ein (lange nicht geprüftes) Skript ausführen, welches ein paar Programme installiert. Aber alles darüber hinaus wäre manuelle Arbeit.

Das VCS-Kapitel schließt mit einer Challenge: gelegentlich ungenutzte Features ausprobieren. Sei es das VCS, der Hosting-Provider, ein Kommunikations-Tool,... Denn auch bei gut funktionierenden Arbeitsabläufen kann man sicher noch ein paar Stellschrauben drehen.

> Fix the Problem, Not the Blame    
> _page 89_

Das ist glücklicherweise in meinem Team kein Problem. `git blame` wird beim Debugging zwar gerne verwendet, aber viel mehr um herauszufinden, was der verursachende Commit zu ändern versuchte. War es vielleicht ein Workaround, der nun obsolet ist? Haben sich damalige Annahmen geändert?

Der Wert einer ausführlichen Bug-Beschreibung ist unermesslich. Debugging ist "a puzzle to be solved" bei dem jedes Indiz ausschlaggebend zur (schnelleren) Lösung sein kann.

"Fix the Problem" beinhaltet auch, das Problem zukünftig zu vermeiden. Daher sollte jeder beseitigte Bug auch ein Nachbeben auslösen in Form von
  - Tests, die auf den Bug prüfen
  - Checks in vorgeschalteten Systemen, die den Bug unterbinden
  - erweiterten Logs, die bessere Hinweise auf ähnliche Fälle liefern
  - Aufklärung des Teams, um mögliche Fehlannahmen auszuräumen

> Learn a Text Manipulation Language     
> _page 98_

Wenn Du viel Code schreibst, willst Du dabei gewisse Dinge automatisieren. Die API mit zufälligen Requests unter Last bringen? Release Notes aus den letzten Commits erstellen? Eine URL in allen 20 Microservices ändern? Dafür eignen sich einfache Skriptsprachen (wie Bash, Ruby oder Python).

## 4. Pragmatic Paranoia

Die Essenz dieses Kapitels: Du kannst niemandem trauen - nicht mal Dir selbst. Oder wohlmeinender ausgedrückt: selbst unter guten Bedingungen kann ein Sicherheitsnetz nicht schaden.

### Design by Contract

Warum also nicht jene Situationen vermeiden, in denen Vertrauen notwendig ist?

Im Security-Bereich wird das ausschließliche Wandern auf ausgetretenen Pfaden als [Zero Trust](https://de.wikipedia.org/wiki/Zero_Trust_Security) bezeichnet. Im Applikationsumfeld nimmt man den Mund etwas weniger voll und spricht von "Verträgen" ([Design by Contract](https://de.wikipedia.org/wiki/Design_by_Contract)). Dabei werden nur bestimmte Bedingungen akzeptiert, alles andere einfach ignoriert. Du willst diese Methode mit einer Zeichenkette aufrufen? Pech gehabt, es geht nur mit Ganzzahlen. Und auch nur zwischen 20 und 85. Mach Dir das Leben leicht: Schreibe absichtlich "faulen" Code, der nur unter dessen Voraussetzungen läuft.

Dabei ist natürlich notwendig, dass alle den "Vertrag" kennen. Wer [API-First](https://swagger.io/resources/articles/adopting-an-api-first-approach/) sein will, muss auch offen legen, wie Schnittstellen zu gebrauchen sind. Leider ist die Dokumentation gerne mal veraltet oder gar nicht vorhanden. Dann findet man die Regeln des Vertrags nur durch akribische Forensik, bloßen Zufall oder - Gott bewahre - Kommunikation mit den Verantwortlichen. Das kann ja niemand wollen.

### Dead Programs Tell No Lies

Keine Sorge wenn trotz aller Verträge etwas nicht so läuft wie geplant. Lass Dein Programm einfach abstürzen! Das mag achtlos klingen. Aber die Alternative wäre unter unbekannten Bedingungen weiterzulaufen, unnötig Ressourcen zu verbrauchen und womöglich Schaden anzurichten (hoppla, jetzt ist die Datenbank genuked).

Genau dafür gibt es [Ausnahmebehandlung](https://de.wikipedia.org/wiki/Ausnahmebehandlung), d.h. ein "supervisor" erkennt den Fehler, führt evtl. ein paar weitere Befehle aus (Log schreiben, Datei schließen,...) und signalisiert der nächsten Ebene, das etwas schief lief: versuche es nochmal oder versuche es anders.

### How to Balance Resources

Selbst kurz laufende Programme können Fußspuren hinterlassen. Das zurechtgeschnittene Foto, die 10 Zeilen Logs, den Inhalt der Push-Nachricht. Manches speichern wir beiläufig und permanent in einem Dateisystem oder einer Datenbank. Aber denken wir daran, diese Daten irgendwann auch wieder zu löschen? Oder züchten wir uns einen schlafenden Riesen, der irgendwann an seine Grenzen wächst?

### Don't Outrun Your Headlights

[Auf Sicht fahren](https://de.wikipedia.org/wiki/Auf_Sicht_fahren) ist nicht nur im Verkehr sinnvoll. Mach kleine Schritte. Teste. Frage die User.

Versuche Dich nicht in Wahrsagerei. Je weiter Du in die Zukunft blicken willst, desto wahrscheinlicher wirst du falsch liegen und Dir unnötige Arbeit machen. Schaffe lieber die Voraussetzungen, in Zukunft schnell etwas ändern zu können. Denn in der Zukunft wirst Du weiser sein.

## 5. Bend, or Break

Negativer ausgedrückt bedeutet das: wenn sich Dein Code in Zukunft nicht biegen lässt, wird er brechen.

### Decoupling

Ich ertappe mich gelegentlich bei der trügerischen Leichtigkeit, Attribute aus Objekten zu ziehen um mit ihnen zu arbeiten, z.B.

```kotlin
val total = order["123"].total
val discountedTotal = total * 0.9
order["123"].total = discountedTotal
```

Mal abgesehen von anderen Unzulänglichkeiten - dieser Code "fragt", obwohl er "anweisen" sollte.

> you shouldn't make decisions based on the internal state of an object and then update that object
>
> _page 132_

Also sollten wir stattdessen das Wissen über die Implementierung im Objekt belassen:

```kotlin
order["123"].applyDiscount(0.9)
```

Vielleicht wollen wir spätere weitere Anweisungen hinzufügen, z.B. dass der reduzierte Betrag nicht unter einen Mindestbetrag fallen soll. Das können wir nun alles zu `applyDiscount()` delegieren.

### Juggling the Real World

Der Versuch, die echte Welt an unsere in Code manifestierten Idealvorstellungen anzupassen, ist zum Scheitern verurteilt. Der Lieferant hat entschieden von der vorgegebenen Route abzuweichen und Du berücksichtigst das nicht bei der Berechnung der [voraussichtlichen Ankunftszeit](https://de.wikipedia.org/wiki/Estimated_time_of_arrival)? Zurück zum Anfang...

Die Autoren bieten ein simples Konzept an: in der realen Welt geschehen Ereignisse ("Events"). Das kann ein Mausklick sein oder eine Temperatur, die unter den Gefrierpunkt sinkt. Der Code muss diese Ereignisse abbilden und entsprechend reagieren. Methoden dafür sind:

- [endlicher Automat](https://de.wikipedia.org/wiki/Endlicher_Automat)
- [Observer Pattern](https://de.wikipedia.org/wiki/Beobachter_(Entwurfsmuster)) oder dessen entkoppeltes Geschwister [Publish/Subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
- [ReactiveX](https://reactivex.io/) ("event streams")

### Transforming Programming

Dieses Kapitel beleuchtet die Vorteile [funktionaler Programmierung](https://de.wikipedia.org/wiki/Funktionale_Programmierung). Im Grunde transformieren viele Programme nur Daten. Dieses [EVA-Prinzip](https://de.wikipedia.org/wiki/EVA-Prinzip) ist eins der ersten Themen auf Lehrplänen. Wenn eine Pipe `|` reicht, verwende eine Pipe (oder das Äquivalent in Deiner Programmiersprache).

Eine Besonderheit stellt dabei die Fehlerbehandlung dar. Denn die Strukturen, die wir durch Pipes übergeben, dürfen nicht nur den "happy path" abbilden, sondern müssen in sich auch Informationen über mögliche Fehler tragen.

### Inheritance Tax

Die [Erbschaftssteuer in Deutschland](https://de.wikipedia.org/wiki/Erbschaftsteuer_in_Deutschland) folgt zwar nicht stringent diesem Prinzip, aber für die Programmierung gilt: je mehr vererbt wird, desto teurer kann es werden. Alle, die sich mal in einem Vererbungsbaum verlaufen haben, werden nickend zustimmen. Komplett haarig, wird es, wenn eine Klasse von [mehreren Klassen erbt](https://de.wikipedia.org/wiki/Mehrfachvererbung) (looking at you C++ and Python).

Es gibt "schlankere" Mittel, um Ziele ohne Vererbung zu erreichen:
- nutze Interfaces für [Polymorphie](https://de.wikipedia.org/wiki/Polymorphie_(Programmierung))
- nutzer [Delegation](https://de.wikipedia.org/wiki/Delegation_(Softwareentwicklung)) zum Wiederverwenden eines Subsets von Funktionen einer anderen Klasse
- nutze [Mixins](https://de.wikipedia.org/wiki/Mixin) zum Teilen von Funktionen über mehrere Klassen

### Configuration

[Feature Toggle](https://de.wikipedia.org/wiki/Feature_Toggle) sind eine großartige Erfindung. Sie ermöglichen, zu jeder Zeit verändern zu können, wie sich das Programm verhält. Der grüne Hintergrund kommt nicht gut an? Rudern wir zurück zu blau! Die Adresse der API für schlechte Witze hat sich geändert? Sofort erledigt! Die Mehrwertsteuer hat sich temporär gesenkt? Gar kein Problem!

Das Konzept ist simpel. Es gibt eine Quelle für Konfigurationen, z.B. eine Datei oder eine Tabelle in einer Datenbank. Das Programm greift darauf zu, um dessen Parameter zu bestimmen.

Idealerweise ist die Konfiguration über eine API verfügbar, sodass Updates selbst zur Laufzeit in das Programm finden (ohne Neustarts). Auf diese Weise können sich auch mehrere Programme eine Konfiguration (oder Teile davon) teilen.

Konfigurationsquellen sollten ein simples Format haben, z.B. JSON oder YAML. Weniger technisch versierte Menschen können sie dann auch ändern. Bei komplexen Konfigurationen kann ein grafische verwaltungsoberfläche einen besseren Überblick geben.

## 6. Concurrency

Ein _sequentieller_ Programmablauf ist leichter nachzuvollziehen. Doch ein Durchbrechen der Sequenz erhöht die Geschwindigkeit des Programms:

- _nebenläufige_ Prozesse (etwas außerhalb unseres Codes benötigt Zeit) z.B. schon die zweite API-Anfrage senden, bevor wir die Antwort der ersten haben
- _parallele_ Prozesse (unser Code benötigt Zeit) z.B. Berechnungen auf verschiedene CPU-Kerne aufteilen

### Breaking Temporal Coupling

Manche Prozesse können gleichzeitig ablaufen, andere benötigen eine strikte Ordnung. Das Zeichnen eines [Aktivitätsdiagramms](https://de.wikipedia.org/wiki/Aktivit%C3%A4tsdiagramm) hilft, sich dessen gewahr zu werden. Für _Concurrency_ sind hierbei die Synchronisationsknoten von Bedeutung.

Aber nicht jede Möglichkeit der _Concurrency_ muss ausgenutzt werden. Gibt es z.B. Stellen im Programmablauf, in denen sowieso gewartet wird, lohnt es sich u.U. Prozesse in diese Zeit zu schieben, anstatt sie bereits vorher parallel auszuführen. Wenn man sich dadurch z.B. das Hochfahren eines zusätzlichen Computers spart und so den Ressourcenverbrauch optimiert.

### Shared State Is Incorrect State

_Shared state_ ist etwas, das gleichzeitigen Zugriff von mehreren Akteuren erlaubt, z.B. eine globale Variable. Das wird schnell problematisch. Die Autoren haben sich ein schönes Beispiel ausgedacht: in einem Restaurant fragen 2 Menschen jeweils nach einem Stück Kuchen. Es ist noch ein Stück Kuchen in der Vitrine, also versprechen beide Kellner, es zu servieren. Daraufhin laufen beide Kellner zur Vitrine und...

Es wird nun erläutert, wie dieses Problem behoben werden kann, indem mehrere Aktionen zu einer atomaren Aktion zusammengefasst werden z.B. durch die Nutzung von [Semaphoren](https://de.wikipedia.org/wiki/Semaphor_(Informatik)) oder von der Programmiersprache bereitgestellten Konstrukten. Am einfachsten ist es allerdings, wenn möglich, auf _shared state_ zu verzichten.

### Actors and Processes

[Aktoren](https://de.wikipedia.org/wiki/Actor_Model) bieten eine Möglichkeit _shared state_ zu vermeiden. Dabei wird alles nur lokal innerhalb der Aktoren gespeichert. Die Aktoren kommunizieren miteinander über Nachrichten. In diesem Kapitel programmieren die Autoren ein einfaches Aktoren-System für ihr Kuchen-Beispiel mithilfe von [nact](https://nact.xyz/) (JavaScript).

## 7. While You Are Coding

Irgendwann ist Software einsatzbereit. Doch hier endet die Arbeit nicht. Neue Features hinzufügen, bestehende verändern, Wartung, Support, Bugs fixen,... auch diese Tätigkeiten erfordern Hirnschmalz.

### Listen to Your Lizard Brain

Ebenfalls den Teil des Hirns, der schon am längsten dabei ist. Das Buch dreht sich zwar hauptsächlich um rationale Gedanken und Entscheidungen. Doch von Zeit zu Zeit ist es ratsam, auf die Intuition zu achten. Sie kann wichtige Signale geben. Fühlt sich etwas unnötig kompliziert an? Löse ich gerade das richtige Problem? Kann diese Änderung mir böse auf den Fuß fallen? Eventuell hat Dein Bauchgefühl recht.

Alle haben vermutlich mindestens eine Geschichte zu erzählen, bei denen ihnen der zündende Einfall unter der Dusche oder beim Spaziergang kam. Es hilft, gelegentlich aktiv den Tunnelblick zu pausieren - eventuell gräbt man den Tunnel ja in die falsche Richtung.

### Programming by Coincidence

Langfristig ist der Zufall kein guter Verbündeter. Probiere nicht irgendwas aus und belasse es dabei, nur weil es gerade funktioniert - oder verfalle dem klassischen "ungeprüft von [stackoverflow](https://de.wikipedia.org/wiki/Stack_Overflow_(Website)) kopiert". Wenn du eine Funktion oder eine API aufrufst, vertraue nicht auf undokumentiertes Verhalten. Dies kann sich jederzeit ändern. Dein Code wird an irgendeiner Stelle überraschend darauf reagieren. Wenn Du nicht weißt, wie etwas funktioniert, weißt du auch nicht, warum etwas schief geht.

> Don't assume it, prove it.
>
> _page 200_

Schaue Dir auch den Kontext, in dem Dein Programm läuft an. Hast Du Annahmen, die nicht den Tatsachen entsprechen? Zum Beispiel, dass alle Deine User Deutsch sprechen und eine mit dem Internet verbunden sind; dass eine API oder Konfigurationsdatei immer verfügbar ist; dass der Server die gleiche Zeitzone hat?

Wenn Du trotzdem Annahmen triffst, dokumentiere diese zumindest. So hast du (oder jemand anderes) später Indizien.

Lass Dich nicht von bestehendem Code einschränken. _Refactoring_ ist ein Mittel, jetzt lieber etwas mehr Arbeit zu verrichten, um sie später um ein Vielfaches zu vermeiden.

### Algorithm Speed

[Big _O_ Notation](https://de.wikipedia.org/wiki/Landau-Symbole) mit low-level Bedenken wie Laufzeitlänge oder Speicherplatzverbrauch wirkt etwas losgelöst vom bisherigen Inhalt. Doch wir agieren in einer endlichen Welt und _pragmatic programmers_ wollen Ergebnisse erzielen. Deshalb macht es Sinn, sich zu überlegen, ob der Kombinatorik-Algorithmus mit vier verschachtelten Schleifen zielführend ist.

Gleichzeitig ist es nicht notwendig, den letzten 10ms Zeitgewinn hinterher zu jagen, wenn diesen Unterschied eigentlich niemanden juckt.

### Refactoring

[Refactoring](https://de.wikipedia.org/wiki/Refactoring) bedeutet Veränderungen des Codes ohne Veränderung der Geschäftslogik. Die Auswirkungen der Änderungen beziehen sich also auf andere Faktoren wie Lesbarkeit, Wartbarkeit oder Performance. Wie Zähneputzen sollte dies regelmäßig passieren, damit der Code jederzeit in einem guten Zustand ist. Die Basis sind [Regressionstest](https://de.wikipedia.org/wiki/Regressionstest), um festzustellen, dass die Veränderung sich nicht negativ auf das Bestehende auswirken.

Die Autoren finden die Metapher des Hausbaus in diesem Zusammenhang unpassend für das Programmieren. Es impliziert, dass es eine unveränderbare Grundstruktur gibt. Programmieren sei mehr wie Gartenarbeit, bei der Veränderungen stetiger und radikaler sein können.

### Test to Code

> A test is the first user of your code.
>
> _page 216_

Ein guter Indikator dafür, dass der Code eine Überarbeitung benötigt: er ist schwer zu testen. Wenn er schwer zu testen ist, ist er womöglich auch schwer in den restlichen Code zu integrieren.

Bevor Du Code schreibst, mach' Dir Gedanken wie Du ihn testen kannst. Auf diese Weise verstehst Du auch die Anforderungen besser (oder überhaupt erst). Manche gehen sogar einen Schritt weiter und machen sich nicht nur Gedanken vorher, sondern schreiben die Tests auch vorher ([Testgetriebene Entwicklung](https://de.wikipedia.org/wiki/Testgetriebene_Entwicklung)). Wie bei vielen Dingen, sinkt allerdings auch hier der Grenznutzen, je weiter man sich einem Extrem nähert. Ziele wie "100% Testabdeckung" oder "fehlschlagende Tests vor jeder neuen Zeile im Code" mögen einen akademischen Reiz haben, sind in der Praxis aber selten den Aufwand wert.

Folgende Herangehensweisen sind aber auf jeden Fall von Vorteil:

1. [Unit Tests](https://de.wikipedia.org/wiki/Modultest), um die Schnittstellen im Code zu prüfen
2. "ad hoc tests" während der Entwicklung (z.B. via print statements oder Debugging Tools)
3. Tests mit echten Daten auf dem echten (Produktiv-)System, da sich manche Zustände anders nur schwer herstellen lassen
4. Logs, die Besonderheiten dokumentieren (auf einheitliches Format achten)
5. Monitoring, um anhaltende Inkonsistenzen zu entdecken

> Test your software, or your users will.
>
> _page 223_

### Property-Based Testing

Selbst bei 100% erfolgreicher Testabdeckung kann es auch einfach sein, dass man das falsche programmiert hat. Wer testet, dass die Tests auch das überprüfen, was man möchte?

Wir könnten einen subtilen Bug in unserer Implementierung haben, z.B. ein Sortieralgorithmus, der bei 6 gleichen Elementen das sechste löscht. Wenn wir exakt diesen Fall nicht in unseren Tests abbilden, wird er unentdeckt bleiben. Er landet bei den Usern, die sich über komisches Verhalten beschweren werden.

Für viele Programmiersprachen gibt es "property-based testing frameworks" (z.B. [Kotest](https://kotest.io/docs/proptest/property-based-testing.html) für Kotlin). Diese führen einen Test in vielen verschiedenen Varianten aus. Für einen Sortieralgorithmus wäre das z.B. mit Listen unterschiedlicher Länge, bereits sortierten Listen, gleichen Elementen, weit auseinander liegenden Elementen, usw. Der Test selbst prüft dann einen Teil des "Vertrags", z.B. dass die Eingabe-Liste genauso lang sein muss wie die Ausgabe-Liste oder jedes Element in der Liste kleiner sein muss als das nächste.

Dabei wird grob definiert, welche Eigenschaften die Varianten haben sollen. Trotzdem erzeugt jeder Testlauf leicht unterschiedliche Eingaben. Solche Tests sind also weder wiederholbar noch deterministisch. Dies kann dazu führen, dass Tests manchmal erfolgreich sind und manchmal scheitern. Die Eingabe eines gescheiterten Tests sollte also als zukünftiger Regressionstest in einen separaten Unit Test überführt werden.

### Stay Safe Out There

Bei jedem Programm, welches mit der Außenwelt kommuniziert, werden früher oder später auch ungeladene Gäste anklopfen. Damit es bei einem Klopfen bleibt, sollte das System sich nach folgenden Prinzipien richten:

- Angriffsfläche minimieren
  
  Dies betrifft alle Möglichkeiten der Ein- und Ausgabe von Daten oder Ausführung von Prozessen. Jede nicht selbst getätigte Eingabe sollte auf Plausibilität überprüft werden -> [relevant xkcd](https://xkcd.com/327/). Öffentliche Endpunkte können Ziel von [DoS-Attacken](https://de.wikipedia.org/wiki/Denial_of_Service) werden. Services _ohne_ Authentifizierung werden irgendwann von Datenhungrigen abgegrast. Services _mit_ Authentifizierung sollten keine Standard-Passwörter nutzen und Karteileichen den Zugriff entziehen. Keine nicht bekannten Informationen nach außen geben (z.B. [Stacktraces](https://de.wikipedia.org/wiki/Stacktrace) oder _"Dieses Passwort wird schon von user weak@l33t.org verwendet."_).

- Berechtigungen so gering wie nötig halten: [least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege)

  Die Anzahl individuell einstellbarer [IAM permissions](https://cloud.google.com/iam/docs/permissions-reference) bei Google Cloud liegt aktuell bei "_over 9000_". So gut wie jede mögliche Aktion von Logs ansehen bis Ports öffnen kann hier erlaubt oder verboten werden. Viele andere Systeme unterscheiden, wenn überhaupt, zwischen "admin" und "user". Für die meisten liegt der sweet spot wohl irgendwo zwischen exorbitantem Aufwand und völliger Vernachlässigung.

- sichere Grundeinstellungen

  Wenn Dein System die Möglichkeit bietet zwischen verschiedenen Einstellungen zu wählen, sollte die initiale Standardeinstellung immer die sicherste sein, selbst wenn das nicht die bedienungsfreundlichste Einstellung ist. Viele finden es komfortabel, bei der Passworteingabe den letzten Buchstaben kurz im Klartext zu sehen. Aber vielleicht nicht, wenn sie gerade im Zug sitzen oder ihren Bildschirm teilen. [Better safe than sorry](https://dictionary.cambridge.org/dictionary/english/better-safe-than-sorry).

- sensible Daten verschlüsseln

  Inzwischen hoffentlich eine klare Sache. Einfach machen. Immer. Und keinen selbsterstellten kryptographischen Algorithmus verwenden.

- Updates installieren

  Viele große Datenlecks und andere Probleme sind durch öffentlich bekannte Sicherheitslücken ([CVE](https://de.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures)) entstanden. Kein Patch, kein Mitleid (und bald keine Kunden).

### Naming Things

Ist es `user`? Oder doch eher `customer`, `seller`, `player`, `employee`,...? Sei nicht generisch, wenn du klar und eindeutig sein kannst.

Bei der Formatierung solltest Du auf Konventionen achten. Ein Braunbär ist ein `brown_bear` in [Python](https://peps.python.org/pep-0008/#function-and-variable-names), ein `brownBear` in [Java](https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html) und in wieder einer anderen Sprache vielleicht ein `Grizzly`.

Findest Du nicht auf Anhieb die richtigen Namen, lassen sie sich jederzeit ändern. Dies wird sogar zur Pflicht, wenn sich die Implementierung ändert, z.B. aus `getCustomers()` plötzlich `sendCustomers()` wird. Vermeide auf jeden Fall irreführende Namen.

## 8. Before the Project

### The Requirements Pit

Die echte Welt ist voller Unordnung und Unbekanntem. Zu Beginn eines Software-Projekts weiß meistens niemand, was _genau_ sie wollen. Es startet mit einem bestimmten Problem, das aber nur ein oberflächliches Symptom sein kann. Wir helfen dabei zu verstehen, was sie _wirklich_ wollen (z.B. indem wir [fünf mal "Warum?" fragen](https://de.wikipedia.org/wiki/5-Why-Methode)). Um abstrakte Wünsche zu programmieren, müssen sie erst zu konkreten Anforderungen werden.

Das ganze erfordert i.d.R. mehrere Runden des Feinschliffs, wie bei einem Edelstein.

> _Kunden sollen die Ankunftszeit der Lieferung erfahren._
> - Auf welchem Kanal?
> - Wie groß darf das Zeitfenster sein?
> - Was wenn sich die Ankunftszeit nachträglich ändert (unterscheiden zwischen Minuten, Stunden, Tagen?)
> - Was wenn nur ein Teil der Bestellung geliefert wird?
> - Was wenn der Lieferwagen keine Internetverbindung hat?
> - usw.

Dies lässt sich auch nicht vermeiden. Kein einzelner Mensch denkt initial an alle Unwägbarkeiten und Grenzfälle. Manche kennen die Domäne besser, andere die Technik, wieder andere die gesetzlichen Vorgaben. In komplexen Projekten ist Kommunikation der Schlüssel zum Erfolg.

Ist diese Kommunikation gestört oder bleibst Du trotzdem ratlos zurück: entwirf ein schnelles [Mockup](https://de.wikipedia.org/wiki/Vorf%C3%BChrmodell) und frag nach Feedback dazu. Noch besser: nimm die Kundenperspektive ein. Du entwirfst eine App für Lieferanten? Fahre mit einem Lieferanten mit und lerne, wie die App wirklich verwendet werden wird. Dies stärkt auch die Kundenbeziehung.

An irgendeinem Punkt ist eine Anforderung klar. Um sie explizit zu machen, sollte man auf einen extensiven Anforderungskatalog verzichten. Kurze [User Stories](https://de.wikipedia.org/wiki/User_Story) fangen die Essenz der Anforderung ein und werden auch tatsächlich gelesen. Bei Unklarheiten bilden sie die Basis für weitere Kommunikation. Sie lassen sich gut in ein [Kanban-Board](https://de.wikipedia.org/wiki/Kanban-Board) einbinden, um dem Fortschritt nachzuverfolgen.

In der Diskussion um Anforderungen wird manchen Begriffen eine besondere Bedeutung zugesprochen, die sich im normalen Sprachgebrauch nicht erschließt. In diesen Fällen sollte ein Glossar angelegt werden, um z.B. den Unterschied zwischen "customer" und "cardholder" zu definieren. Vermeide verschiedene Begriffe, die dasselbe meinen. Und vermeide besonders denselben Begriff für zwei verschiedene Dinge zu verwenden.

### Working Together

[Conway's Law](https://de.wikipedia.org/wiki/Gesetz_von_Conway) besagt, dass die Qualität der Schnittstellen zwischen Softwareteams der Qualität der Kommunikation zwischen diesen Teams entspricht. Dies lässt sich erweitern auf die Zusammenarbeit mit den Kunden. Auch hier wird sich im Endprodukt zeigen, wie gut die Kommunikation war.

Bei Arbeit innerhalb eines Teams bietet [Pair-Programming](https://de.wikipedia.org/wiki/Paarprogrammierung) oder [Mob-Programming](https://de.wikipedia.org/wiki/Mob_Programming) viele Vorteile.

### The Essence of Agility

Da die Autoren am [Agile Manifesto](https://agilemanifesto.org/) mitwirkten, ist es sehr erfrischend aus ihrer Feder zu lesen, dass sich diese Prinzipien nicht in "agile Prozesse" gießen lassen (z.B. jedes Team muss 3-Wochen-Sprints machen). Solche Maßnahmen sind _starr_ und daher allein semantisch nicht mit Agilität vereinbar. 

Agilität ist Anpassung. Eine Gazelle, die von einer Löwin gejagt wird, wird sich anders verhalten, je nachdem ob sie sich am Wasserloch, im hohen Gras oder auf der freien Steppe befindet, ob sie unter anderen Gazellen ist und wie sich die Löwin bewegt. Und die Metapher der gejagten Gazelle passt vorzüglich zu dem, wie viele Entwickelnde vermeintliche "Agilität" heutzutage sehen: nicht mehr nur als Gängelung, sondern als Gefahr ihrer Produktivität und ihres geistigen Wohlbefindens.

Agilität wurde von Scharlatanen und Geldgierigen ausgehöhlt, und mit Zertifikaten und fakturierbaren Stunden gefüllt.

Die wahre Natur von Agilität ist es, kleine Dinge auszuprobieren und sehen ob man sich damit näher ans Ziel bewegt oder nicht.

## 9. Pragmatic Projects

### Pragmatic Teams

Mit ihrer Empfehlung für Teamgrößen sind die Autoren sich mit dem [Scrum-Guide](https://scrumguides.org/scrum-guide.html#scrum-team) einig (_"10 or fewer people"_). Ihre Begründung ist, dass mit jedem zusätzlichen Mitglied die Anzahl an Kommunikationspfaden um _O(n²)_ steigt. Das wird ab einer Größe von 10-12 ineffektiv, weil alle nur noch damit beschäftigt sind, sich mit anderen abzustimmen.

Manche der im Buch bereits angeschnittenen Themen lassen sich auf Projektteams münzen:

- Alle müssen Verantwortung für die Qualität des Produkts übernehmen (und _zerbrochene Fensterscheiben_ austauschen).
- Alle müssen Kenntnis über Veränderungen haben: neue Features, auftretende Fehler, Monitoring & Metriken.
- Das Team darf nicht nur an neuen Features arbeiten, sondern muss Zeit für andere Verbesserungen & Innovationen einplanen, z.B. Systemwartung, Prozessanpassungen, technische Experimente, individuelle Bildung.
- Das Team pflegt eine gute Präsenz nach außen, die sich z.B. in einwandfreier Dokumentation, kurzweiligen und effektiven Meetings sowie aufschlussreichen Präsentationen manifestiert. Bonuspunkte, wenn das Team einen wiedererkennbaren und einzigartigen Namen hat.
- Die Kommunikation untereinander ist unkompliziert und nahezu unverzüglich. Antworten bekommen, Fortschritt teilen oder Erkenntnisse vermitteln - alles sollte transparent und schnell möglich sein.
- Übergaben sind überflüssig, weil das gesamte Team die wichtigen Abläufe kennt und durchführen kann. Alles andere kann warten.
- So viel wie möglich ist automatisiert.

### Coconuts Don't Cut It

[Cargo-Kulte](https://de.wikipedia.org/wiki/Cargo-Kult) ahmen äußere Umstände nach und hoffen auf Eintritt eines Ergebnisses, das überhaupt nicht durch das Nachahmen herbeigeführt werden kann.

Muss das Team ein bestimmtes Framework nutzen, weil ein anderes Team damit erfolgreich war? Müssen alle im Daily sprechen, weil es so im Guide steht? Muss das Unternehmen in Squads und Gilden eingeteilt werden, weil es Spotify so macht(e)?

Die Antwort lautet jedes Mal _"Nein."_. Dein Team ist nicht das andere Team, ein Buch oder Spotify. Ihr _könnt_ es ausprobieren, aber es ist keine Geheimwaffe ins Glück, an der man unabdingbar festhalten muss.

### Pragmatic Starter Kit

Wir wollen, dass allgemeine Tätigkeiten (Tests, Deployment, Release, Verwaltung) möglichst automatisiert von allen ausgeführt werden können.

Drei Dinge helfen dabei:

1. Versionskontrolle

    Dies gilt auch für Ressourcen ([Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code)) und Konfigurationen. Builds, Tests und Releases sollten jederzeit neu aufgesetzt werden können und nicht abhängig von einem lokalen Rechner sein, auf den fast niemand Zugriff hat und der bei Absturz den gesamten Entwicklungsprozess torpediert.

2. Regressionstests

    Trotz der Gefahr sich wie eine kaputte Schallplatte anzuhören, erwähnen es die Autoren lieber noch einmal: _"Test early, test often, test automatically"_. Eine Testumgebung, die die Produktivumgebung so gut wie es geht spiegelt, ist dabei äußerst hilfreich. Teste auch wie sich das System im Extremfall verhält, wenn Daten oder Services nicht verfügbar sind. Für jeden erkannten Bug muss es einen Test geben, um ihn zukünftig zu verhindern.

3. Vollständige Automatisierung

    Mache nichts manuell, was du automatisieren kannst. Ein Skript unterstützt Versionskontrolle. Ein Skript ist leicht teilbar. Ein Skript vergisst beim fünften Mal nicht aus Versehen einen Schritt. Ein Skript ist schneller.

### Delight Your Users

> How will you know that we've all been successful a month (or a year, or whatever) after this project is done?
> 
> _page 280_

Die einfache Antwort: wenn die User begeistert sind. Nicht wenn sie uns mehr bezahlt haben als letztes Jahr. Nicht wenn wir mehr Daten über sie gesammelt haben. Nicht weil der Code funktioniert. Die User sind begeistert, wenn wir ihre Probleme lösen. Softwareentwicklung ist Problemlösung. Dafür ist wichtig, dass alle im Team verstehen, was die Probleme sind.

Das Postface des Buchs fasst gut zusammen, welcher moralische Kompass an den Tag gelegt werden sollte:

> 1. Have I protected the user? (_First, Do No Harm_)
> 2. Would I use this myself? (_Don't Enable Scumbags_)
>
> _page 286_

### Pride and Prejudice

An Gebäuden prangt gelegentlich eine Gravur oder Meißelung: _"Erbaut von..."_.

Software kann auf ähnliche Weise Stolz erzeugen. Allerdings kann individueller Stolz auch nachteilig sein, denn er kann zu fehlgeleiteter Verteidigung und territorialen Ansprüchen auf Code-Fragmente führen. Die Grundpfeiler sollten stattdessen gegenseitiger Respekt und Professionalität sein.

Extreme Programming spricht deshalb von _[collective ownership](http://www.extremeprogramming.org/rules/collective.html)_: _"Erbaut von Team XYZ"_.
