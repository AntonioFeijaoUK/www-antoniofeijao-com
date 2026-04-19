# Timeline Triage - 15 April 2026

## Status

This triage note is now historical reference material.

As of `19 April 2026`, the `93` keeper items derived from this triage pass are fully covered in `docs/_timeline/`, with some raw labels replaced by cleaner canonical entries.

For the current migration state and per-item status, use `additional-notes/timeline-priority-reconciliation-v2026-04-19.md`.

## Scope

This is a first triage pass across the legacy source pool in `docs/_timeline/events/*.json`.

It is intended to keep the same quality threshold used for the published Markdown timeline entries:

- migrate only events that are strong, thematically relevant, and realistically verifiable
- avoid filler entries, vague conferences, weakly sourced product noise, and synthetic placeholders
- merge or replace overlapping legacy entries rather than duplicating near-identical events

## Summary

- Raw legacy source records reviewed: `303`
- Raw source records already effectively covered by the published Markdown timeline: `80`
- Remaining raw source records needing triage decisions: `223`
- Remaining raw records worth keeping in the migration backlog: `93`
- Remaining raw records that should probably be merged or treated as duplicates: `11`
- Remaining raw records that should probably be skipped: `119`

Note: the earlier rough backlog number of `228` was useful as a first estimate, but after a fuller pass across duplicate source rows and already-covered concepts, the practical remaining raw backlog is closer to `223`.

## Migrate Next

These are the remaining legacy records that still look worth keeping in the candidate backlog.

### `event-ancient.json` - 9

Formation of the Earth; First Single-Celled Life; First Multicellular Life; Cambrian Explosion; Dinosaur Extinction; Use of Fire by Early Humans; First Homo Sapiens; Development of Agriculture; First Writing Systems.

### `event-1900-1999.json` - 4

Creation of the First Computer Virus; Apple Macintosh Introduction; Launch of the First Commercial Antivirus; First World War Begins.

### `event-2000-2009.json` - 2

First Use of Blockchain; First Bitcoin Transaction.

### `event-2010-2019.json` - 24

Stuxnet Discovery; Arab Spring; Fukushima Daiichi Nuclear Disaster; Discovery of Higgs Boson; Launch of Raspberry Pi; Introduction of Docker; Edward Snowden NSA Leaks; Heartbleed Bug; Launch of Kubernetes; Introduction of HTML5; Rosetta Spacecraft's Comet Landing; SpaceX Falcon 9 Landing; Apple vs. FBI Encryption Dispute; DDoS Attack on Dyn; WannaCry Ransomware Attack; NotPetya Cyberattack; Equifax Data Breach; FCC Repeals Net Neutrality; Discovery of Meltdown and Spectre; Cambridge Analytica Scandal; Establishment of the GDPR; SpaceX Falcon Heavy Launch; Huawei Trade Restrictions; Mars Rover Curiosity Lands on Mars.

### `event-2020.json` - 3

SolarWinds Cyberattack; Introduction of Apple Silicon Macs; WHO Declares COVID-19 a Pandemic.

### `event-2021.json` - 4

Colonial Pipeline Ransomware Attack; China's Cryptocurrency Ban; Perseverance Rover Lands on Mars; COP26 Climate Change Conference.

### `event-2022.json` - 3

Costa Rica Ransomware Attack; Russia-Ukraine Cyberwarfare Escalation; Log4j Vulnerability Discovery.

### `event-2023.json` - 2

ChatGPT Release; Apple Vision Pro Announcement.

### `event-2024.json` - 1

CrowdStrike Global IT Outage.

### `event-nasa-space.json` - 28

