---
title: "The Fragility Tower: A Technical Reading of Modern Digital Infrastructure"
description: "A technical but slightly satirical analysis of a modern internet dependency tower, covering supply-chain risk, cloud concentration, open-source sustainability, memory safety, DNS, AI risk, and the physical foundations beneath software."
excerpt: "A technical reading of a dependency-tower meme about the modern internet, software supply chains, cloud concentration, open-source maintainers, memory safety, AI risk, and the surprisingly physical foundations beneath digital civilisation."
author: "Antonio Feijao UK"
date: 2026-05-13
last_modified_at: 2026-05-13
categories:
  - Security
  - Infrastructure
  - Software Engineering
tags:
  - software supply chain
  - open source
  - dependency risk
  - cloud security
  - infrastructure
  - dns
  - aws
  - cloudflare
  - crowdstrike
  - left-pad
  - memory safety
  - rust
  - c
  - ai security
  - prompt injection
  - devops
  - sre
  - architecture
reading_time: "18 min read"
toc: true
toc_sticky: true
comments: false
share: true
published: true
cover: "/assets/images/blog/modern-infrastructure-fragility-tower-darkblue.png"
image: "/assets/images/blog/modern-infrastructure-fragility-tower-darkblue.png"
seo:
  type: "Article"
  name: "The Fragility Tower: A Technical Reading of Modern Digital Infrastructure"
  headline: "The Fragility Tower: A Technical Reading of Modern Digital Infrastructure"
  description: "A technical but slightly satirical analysis of a modern internet dependency tower, covering supply-chain risk, cloud concentration, open-source sustainability, memory safety, DNS, AI risk, and the physical foundations beneath software."
  author: "Antonio Feijao UK"
  date_published: 2026-05-13
  date_modified: 2026-05-13
  keywords:
    - software supply chain
    - open source sustainability
    - dependency risk
    - cloud concentration risk
    - memory safety
    - AI security
    - prompt injection
    - DNS outages
    - DevOps
    - SRE
    - infrastructure security
canonical_url: "https://www.antoniofeijao.com/blog/2026/05/13/fragility-of-modern-digital-infrastructure/"
---

<figure class="article-image-card" data-zoomable="true">
  <img src="/assets/images/blog/modern-infrastructure-fragility-tower-darkblue.png" alt="Satirical technical diagram showing a tall, unstable tower of modern internet dependencies, from web applications and AI down through open source, cloud infrastructure, C, Linux, semiconductors, and electricity">
  <figcaption>AI-enhanced dark-blue version used as the main image for this post.</figcaption>
</figure>

This image is funny because it is exaggerated.

It is uncomfortable because it is not exaggerated enough.

The lineage matters.

The original idea comes from Randall Munroe's xkcd #2347, ["Dependency"](https://xkcd.com/2347/), where a tiny open-source project maintained by one person in Nebraska quietly supports a large part of modern digital infrastructure.

<figure class="article-image-card article-image-card-narrow" data-zoomable="true">
  <img src="https://imgs.xkcd.com/comics/dependency.png" alt="xkcd comic Dependency showing modern digital infrastructure depending on a small project maintained by one person in Nebraska">
  <figcaption>Original xkcd #2347, "Dependency", by Randall Munroe. Source: <a href="https://xkcd.com/2347/">xkcd.com/2347</a>.</figcaption>
</figure>

I first came across the expanded infrastructure version through Security Now, episode #1078, "DigiCert Does It Right", in Steve Gibson's show notes.

