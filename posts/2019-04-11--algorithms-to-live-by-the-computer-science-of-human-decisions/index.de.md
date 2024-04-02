---
title: Algorithms to Live By - The Computer Science of Human Decisions
category: "coffee table"
cover: algorithms_to_live_by.jpg
author: jo3rn
---

Das Buch [Algorithms to Live By](https://algorithmstoliveby.com/) erklärt beiläufig 11 größere Themen der Computer-Wissenschaft, indem es deren Anwendbarkeit im Alltag untersucht.

![Das Buch "Algorithms to Live By - The Computer Science of Human Decisions" auf einem Beistelltisch](/images/blog/2019-04-11-algorithms_to_live_by.jpg)

So wird z.B. im ersten Kapitel _Optimal Stopping_ ein Algorithmus analysiert, der die beste unter 100 sich bewerbenden Sekretärinnen ermitteln soll (bekannt als [Sekräterinnenproblem](https://de.wikipedia.org/wiki/Sekret%C3%A4rinnenproblem)). Die Einschränkung: die Ja/Nein Entscheidung muss immer direkt nach dem Vorstellungsgespräch getroffen werden, also vor der nächsten Bewerberin. __Spoiler__: Man schaut sich die ersten 37 an und nimmt anschließend diejenige, die besser ist als alle bisher gesehenen. Dies garantiert nicht, die Spitzenreiterin aller Bewerberinnen zu erwischen, sondern ist nur die beste von allen möglichen Strategien. Wie verändert sich der Algorithmus durch die Möglichkeit zu einer vorherigen Sekretärin zurück zu kehren? Oder wenn eine Sekretärin das Job-Angebot ausschlagen kann? Oder wenn man die Opportunitätskosten für den Bewerbungsvorgang berücksichtigen muss? Dabei stellt sich heraus, dass man die optimale Vorgehensweise auf viele realistischere "Probleme" anwenden kann, z.B. bei der Parkplatzsuche, beim Hauskauf oder Dating.

Im weiteren Verlauf werden verschiedenste Algorithmen seziert und für den Normalo schmackhaft gemacht. Wie sortiere ich etwas am besten? Wie plane ich etwas am besten? 1:1 lassen sich die Algorithmen aber nicht immer ins "echte Leben" übertragen. Wie kann ich denn nun [meine gewaschenen Socken effizient zusammenlegen](https://stackoverflow.com/questions/14415881/how-to-pair-socks-from-a-pile-efficiently), ohne Diplom in Informatik? Außer Acht lässt dieses Buch auch praktische Lösungsansätze wie einfach nur eine Art von Socken zu besitzen (mein Favorit) oder Socken gar nicht zusammen zu legen und irgendwelche zwei anzuziehen (wie es ein Freund tatsächlich macht).

Doch ich glaube die Prämisse des Buches ist es gar nicht, stur aus der Algorithmen-Theorie Lebenstipps abzuleiten, sondern einen leichten und griffigen Einstieg in die Theorie selbst zu liefern. Und das gelingt den Autoren durch die zahlreichen Beispiele äußerst gut. Ich hatte Freude beim Lesen und den ein oder anderen Aha-Moment. Was mir besonders gefallen hat, war die Zitatauswahl, mit derer die Autoren jedes Kapitel beginnen. Für Menschen, die sich gar nicht für Mathematik oder Informatik begeistern lassen, ist diese Buch jedoch nichts.

Für alle anderen hier ein kurzer Teaser der behandelten Themen:

- **optimal stopping**
    Auswahl des Zeitpunkts einer Entscheidung, bei der die erwartete Auszahlung maximiert oder die erwarteten Kosten minimiert werden
- **multi-armed bandit**
    Auswahl einer Entscheidung zwischen mehreren Optionen, dessen Eigenschaften nur teilweise bekannt sind und erst im Zeitverlauf besser verstanden werden können
- **sorting**
    Sortierverfahren anhand einer definierten Ordnung (z.B. [bubble sort](https://de.wikipedia.org/wiki/Bubblesort), [merge sort](https://de.wikipedia.org/wiki/Mergesort),…), um anschließende Suchvorgänge effizient zu gestalten
- **caching**
    Datenvorhaltung, um zukünftige Anfragen schnellstmöglich zu verarbeiten (z.B. [First-In-First-Out](https://de.wikipedia.org/wiki/First_In_%E2%80%93_First_Out) oder [Least Recently Used](https://de.wikipedia.org/wiki/Least_recently_used)) mit interessantem Exkurs ins menschliche Gedächtnis
- **scheduling**
    Zuweisen von Ressourcen zur Verrichtung von Arbeit (Planen)
- **Bayes rule**
    Handhabung und Berücksichtigung von Wahrscheinlichkeiten
- **overfitting**
    Erörterung welche Variablen und Ereignisse für eine Entscheidung relevant sind
- **relaxation**
    Vergrößerung der Menge zulässiger Lösungen, um ein Problem leichter zu lösen
- **randomness**
    Einbinden von Zufall in den Entscheidungsprozess (z.B. [Metropolis-Algorithmus](https://de.wikipedia.org/wiki/Metropolis-Algorithmus) oder [simulated annealing](https://de.wikipedia.org/wiki/Simulated_Annealing))
- **networking**
    eine überwältigende Anzahl von Ereignissen in den Griff bekommen
- **game theory**
    Entscheidungssituationen mit mehreren Beteiligten (z.B. [prisoner’s dilemma](https://de.wikipedia.org/wiki/Gefangenendilemma) oder [tragedy of the commons](https://de.wikipedia.org/wiki/Tragik_der_Allmende))

Das Buch wirft beiläufig zudem eine spannende Frage auf: ist der Computer ein Replikat des menschlichen Gehirns? Oder entwickeln wir vielleicht sogar bereits eine bessere Version, Gehirn 2.0?

Ebenfalls bemerkenswert ist der Schlussaufruf zur [computational kindness](https://egtheory.wordpress.com/2016/06/30/computational-kindness/). Zu deutsch in etwa: mit den kognitiven Ressourcen seiner Mitmenschen möglichst schonend umzugehen. Erklärt wird es u.a. mit einem Supermarkt, der so aufgebaut ist, dass Einkaufende schnell alles findem (Stichwort: [Windeln und Bier](https://www.theregister.co.uk/2006/08/15/beer_diapers/)) und dadurch lange Suchläufe vermieden werden. Im Umgang miteinander bedeutet _computational kindness_ z.B. seine Absichten klar zu nennen („Wo gehen wir zum essen hin?“), womit anderen Grübeln und das Fahren von Simulationen erspart wird – oder dass man die internen Speicher und Warteschlangen der anderen klein hält, indem man sich die ein oder andere E-Mail und Textnachricht verkneift. Die Begegnung in einem persönlichen Gespräch ist sowieso durch nichts zu ersetzen.