First American in Space; Launch of Apollo 13; First Space Station; Launch of Skylab; First Space Shuttle Launch; Launch of the Space Shuttle Challenger (STS-51-L); Launch of the Galileo Spacecraft; Voyager 2 Completes Grand Tour of the Outer Planets; Mars Pathfinder Mission; Launch of the International Space Station; First Space Station Crew; First Space Tourist Flight; Launch of the Cassini-Huygens Mission; First Private Manned Spaceflight; Launch of the Mars Reconnaissance Orbiter; Discovery of Water on the Moon; Launch of the Lunar Reconnaissance Orbiter; Launch of the Juno Spacecraft; Voyager 1 Enters Interstellar Space; First Landing on a Comet; Discovery of Exoplanet Proxima Centauri b; Launch of the OSIRIS-REx Mission; Discovery of TRAPPIST-1 System; Launch of the Parker Solar Probe; Mars InSight Lander; SpaceX Crew Dragon First Manned Flight; First Mars Helicopter Flight; Launch of the James Webb Space Telescope.

### `event-ww1-ww2-cold-war.json` - 13

Russian Revolution; Treaty of Versailles; Rise of Adolf Hitler; Invasion of Poland; Battle of Britain; Pearl Harbor Attack; D-Day Invasion; Hiroshima and Nagasaki Bombings; Iron Curtain Speech; Suez Crisis; Vietnam War Escalation; Prague Spring; Dissolution of the Soviet Union.

## Possible Duplicate Or Merge

These records point to concepts that are probably real and possibly worth keeping, but they should not become standalone posts in their current raw form without merging into a stronger canonical event.

### `event-1900-1999.json` - 1

First Release of SQL.

Recommendation: keep the already-migrated SQL standards milestone as the canonical entry unless we later decide to replace it with an earlier SQL-origin post.

### `event-2000-2009.json` - 1

First Release of Ruby on Rails.

Recommendation: keep the existing Rails entry as the canonical post for now unless we later decide to rewrite it around the December 2004 release rather than the January 2005 release.

### `event-2023.json` - 1

Colonial Pipeline Ransomware Attack.

Recommendation: this appears to be a later duplicate or fallout-style echo of the 2021 event rather than a new standalone milestone.

### `event-nasa-space.json` - 8

Launch of the Lunar Module Eagle; First Reusable Spacecraft; First Mars Rover Mission; Cassini-Huygens Mission to Saturn; Launch of the Mars Science Laboratory (MSL); Curiosity Rover Lands on Mars; Mars Perseverance Rover Landing; First Powered Flight on Mars.

Recommendation: merge these under stronger canonical concepts:

- Apollo 11 moon landing, not the Lunar Module launch as a separate post
- one Space Shuttle debut post, not two same-day labels
- one Mars Pathfinder or first Mars rover post, not both labels
- one Cassini-Huygens mission post with clearer launch or arrival framing
- one Curiosity concept, not separate overlapping launch and landing posts unless we explicitly want both
- one Perseverance concept, not duplicate records across files
- one Ingenuity first flight concept, not two labels for the same event

## Probably Skip

These records are currently low priority, too vague, too filler-like, weakly framed, or too far from the core timeline standard we have been using.

### `event-ancient.json` - 15

First Fish; First Land Plants; First Amphibians; First Reptiles; First Mammals; First Birds; First Primates; First Hominids; Neanderthals Extinction; Construction of the Pyramids; Code of Hammurabi; Founding of Rome; Greek Democracy Established; Birth of Alexander the Great; Julius Caesar Assassinated.

### `event-1900-1999.json` - 5

Release of Atari 2600; Launch of the First Commercial Internet Service; Introduction of the Television; First Feature-Length Film; First Release of SQL if we keep the existing ANSI SQL post instead.

### `event-2000-2009.json` - 2

Launch of Facebook; Launch of WhatsApp.

### `event-2010-2019.json` - 42

