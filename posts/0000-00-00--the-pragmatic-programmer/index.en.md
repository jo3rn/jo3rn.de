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

![Screenshot of release notes for the apps Mastodon & Google Calendar](/images/blog/2024-08-30-release-notes.png)
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

   Admittedly, this no longer has much to do with DRY. But in modern programming languages, properties can be inflated to functions, e.g. in [Kotlin](kotlinlang.org/docs/properties.html) or C++. However, this can lead to misunderstandings. For example, accessing a property should not throw a custom exception or trigger any resource-intensive algorithms.
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

- > Keep knowledge in plain text
  >
  > page 75

  Raise your hand if you've ever cursed a screenshot because you couldn't copy-paste text from it. And yes, Microsoft Word, you are no better.

- > Use the Power of Command Shells
  >
  > page 79

  Using the power requires knowing that it exists. Often it is not necessary to know how to achieve something, but only that it can be achieved. With all due disdain for the latest developments in the AI segment, I actually see great potential here. Anyone who doesn't regularly work with `grep`, `sed`, `awk` and co. will either spend ages digging through documentation or trial-and-error their way to the goal. Alternatively, you can now consult the LLM of your choice: “I want a list of the 2nd-level dependencies of this library.” (and get a wrong answer faster :P)

- > Achieve Editor Fluency
  >
  > page 81

   I feel like I've been busted. Sure, I have my handful of shortcuts that make my life easier. But there are many tasks that I still do in a criminally clumsy way: mouse clicks that are too deeply ingrained in my muscle memory; neglected editor features; non-existent window management...

   The authors offer a solution: observe your own behavior meticulously and make a note of every action that seems unnecessarily laborious in order to devise a better approach. Or: jump in at the deep end and completely block certain functionalities for a while (e.g. don't use the mouse or the delete key, hide certain buttons from your editor's UI).

- > Always Use Version Control
  > 
  > page 85

    Another weak spot exposed! Yes, of course we use Git in software development and I back up my data files. But the local development setup in case my PC crash and burns? I could restore a few (outdated) dotfiles, as well as run a (long unexamined) script that installs a few programs. But anything beyond that would be manual work.

## 4. Pragmatic Paranoia

## 5. Bend, or Break

## 6. Concurrency

## 7. While You Are Coding

## 8. Before the Project

## 9. Pragmatic Projects
