---
title: Clean Code - A Handbook of Agile Software Craftsmanship
category: "coffee table"
author: jo3rn
---

**Clean Code** is one of THE most popular phrases in software literature, with which the author [Robert C. Martin](http://cleancoder.com) has made himself immortal. The introduction already makes it clear: the essence of _Clean Code_ cannot be summarized in one sentence. This book does not claim to provide a complete definition, but rather to show the characteristics of _clean code_. Whether this makes it easy to understand, efficient to execute, quick to extend or painless to maintain. The credo: clean code is professional code.

![The book “Clean Code - A Handbook of Agile Software Craftsmanship” on a coffee table](/images/blog/2024-09-30-clean_code.jpg)

_Disclaimer_: Admittedly, _Clean Code_ is not something you read at the coffee table. If you have no interest in software development, you will put it aside by the end of the first chapter. I wouldn't go as far as [this must-read article](https://qntm.org/clean) and avoid recommending _Clean Code_ in general. But at least anyone who is just starting out with programming should rather turn to other books. Not everything can be taken at face value. Some of the examples are unnecessarily complicated. In some places, _Clean Code_ is showing its age. It reads like a book about aviation from the 19th century. History books are educational if you can put them into context. What was it like back then without almighty development environments and when high-level languages like Java were still in their infancy? Other parts of the book are still a real treasure trove of clues and approaches to developing better software today. In this post I will try to derive something useful for the wider audience from the individual chapters. Let's start with the first one.

## Meaningful Names

Jörn is not a very meaningful name. Maybe you know someone who is called like that. Then you associate them with the name. It also means farmer ([derived from Georg](https://de.wikipedia.org/wiki/J%C3%B6rn)). But that's about it. If I were to invent a device that removes particulates from the air and call it _Jörn_, nobody would be able to imagine what it was. That's why it was named “air filter” instead. That's a **meaningful** name. You hear it and know what the object does.

## Functions

Functions are the building blocks of a program. It is the same as with physical building blocks. An element that corresponds to a certain norm or a known standard is easier to install than a quirky shape. The **Functions** chapter provides many ideas for creating sleek building blocks.

> _She_: “Honey, can you please go to the kiosk on the corner to get a loaf of bread? And if they have bananas, bring 6 of them.”
>
> After a short time, he comes back with 6 loaves of bread.
>
> _She_: “But why did you buy 6 loaves?”
> _He_: “They had bananas.”

Let's assume we are developing a program. It is supposed to send a robot shopping. How can we prevent the outcome of this computer science joke and other undesirable effects?

We have already learned in the previous chapter that the function should be named as meaningfully as possible. Now let's take a look at the **parameters** of the function. The following implementation has some weaknesses:

```javascript
function buy(item1, item2, item3) {
    ...
    searchShopFor(item1)
    searchShopFor(item2)
    searchShopFor(item3)
    ...
}

>>> buy(banana, apple, toast)
```

If we want to buy 4 or only 2 items, we have to change this function. And what if we don't even know how many items we want to buy when we write the program? Then we would have to provide a separate function for each possibility. How can this function become more robust? Let's take a look at another implementation:

```javascript
function buy(items) {
    ...
    for item in items {
        searchShopFor(item)
    }
    ...
}

>>> shoppingList = [banana, apple, toast]
>>> buy(shoppingList)
```

Robert C. Martins says: The fewer arguments, the better. If only for the sake of clarity. Especially since all arguments (banana, apple, toast) are treated equally here, it makes sense to combine them into one unit (shopping list). Now it doesn't matter how many items you want to buy.

Another thing that should be avoided in functions is side effects (*side effects*). A function should not change anything outside of its own state:

```javascript
function buy(items) {
    goToBank()
    withdrawCash()
    goToShop()
    ...
    payItems()
    goHome()
}
```

Our robot goes to the bank `goToBank()` to withdraw money `withdrawCash()` before shopping. This influences an external state (available cash & account balance). But perhaps money does not need to be withdrawn with every purchase. And maybe not always at the bank. And exactly how much money should be withdrawn? It would be best to pass the exact amount as an additional argument to the function.

This would have a further advantage: the entire process of collecting money could be outsourced to a separate function. This would allow it to be tested separately. After all, what do we do if a function does not work as we want to? There is currently so much happening in `buy()` that it is difficult to narrow down the error. Was there not enough money available? Did the supermarket not have all the items? Two separate functions, e.g. `getMoney()` and `buy()` can be tested individually. Now, you only have to deal with half of the code in the event of errors.

Exception handling during the call (i.e. at _runtime_) should also be taken into account. If we want to bake a cake and there is no flour in the supermarket, the robot should abort the process and come home. This saves resources and the robot is quickly available again. However, if we want to make lemonade and there are no lemons, we could consider switching to oranges.

As you can see, writing functions is an art in itself. And as with works of art, there is not just one right way. But what we can draw from it: Functions should be small and only do one thing.

## Comments

My outline of the comment chapter corresponds to a good comment itself: it does not exist.

_(Ok, occasionally a comment is sensible, e.g. in the documentation of public APIs. In most cases, however, the code should be self-explanatory. As time passes, comments tend to become irrelevant, contradictory or misleading)._

## Formatting

The best analogy is dropped by the author himself: A daily newspaper is not one long prose text, but divided into many small sections. Each of these has a headline, introduction, details, photos, etc. Such a newspaper is easy to read. As you skim the headlines, your eyes virtually stick to them and you can usually guess whether the rest under the headline is worth reading or not.

The arrangement of code should be similar. The space for class and method names, parameters, constants, variables and other elements should be strictly the same in all files. This way, everyone can quickly find their way around. The exact layout of this structure can vary from project to project. The important thing is that you stick to a predefined scheme.

## Objects and Data Structures

According to the author: Objects receive commands, data structures are read.

We have various options for letting our robot of class `Robot` move. We can work in small parts in three-dimensional space with `getKnee()`, `setKnee(x, y, z)` and other body parts. But this exposes the running logic and shifts the responsibility for it. Alternatively, a class `Robot` can offer the functions `step()` and `turn()`, which encapsulate the detailed processes. The classic aversion to getters and setters is in favor of the latter - i.e. object orientation.

However, data structures with public attributes also have their purpose. Namely for holding and retrieving data, e.g. as [data transfer objects (DTOs)](https://en.wikipedia.org/wiki/Data_transfer_object). Some programming languages have dedicated constructs for this, e.g. [`data class`](https://kotlinlang.org/docs/data-classes.html) in Kotlin. Here you deal with attributes, not functions - so you do not trip over the [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter) and do not cause a [“train wreck”](https://wiki.c2.com/?TrainWreck).

## Error Handling

Michael Feathers gets his point across clearly: “use unchecked exceptions”. I agree with his argument against cumbersome `throws` chains. And I would like to add that this boilerplate quickly becomes misleading. Namely, if the underlying exception is no longer thrown at all, but is still falsely “warned” by forgetting to remove it from `throws`.

Checked exceptions are so unpopular that they even serve as the basis [of a good April Fool's joke](https://blog.doubleslash.de/en/developer-blog/java-schafft-checked-exceptions-ab).

In the next section, Feathers basically anticipates [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457): provide sufficient context in the event of an error and adapt it to the needs of the caller.

Wildly tossing exceptions can become unwieldy. Since all exceptions need to be handled, repetitions are almost unavoidable (logging, generating return values). If several exceptions are thrown at a method, try to reduce their number beforehand using a wrapper.

Whatever you code, minimize the use of `null` as a return value and when passing it as an argument. Just one missing `null` check will ruin your program flow. Alternatively, you can use:

- a default value
- an empty list
- a [“special case” object](https://www.martinfowler.com/eaaCatalog/specialCase.html)
- a programming language with [null-safety](https://en.wikipedia.org/wiki/Void_safety)

## Boundaries

Interfaces have an almost unsolvable problem:

- the offering entity wants to keep it generic to cover many use cases, e.g. [Java Collections](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html)
- the consuming entity wants it to be specific in order to best cover its case, e.g. [Backend for Frontend](https://bff-patterns.com/)

When we integrate third-party code, we are usually exposed to a larger-than-needed ecosystem. A bit like [Joe Armstrong's](https://en.wikipedia.org/wiki/Joe_Armstrong_(programmer)) metaphor: you want a banana, but you get the gorilla holding it and the whole jungle.

Our robot needs a shopping basket for shopping. We decide to use the `BeautifulBasket` library for this.

We are interested in the functions `add()`, `remove()` and `isFull()`. But there are a lot more, e.g. `duplicate()`, `empty()`, `shareOnFacebook()`. In our code, we now have many more options than necessary and must be careful not to accidentally make use of these.

In addition, since we did not write `remove()` ourselves, we have to judge its behavior with the help of the (hopefully existing) documentation - or we look into its (hopefully available) source code. A third way would be to write “learning tests” that check the function for the behaviors we want. So it's not a bad idea to write tests for third-party code for research purposes. These also verify that the desired behavior continues to occur when the library is updated.

As far as possible, we want to avoid `BeautifulBasket` becoming too interwoven into our code and library updates requiring adjustments in unexpected places. As a preventive measure, we can therefore offer our own `RobotBasket` interface as the only bridge to the uncontrollable `BeautifulBasket`. In the rest of our code we then interact exclusively with `RobotBasket`.

## Unit Tests

Tests and production code are two sides of the same coin. There is no reason to subject test code to less rigor. Anyone who takes shortcuts when writing tests is shooting themselves in the foot in the long term.

The fact that code should be easy to change is a recurring theme throughout the book. And testing is the basis for making this work. You can have the greatest code that only requires one line of rewrite for every conceivable idea. If you don't have tests or have difficulty changing them, you'll never find out if that's actually true. Flexibility only comes from the assurance that tests give you.

Tests should also be (quickly) readable. The first step is a lean setup that only creates the essential conditions to run the test. In addition, not everything needs to be packed into the test function. Tests benefit from auxiliary methods or entire auxiliary classes, e.g. for creating test objects or executing recurring test steps.

It is also good for readability if the tests are structured according to a uniform pattern. In the book, this is called “build-operate-check”. The resulting test cases can be formulated in natural language and are therefore comprehensible even for non-technical readers: _“given x, when y, then z”_.

In this context, I find that the author places too much focus on the readability of the test code to be executed. Whereas a clear _naming_ of the test function or test case can be sufficient for complete understanding. Judge for yourself: in the following code, do you still have the urge to inspect the part shortened with “...” in order to understand what is going on:

```javascript
describe('movement module', () => {
  test(
    'given supermarket is already closed, ' +
    'when arriving, ' +
    'then return back home',
    () => {
    ...
  });
});
```

Each test should also only test one concept. Let's assume we are testing the placement of an item in the shopping basket. In doing so, we can check whether:

- the item has actually ended up in the basket
- the available budget has been reduced
- the available space in the basket has been reduced
- the item has been removed from the shopping list
- etc.

If we were to cram all these concepts into one test, we wouldn't know exactly where to look first if the test failed. Or worse still: whether assertions have influenced each other and the test therefore fails. Some go so far as to require only one `assert` per test. But this can also be unnecessarily restrictive.

On the other hand, efficiency usually plays a subordinate role in tests. In contrast to production code, the tests probably do not run on a embedded system with limited resources. So we spare ourselves long sessions to squeeze every last ounce of memory or CPU performance out of our test code. Nevertheless, tests should of course run fast enough so that they can be executed repeatedly during development without causing long interruptions.

## Classes

> If a test in the same package needs to call a function or access a variable, we'll make it protected or package scope.

I only agree to the extent that these are utility functions, e.g. which assemble an object. Otherwise, I think it is wrong to increase the visibility of a function just to be able to test it. If all the tests of a `public` function are green, it doesn't matter whether the involved `private` functions work as intended. Apparently they do to a sufficient degree. Is this view too _[YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)_?

Otherwise, this chapter contains some often heard and useful mantras (mainly from the [SOLID](https://en.wikipedia.org/wiki/SOLID) area), such as:

> If we cannot derive a concise name for a class, then it's likely too big.

> a class or module should have one, and only one, reason to change    
>_[Single-Responsibility-Prinzip](https://en.wikipedia.org/wiki/Single-responsibility_principle)_

> A class in which each variable is used by each method is maximally cohesive. (...) we would like cohesion to be high.

> our classes should depend upon abstractions, not on concrete details    
> _[Dependency-Inversion-Prinzip](https://en.wikipedia.org/wiki/Dependency_inversion_principle)_

I also liked the hint that in one respect it makes no difference whether you have a few large or many small classes: the number of moving components remains the same. The difference becomes clearer when you think of one large Lego box or many small, assorted Lego boxes.

## Systems

> Complexity kills.    
> _[Ray Ozzie](https://de.wikipedia.org/wiki/Ray_Ozzie)_

Nuff said? Well, there are certainly unnecessarily complex systems. But beyond a certain size, complexity is inevitable. At this point, various ways help to mitigate the negative effects of complexity.

_Separation of Concerns_ means clearly separating areas from one another. When building a house, trades such as construction, facade, electrics, plumbing, etc. are at most loosely connected with each other. Similarly, the functions for movement, purchasing, payment, etc. should be separated in our robot. Also, everything related to **startup** (creation/start of `Robot`) should be independent of the **run time** (`Robot` executes commands).

Objects often have to use other objects. They should not create these themselves, but receive them via [Dependency_Injection](https://en.wikipedia.org/wiki/Dependency_injection). This allows you to separate creation from use even in a small context.

Unlike building a house, a software project does not require a “big design up front”. The architecture can change at any time. However, to ensure that this does not become a huge undertaking, a few steps need to be taken - “small design up front”? Ideally, all “supporting” functions will then hardly interfere with day-to-day work, so that development can concentrate on the business logic.

These “supporting” [cross-cutting concerns](https://en.wikipedia.org/wiki/Cross-cutting_concern) are difficult to separate because they affect many areas of the code. This applies, for example, to logging, caching, authorization of requests or persistence of data. [Aspect-oriented programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming) offers a solution in which such matters are defined declaratively, e.g. in configuration files. A framework such as [Spring](https://de.wikipedia.org/wiki/Spring_(Framework)) takes over the “heavy lifting” (e.g. via [Proxies](https://en.wikipedia.org/wiki/Proxy_pattern) and [Decorators](https://en.wikipedia.org/wiki/Decorator_pattern)). Th code for the business logic is then separated from the other code to a large extent.

Occasionally, decisions have to be made that affect future developments. A good guideline is to delay these decisions until the last possible moment. In the meantime, we should gain as much experience as possible with the existing project in order to make an informed decision.

Established standard practices provide a blueprint for your own project. But bear in mind that not every standard is suitable for every project and that many supposed standards change or become obsolete, especially in our field.

## Emergence

The chapter starts with [Kent Becks](https://en.wikipedia.org/wiki/Kent_Beck) “4 rules of simple design” (ordered by importance):

> 1. Runs all the tests

Sounds plausible. The focus here is presumably on _all_, i.e. there are sufficient tests to verify that the system acts as desired. However, this simple rule also implies that systems usually have a good design if they are constructed in such a way that they can also be tested properly.

> 2.  Has no duplicated logic

[Don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

> 3. States every intention important to the programmer

This is particularly relevant for software whose costs primarily arise from long-term maintenance. Without a high level of expressiveness, every change becomes a puzzle. The remedy is small classes & functions, unique names, use of standards and descriptive unit tests.

> 4. Has the fewest possible classes and methods

This initially seems incompatible with the previous principle of small classes with _single responsibility_. But _fewest possible_ rather means avoiding those constructs that arise without reason and only out of dogmatism or principle, e.g. that every class must be divided into interface and implementation.

## Concurrency

When shopping, our robot goes through the list, searches for the items on the shelves and places them in the basket. This takes a lot of time. It would be quicker if our robot had a small robot for each item on the list that could be sent out. The small robots can then collect the items in parallel. The total time required would only be as long as it takes to pick up the item that is furthest away.

This time saving is not free. It requires additional effort to coordinate the small robots. The algorithm has changed fundamentally, is more difficult to understand and offers more room for error. Our system has become more complex due to the introduction of _concurrency_.

Error prevention should be given special priority here. This is because sequences running at the same time make debugging extra difficult. Individual threads should be as independent of each other as possible and not share any data. If access to the same data is necessary, this should be protected with mechanisms so that only one process reads or writes at a time. Try to separate concurrent code from the rest of the code so that you can test both parts in isolation.

The terms [deadlock](https://en.wikipedia.org/wiki/Deadlock_(computer_science)) and [starvation](https://en.wikipedia.org/wiki/Starvation_(computer_science)) prove that being aware of the problems of concurrency is essential for survival. At least for [philosophers who meet for dinner](https://en.wikipedia.org/wiki/Dining_philosophers_problem).

Part of this chapter deals with situations for which we now have solutions, e.g. [graceful shutdown](https://docs.spring.io/spring-boot/reference/web/graceful-shutdown.html) or [concurrency testing](https://en.wikipedia.org/wiki/Concurrent_testing). However, the book was also written at a time when people were enthusiastic about the new features in Java 5 ([published in 2004](https://en.wikipedia.org/wiki/Java_version_history)). It is therefore interesting to read about the problems people were facing back then.

## Successive Refinement

This chapter is mostly “hands-on”, creating a program that reads passed arguments. Example: we use [sort](https://en.wikipedia.org/wiki/Sort_(Unix)) with `sort -f -o sorted.txt unsorted.txt` to sort the lines in an unsorted file and write them sorted into a new file. We ignore upper and lower case. The program that is being developed in the book parses `-f` as `boolean` argument and `-o sorted.txt` as `string` argument to start the actual sorting program with these parameters.

First, the final, well-formulated code that fulfills this task is shown. Then a first draft of this program is shown, which can only process `boolean` arguments. This first draft already shows minor weaknesses compared to the final code. Due to the limited functionality. However, it is still manageable. Further drafts are now shown, which add more functionality and make the code increasingly “dirty”. Refactoring starts, where great attention is given to proceeding with the next conceptual change in very small steps only when all existing tests are successful again.

It is an easy-to-understand case study to show that programming is an iterative process. It is quite natural that first drafts do not meet any ideal. The important thing is not to leave it at the first draft.

## JUnit Internals

Like the previous chapter, this chapter deals with code refactoring. In this case, it is external code from the [JUnit framework](https://en.wikipedia.org/wiki/JUnit) and you first see the original code, which is then refactored. However, the refactoring did not make it into the framework, [where the code is still almost the same as at the beginning of the chapter](https://github.com/junit-team/junit4/blob/main/src/main/java/junit/framework/ComparisonCompactor.java).

## Refactoring _SerialDate_

And another refactoring. This time the class [SerialDate.java](https://github.com/jfree/jcommon/blob/master/src/main/java/org/jfree/date/SerialDate.java) of the open source Java library _JCommon_.

The approach varies slightly. Initially, parts of the code are not tested, so the author starts writing new tests. Some of these new tests fail - bringing small bugs to light. He comments out all failed tests, and step by step reintroduces them alongside small changes to the code until all tests are green.

This is the basis for completely redesigning the class. Questionable practices are introduced, e.g. [wildcard imports](https://stackoverflow.com/questions/147454/why-is-using-a-wild-card-with-a-java-import-statement-bad) to save 2 lines of code. But good points are also made, e.g. questioning the “serial” in the class name or moving variables to child classes if they are only used there. Base classes should generally not know about their derivatives.

And since it is Java, adding an [abstract factory](https://en.wikipedia.org/wiki/Abstract_factory_pattern) is of course indispensable. There are more excursions into Java peculiarities, e.g. the use of the `final` keyword or the [versioning of `serializable` objects](https://docs.oracle.com/javase/6/docs/platform/serialization/spec/version.html).

[Here too, however, the refactoring did not make it into the repository.](https://github.com/jfree/jcommon/issues/2)

I have to admit that all three refactoring chapters are not a pleasant reading experience, regardless of the content. The author describes all the steps precisely enough. But the constant switching between descriptive text, old code and new code (some of which is in the appendix) makes it tedious to follow. It got better when I opened the code on a screen. But a video of the refactoring would have been a better medium in my opinion. Processes that have to be described textually in many sentences could be shown in a few seconds.

I have nothing against code snippets here and there, but this chapter literally consists of over 50 pages of code in one go. Black on white, without syntax highlighting (but at least in `monospace`). Perhaps the author believes that reading pure code is somehow a necessary basic exercise like push-ups. But that's just unnecessarily laborious.

## Smells and Heuristics

This final chapter is a glossary of all the code shortcomings that have been improved in the refactoring chapters or addressed in the other chapters. Much of it is akin to [static code analysis](https://de.wikipedia.org/wiki/Statische_Code-Analyse) tools, such as the [SonarSource](https://rules.sonarsource.com/) rules. Some go beyond this and (still) require a “human actor” for identification.

This compact list serves as an occasional refresher on what to look out for. It rounds off the book in a conciliatory way.