Launch of the iPad; Adobe Flash Vulnerabilities; WikiLeaks' Afghan War Diary Release; Facebook Reaches 500 Million Users; Launch of Google+; Osama bin Laden Killed; Steve Jobs Resigns as Apple CEO; Launch of Windows 8; Facebook IPO; Gangnam Style Goes Viral; Adobe Creative Cloud Launch; First Release of Slack; Bitcoin Price Surge; Alibaba IPO; Launch of Windows 10; Launch of the Apple Watch; Volkswagen Emissions Scandal; Paris Climate Agreement; Ebola Outbreak in West Africa Declared Over; Yahoo Data Breach; Brexit Referendum; US Presidential Election 2016; Samsung Galaxy Note 7 Recall; Bitcoin Reaches $19,783; iPhone X Release; Facebook Data Breach; Microsoft Acquires GitHub; Google AI Duplex Demonstration; Blockchain Technology Gains Momentum; Yellow Vests Protests in France; Notre Dame Cathedral Fire; Amazon Rainforest Fires; Hong Kong Protests; Global Climate Strikes; Boeing 737 MAX Grounding; Chilean Protests; Google Stadia Launch; Lebanon Protests; Facebook Cryptocurrency Announcement; Apple Card Launch; Black Lives Matter Movement; Sandy Hook Elementary School Shooting; Flint Water Crisis; Greta Thunberg Begins Climate Activism.

### `event-2020.json` - 5

Zoom Security Issues; Twitter Bitcoin Scam; Black Lives Matter Protests; Australia Bushfires; Brexit: UK Leaves EU.

### `event-2021.json` - 6

Launch of Windows 11; Facebook Outage; Google AI LaMDA Announcement; Tesla Autopilot Investigation; Apple's App Store Legal Battle; Clubhouse App Popularity Surge.

### `event-2022.json` - 7

Microsoft Launches Windows 11 Update; Massive Facebook Data Leak; Apple Introduces M2 Chip; Amazon Completes Acquisition of MGM; Uber Data Breach; Google AI Language Model Release; SpaceX Starship Orbital Test Flight.

### `event-2023.json` - 18

Meta Layoffs; Microsoft Activision Blizzard Acquisition; Tesla Full Self-Driving Beta Release; AI Ethics and Accountability Conference 2023; International Cybersecurity Summit 2023; Quantum Computing Symposium 2023; Google AI Research Summit 2023; International Blockchain Forum 2023; Mars Exploration Conference 2023; SolarWinds Hack Fallout; Microsoft Exchange Server Vulnerability Exploit; T-Mobile Data Breach; Log4j Vulnerability Exploit; Twitter Data Breach; Google Cloud Outage; DarkSide Ransomware Group Arrests; Medibank Data Breach; APT Group Targets Critical Infrastructure.

### `event-2024.json` - 16

Apple Announces iPhone 16; Meta Unveils New VR Headset; AWS re:Invent 2024; DEF CON 32; Linux Kernel Summit 2024; Python Conference (PyCon) 2024; Bitcoin Conference 2024; MedTech Summit 2024; International Robotics Expo 2024; International Conference on Computer Science 2024; Future Electronics Expo 2024; Artificial Intelligence and Ethics Symposium 2024; Cybersecurity Awareness Month 2024; Future of Work Conference 2024; Quantum Computing Forum 2024; Next-Gen Electronics Conference 2024.

### `event-ww1-ww2-cold-war.json` - 3

Battle of the Somme; Death of Joseph Stalin; Assassination of John F. Kennedy.

## Working Notes

- `event-nasa-space.json` and `event-ww1-ww2-cold-war.json` contain many valid events, but they also contain a lot of duplication against `event-1900-1999.json` and the already-migrated Markdown entries.
- `event-2023.json` and `event-2024.json` contain a large amount of low-value conference and filler material that should not drive the next migration batches.
- Several 2022-2024 records are either date-imprecise, weakly framed, or factually suspect in their current JSON wording and should only be revived if we re-source them properly from scratch.
- The strongest next migration path is still:
  - NASA and space exploration milestones
  - cyber and infrastructure milestones
  - major Cold War and twentieth-century geopolitical turning points
  - a selective subset of foundational ancient or pre-modern milestones
