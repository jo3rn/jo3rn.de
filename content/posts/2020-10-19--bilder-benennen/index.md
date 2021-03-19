---
title: Bilder benennen
category: "computer science"
cover: name.jpg
author: jo3rn
---

Treue Blogleser werden festgestellt haben, dass ich lange nichts mehr veröffentlicht habe.
Ein Grund dafür war unsere diesjährige Hochzeit, die viel Schreibzeit in Planungszeit umwandelte.
An besagtem Tag haben etliche Teilnehmer Fotos geschossen, die uns nach und nach zugetragen wurden.
Verteilt auf zig Verzeichnisse ist das natürlich nicht schön durchzuschauen.
Daher habe ich die knapp 3000 Dateien in den Moment der Aufnahme umbenannt und in ein großes Verzeichnis gepackt.
Nun können wir sie chronologisch durchsehen. Dabei ist es interessant zu sehen, wie zeitgleiche Momente aus verschiedenen Blickwinkeln eingefangen wurden.

Dieser Beitrag liefert eine Schritt-für-Schritt Anleitung, wie ich vorgegangen bin.
Alle Fotos liegen auf einem [Synology DS418j](https://amzn.to/3m4M85R) NAS.

## Einleitung
Für das Unterfangen reicht die grafische Oberfläche, die Synology bietet, nicht aus. Außer man möchte jede Datei per Hand umbenennen. Stattdessen werden wir über ein Terminal auf das NAS zugreifen.
Das Betriebssystem des NAS ([DiskStation Manager](https://www.synology.com/en-global/dsm)) ist eine Linux-Distribution und lässt dies zu. Dafür aktivieren wir zunächst den SSH-Zugang in der NAS Systemsteuerung, indem wir unter "Terminal & SNMP" den Haken bei "SSH-Dienst aktivieren" setzen:
![Screenshot des Reiters "Terminal & SNMP" in der Synology NAS Systemsteuerung](./systemsteuerung_ssh.PNG)

Hinweis: Um keinen Angriffsvektor für Hacker zu bieten, solltet ihr diese Eigenschaft wieder deaktivieren, wenn ihr sie nicht mehr benötigt.

[Windows 10 kommt inzwischen standardmäßig mit SSH-Client](https://www.heise.de/tipps-tricks/SSH-unter-Windows-10-nutzen-4224757.html). Der SSH-Verbindungsaufbau funktioniert nun auch mit diesem Betriebssystem über das Terminal:

```shell
C:\Users\jo3rn> ssh jo3rn@DS418Play
```

Wenn man den Server-Namen nicht weiß, kann man auch die IP Adresse nutzen:

```shell
C:\Users\jo3rn> ssh jo3rn@192.168.0.111
```

Man wird nach dem Passwort für den eingegeben Nutzer (in dem Fall jo3rn) gefragt.
Wenn wir die Verbindung das erste Mal aufbauen, müssen wir außerdem mit `yes` noch einem Zertifikat vertrauen.

Nun sind wir bereits auf dem NAS. Da ich als Shell lieber die bash benutze, starte ich sie:
```shell
jo3rn@DS418play: bash
```

Gleich werden wir [ExifTool](https://exiftool.org/) benötigen, wofür wir vorher Perl installieren müssen. Das geht z.B. in der Web-Oberfläche über das Paket-Zentrum:

![Screenshot des Perl-Eintrags im Synology Paket-Zentrum](./paketzentrum_perl.PNG)

Ob uns Perl jetzt zur Verfügung steht, können wir zurück im Terminal prüfen:
```shell
bash-4.3$ perl -v
This is perl 5, version 24, subversion 0 (v5.24.0) built for x86_64-linux
...
```

Nun ExifTool (aktuellste Version eventuell höher) mittels `wget` downloaden...

```shell
bash-4.3$ wget https://exiftool.org/Image-ExifTool-12.08.tar.gz
```

...und mit gzip entpacken:

```shell
bash-4.3$ gzip -dc Image-ExifTool-12.08.tar.gz | tar -xf -
```

ExifTool lässt sich dann aufrufen über den Installationspfad. In meinem Fall residiert das ExifTool-Verzeichnis im Home-Verzeichnis:

```shell
bash-4.3$ ~/Image-ExifTool-12.08/exiftool IMG_1748.JPG
```

Daraufhin werden alle möglichen Exif-Daten zu dem übergebenen Bild ausgegeben.

## Hauptakt
Kommen wir zum Punkt. Das kurze Skript, was ich zum Umbenennen genutzt habe, sieht so aus:

```shell
for f in *.jpg
do
    mv -n "$f" "$(~/Image-ExifTool-12.08/exiftool -d "%Y%m%d_%H%M%S" -CreateDate "$f" | awk '{print $4"_Lydia.jpg"}')"
done
```

Erläuterung:
Die for-Schleife mit der Wildcard `*` packt nacheinander alle `.jpg`-Dateien in die Variable `f`.
Der Befehl [mv](https://manpages.debian.org/buster/manpages-de/mv.1.de.html) steht für "move" (verschieben). Aber man kann damit auch umbenennen, indem man im gleichen Verzeichnis bleibt.
Die Option `-n` steht für no-[clobber](https://en.wikipedia.org/wiki/Clobbering) und verhindert das Überschreiben einer existierenden Datei.
Das erste Argument (`"$f"`) ist der Name der Ursprungsdatei, das zweite Argument (der komplette Rest des Kommandos) ist der neue Name der Datei.

Für den neuen Dateinamen wird dieses Schema verwendet: `YYYYMMDD_HHHMMSS_Ersteller`

Datum und Uhrzeit entstammen den [Exif-Daten](https://de.wikipedia.org/wiki/Exchangeable_Image_File_Format) der Aufnahme. Leider waren nicht alle Bild-Dateien mit Exif-Daten versehen, z.B. die per WhatsApp versendeten. Den Ersteller hänge ich hinten dran, damit es keine Konflikte gibt, sollten 2 Personen im gleichen Augenblick ein Foto geschossen haben.

Zum Auslesen der Exif-Daten kommt nun ExifTool ins Spiel. Der Output des `exiftool`-Befehls ist in diesem Format:
```shell
bash-4.3$ ~/Image-ExifTool-12.08/exiftool -d "%Y%m%d_%H%M%S" -CreateDate IMG_1748.JPG
Create Date                     : 20200501_134434
```

Diese Ausgabe wird mit Pipe `|` an [awk](https://de.wikipedia.org/wiki/Awk) übergeben. Awk extrahiert das vierte Feld (das Datum) und ergänzt das Ergebnis um `_Ersteller.jpg`.


## Schlussteil
Der Befehl als Einzeiler zum Copy-Pasten in die Shell:
```shell
bash-4.3$ for f in *.jpg; do mv -n "$f" "$(~/Image-ExifTool-12.08/exiftool -d "%Y%m%d_%H%M%S" -CreateDate "$f" | awk '{print $4"_Lydia.jpg"}')"; done
```
Bei anderen Dateiformaten muss entsprechend die Dateiendung an zwei Stellen angepasst werden. Ich hatte z.B. auch .HEIC Dateien bekommen. Ich hatte auch den kuriosen Fall, dass bei einem Fotografen nicht alle Bilder nach Ausführen des Befehls umbenannt wurden. Dies war darauf zurückzuführen, dass dieser Fotograf es tatsächlich geschafft hat, zwei Bilder in der selben Sekunde aufzunehmen. Da habe ich am Ende des Kommandos einfach ein `_1` an den Erstellernamen angehängt und den Befehl erneut ausgeführt.

###### Cover photo by <a href="https://unsplash.com/@jontyson?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jon Tyson</a>