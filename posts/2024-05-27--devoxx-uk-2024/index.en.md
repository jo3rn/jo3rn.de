---
title: Devoxx UK 2024 Recap
category: "recommendation"
author: jo3rn
---

The [company I'm working at](https://metro.digital/) enabled two people from my team (including me) to attend this year's [Devoxx UK](https://www.devoxx.co.uk/) in the beautifully bustling city of London.

![view over London](/images/blog/2024-05-27-london.png)

At the start of such conferences, before descending into the dark spheres of detailed technical matters, there are usually reserved slots for special presentations. These _keynotes_ are used for major announcements or deal with abstract topics. They are designed to create a wow effect and an inspiring atmosphere.

!["The 2D Game Learning Method"](/images/blog/2024-05-27-2d-game.png)

!["Things feel un-fun because we know they're waste."](/images/blog/2024-05-27-fun-for-now.png)

[Code Play Repeat](https://piped.video/watch?v=W5mTpqHZPmI) by Mey Beisaron and [Fun for Now](https://piped.video/watch?v=GGVCF3oHnzA) by [Kevlin Henney](https://mastodon.social/@kevlin) especially serve the second purpose. Their message: stay curious, try things out and have fun.

!["Just created a confluence page for ADRs. So I guess you can say things are getting pretty serious."](/images/blog/2024-05-27-adrs.png)

Then we moved on to the nitty-gritty details. [Krisztian Papp](https://mastodon.social/@tacsiazuma) gave an introduction to [Architecture Decision Records](https://piped.video/watch?v=6lUIXJD-lWo). We are already recording decisions, but could definitely do it more often. The simple and easy-to-understand structure of DRs belies the fact that you have to make substantial in-depth considerations upfront. The speaker begs the questions: how should they be [created](https://ozimmer.ch/practices/2023/04/03/ADRCreation.html) and [reviewed](https://ozimmer.ch/practices/2023/04/05/ADRReview.html), do they need a [definition of done](https://ozimmer.ch/practices/2020/05/22/ADDefinitionOfDone.html)? Also: _where_ to record them - another decision that could be recorded btw ;). To echo from [another architecture talk](https://piped.video/watch?v=Pr1PZU_HNpg) (by [Eoin Woods](https://mastodonapp.uk/@eoinwoods)): if it concerns a specific repository, then it is best to record it there. There are various tools that can be used to navigate DRs (especially those that build on previous ones) easier than from a plain directory or wiki, e.g. [adr-tools](https://github.com/npryce/adr-tools) or [log4brains](https://github.com/thomvaill/log4brains).

!["Domain Specific Language" and a desperate person in front of a PC](/images/blog/2024-05-27-server-ui.png)

Usually, there's an unwritten rule to avoid talks by companies that sponsor the conference ([sometimes rightfully so](https://mastodon.social/@jo3rn/112138567490134057)). However we got lucky to disregard it when joining Harriet Taylor & Jimmy Ray's talk on [Server Driven UI](https://piped.video/watch?v=kZ_Ir0tnrWw). It perfectly hit the nail on what we just started out to do: backend for frontend. They shared their wealth of experience and we soaked it all up like a sponge.

!["Anatomy of Distributed Tracing"](/images/blog/2024-05-27-tracing.png)

As a strong proponent of open source I couldn't walk past [Distributed Tracing in Java? OpenTelemetry for the Rescue!](https://piped.video/watch?v=nvLbvyl6CgQ) by [Dotan Horovits](https://fosstodon.org/@horovits). I always disliked that our main observability tool _Datadog_ is proprietary, but I'm also in no position to alter that. Nevertheless, it's possible to [integrate OpenTelemetry](https://www.datadoghq.com/blog/opentelemetry-instrumentation/) to gradually start a small revolution from within.

![entrance of the musical "Hadestown"](/images/blog/2024-05-27-hadestown.png)

Before our evening at the fantastic musical _[Hadestown](https://en.wikipedia.org/wiki/Hadestown)_ (I've been told that you have to see at least one musical when you visit London - next time it will be _[The Book of Mormon](https://en.wikipedia.org/wiki/The_Book_of_Mormon_(musical))_), we had time for 
[Spring Security: The Good Parts](https://piped.video/watch?v=kwxRe-4dnVU) by [Daniel Garnier-Moiroux](https://hachyderm.io/@kehrlann). An entertaining excursion to a corner of Spring that is usually less frequented, after having it set up once.

____

Workshops have become an integral part of tech conferences. At Devoxx, the "mini labs" ran free-to-join in the exhibitor hall (sadly, level of noise was _not_ conducive). I attended a few, but apart from one they were all the same: _here's an online guide, if you have any questions I'm here._ That was okay, but due to the limited time, many participants didn't get much further than the setup phase. I would have liked a bit more interaction and hands-on explanations, but this would have been difficult due to the soundscape. Ultimately, it was more helpful for those who were already familiar with the subject matter.

- [Securing Spring Boot Microservices with OAuth and OpenID Connect](https://www.devoxx.co.uk/talk/?id=6359) - [online tutorial](https://developer.auth0.com/resources/labs/authorization/spring-boot-microservices-security)
- [Test Driven Architecture accompanied with Architecture as Code](https://www.devoxx.co.uk/talk/?id=22215) - [online tutorial](https://github.com/hanmudo/archunit-spring) - [slides](https://hanmudo.github.io/archunit-workshop/)
- [Talk Nerdy To Me - Creating Effective Technical Presentations](https://www.devoxx.co.uk/talk/?id=5706) - this was the exception to the rule above. notes taken: keep your slides clean, one topic at a time - and if you really need to display source code [use something like this](https://carbon.now.sh/)
- [OpenTelemetry Hands-On](https://www.devoxx.co.uk/talk/?id=22222) - [online tutorial](https://github.com/NovatecConsulting/opentelemetry-training) - to be fair the topic requires a lot of setup and they made a good choice outsourcing most of it to a managed development environment (GitHub codespaces)

!["Abstract away complexities in the pipeline"](/images/blog/2024-05-27-contract.png)

The talk on [Contract Testing](https://piped.video/watch?v=RSl_JcWKE3M) (by Praveen Erode Mohanasundaram) resonated with me. I often have the feeling that there is no pragmatic way to carry out integration tests, e.g. whether a push notification triggered externally, routed through our services, actually ends up in a messaging broker and finally appears on the cell phone. For such things, you either have to create test environments that are complex to maintain or resort to time consuming manual testing. In both cases, it becomes demanding if there are frequent changes to the system under test. It would be simpler, but equally conclusive, to check whether the interfaces work as desired (e.g. with [Pact](https://docs.pact.io/)) - and everything else is left to other types of test. The talk also covers [consumer-driven vs. provider-driven](https://martinfowler.com/articles/consumerDrivenContracts.html) contract testing. There's a lot to unpack.

!["We must be careful not to confuse data with the abstractions we use to analyse them."](/images/blog/2024-05-27-impossible.png)

After a series of deep dives, it felt good to come to the surface (or even bird's eyes view) again with [Six Impossible Things](https://piped.video/watch?v=2EvtbTsySTU) by [Kevlin Henney](https://mastodon.social/@kevlin). The speaker has a charming way of getting programming gospel across and scratching all the right itches.

____

There were a few arcade machines (Pong, Space Invaders,...) in the entrance area. Whoever achieved the highest total score over the course of the days won [Lego's Pac-Man set](https://www.lego.com/product/pac-man-arcade-10323). During the breaks, however, we were more motivated to hack the system than to actually play the games. You had to enter a personalized code and the score was transmitted to a server via QR code. Unfortunately, after dismantling the URL and trying out a few things, we did not find any obvious weaknesses. The organizers probably knew their target group too well and took precautions accordingly.

I was glad to see a vegan option on the lunch menu every day. A banality that is unfortunately often sorely missed (also in our own canteen), especially if you mistakenly market yourself to be an animal- or eco-friendly entity.

The organizers are often exceptionally sophisticated when it comes to arranging advertising space. All too often, you have to go through them several times a day (toilet, eating, drinking, switching rooms). Usually, I just try to survive the exhibitor area without being drawn into pointless marketing drivel. It's a different matter with exhibitors whose products we already use. If you have the right questions ready, it pays off that there are usually a few people from the technical areas present at the booth. At Gradle, we were therefore able to pick up valuable tips that we put into practice just a few days later.

!["Using mocks is like learning chemistry from cartoons."](/images/blog/2024-05-27-mocks.png)

We utilize rather simple database queries in our services, which is why we've never asked ourselves [Mocks vs Testcontainers](https://piped.video/watch?v=aVDDfN8pwpM) (by Ivan Ponomarev). The contract testing presented earlier also makes this question less relevant. Nevertheless, it is good to know that there are testcontainers for [Postgres](https://java.testcontainers.org/modules/databases/postgres/), [RabbitMQ](https://java.testcontainers.org/modules/rabbitmq/) and the like (even [GCloud](https://java.testcontainers.org/modules/gcloud/)) in case we ever stray off the beaten tracks.

!["GraalVM Native Image - Fast Start Up and Much More"](/images/blog/2024-05-27-graalvm.png)

[Everything you need to know about GraalVM for Java applications](https://piped.video/watch?v=t4Hwra4t83w) by [Alina Yurenko](https://mastodon.online/@alina_yurenko) proved to me once again: the more I learn about [ahead-of-time compilation](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) in relation to Spring Boot, the more I want to finally try it out. Still not super convinced that it will bring a big advantage, but it's time to collect the data as the [technical compatibility is now ensured](https://www.graalvm.org/native-image/libraries-and-frameworks/).

![Illustration of a home automation between speakers and the water boiler](/images/blog/2024-05-27-smart-home.png)

I was happy that with [The smart home you didn’t know you have](https://piped.video/watch?v=6K5jpHYCO-8) (by César Tron-Lozai & David Sheldon) the open source home automation platform [Home Assistant](https://www.home-assistant.io/) was prominently mentioned. For many, this was the gateway drug to open source development - and is an exciting hobby.

!["Trunk-Based Development = Continuous Integration"](/images/blog/2024-05-27-ci.png)

Please answer [these 4 questions](https://martinfowler.com/bliki/ContinuousIntegrationCertification.html):

1. Do you do continuous integration?
2. Does everybody on your team commit and push to a shared mainline (base branch) at least daily?
3. Do these commits cause an automated build and test?
4. If the build fails, is it usually back to green within 10 minutes?

If you answered _"No"_ at least once, then jump right into [Clare Sudbery](https://mastodon.social/@claresudbery)'s [Continuous Integration – That’s not what they meant](https://piped.video/watch?v=nJe6MAgLFvk) to find out how to get to _"Yes"_ (or whether you have to at all).

!["AI's Dual-Use Potential: Balancing Innovation and Risk"](/images/blog/2024-05-27-ai.png)


The closing keynote could not have been more perfectly chosen than [The AI Elections: How Technology Could Shape Public Sentiment](https://piped.video/watch?v=lZE5ExCFjr8) (by Martin Förtsch, Thomas Endres & Jonas Mayer). A thought-provoking session with everything your heart desires (education, inspiration, humor, live demos) about the benefits and hazards of AI. For me, it just highlights the need for something similar to the [Hippocratic Oath](https://en.wikipedia.org/wiki/Declaration_of_Geneva) for IT professionals
 (e.g. _"I WILL NOT USE my knowledge to spread disinformation... or create confusing cookie banners."_)