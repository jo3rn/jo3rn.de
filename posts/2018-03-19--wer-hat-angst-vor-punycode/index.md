---
title: Wer hat Angst vor Punycode?
category: "security"
author: jo3rn
---

Vermutlich kaum jemand. Schon das Wort puny (engl. mickrig) bietet keinen Anlass für erhöhte Aufmerksamkeit. In Ausnahmefällen allerdings schon.

Fangen wir vorne an. Ein Mantra der Informationssicherheit, welches hinlänglich bekannt sein sollte, erfährt durch Punycode neuen Aufwind:

> Fahre mit der Maus über einen verdächtigen Link, bevor du darauf klickst.

Mit Hilfe dieses Verfahrens sind die fake ebays, Amazons und PayPals dieser Welt schnell identifiziert. Zum Beispiel zeigt das untere Bild, dass die Mail im GMX-Postfach mich hier nicht zu einem Formular von commerzbank.de bringt, sondern auf weiterleitung3213123.de.

![Eine Maus hovert über einen vermeintlichen Link zu einem Bankformular und enthüllt den zu Grunde liegenden schädlichen Link.](/images/blog/2018-03-19-phishing_link.png)

Statt Buttons kann man Links direkt umschreiben, z.B. [www.bildungstv.de](http://www.rtl.de/). Die Trickkiste der Betrüger ist vielseitig und nicht jede Omi checkt Links en passant. Daher wird als zweiter Tipp mitgegeben:

> Überprüfe die URL in der Adresszeile des Browsers.

Spätestens dann erkennt man, dass man mit [www.nichtjo3rn.de](https://jo3rn.de) in die Irre geführt wurde. [Brian Krebs zeigte kürzlich ein Phänomen auf](https://krebsonsecurity.com/2018/03/look-alike-domains-and-visual-confusion/), wodurch zumindest diese zweite Vorsichtsmaßnahme nicht mehr 100% Sicherheit verspricht (wer es lieber deutsch mag, schaut den [Beitrag von SemperVideo.de](https://www.sempervideo.de/?video=punycode-phishing-angriff)). Betrachte dazu diesen Link:

[https://www.ca.com/](https://www.xn--80a7a.com/)

Wenn du (in Chrome) darüber hoverst, siehst du, dass es sich nicht um ca.com handelt. Aber der Fall ist tückischer als die vorherigen Beispiele. Das erkennst du, wenn du den Link manuell markierst, kopierst und einfügst. Oder ihn im Firefox anklickst. In der Adressleiste erscheint er dann nämlich weiterhin so:

![https://www.ca.com](/images/blog/2018-03-19-puny_code_ca_com.png)

Während Chrome den Punycode der URL anzeigt:

![https://www.xn--80a7a.com](/images/blog/2018-03-19-puny_code_ca_com_chrome.png)

Die Folge **са** entspricht nicht den lateinischen Buchstaben *ca*, sondern den ukrainischen. Es handelt sich also um eine Art visuelles [Spoofing](https://de.wikipedia.org/wiki/Spoofing). Da [Domainnamen inzwischen internationalisiert sind](https://www.icann.org/resources/pages/idn-2012-02-25-en), kann fast jedes Unicodezeichen in der URL verwendet werden (z.B. auch j**ö**rn.de). Schaut in Zukunft daher genau hin, ob ihr auf [jo3rn.de](https://jo3rn.de) oder auf [јо3гп.de](http://xn--3-ftb5ag5j.de/) klickt.
