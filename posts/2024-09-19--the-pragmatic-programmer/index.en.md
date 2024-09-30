---
title: The Pragmatic Programmer - your journey to mastery
category: "coffee table"
author: jo3rn
---

Fortunately, the company I currently work for has recognized that knowledge is an essential part of software development. I am therefore given time for various educational activities, such as reading a book like [The Pragmatic Programmer, 20th Anniversary Edition](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/).

_Pragmatic Programmer_ is packed with valuable tips, each of which could be the subject of a separate essay. I highly recommend reading it to any software developer. In this post, I am focusing on the aspects that I have come across myself recently. In this sense, this article can be seen as a diary inspired by others.

## 1. A Pragmatic Philosophy

### The Cat Ate My Source Code

#### Responsibility

> How do you react when someone - such as a bank teller - comes to you with a lame excuse? What do you think of them and their company as a result?
>
> _page 5_

If you take responsibility, you should also own up to your mistakes. Finger-pointing is not helpful. Of course there are unavoidable events, but most “technical problems” or “delays in operations” can be pinned down to specific shortcomings.

Even supposedly external factors can sometimes be traced back to internal ones. Sure, the evil hackers encrypted the hard disks. But I neglected the exploited vulnerability for months.

What is preferable?

1. **create transparency**. Communicate clearly and appropriately for your target group. Don't take those affected for fools, but don't overburden them either.
2. **suggest alternatives**. If the underlying problem cannot be solved, can the target state be achieved or approximated in another way?
3. **increase resilience**. Learn from problems in order to avoid them in the future.

### Software Entropy

