---
title: Parameter vs. Argument
category: "software engineering"
author: jo3rn
---

Eine präzise Sprache kann in manchen Fällen überlebenswichtig sein („Wir essen Opa.“ – „Wir essen, Opa.“). Auch und gerade beim Programmieren. Denn Opa kann seinem Enkel verzeihen, der Computer tut dies nicht. Worüber ich selbst immer wieder stolpere sind die Begriffe Parameter und Argument – und zwar in dem Sinne, dass ich sie austauschbar verwende. Daher hier [der Unterschied](https://stackoverflow.com/questions/156767/whats-the-difference-between-an-argument-and-a-parameter), damit er nie vergessen wird:

Der **Parameter** ist die Variable bei der Definition der Methode:

```java
public void myMethod(string myParam) { }
```

Das **Argument** ist das, was beim Aufruf der Methode an den Parameter übergeben wird:

```java
String myArgument = "this is my argument";
myClass.myMethod(myArgument);
```

Merke: Eine Methode hat Parameter und nimmt Argumente.
