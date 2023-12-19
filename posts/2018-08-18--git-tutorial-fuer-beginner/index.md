---
title: Git Tutorial für Beginner
category: "software engineering"
author: jo3rn
---

[Git](https://de.wikipedia.org/wiki/Git) ist eine Open Source Software zur verteilten Versionsverwaltung von Dateien. Für den Laien wirft dieser Satz nur noch mehr Fragen auf. Daher gehen wir in diesem Beitrag die Grundprinzipien anhand eines Beispiels durch.

Allgemein gesprochen hat man einen Verzeichnis bzw. Ordner (_repository_). Änderungen an dessen Inhalt werden gespeichert und somit zurückverfolgbar und wiederherstellbar. _Verteilt_ bedeutet, dass verschiedene Versionen des Ordners existieren können, z.B. wenn mehrere Personen gleichzeitig etwas bearbeiten. Möchte man einen einheitlichen Stand haben, besteht die Möglichkeit, diese Versionen zusammenzuführen.

Wie man Git auf den Rechner bekommt, wird auf der [offiziellen Webseite](https://git-scm.com/downloads) beschrieben. Nachdem Git installiert ist, steht der Befehl `git` in der Kommandozeile zur Verfügung. Dies kannst Du mit dem Befehl `git --version` testen. Dieses Kommando liefert bei mir folgenden Output:

```shell
C:\Users\jo3rn> git --version
git version 2.17.0.windows.1
```

Nun können wir mit unserem Beispiel-Projekt beginnen. Hierbei erstellen wir eine simple Webseite, die mit etwas CSS aufgehübscht wird und eine kleine Funktionalität mit JavaScript bekommt.

## Schritt 1: ein Repository anlegen (_init_ oder _clone_)
### Möglichkeit 1 (_init_)

Wir legen einen Ordner mit dem Namen GitSite an, öffnen in ihm die Kommandozeile (z.B. PowerShell) und geben `git init` ein. Dadurch wird der Ordner zu einem _Repository_:

```shell
C:\Users\jo3rn\GitSite> git init
Initialized empty Git repository in C:/Users/jo3rn/GitSite/.git/
```

### Möglichkeit 2 (_clone_)
Anstatt selbst ein Repository anzulegen, könnten wir auch ein vorhandenes klonen. Unser Beispiel-Projekt habe ich auf [GitHub](https://github.com/) veröffentlicht. Es gibt auch andere Anbieter wie [GitLab](https://gitlab.com/), die nicht erst seit der [Übernahme von GitHub durch Microsoft](https://www.heise.de/newsticker/meldung/Microsoft-kauft-GitHub-fuer-7-5-Milliarden-US-Dollar-4067633.html) auf den Plan getreten sind. Denn GitHub ist im Grunde nur ein Server, auf dem mein GitSite Ordner bereit liegt, sodass ihn jemand einsehen oder kopieren kann. Du kannst dir GitHub wie Cloud-Storage (z.B. Dropbox) vorstellen - mit zusätzlichen Funktionen. Anstatt mit `git init` ein eigenes Repository anzulegen, kannst du also auch ein vorhandenes kopieren. Der Ordner wird dann automatisch angelegt:

```shell
C:\Users\jo3rn> git clone https://github.com/jo3rn/GitSite.git
Cloning into 'jo3rn'...
```

Damit klonst Du Dir allerdings den derzeitigen Stand des Repositories, in welchem inzwischen bereits Dateien liegen. Wenn Du also die Schritte dieses Beitrags an Deinem eigenen Rechner mitgehen möchtest, musst Du __Möglichkeit 1__ nehmen.

## Schritt 2: Dateien zum Staging hinzufügen (_add_)
So weit, so gut. Wir haben also unser _Repository_. Allerdings ist es noch leer (außer des versteckten `.git` Ordners. Der braucht uns aber vorerst nicht interessieren – this is where the magic happens). Zeit, das _Repo_ zu befüllen!

Für unsere Webseite benötigen wir drei Dateien, die ich schon vorbereitet habe. Die `index.css` und `index.js` Dateien kannst Du direkt herunterladen (Rechtsklick -> …speichern unter…) und in deinen Ordner einfügen.

[`index.css`](./index.css)
```css
body {
    background-color: lightblue;
}

h1 {
    color: black;
    text-align: center;
}
```

[`index.js`](./index.js)
```javascript
var specialText = document.getElementById("wisdom");

specialText.onmouseover = function () {
    this.innerHTML = "Zur Arbeit nicht, zum Faulenzen sind wir geboren."
};
specialText.onmouseout = function () {
    this.innerHTML = "Zur Arbeit, nicht zum Faulenzen sind wir geboren."
};

```

Außerdem musst Du noch eine `index.html` Datei erstellen mit folgendem Inhalt:

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <title>title</title>
	<link rel="stylesheet" href="index.css" type="text/css">
  </head>
  <body>
	<h1>Hallo <a href="https://jo3rn.de">jo3rn.de</a> Leser!</h1>
	
	<p id="wisdom">Zur Arbeit, nicht zum Faulenzen sind wir geboren.</p>
	
	<script src="index.js"></script>
  </body>
</html>
```

Diese 3 Dateien liegen in Deinem _Working Directory_, zunächst komplett losgelöst von Git. In diesem Zustand können keine Änderungen nachverfolgt werden. Die Dateien müssen noch mit `git add` zur sogenannten _Staging Area_ hinzugefügt werden. Dies kann man entweder einzeln mit Dateinamen machen, z.B. `git add index.html` oder mit allen Dateien in einem Schritt: `git add *`

Damit signalisierst du Git, dass die ausgewählten Dateien in die Versionsverwaltung aufgenommen werden können (aber es noch nicht sind!). Nach dem `add` befinden sie sich in einem Zwischenzustand: keine reine Arbeitsdatei auf deinem Rechner, aber auch noch keine an Git übergebene Version. In welchem Zustand sich welche Datei befindet, kannst du mit `git status` einsehen:

```shell
C:\Users\jo3rn\GitSite> git add *
C:\Users\jo3rn\GitSite> git status
On branch main
No commits yet
Changes to be committed:
(use "git rm --cached ..." to unstage)
new file: index.css
new file: index.html
new file: index.js
```

Aus der Ausgabe lesen wir, dass sich drei neue Dateien in der _Staging Area_ befinden (`Changes to be committed`). Außerdem wird auf einen weiteren Befehl hingewiesen: `git rm --cached`, womit man Dateien aus der _Staging Area_ entfernen, also `add` rückgängig machen kann. Das wollen wir aber nicht tun, sondern die Dateien nun endlich in die Versionsverwaltung aufnehmen.

## Schritt 3: Dateien dem Head übergeben (_commit_)

Es ist soweit. Wir haben die Dateien, die von Git getrackt werden sollen, in die _Staging Area_ gepackt. Nun manifestieren wir sie mit `git commit` für die Nachwelt. Also alle, die später auf den Code schauen (müssen), meistens man selbst.

```shell
C:\Users\jo3rn\GitSite> git commit -m "initial commit"
[main (root-commit) 5c4453c] initial commit
3 files changed, 31 insertions(+)
create mode 100644 index.css
create mode 100644 index.html
create mode 100644 index.js
```

Mit dem `-m "initial commit"` nach dem commit-Befehl fügt man dem Commit die Nachricht "initial commit" hinzu (_commit message_). Das ist sehr zu empfehlen und wird im professionellen Umfeld vorausgesetzt. Bei der _commit message_ habe ich es mir mit dem nichtssagenden „initial commit“ einfach gemacht, da die 3 Dateien noch sehr überschaubar sind. Es wurden schon Blogposts in der selben Länge wie diesem hier erstellt, die sich nur mit dem korrekten Verfassen einer _commit message_ beschäftigen. Meine Faustregel: beschreibe auf Englisch mit einleitendem Infinitiv-Verb, was der _Commit_ verändert/verbessert, z.B. "add test cases for user search input" oder "open Google for further answers". [Diese Seite](https://whatthecommit.com/) wirft auch bei jedem Aufruf eine mögliche Commit-Message aus, die man allerdings nicht verwenden sollte.

In der Regel sollten die dem _Commit_ zugeordneten Quellcode-Änderungen logisch zusammenhängen, z.B. wäre eine Funktionsänderung, ein Bugfix oder ein neues UI-Element ein jeweils eigener _Commit_. Deshalb geht man auch den umständlich erscheinenden Weg über `add` und `commit`. So kann man im Arbeitsordner an mehreren Baustellen gleichzeitig etwas ändern, aber über `add` (zeilengenau) bestimmen, welche Teile zum nächsten _Commit_ gehören und welche nicht.

Nach dem `commit` fängt der Spaß bzw. die Git-Nutzung richtig an. Zum Beispiel können wir nun alle vorhandenen commits mit `git log` auflisten und nachverfolgen:

```shell
C:\Users\jo3rn\GitSite> git log
commit 73bb66280889dedd4d4db4c4afe3d0880d82286b
Author: jo3rn <jo3rn@users.noreply.github.com>
Date:   Fri Jul 13 19:17:52 2018 +0200
initial commit
```

Dieses Log lässt sich beliebig filtern und verfeinern, z.B. mit `git log --author=jo3rn`. Wer die nächsten Tage nichts vorhat, kann sich die Möglichkeiten über `git log --help` anzeigen lassen.

## Schritt 4: ein remote Repository anlegen

Ein _Repository_ auf dem eigenen Rechner kann man bereits für eigene Projekte verwenden. Wenn man kollaborativ arbeitet, sollte man aber eine zentrale Instanz ([remote](https://git-scm.com/docs/git-remote)) einrichten, auf die alle Beteiligten zugreifen können. Mit einem GitHub Account kann man über [https://github.com/new](https://github.com/new) ein solches öffentliches _Repository_ anlegen:

![GitHub's User Interface um ein neues Repository anzulegen](/images/blog/2018-08-18-new_repo_on_github.png)

Das _Repository_ auf unserem Rechner ist momentan [völlig losgelöst](https://www.youtube.com/watch?v=24r3LNXWi6o) von dem noch leeren _Repository_ auf GitHub. Diese beiden Baustellen müssen zunächst mit dem Befehl `git remote add origin https://github.com/jo3rn/GitSite.git` verknüpft werden (nach `origin` musst Du natürlich den Link zu deinem _Repository_ angeben). Mit diesem Befehl wird die _Repository_-URL in dem Alias `origin` hinterlegt. Ob das geklappt hat kannst Du mit `git remote` prüfen:

```shell
C:\Users\jo3rn\GitSite> git remote -v
origin  https://github.com/jo3rn/GitSite.git (fetch)
origin  https://github.com/jo3rn/GitSite.git (push)
```

Die Ausgabe sollte dann wie oben den Link zu deinem _Repository_ anzeigen.

## Schritt 5: Den Stand von lokal nach remote bringen (_push_)

In Schritt 4 haben wir zunächst nur dem lokalen _Repo_ gesagt, dass es ein bestimmtes anderes _Repo_ gibt, womit es sich synchronisieren soll. Die Synchronisation selbst fand noch nicht statt. Um nun alle Dateien, die in Schritt 3 committed wurden, in das entfernte _Repo_ zu bringen, benutzen wir den Befehl `git push`.

```shell
C:\Users\jo3rn\GitSite> git push origin main
Counting objects: 8, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 1.03 KiB | 0 bytes/s, done.
Total 8 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), done.
To https://github.com/jo3rn/GitSite.git
* [new branch]      main -> main
```

Dabei spezifizieren wir hinter `git push` zu welchem _Branch_ (`main`) in welchem remote repository (`origin`) wir pushen wollen. Um dies nicht jedes Mal zu tun, kann man mit dem Flag `-u` den sogenannten _upstream_ permanent setzen, d.h. das jeder Push von dem aktuellen Branch zu `origin main` führt: `git push -u origin main`.

Moment mal! Was ist denn überhaupt ein _Branch_?

Zunächst gibt es beim Anlegen eines neuen _Repos_ lediglich einen _Branch_, der z.B. `main` genannt wird. Der Name kann frei gewählt werden und war lange Zeit standardmäßig `master`. Wenn man nichts weiter macht, referenziert der _Branch_ den letzten `Commit`. Durch einen _Branch_ können wir einem bestimmten Versionsstand also einen Namen geben.

Man kann nun einen neuen _Branch_ (Zweig) erstellen und ihn `neues_feature` nennen. Dabei kopiert man im übertragenen Sinne den aktuellen Stand in einen neuen Ordner. In diesem neuen Ordner bastelt man weiter am Code, ohne den Stand aus dem alten Ordner zu beeinflussen. Gleichzeitig kann von dem alten Stand eine weitere Kopie gemacht werden, z.B. mit dem Branch `ein_zweites_feature`.

Irgendwann sind die Arbeiten an dem neuen Feature fertig und man kann mit einem sogenannten _Pull Request_ (manchmal auch _Merge Request_ o.ä.) dieses neue Feature in den alten Stand integrieren. Dies geht dann normalerweise automatisch dank \*git magic\*.

Wurde allerdings der alte Stand währendessen ebenfalls bearbeitet, können u.U. Konflikte auftreten, wenn z.B. in der gleichen Codezeile einer Datei in zwei Branches etwas geändert wurde. Dies kann passieren, wenn z.B. schon andere Features in den `main`-Branch eingeflossen sind.

Wie dieses Branching genau abläuft, ist Stoff für einen anderen Beitrag. Das hier ist zunächst ein erster Einblick in die Möglichkeiten von Git. Wenn Du Dich mit dem bisher Besprochenen sicher fühlst, kannst Du Dich auch auf eigene Faust über weitere Themen informieren. Einige Ansatzpunkte sind z.B.:

- Wie erstelle ich ein README und was sollte drin stehen?
- Was ist ein [ignore file](https://www.atlassian.com/git/tutorials/saving-changes/gitignore)? Und was sollte drin stehen? ([gitignore.io](https://www.gitignore.io/))
- Wie schütze ich private Informationen, Passwörter oder API Keys? (Hint: nicht mit Git tracken!)
- Was sind Lizenenzen für Repositorys und welche sollte ich hinzufügen?

Ein paar Links, dir mir am Anfang geholfen haben:

- [offizielle Dokumentation](https://git-scm.com/book/de/v2) (deutsch)
- [git – the simple guide](https://rogerdudler.github.io/git-guide/)
- [interaktives Tutorial von GitHub](http://try.github.io/)
- [spielerisch Branching lernen](https://learngitbranching.js.org/)


[Über 100.000 Fragen zu Git auf stackoverflow](https://stackoverflow.com/questions/tagged/git) zeigen: um Git komplett zu verstehen reicht ein Blogpost nicht aus. Und besonders zu Beginn, könnte man in diese Versuchung kommen:

![Comic, in dem ein Strichmännchen erklärt, wie Git funktioniert. Wenn man einen Fehler macht, sei es jedoch das beste, den Git-Ordner zu löschen und von vorne anzufangen.](/images/blog/2018-08-18-git_xkcd.png)
Quelle: [xkcd](https://xkcd.com/1597/)

Den Git-Workflow jedes Mal über die Kommandozeile durchzuführen, kann müßig sein. Zu Lernzwecken empfehle ich es dennoch. Trotzdem gibt es auch Tools, die die Kommandos (_add_, _commit_, _push_, etc.) in eine grafische Oberfläche packen. Für schnelle Commits/Pushes ohne Verlassen der Arbeitsoberfläche gibt es für viele IDEs auch Plugins oder Git ist sogar standardmäßig integriert.
