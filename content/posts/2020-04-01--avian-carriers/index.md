---
title: Die Taube auf dem Dach
category: "web"
cover: doves.jpg
author: jo3rn
---

Endlich 1. April, eine gute Gelegenheit um über RFCs zu sprechen. RFC? Was ist das nun wieder für ein Techie-Akronym? Kurz gesagt sind RFCs schriftliche Dokumentationen technischer Systeme. Diese technischen Systeme sind meistens andere Techie-Akronmye, z.B. [HTTP](https://tools.ietf.org/html/rfc7540), [ASCII](https://tools.ietf.org/html/rfc20), [IPv6](https://tools.ietf.org/html/rfc8200), [FTP](https://tools.ietf.org/html/rfc959), [DHCP](https://tools.ietf.org/html/rfc2131) oder [TCP](https://tools.ietf.org/html/rfc793). Ein Archiv aller RFCs findet sich auf dem [RFC Index](https://www.rfc-editor.org/rfc-index-100a.html).

Lang gesagt steht RFC für [Requests for Comments](https://en.wikipedia.org/wiki/Request_for_Comments), also *Bitten um Kommentare*. Diese Bezeichnung ist nicht nur komisch sondern inzwischen auch irreführend. Denn während früher tatsächlich RFCs als Dokumentenentwürfe mit der *Bitte um Kommentare* zur Weiterverarbeitung frei gegeben wurden, sind heutige RFCs nach ihrer Veröffentlichung unveränderbar. Theoretisch kann jeder einen RFC verfassen, meistens ist jedoch eine Organisation wie die [IETF](https://www.ietf.org/), [IAB](https://www.iab.org/) oder [IRTF](https://irtf.org/) beteiligt. Für die Veröffentlichung als [Internetstandard](https://www.rfc-editor.org/standards) oder [Best Current Practice](http://www.rfc-editor.org/search/rfc_search_detail.php?page=All&rfc=bcp) ist eine Begutachtung der IETF (bzw. der ihr  zugehörigen [IESG](https://www.ietf.org/about/groups/iesg/)) sogar zwingend notwendig. Mitunter gibt es äußerst ausgefeilte Publikations- und Genehmigungsverfahren. Das dient der Sicherung einer besonderen Qualität dieser Dokumente, begleitet von einem erheblichen Anteil an Formalismus.

Nicht nur für Außenstehende ist das mitunter dröge. Deshalb gibt es regelmäßig zum 1. April eine kleine Auflockerung in Form von [nicht ganz ernst gemeinten RFCs](https://en.wikipedia.org/wiki/April_Fools%27_Day_Request_for_Comments). Der wohl bekannteste Fall dieses Brauchs, das "[Internet der Brieftauben](https://de.wikipedia.org/wiki/Internet_Protocol_over_Avian_Carriers)", beschäftigte die RFC-Editoren gleich an drei April Fool's Days. Trotz oder gerade aufgrund des humoristischen Grundtons ist diese Idee eine gut verständliche Metapher für den Netzwerkverkehr. Im Folgenden schauen wir uns die 3 besagten RFCs etwas genauer an. Die verlinkten Originaldokumente zu diesen RFCs sind durchaus lesenswert. Sie befolgen das gleiche Format wie die "echten" RFCs, dienen daher einem leichten Einstieg in die Welt der RFCs.

## [1. April 1990] [RFC 1149: A Standard for the Transmission of IP Datagrams on Avian Carriers](https://tools.ietf.org/html/rfc1149)

Diese besondere Form des [Turnschuhnetzwerks](https://de.wikipedia.org/wiki/Turnschuhnetzwerk) sieht Brieftauben als Überträger von Datenpaketen vor. Dabei werden Nachrichten am Fuß der Taube befestigt. Besonders gut soll dies in Großstädten und Ballungszentren funktionieren. Die maximale Übertragungseinheit ([MTU](https://de.wikipedia.org/wiki/Maximum_Transmission_Unit)) beträgt je nach Alter der Taube etwa 256 Milligramm. Der Service zeichnet sich durch hohe Latenz und geringen Datendurchsatz aus. Da den Tauben im Gegensatz zu traditionellen Übertragungswegen 3 Dimensionen zur Verfügung stehen, ist die Kollisionsrate äußerst gering. Zudem ist die Kommunikation, anders als z.B. bei [Packet Radio](https://de.wikipedia.org/wiki/Packet_Radio), nicht auf Entfernungen in Blickdistanz limitiert. Ein weiterer Vorteil ist, dass Würmer im Netzwerk erkannt und ausgemerzt werden können. Allerdings lässt sich nur eine Punkt-zu-Punkt-Verbindung realisieren, das Netzwerk ist also nicht direkt [broad-](https://de.wikipedia.org/wiki/Broadcast) oder [multicast](https://de.wikipedia.org/wiki/Multicast)-fähig.

In 2001 fand die weltweit [erste Implementierung](https://www.blug.linux.no/rfc1149/) des Brieftaubeninternets statt. Es ergab sich folgende Übertragungsstatistik:
* Paketverluste: 55%
* Latenz:
    * maximal: 6388671.9 ms (~106.5 Minuten)
    * minimal: 3211900.8 ms (~53.5 Minuten)
    * Mittelwert: 5222806.6 ms (~87 Minuten)

## [1. April 1999] [RFC 2549: IP over Avian Carriers with Quality of Service](https://tools.ietf.org/html/rfc2549)

Dieser RFC erweitert den 1149 um Service-Klassen:
1. Concorde
2. First
3. Business
4. Coach

Die Brieftauben tragen einen Barcode der jeweiligen Klasse auf ihrem Flügel. Wenn die Tauben ankommen, werden sie ähnlich dem [Priority Boarding](https://www.expedia.de/explore/reiselexikon-priority-boarding) einer Schlange zugewiesen und entsprechend der Klassenreihenfolge ausgelesen.

Ansonsten ist dieser RFC ein Versuch, möglichst viele Netzwerk-Begriffe (bridge, mirror, NAT,...) im Brieftaubenkontext zu verwursten. Tolle Tauben-[ASCII-Kunst](https://de.wikipedia.org/wiki/ASCII-Art) gibt es gratis obendrauf:

``` java
                 __
 _____/-----\   / o\    
<____   _____\_/    >--    
     \ /    /______/    
      /|:||/    
     /____/|     
```

## [1. April 2011] [RFC 6214: Adaptation of RFC 1149 for IPv6](https://tools.ietf.org/html/rfc6214)

Um sich der drohenden Knappheit von [IPv4](https://de.wikipedia.org/wiki/IPv4)-Adressen entgegenzustellen, beschreibt dieser RFC wie das Brieftaubennetz mit [IPv6](https://de.wikipedia.org/wiki/IPv6) zu nutzen ist. Des Weiteren setzt er das Feuerwerk abstruser Netzwerk-Tauben-Kalauer fort, sodass man hofft, das dies der letzte Teil der *Avian Carrier* Reihe bleiben wird.

## Und in diesem Jahr

In 2020 wurde folgender April-RFC veröffentlicht: 

###### Cover photo by <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@nate_dumlao?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Nathan Dumlao"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Nathan Dumlao</span></a>