The [Broken Windows theory](https://en.wikipedia.org/wiki/Broken_windows_theory) is controversial in its original sense. However, it offers a vivid allegory for software development: a single broken window (in the form of neglected code, poor design, etc.) can start a vicious circle of decay. This has two forms:

1. **psychological**. _“They've already messed up **elsewhere**, so I'm not going to take it too seriously **here** either.”_
2. **fundamental**. _“Because **these other** places have already been messed up, I can't work properly **here** either.”_

Small decisions can trigger a [butterfly effect](https://en.wikipedia.org/wiki/Butterfly_effect). What could go wrong if I call the same variable `topic` once and `target` the other time?

- _Oops_, now it is called differently at different interfaces.
- _Oh no_, in the settings and usage data now too.
- _Shame_, the documentation for a new service suddenly makes a distinction between `topic` and `target`.
- _Wow_, now I'm sitting in an hour-long meeting with 10 people trying to figure out when something is a `topic` and when it's a `target`...

### Communicate!

Look at the release notes of two apps below and decide which one the quote from the book would refer to.

> This isn't communicating: it's just talking, and it's annoying.
>
> _page 20_

[Release notes: Bugfixes and performance improvements.](https://mastodon.social/@zackwhittaker/109928692642064312)

![Screenshot of release notes for the apps Mastodon & Google Calendar](/images/blog/2024-09-19-release-notes.png)
[source](https://mastodon.social/@zackwhittaker/109928692642064312)

The essential part of communication is to deliver what you want to be delivered. If you don't want to deliver anything (“bugfixes and improvements”), then you shouldn't communicate anything (“”).

On the other hand, if you want to deliver, you should do so thoroughly: “Sometimes the app crashed when you tried to open photos. We had a problem with long file names. Now you can view the photos again.”

But even if you have something to communicate, it also depends on HOW. Product management may nod politely when you tell them that you can now integrate a JSON file into productive operation without triggering the deployment pipeline thanks to feature flagging. What's interesting for them: “You can now switch the text recognition feature on and off in real time or only make it available to certain users. And if you want to let the discount code run for 2 days longer, we can still change it after release.”

## 2. A Pragmatic Approach

### The Essence of Good Design

> Good design is easier to change than bad design.
>
> _page 28_

Easy to say. After all, it means anticipating future changes. A certain intuition may develop over time, but it is difficult to derive hard principles.

I'm not sure if they deliberately chose “_easier_ to change” (instead of “_easy_”). This choice of words introduces another layer: often there is no _easy_ way. But of various ways, there are _easier_ ones. In this sense, one should reverse their choice of words and take the path that makes the system the _least unchangeable_.

If there is uncertainty, it is at least better to head roughly in the right direction. The well-known “best practices” help with that, e.g. designing components uniformly and independently of each other.

### DRY - The Evils of Duplication

The [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) is easy to grasp and on almost everyone's mind. However, the authors shed light on some less discussed aspects of this simple principle:

1. Code duplicates should be checked semantically, not syntactically.

   The example methods `validate_age()` and `validate_quantity()` do exactly the same thing: they check that the input value is greater than 0 and of type `integer`. However, merging them into one method would be counterproductive, because the requirements are different. The methods are only coincidentally the same, could be changed for different reasons and should therefore remain separate.

2. > Where possible, always use accessor functions to read and write the attributes of objects.
   >
   > _page 36_

   Admittedly, this no longer has much to do with DRY. But in modern programming languages, properties can be inflated to functions, e.g. in [Kotlin](https://kotlinlang.org/docs/properties.html) or C++. However, this can lead to misunderstandings. For example, accessing a property should not throw a custom exception or trigger any resource-intensive algorithms.

3. > (...) 10.000 programs that each contained a different version of Social Security Number validation code (...)
   >
   > _page 38_

   How much brainpower and lifetime has been put into code that at least one other team has already successfully mastered? Is multiple implementation an inevitable curse of large companies? Not necessarily, if you consider it from the get-go:

   > What you're trying to do is foster an environment where it's easier to find and use existing stuff than to write yourself.
   >
   > _page 38_

   Of course, this requires coordination. And if the wheelbarrow is already stuck in the mud, it's hard to pull it out. You don't even have to look organization-wide: [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html) would resolve many redundancies and nuanced differences in our 3-family-pizza team, but we haven't been able to introduce it yet for various reasons (legacy projects, developer buy-in,...).

### Tracer Bullets

The military metaphor brings an unnecessary aggressiveness to the discourse. In addition, I feel it is not entirely appropriate. However, the essence of this chapter is something that I have long found helpful: when approaching a new project, the first goal should be an **end-to-end connection** between all components (e.g. UI -> Auth -> Business Logic -> Data Model -> Database). A stand-alone minimal feature that touches all layers **and** works. This creates a common ground on which everything else can be established (e.g. “_how does error handling work again?_”).

Insights gained during the development of this _Tracer Bullet_ flow directly into future iterations. This means you only make mistakes once - compared to parallel development (“_oops, the response format doesn't fit, now we have to change it in 7 places..._”). At the same time, you have something ready to show at an early stage, instead of several loose threads that are all 90% complete, but not quite.

The authors draw an important distinction to **prototyping**. Prototypes have a different purpose: quickly test an idea - and discard it if necessary. Even if you decide to pursue the idea further, the prototype is usually thrown away and re-implemented “correctly”. With _Tracer Bullets_, on the other hand, the focus is directly on correct implementation.

## 3. The Basic Tools

The introduction to this chapter reminded me a lot of the syllabus from [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/). It doesn't matter how good your thought processes are if you don't have the tools to manifest them. In the case of software development, this might be an editor, a version control system or debugging utilities.

> Keep knowledge in plain text    
> _page 75_

Raise your hand if you've ever cursed a screenshot because you couldn't copy-paste text from it. And yes, Microsoft Word, you are no better.

> Use the Power of Command Shells    
> _page 79_

Using the power requires knowing that it exists. Often it is not necessary to know how to achieve something, but only that it can be achieved. With all due disdain for the latest developments in the AI segment, I actually see great potential here. Anyone who doesn't regularly work with `grep`, `sed`, `awk` and co. will either spend ages digging through documentation or trial-and-error their way to the goal. Alternatively, you can now consult the LLM of your choice: “I want a list of the 2nd-level dependencies of this library.” (and get a wrong answer faster :P)

> Achieve Editor Fluency    
> _page 81_

I feel like I've been busted. Sure, I have my handful of shortcuts that make my life easier. But there are many tasks that I still do in a criminally clumsy way: mouse clicks that are too deeply ingrained in my muscle memory; neglected editor features; non-existent window management...

The authors offer a solution: observe your own behavior meticulously and make a note of every action that seems unnecessarily laborious in order to devise a better approach. Or: jump in at the deep end and completely block certain functionalities for a while (e.g. don't use the mouse or the delete key, hide certain buttons from your editor's UI).

> Always Use Version Control    
> _page 85_

Another weak spot exposed! Yes, of course we use Git in software development and I back up my data files. But the local development setup in case my PC crash and burns? I could restore a few (outdated) dotfiles, as well as run a (long unexamined) script that installs a few programs. But anything beyond that would be manual work.

The VCS chapter concludes with a challenge: occasionally try out unused features. Be it the VCS, the hosting provider, a communication tool,... Because even with well-functioning workflows, you can certainly make a few improvements.

> Fix the Problem, Not the Blame    
> _page 89_

Fortunately, this is not a problem in my team. `git blame` is often used in debugging, but rather to find out what the causing commit was trying to change. Was it perhaps a workaround that is now obsolete? Have assumptions changed since the implementation?

The value of a detailed bug description is immeasurable. Debugging is “a puzzle to be solved” where every clue can be decisive for a (faster) solution.

“Fix the Problem” includes avoiding the problem in the future. Therefore, every fixed bug should trigger an aftershock in the form of
  - tests that check for the bug
  - checks in upstream systems that prevent the bug
  - extended logs that provide better indications of similar cases
  - educating the team to eliminate possible misconceptions

> Learn a Text Manipulation Language     
> _page 98_

  If you write a lot of code, you also want to automate certain things. Put the API under load with random requests? Create release notes from the latest commits? Change a URL in all 20 microservices? Simple scripting languages (such as Bash, Ruby or Python) are suitable for this.

## 4. Pragmatic Paranoia

The essence of this chapter: you can't trust anyone - not even yourself. Or to put it more charitably: even under good conditions, a safety net can't hurt.

### Design by Contract

So why not avoid those situations in which trust is necessary?

In the security sector, walking exclusively on well-beaten tracks is referred to as [Zero Trust](https://en.wikipedia.org/wiki/Zero_trust_security_model). In the application environment, the term “contracts” ([Design by Contract](https://en.wikipedia.org/wiki/Design_by_contract)) is used. Only certain conditions are accepted, everything else is simply ignored. You want to call this method with a character string? Tough luck, it only allows integers. And only between 20 and 85. Make life easy for yourself: intentionally write “lazy” code that only runs under its conditions.

Of course, it is essential that all parties are aware of the “contract”. If you want to be [API-First](https://swagger.io/resources/articles/adopting-an-api-first-approach/), you also have to disclose how interfaces are to be used. Unfortunately, the documentation is often outdated or not available at all. In these cases, you can only uncover the rules of the contract through meticulous forensics, mere coincidence or - God forbid - communication with those responsible. Nobody can possibly want that.

### Dead Programs Tell No Lies

Don't worry if something doesn't go as planned despite all the contracts. Just let your program crash! That may sound careless. But the alternative would be to continue running under unknown conditions, using up resources unnecessarily and possibly causing damage (oops, now the database is nuked).

This is exactly what [exception handling](https://en.wikipedia.org/wiki/Exception_handling) is for, i.e. a “supervisor” recognizes the error, possibly executes a few more commands (write log, close file,...) and signals to the next layer that something failed: try again or try differently.

### How to Balance Resources

Even short-running programs can leave footprints. The cropped photo, the 10 lines of logs, the content of the push message. We casually store some things permanently in a file system or database. But do we remember to delete this data again at some point? Or are we growing a sleeping giant that will eventually reach its limits?

### Don't Outrun Your Headlights

Only going as fast as you can see is not only useful in traffic. Take small steps. Test. Ask the users.

Don't try your hand at fortune telling. The further you want to look into the future, the more likely you are to be wrong and cause yourself unnecessary work. Instead, create the conditions to be able to change things quickly when the time comes. Because you will be wiser in the future.

## 5. Bend, or Break

In more dramatic terms, this means that if your code cannot be bent in the future, it will break.

### Decoupling

I occasionally catch myself in the deceptive ease of extracting attributes from objects to use them later on, e.g.

```kotlin
val total = order["123"].total
val discountedTotal = total * 0.9
order["123"].total = discountedTotal
```

Apart from other shortcomings - this code “asks”, although it should “instruct”.

> you shouldn't make decisions based on the internal state of an object and then update that object
>
> _page 132_

So instead, we should leave the knowledge about the implementation within the object:

```kotlin
order["123"].applyDiscount(0.9)
```

We may want to add further instructions later, e.g. that the discounted amount should not fall below a minimum amount. We can now delegate all this to `applyDiscount()`.

### Juggling the Real World

Trying to adapt the real world to our imagined ideal manifested in code is doomed to failure. The supplier has decided to deviate from the specified route and you don't take this into account when calculating the [estimated time of arrival](https://en.wikipedia.org/wiki/Estimated_time_of_arrival)? Back to the drawing board...

The authors offer a simple concept: events happen in the real world. This could be a mouse click or a temperature dropping below freezing. The code must map these events and react accordingly. Methods for this are:

- [finite-state machine](https://en.wikipedia.org/wiki/Finite-state_machine)
- [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) or its decoupled sibling [Publish/Subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
- [ReactiveX](https://reactivex.io/) ("event streams")

### Transforming Programming

This chapter highlights the advantages of [functional programming](https://en.wikipedia.org/wiki/Functional_programming). Basically, many programs only transform data. This [IPO pattern](https://en.wikipedia.org/wiki/IPO_model) is one of the first topics on curricula. If a pipe `|` is enough, use a pipe (or the equivalent in your programming language).

Error handling is a special feature here. This is because the structures that we pass via pipes must not only map the “happy path”, but must also contain information about possible errors.

### Inheritance Tax

A nation state's inheritance tax may not strictly follow this principle, but the following applies to programming: the more is inherited, the more expensive it can become. Anyone who has ever gotten lost in an inheritance tree will nod in agreement. It gets completely hairy when a class inherits from [several classes](https://en.wikipedia.org/wiki/Multiple_inheritance) (looking at you C++ and Python).

There are “leaner” ways to achieve goals without the need for inheritance:
- use interfaces for [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science))
- use [Delegation](https://en.wikipedia.org/wiki/Delegation_(object-oriented_programming)) to reuse a subset of functions from another class
- use [Mixins](https://en.wikipedia.org/wiki/Mixin) to share functions across multiple classes

### Configuration

[Feature toggles](https://en.wikipedia.org/wiki/Feature_toggle) are a great invention. They make it possible to change how the program behaves at any time. Don't like the green background? Let's go back to blue! The address of the API for bad jokes has changed? Done immediately! The VAT has been temporarily reduced? No problem at all!

The concept is straightforward. There is a source for configurations, e.g. a file or a table in a database. The program refers to it to determine its parameters.

Ideally, the configuration is available via an API so that updates can find their way into the program at runtime (without restarts). In this way, several programs can also share a configuration (or parts of it).

Configuration sources should have a simple format, e.g. JSON or YAML. Less tech-savvy people will then be able to change them. For complex configurations, a graphical management interface can provide a better overview.

## 6. Concurrency

A _sequential_ program flow is easier to understand. However, breaking the sequence increases the speed of the program:

- _concurrent_ processes (something outside our code takes time) e.g. we already send the second API request before we have the answer of the first one
- _parallel_ processes (our code takes time) e.g. we distribute calculations to different CPU cores

### Breaking Temporal Coupling

Some processes can run simultaneously, others require a strict order. Drawing an [activity diagram](https://en.wikipedia.org/wiki/Activity_diagram) helps to become aware of this. Of importance for _concurrency_ are the synchronization nodes.

But not every possibility of _concurrency_ has to be utilized. If, for example, there are points in the program sequence where waiting is involved anyway, it may be worth pushing processes into this phase instead of running them in parallel beforehand. This may avoid having to start up an additional computer and thus optimizes resource consumption.

### Shared State Is Incorrect State

Shared state_ is something that allows parallel access by several entities, e.g. a global variable. This quickly becomes problematic. The authors have come up with a nice example: in a restaurant, 2 guests each ask 2 different waiters for one piece of cake. There is exactly one piece in the display case, so both waiters promise to serve it. Both waiters then approach the display case and...

It is now explained how this problem can be solved by combining several actions into one atomic action, e.g. by using [semaphores](https://en.wikipedia.org/wiki/Semaphore_(programming)) or constructs provided by the programming language. However, it is easiest, if possible, to refrain from using _shared state_ at all.

### Actors and Processes

[Actors](https://en.wikipedia.org/wiki/Actor_model) offer a way to avoid _shared state_. Everything is only stored locally within the actors. They communicate with each other via messages. In this chapter, the authors program a simple actor system for their cake example using [nact](https://nact.xyz/) (JavaScript).

## 7. While You Are Coding

At some point, software is ready for use. But the work doesn't end here. Adding new features, changing existing ones, maintenance, support, fixing bugs,... these activities also require brainpower.

### Listen to Your Lizard Brain

Also from those parts of the brain that have been around the longest. The book is mainly focused on rational thoughts and decisions. However, it is advisable to pay attention to intuition from time to time. It can give important signals. Does something feel unnecessarily complicated? Am I solving the right problem right now? Could this change backfire on me? Your gut feeling may be right.

Everyone probably has at least one story to tell where a brilliant idea came to them in the shower or during a walk. It helps to actively pause your tunnel vision from time to time - you might be digging the tunnel in the wrong direction.

### Programming by Coincidence

In the long run, coincidence is not a good ally. Don't try something and leave it at that just because it works - or fall into the classic “copied without understanding from [stackoverflow](https://en.wikipedia.org/wiki/Stack_Overflow)”. When calling a function or API, don't rely on undocumented behavior. This can change at any time. Your code will react surprisingly at some point. If you don't know how something works, you won't know why something goes wrong.

> Don't assume it, prove it.
>
> _page 200_

Also look at the context in which your program is running. Do you have assumptions that do not correspond to the facts? For example, that all your users speak German and are connected to the Internet; that an API or configuration file is always available; that the server has the same time zone?

If you make assumptions anyway, at least document them. That way you (or someone else) will have supporting information later.

Don't restrict yourself with existing code. _Refactoring_ is a means of doing a little more work now in order to avoid it many times over later.

### Algorithm Speed

[Big _O_ Notation](https://en.wikipedia.org/wiki/Big_O_notation) with low-level concerns such as runtime length or memory consumption seems somewhat detached from the previous content. But we operate in a finite world and _pragmatic programmers_ want to achieve results. It therefore makes sense to consider whether the combinatorics algorithm with four nested loops is appropriate.

At the same time, there's no need to chase after the last 10ms of time gain if nobody really cares about this difference.

### Refactoring

[Refactoring](https://en.wikipedia.org/wiki/Code_refactoring) means changing the code without changing the business logic. The effects of the change therefore relate to other factors such as readability, maintainability or performance. Like brushing your teeth, this should be done regularly so that the code remains in good condition. The basis is [regression testing](https://de.wikipedia.org/wiki/Regressionstest) to determine that the change does not have a negative impact on the existing system.

In this situation, the authors find the metaphor of _building a house_ unsuitable for programming. It implies that there is an immutable basic structure. Programming is more like gardening, where changes can be more frequent and radical.

### Test to Code

> A test is the first user of your code.
>
> _page 216_

A good indicator that the code needs an overhaul: it is difficult to test. If it is difficult to test, it may also be difficult to integrate into the surrounding system.

Before you write code, think about how you can test it. In this way, you will understand the requirements better (or even at all). Some take it a step further and not only think about testing beforehand, but write the tests beforehand ([Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development). However, as with many things, the marginal utility decreases the closer you get to an extreme. Goals such as “100% test coverage” or “failing tests before every new line of code” may have an academic appeal, but are rarely worth the effort in practice.

However, the following approaches are definitely advantageous:

1. [Unit tests](https://en.wikipedia.org/wiki/Unit_testing) to check the interfaces in the code
2. “ad hoc tests” during development (e.g. via print statements or debugging tools)
3. tests with real data on the real (production) system, as some states are difficult to create otherwise
4. logs that document special conditions (ensure a standardized format)
5. monitoring to detect persistent inconsistencies

> Test your software, or your users will.
>
> _page 223_

### Property-Based Testing

Even with 100% successful test coverage, it may simply be that you have programmed the wrong thing. Who tests that the tests also check what you want?

We could have a subtle bug in our implementation, e.g. a sorting algorithm that deletes the sixth element if there are 6 identical elements. If we don't include this exact case in our tests, it will go undetected. It will end up with the users, who will complain about strange behavior.

There are "property-based testing frameworks" for many programming languages (e.g. [Kotest](https://kotest.io/docs/proptest/property-based-testing.html) for Kotlin). These perform a single test in many different variants. For a sorting algorithm, for example, this would be with lists of different lengths, already sorted lists, identical elements, elements that are far apart, etc. The test itself then checks part of the “contract”, e.g. that the input list must be the same length as the output list or that each element in the list must be smaller than the next.

In the process, the properties that the variants should have are roughly defined. Nevertheless, each test run generates slightly different inputs. Such tests are therefore neither repeatable nor deterministic. Consequently, tests may sometimes be successful and sometimes fail. The input of a failed test should therefore be transferred to a separate unit test as a future regression test.

### Stay Safe Out There

Sooner or later, uninvited guests will knock on the door of any program that communicates with the outside world. To ensure that it remains a knock, the system should be based on the following principles:

- minimize the attack surface

   This applies to all possibilities for input and output of data or execution of processes. Every input not made by the user should be checked for plausibility -> [relevant xkcd](https://xkcd.com/327/). Public endpoints can become the target of [DoS attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack). Services _without_ authentication will eventually be grazed by data-hungry individuals. Services _with_ authentication should not use default passwords and access should be denied for inactive "zombie users". Do not disclose any confidential information (e.g. [Stacktraces](https://en.wikipedia.org/wiki/Stack_trace) or _“This password is already used by user weak@l33t.org.”_).

- keep privileges as minimal as possible: [least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege)

   The number of individually configurable [IAM permissions](https://cloud.google.com/iam/docs/permissions-reference) at Google Cloud is currently “_over 9000_”. Almost every possible action from viewing logs to opening ports can be permitted or prohibited. Many other systems differentiate, if at all, between “admin” and “user”. For most, the sweet spot is probably somewhere between exorbitant effort and complete neglect.

- have secure defaults

   If your system allows a choice of settings, the initial default setting should always be the most secure, even if it is not the most user-friendly option. Many people find it convenient to briefly see the last letter in plain text when entering a password. But perhaps not when they are sitting on the train or sharing their screen. Better safe than sorry.

- encrypt sensitive data

   Hopefully a no-brainer by now. Just do it. Always. And don't use a homegrown cryptographic algorithm.

- install security patches

   Many major data leaks and other problems have been caused by publicly known security vulnerabilities ([CVE](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures)). No patch, no mercy (and soon no customers).

### Naming Things

Is it `user`? Or is it rather `customer`, `seller`, `player`, `employee`,...? Don't be generic when you can be clear and unambiguous.

When formatting, you should pay attention to conventions. A brown bear is a `brown_bear` in [Python](https://peps.python.org/pep-0008/#function-and-variable-names), a `brownBear` in [Java](https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html) and in yet another language perhaps a `grizzly`.

If you can't find the right names straight away, you can change them at any time. This even becomes mandatory if the implementation changes, e.g. `getCustomers()` suddenly becomes `sendCustomers()`. Avoid misleading names at all costs.

## 8. Before the Project

### The Requirements Pit

The real world is full of disorder and unknowns. At the beginning of a software project, nobody usually knows what _exactly_ they want. It starts with a particular problem, which may only be a superficial symptom. We help to understand what they _really_ want (e.g. by asking [five times “Why?”](https://de.wikipedia.org/wiki/5-Why-Methode)). In order to program abstract wishes, they must first become concrete requirements.

The whole process usually requires several rounds of fine polishing, just like a gemstone.

> _Customers should know the arrival time of the delivery._
> - On which channel?
> - How large of a time window is allowed?
> - What if the arrival time subsequently changes? (differentiate between minutes, hours, days?)
> - What if only part of the order is delivered?
> - What if the delivery van has no internet connection?
> - etc.

This cannot be avoided. No single person initially thinks of all the imponderables and borderline cases. Some know the domain better, others the technology, others the legal requirements. In complex projects, communication is the key to success.

Is this communication disrupted or are you still clueless: create a quick [mockup](https://en.wikipedia.org/wiki/Mockup) and ask for feedback. Even better: adopt the customer perspective. Are you designing an app for suppliers? Take a ride-along with a supplier and learn how the app is really going to be used. This also strengthens the customer relationship.

At some point, a requirement becomes clear. To make it explicit, you should avoid an extensive catalog of specifications. Short [user stories](https://en.wikipedia.org/wiki/User_story) capture the essence of the requirement and will actually be read. If anything is ambiguous, they form the basis for further communication. They can be easily integrated into a [Kanban board](https://en.wikipedia.org/wiki/Kanban_board) to track progress.

While gathering requirements, some terms will be assigned a special meaning that is not apparent in normal language usage. In these cases, a glossary should be created, e.g. to define the difference between “customer” and “cardholder”. Avoid using different terms that mean the same thing. And especially avoid using the same term for two different things.

### Working Together

[Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law) states that the quality of the interfaces between software teams corresponds to the quality of communication between these teams. This can be extended to the collaboration with customers. Here too, the quality of the communication with the customer will be evident in the final product.

When working within a team, [pair programming](https://en.wikipedia.org/wiki/Pair_programming) or [mob programming](https://en.wikipedia.org/wiki/Team_programming#Mob_programming) offers many advantages.

### The Essence of Agility

Since the authors contributed to the [Agile Manifesto](https://agilemanifesto.org/), it is very refreshing to read from their pen that these principles cannot be cast into “agile processes” (e.g. every team must do 3-week sprints). Such measures are _rigid_ and therefore already semantically incompatible with agility.

Agility is about adapting. A gazelle being chased by a lioness will behave differently depending on whether it is at a waterhole, in tall grass or on the open plains; whether it is among other gazelles and how the lioness moves. And the metaphor of the hunted gazelle fits perfectly with how a lot of developers perceive supposed “agility” today: not even as just a constraint, but as a threat to their productivity and mental well-being.

Agility has been hollowed out by charlatans and money-grubbers, and filled with certificates and billable hours.

The true nature of agility is to try little things and see if it gets you closer to your goal or not.

## 9. Pragmatic Projects

### Pragmatic Teams

With their recommendation for team sizes, the authors are in agreement with the [Scrum Guide](https://scrumguides.org/scrum-guide.html#scrum-team) (_“10 or fewer people”_). Their reasoning is that with each additional member, the number of communication paths increases by _O(n²)_. This becomes ineffective above a size of 10-12 because everyone will only be busy coordinating with others.

Some of the ideas discussed in the book can be applied on the project team level as well:

- Everyone must take responsibility for the quality of the product (and replace _broken windows_).
- Everyone must be aware of changes: new features, errors that occur, monitoring & metrics.
- The team must not only work on new features, but must plan time for other improvements & innovations, e.g. system maintenance, process adjustments, technical experiments, individual education.
- The team maintains a good external presence, which manifests itself, for example, in flawless documentation, engaging and effective meetings and informative presentations. Bonus points if the team has a recognizable and unique name.
- Communication with each other is uncomplicated and virtually instantaneous. Getting answers, sharing progress or passing on knowledge - everything should be transparent and quick.
- Handovers are superfluous because the entire team knows and can carry out the important processes. Everything else can wait.
- As much as possible is automated.

### Coconuts Don't Cut It

[Cargo cults](https://en.wikipedia.org/wiki/Cargo_cult) imitate external circumstances and hope for a result that cannot be brought about by the imitation alone.

Does the team have to use a certain framework because another team was successful with it? Does everyone have to speak in the daily because it says so in the handbook? Does the company have to be divided into squads and guilds because that's what Spotify does (or did)?

The answer is _“No.”_ every time. Your team is not the other team, a book or Spotify. You _can_ try it, but it's not a secret weapon to fortune that you absolutely have to hold on to.

### Pragmatic Starter Kit

We want general activities (tests, deployment, release, administration) to be carried out as automated as possible by everyone.

Three things help:

1. Version control

   This also applies to resources ([Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code)) and configurations. It should be possible to reinstantiate builds, tests and releases at any time without being dependent on a local computer to which almost nobody has access and which torpedoes the entire development process in the event of a crash.

2. Regression tests

   Despite the risk of sounding like a broken record, the authors prefer to mention it again: _“Test early, test often, test automatically”_. A test environment that mirrors the production environment as closely as possible is extremely helpful. Also test how the system behaves in exceptional cases when data or services are not available. There must be a test for every detected bug in order to prevent it in the future.

3. Complete automation

   Do not do anything manually that you can automate. A script supports version control. A script is easy to share. A script does not accidentally forget a step after the fifth time. A script is faster.

### Delight Your Users

> How will you know that we've all been successful a month (or a year, or whatever) after this project is done?
> 
> _page 280_

The simple answer: if the users are delighted. Not if they have paid us more than last year. Not if we have collected more data about them. Not because the code works. Users are delighted when we solve their problems. Software development is problem solving. To do this, it is important that everyone in the team understands what the problems are.

The book's postface summarizes well the moral compass that should be followed:

> 1. Have I protected the user? (_First, Do No Harm_)
> 2. Would I use this myself? (_Don't Enable Scumbags_)
>
> _page 286_

### Pride and Prejudice

Buildings are occasionally engraved or chiseled with an inscription: _“Erected by...”_.

Software can generate pride in a similar way. However, individual pride can also be detrimental, as it can lead to misguided defenses and territorial claims to code fragments. Instead, the cornerstones should be mutual respect and professionalism.

Extreme Programming therefore coined the term _[collective ownership](http://www.extremeprogramming.org/rules/collective.html)_: _“Erected by Team XYZ”_.