Source: [Security Now episode #1078 notes](https://www.grc.com/sn/sn-1078-notes.pdf).

That expanded version takes the xkcd dependency joke and turns it into a broader map of today's internet.

Now the tower includes browser engines, JavaScript ecosystems, cloud platforms, DNS, security agents, unpaid open-source maintainers, old C code, semiconductor supply chains, power grids, and AI agents leaning confidently into the whole arrangement.

<figure class="article-image-card article-image-card-narrow" data-zoomable="true">
  <img src="/assets/images/blog/modern-infrastructure-fragility-tower-original.png" alt="Original lighter version of the dependency tower meme that inspired the dark-blue version">
  <figcaption>The expanded infrastructure meme that inspired this post. I used AI to improve the quality, sharpen the presentation, and create the darker blue version used as the main image above.</figcaption>
</figure>

It is a meme, not an architecture diagram.

But good satire often behaves like a threat model with better timing.

## Reading the tower

The main idea is simple.

Modern digital systems look smooth at the user interface. Underneath, they are layered on vast dependency chains.

Some layers are engineered with impressive discipline.

Some are maintained by tiny teams.

Some are old, sharp, and written in C.

Some are centralised into a small number of providers.

Some are physical systems that software people only remember when they fail.

The leaning shape matters. The image is not saying every component is bad. Many of the named technologies are excellent.

The joke is about coupling, scale, asymmetry, and blast radius.

A tiny failure in a low, boring, or underfunded layer can disturb enormous systems above it.

For engineers, the useful question is not:

> Is the tower real?

The useful question is:

> Where does my system have tower-shaped risk?

## The visible top: where humans touch the web

At the top sits **"YOU ARE HERE"**.

This is the user, developer, analyst, customer, or executive interacting with a tiny visible slice of the stack.

They click a button. They deploy a change. They refresh a dashboard. They open a browser tab. They ask an AI assistant to do something useful.

The experience appears simple because thousands of hidden systems are cooperating behind it.

Below that, **"SOMETHING HAPPENING IN THE WEB"** represents modern web applications.

That includes single-page apps, APIs, authentication flows, feature flags, analytics tags, CDN rules, identity providers, managed databases, queue workers, build systems, and observability tooling.

Also, inevitably, enough YAML to make a grown SRE stare silently into a mug.

Then comes **"WEB DEV SABOTAGING HIMSELF"**.

This is the affectionate insult layer.

It points at frontend complexity, framework churn, build pipelines, package sprawl, hydration strategies, transitive dependencies, browser compatibility workarounds, and abstractions that sometimes exist because last year's abstraction became unfashionable.

None of this is automatically irrational. The web is genuinely hard.

But the ecosystem does have a habit of turning "display data and submit a form" into a distributed ritual involving:

- a compiler
- a bundler
- a lockfile
- a component model
- a dependency audit
- a philosophical argument about server state

**WASM** and **V8** are more serious than the joke suggests.

WebAssembly gives the web a portable low-level execution target for code written in languages such as Rust, C, C++, and Go.

V8, Google's JavaScript and WebAssembly engine used in Chrome and Node.js, powers a huge amount of client-side and server-side execution.

These runtimes are extraordinary engineering achievements. They also concentrate complexity.

Vulnerabilities in browser engines, JIT compilers, sandbox boundaries, or runtime APIs can have large security consequences because so much untrusted code flows through them.

The top is leaning because user-facing software changes quickly.

It depends heavily on lower layers.

It often optimises for shipping speed.

That is not a moral failure. It is a risk condition.

## Left-pad and the supply-chain lesson that refuses to retire

The **"LEFT-PAD"** block refers to the 2016 npm incident where the tiny `left-pad` package was unpublished and broke builds across the JavaScript ecosystem.

The incident became famous because the package did something almost comically small: pad a string on the left.

Yet it was a transitive dependency of widely used tooling. When it disappeared, install and build failures spread quickly.

The important lesson was not "small packages are silly". Small, well-scoped packages can be useful.

The real lesson was that dependency graphs create hidden operational dependencies.

A package you never consciously selected can still become part of your production build path.

A maintainer dispute, registry policy, compromised account, malicious update, typosquatted package, dependency confusion issue, or abandoned project can become your outage.

Modern mitigations help:

- lockfiles
- private mirrors
- package provenance
- software bills of materials
- dependency review
- reproducible builds
- signed artefacts
- pinned versions
- staged updates

But the underlying tension remains.

We want reuse because reuse is efficient and often safer than rewriting.

We also want resilience because unbounded reuse turns the internet into a house of import statements.

## CrowdStrike and automated blast radius

The **"CROWDSTRIKE"** block references the 19 July 2024 CrowdStrike Falcon update incident.

A faulty Rapid Response Content update for Windows hosts triggered widespread blue screen failures across affected systems.

CrowdStrike's own post-incident material identified the issue as a content update problem, not a cyberattack.

The impact was global because endpoint security software is deployed widely, runs with high privilege, and updates automatically by design.

That is the uncomfortable part.

The same properties that make endpoint security effective can make a bad update highly disruptive.

Security agents need deep system visibility. They need to load early. They need rapid updates because attackers move quickly. They are intentionally placed close to the operating system.

When that machinery fails, the blast radius is not like a normal application crash.

This is concentration risk plus automation risk.

It does not mean "do not use EDR".

It means critical agents should be treated as production dependencies. They need staged rollout controls, validation rings, recovery procedures, offline repair paths, vendor risk management, and clear assumptions about failure modes.

The best security product in the world is still software.

## "Whatever Microsoft is doing"

**"WHATEVER MICROSOFT IS DOING"** is a joke with an enterprise architecture diagram hiding inside it.

Microsoft is not one thing.

It is Windows, Active Directory, Entra ID, Office, Teams, SharePoint, Exchange, Defender, Intune, Azure, Power Platform, GitHub, developer tooling, identity flows, licences, agents, tenants, policies, legacy compatibility, and business-critical macros written by someone who retired during the Windows 7 era.

The humour is that large enterprise ecosystems are both essential and difficult to reason about.

Their surface area is huge.

Their configuration state is often historical.

Their integrations cross identity, endpoint, SaaS, cloud, email, collaboration, and compliance boundaries.

They also carry decades of backwards compatibility, which is both a gift and a security tax.

The engineering lesson is not to sneer at complexity.

It is to map it.

Know the identity control plane. Know where privileged automation lives. Know which agents update automatically. Know which SaaS integrations can read mail, files, tickets, repositories, or calendars.

In enterprise systems, the dependency graph is often an access graph.

## AI: a new load on an old tower

The **"AI"** block is deliberately wedged into an already unstable structure.

AI systems are being attached to software delivery, security operations, customer support, data analysis, identity workflows, incident response, and business process automation.

Used well, they are powerful.

Used carelessly, they amplify existing confusion.

The main risk is not that a model says something silly in a chat box.

The higher-risk pattern is an AI system with tools, permissions, memory, retrieval, workflow access, and enough autonomy to take actions.

At that point, prompt injection becomes a security boundary problem.

Untrusted text from a web page, email, ticket, document, repository, or log entry can influence an assistant that has access to internal tools.

If the assistant can read secrets, open pull requests, change cloud resources, send messages, approve transactions, or call APIs, the model is now part of the control plane.

Important AI risks include:

- **Prompt injection**, where untrusted content attempts to override instructions or manipulate tool use.
- **Privilege abuse**, where an assistant can do more than the user or workflow actually requires.
- **Insecure automation**, where generated actions are executed without review, policy checks, or rollback.
- **Hallucination**, where plausible but false output enters tickets, code, documentation, decisions, or detections.
- **Cascading failure**, where one automated mistake becomes input to another automated process.

The practical answer is boring, which is usually a good sign.

Use least privilege. Use strong tool schemas. Use allow lists. Require human approval for sensitive actions. Keep audit logs. Separate environments. Enforce deterministic policy outside the model. Test for prompt injection. Prepare incident response for AI-assisted workflows.

AI should add capability.

It should not become a magical root shell with a friendly tone.

## Unpaid open-source developers holding the beams

The **"UNPAID OPENSOURCE DEVELOPERS"** layer is probably the most important part of the image.

Modern infrastructure depends on open-source software at every level:

- operating systems
- compilers
- package managers
- TLS libraries
- compression libraries
- parsers
- web frameworks
- observability agents
- container tooling
- CI/CD systems
- cryptographic libraries
- thousands of small packages

Open source is not the problem.

Open source is one of the reasons the internet works as well as it does.

The fragility comes from the mismatch between social reality and production dependency.

A project may be maintained by one person at night, unpaid, while banks, hospitals, governments, SaaS companies, and critical infrastructure quietly depend on it.

Log4Shell in 2021 made this visible.

A vulnerability in the widely used Apache Log4j library created urgent remediation work across enterprises because the affected component was embedded deep inside Java applications and vendor products.

OpenSSL's Heartbleed vulnerability in 2014 told a similar story for cryptographic infrastructure.

These were not obscure lessons. They were reminders that "free" dependencies still require funding, maintenance, review, and operational ownership.

For organisations, open-source sustainability is not charity.

It is risk management.

Fund critical projects. Contribute fixes upstream. Track maintainers and project health. Prefer boring dependencies with active maintenance. Maintain internal inventories.

Do not make a volunteer maintainer your unacknowledged single point of failure.

## Rust, C, and the memory-safety fault line

On the left, **"RUST DEVS DOING THEIR THING"** represents the push towards memory-safe systems programming.

Rust is not a silver bullet. It is, however, an important response to a long history of memory corruption in C and C++ software.

Use-after-free, buffer overflow, double free, out-of-bounds access, and data race classes have shaped decades of exploitation.

Governments and security agencies have increasingly encouraged memory-safe languages for security-sensitive code.

The US Office of the National Cyber Director published guidance in 2024 urging better software security at the memory-safety level.

In practice, Rust is appearing where performance and safety both matter: TLS implementations such as Rustls, operating-system components, browser components, cloud infrastructure, command-line tools, and security-sensitive services.

Then the image points at **"THAT ONE C99 PROJECT BASED ON BEHAVIOUR OF UNDEFINED BEHAVIOUR"**. C99 is a version of the C language standard. Undefined behaviour is the class of behaviour where the C standard imposes no requirements on what happens. Compilers may assume undefined behaviour never occurs and optimise accordingly. That can turn "it worked in testing" into "it vanished under optimisation" or "the bounds check you thought you had is not doing what you think".

C is not going away.

The kernel, embedded systems, network stacks, databases, runtimes, and performance-critical libraries depend on it.

The goal is not performative language tribalism.

The goal is to reduce avoidable memory-unsafety in new code, isolate legacy code, fuzz aggressively, use sanitizers, apply hardening, review unsafe boundaries, and choose memory-safe languages where they fit.

The **"C DEVELOPERS WRITING DYNAMIC ARRAYS"** foundation joke is affectionate because everyone eventually reinvents a vector, and sometimes civilisation depends on whether they got the reallocation path right.

## JVM, Oracle, and enterprise sediment

The **"JVM"** block represents the Java Virtual Machine ecosystem: Java, Kotlin, Scala, Clojure, application servers, build tools, enterprise frameworks, Android history, and a large amount of business software.

The JVM is a mature, high-performance runtime with strong tooling and decades of operational knowledge.

**"ORACLE"** represents the corporate and licensing sediment around enterprise software: databases, Java stewardship, support contracts, middleware, ERP integrations, and the institutional reality that many systems outlive the teams that built them.

The tower is not only made of trendy packages.

It is also made of enterprise platforms, legacy runtimes, contractual dependencies, and systems whose change windows are negotiated like diplomatic treaties.

Security architects should care because legacy enterprise layers often hold important data and privileges. They are rarely glamorous. They are often where the crown jewels live.

## Cloudflare, DNS, and the internet edge

**"CLOUDFLARE"** represents CDN, DDoS protection, DNS, reverse proxying, web application firewalling, TLS termination, bot controls, and edge compute.

Providers like Cloudflare are powerful because they sit near the front door of many internet properties.

That position improves performance and resilience.

It also creates dependency.

If your DNS, CDN, WAF, access policies, TLS, and origin routing all pass through one edge provider, that provider becomes part of your availability and security model.

The **lava lamps** refer to Cloudflare's LavaRand system, where a wall of lava lamps has been used as one source of entropy for randomness generation.

It is a memorable example because cryptography depends on high-quality randomness, and randomness is surprisingly physical.

The serious lesson is that secure systems often depend on properties outside normal application logic: entropy sources, hardware behaviour, clocks, power, sensors, and environmental noise.

**DNS** is the classic invisible dependency.

It maps names to resources, but operationally it is also a control plane for availability, failover, email security, certificate validation, service discovery, and cloud integrations.

DNS failures can make healthy systems unreachable.

Misconfigured records, expired domains, registrar compromise, DDoS against DNS providers, bad DNSSEC changes, or cloud DNS incidents can produce outages that look like "the application is down" when the application is fine.

Treat DNS as critical infrastructure.

Version important records. Protect registrar accounts. Use MFA. Monitor resolution externally. Keep TTLs intentional. Document recovery paths.

Do not let the only person who understands split-horizon DNS go on holiday with the password manager export in their head.

## AWS, libcurl, and hyperscale dependency

**"AWS"** represents hyperscale cloud infrastructure.

Cloud platforms give teams enormous capability: elastic compute, managed databases, queues, object storage, identity, observability, AI services, and global deployment primitives.

They also concentrate risk.

A major region, identity service, DNS dependency, control plane, or managed service issue can affect thousands of organisations simultaneously.

The December 2021 AWS US-EAST-1 outage is a useful example because it affected Amazon services and many external services that depended on AWS.

The lesson is not "cloud bad".

The lesson is that cloud architecture still needs failure-domain thinking.

Multi-AZ is not multi-region. Multi-region is not automatically multi-cloud. A data plane may keep running while a control plane is impaired.

Your monitoring, incident chat, status page, deployment system, and runbooks should not all rely on the same failed dependency.

**LibCURL** is a lovely little block because it represents boring software that does heroic work.

`curl` and `libcurl`, created by Daniel Stenberg, are used across command-line workflows, applications, embedded systems, package managers, CI jobs, scripts, and service integrations.

When a small networking library becomes ubiquitous, its correctness, security posture, maintainer capacity, and release process matter to everyone.

This is the recurring theme: boring is not the opposite of important. Boring is often where the important part hides.

## Linux, Linus, IBM, K&R, and the old foundations

**"A LINUX FOUNDATION"** and **"Linus Torvalds"** point at Linux as a foundational layer of modern computing.

Linux runs enormous portions of cloud infrastructure, containers, Android, embedded devices, network appliances, CI runners, Kubernetes clusters, supercomputers, and developer environments.

The open-source model around Linux is one of the great engineering achievements of the last few decades.

**"IBM"** stands for older enterprise computing foundations: mainframes, transaction processing, hardware history, operating systems, middleware, consulting, and the fact that much of "digital transformation" still eventually talks to a system designed when uptime was measured with a different kind of seriousness.

The modern internet did not replace old infrastructure.

It layered APIs, queues, gateways, and dashboards on top of it.

**"K&R"** refers to Brian Kernighan and Dennis Ritchie, associated with the C programming language and Unix foundations.

C and Unix shaped the programming model that still influences operating systems, processes, files, pipes, sockets, compilers, and developer culture.

The tower is funny partly because our newest abstractions still stand on design decisions from the 1970s.

This is not a criticism. Good foundations endure. But old foundations also carry assumptions from their time. Security engineering often means understanding which assumptions still hold.

## TSMC, electricity, and the physical world below the stack

**"TSMC"** represents semiconductor manufacturing concentration risk.

Advanced chips depend on specialised fabrication capacity, supply chains, equipment, materials, water, energy, geopolitical stability, and long lead times.

Cloud computing may feel abstract, but the servers are made of chips, and the chips come from somewhere.

At the bottom sits **"ELECTRICITY"**, the ultimate dependency layer.

Data centres need power, cooling, generators, fuel logistics, grid stability, network connectivity, and physical security.

Undersea cables carry traffic between continents. Fibre routes get cut. Transformers fail. Cooling systems break. Regions suffer extreme weather. Energy prices move.

Software teams can deploy globally in minutes.

The physical substrate still obeys physics, politics, maintenance schedules, and concrete.

This is why serious resilience work eventually becomes multidisciplinary. You cannot fully understand digital risk without understanding facilities, suppliers, geography, power, networks, people, and governance.

## What engineers should take from the joke

The tower is not an argument for pessimism. It is an argument for better dependency literacy.

First, map your critical dependencies.

Include packages, registries, build systems, CI/CD platforms, identity providers, DNS, certificate authorities, cloud services, SaaS products, endpoint agents, monitoring tools, notification systems, and human maintainers.

The hidden dependency is the one that surprises you during an incident.

Second, reduce unnecessary dependency depth.

Reuse is good, but every dependency should earn its place. Prefer mature libraries with active maintenance. Avoid pulling large dependency trees for small functions. Review transitive risk, not only direct imports.

Third, design for blast-radius control.

Use staged rollouts, canaries, rings, feature flags, rollback paths, circuit breakers, rate limits, least privilege, and compartmentalised credentials.

Assume good updates can fail.

Fourth, fund and support the open-source projects you depend on.

Sponsorship is useful, but engineering contribution is often more valuable: bug reports, patches, documentation, tests, triage, reproducible issues, security fixes, and respectful maintenance help.

Fifth, treat AI as part of the system, not as magic outside it.

If an AI assistant can read, decide, or act, threat-model it like any other privileged automation.

The model is probabilistic. The controls around it must be deterministic.

Finally, keep operational humility.

Modern infrastructure is astonishingly robust considering how many moving parts it has.

It is also more fragile than the glossy dashboard suggests.

The right response is not fear.

It is disciplined engineering, good maintenance, honest dependency accounting, and enough humour to admit that somewhere, somehow, your production path probably still depends on a tiny thing with three stars and one exhausted maintainer.

## References

- Randall Munroe, xkcd #2347: ["Dependency"](https://xkcd.com/2347/).
- Steve Gibson and Leo Laporte, Security Now episode #1078: ["DigiCert Does It Right" show notes](https://www.grc.com/sn/sn-1078-notes.pdf).
- npm left-pad incident summary: ["Npm left-pad incident"](https://en.wikipedia.org/wiki/Npm_left-pad_incident).
- CrowdStrike post-incident executive summary for the 19 July 2024 Falcon update outage: ["CrowdStrike PIR Executive Summary"](https://www.crowdstrike.com/content/dam/crowdstrike/www/en-us/wp/2024/07/CrowdStrike-PIR-Executive-Summary.pdf).
- Cloudflare explanation of LavaRand and lava-lamp entropy: ["How do lava lamps help with Internet encryption?"](https://www.cloudflare.com/learning/ssl/lava-lamp-encryption/).
- AWS outage analysis from ThousandEyes: ["AWS Outage Analysis: December 7 & 10, 2021"](https://www.thousandeyes.com/blog/aws-outage-analysis-dec-7-2021).
- US Office of the National Cyber Director memory-safety report: ["Back to the Building Blocks: A Path Toward Secure and Measurable Software"](https://www.whitehouse.gov/wp-content/uploads/2024/02/Final-ONCD-Technical-Report.pdf).
