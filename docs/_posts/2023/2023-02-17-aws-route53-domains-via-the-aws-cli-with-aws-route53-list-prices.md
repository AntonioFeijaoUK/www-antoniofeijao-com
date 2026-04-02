---
date: 2023-02-17
title: "AWS Route53 Domains via the AWS CLI with aws route53 list-prices"
#layout: splash
excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["AWS", "Domains", "Route53"]
tags:       ["aws-cli", "route53", "linux", "bash", "script"]
---

AWS Route53 Domains via the AWS CLI with `aws route53 list-prices`

`ReadOnly` role is enough to run these commands.

## getting-the-results-aws-route53domains-list-prices

I redirected the API results into a local text file so I can work with the file much quicker locally.

the `--region=us-east-1` is only needed if your default region is not `us-east-1`.

```bash
aws route53domains list-prices --region=us-east-1 > 2023-02-17-prices-as-of-this-date.txt
```

## result-from-query-for-aws-route53-list-prices

Initially I was getting `Null` results for some query `RegistrationPrice`,  
so I check for diference between the jquery values and realised that not all domains have the `RegistrationPrice` value.

So I went with the output from `RenewalPrice` as that seemed to match the value on the [AWS console](https://us-east-1.console.aws.amazon.com/route53/home?region=us-east-1#DomainRegistration:).

See if you can spot the differnce on the outputs below :)

```bash
cat 2023-02-17-prices-as-of-this-date.txt | jq -r '.Prices[]' | egrep "RegistrationPrice|TransferPrice|RenewalPrice|ChangeOwnershipPrice|RestorationPrice" | cut -f 2 -d '"' | sort | uniq -c | sort -n
 302 RegistrationPrice
 302 TransferPrice
 315 RestorationPrice
 316 ChangeOwnershipPrice
 316 RenewalPrice
```

## aws-domains-price-from-cheapest-to-the-most-expective

```bash

aws route53domains list-prices --region=us-east-1 | jq -r '.Prices[] | "\(.RenewalPrice.Price) USD;\t .\(.Name)  "' | sort | uniq | sort -n

3 USD;	 .click
5 USD;	 .link
8 USD;	 .me.uk
9 USD;	 .be
9 USD;	 .co.uk
9 USD;	 .de
9 USD;	 .name
9 USD;	 .org.uk
9 USD;	 .uk
10 USD;	 .cz
10 USD;	 .es
10 USD;	 .nl
10 USD;	 .pictures
11 USD;	 .net
12 USD;	 .academy
12 USD;	 .boutique
12 USD;	 .cc
12 USD;	 .consulting
12 USD;	 .fr
12 USD;	 .futbol
12 USD;	 .life
12 USD;	 .live
12 USD;	 .media
12 USD;	 .news
12 USD;	 .org
12 USD;	 .rocks
12 USD;	 .services
12 USD;	 .social
12 USD;	 .solutions
12 USD;	 .studio
12 USD;	 .world
13 USD;	 .audio
13 USD;	 .ca
13 USD;	 .ch
13 USD;	 .co.za
13 USD;	 .com
13 USD;	 .eu
13 USD;	 .juegos
13 USD;	 .xyz
15 USD;	 .au
15 USD;	 .com.au
15 USD;	 .in
15 USD;	 .it
15 USD;	 .net.au
15 USD;	 .onl
15 USD;	 .qpon
15 USD;	 .uno
15 USD;	 .us
15 USD;	 .website
16 USD;	 .club
16 USD;	 .help
16 USD;	 .lol
16 USD;	 .photo
16 USD;	 .pics
17 USD;	 .rip
18 USD;	 .business
18 USD;	 .company
18 USD;	 .ninja
19 USD;	 .agency
19 USD;	 .biz
19 USD;	 .city
19 USD;	 .diet
19 USD;	 .exposed
19 USD;	 .football
19 USD;	 .gifts
19 USD;	 .gratis
19 USD;	 .im
19 USD;	 .network
19 USD;	 .reisen
19 USD;	 .report
19 USD;	 .schule
19 USD;	 .supplies
19 USD;	 .supply
20 USD;	 .fyi
20 USD;	 .gift
20 USD;	 .run
20 USD;	 .soccer
21 USD;	 .center
21 USD;	 .directory
21 USD;	 .education
21 USD;	 .equipment
21 USD;	 .gallery
21 USD;	 .graphics
21 USD;	 .institute
21 USD;	 .international
21 USD;	 .lighting
21 USD;	 .management
21 USD;	 .photography
21 USD;	 .photos
21 USD;	 .support
21 USD;	 .systems
21 USD;	 .technology
21 USD;	 .tips
21 USD;	 .today
22 USD;	 .band
22 USD;	 .blue
22 USD;	 .dance
22 USD;	 .kim
22 USD;	 .moda
22 USD;	 .pink
22 USD;	 .pub
22 USD;	 .red
22 USD;	 .reviews
22 USD;	 .shiksha
22 USD;	 .video
23 USD;	 .info
23 USD;	 .se
24 USD;	 .co.nz
24 USD;	 .fi
24 USD;	 .net.nz
24 USD;	 .org.nz
25 USD;	 .cloud
25 USD;	 .co
25 USD;	 .email
25 USD;	 .flowers
25 USD;	 .guru
25 USD;	 .me
25 USD;	 .online
25 USD;	 .pro
27 USD;	 .training
28 USD;	 .wedding
29 USD;	 .associates
29 USD;	 .auction
29 USD;	 .cards
29 USD;	 .care
29 USD;	 .cash
29 USD;	 .catering
29 USD;	 .chat
29 USD;	 .church
29 USD;	 .community
29 USD;	 .deals
29 USD;	 .digital
29 USD;	 .direct
29 USD;	 .discount
29 USD;	 .exchange
29 USD;	 .fail
29 USD;	 .fish
29 USD;	 .fitness
29 USD;	 .forsale
29 USD;	 .gripe
29 USD;	 .guide
29 USD;	 .haus
29 USD;	 .hosting
29 USD;	 .immo
29 USD;	 .industries
29 USD;	 .ink
29 USD;	 .limited
29 USD;	 .money
29 USD;	 .parts
29 USD;	 .place
29 USD;	 .property
29 USD;	 .republican
29 USD;	 .sale
29 USD;	 .sarl
29 USD;	 .school
29 USD;	 .style
29 USD;	 .tools
29 USD;	 .town
29 USD;	 .trade
29 USD;	 .vision
29 USD;	 .wtf
30 USD;	 .bargains
30 USD;	 .cheap
30 USD;	 .cool
30 USD;	 .democrat
30 USD;	 .events
30 USD;	 .foundation
30 USD;	 .guitars
30 USD;	 .immobilien
30 USD;	 .kaufen
30 USD;	 .mobi
30 USD;	 .productions
30 USD;	 .properties
30 USD;	 .rentals
30 USD;	 .ruhr
30 USD;	 .singles
30 USD;	 .wiki
30 USD;	 .works
31 USD;	 .cafe
31 USD;	 .express
31 USD;	 .loan
31 USD;	 .mba
31 USD;	 .plus
31 USD;	 .show
31 USD;	 .team
32 USD;	 .bike
32 USD;	 .builders
32 USD;	 .cab
32 USD;	 .clothing
32 USD;	 .coffee
32 USD;	 .computer
32 USD;	 .construction
32 USD;	 .contractors
32 USD;	 .domains
32 USD;	 .enterprises
32 USD;	 .estate
32 USD;	 .farm
32 USD;	 .florist
32 USD;	 .house
32 USD;	 .kiwi
32 USD;	 .land
32 USD;	 .marketing
32 USD;	 .repair
32 USD;	 .tv
32 USD;	 .zone
33 USD;	 .vc
34 USD;	 .com.mx
35 USD;	 .careers
35 USD;	 .codes
35 USD;	 .diamonds
35 USD;	 .holdings
35 USD;	 .holiday
35 USD;	 .recipes
35 USD;	 .vacations
35 USD;	 .vg
36 USD;	 .irish
36 USD;	 .ru
37 USD;	 .buzz
37 USD;	 .watch
39 USD;	 .sexy
43 USD;	 .mortgage
46 USD;	 .camera
46 USD;	 .camp
46 USD;	 .cleaning
46 USD;	 .dog
46 USD;	 .glass
46 USD;	 .kitchen
46 USD;	 .plumbing
46 USD;	 .shoes
46 USD;	 .solar
46 USD;	 .toys
47 USD;	 .apartments
47 USD;	 .bingo
47 USD;	 .capital
47 USD;	 .claims
47 USD;	 .clinic
47 USD;	 .coach
47 USD;	 .com.sg
47 USD;	 .delivery
47 USD;	 .dental
47 USD;	 .engineering
47 USD;	 .finance
47 USD;	 .financial
47 USD;	 .fund
47 USD;	 .furniture
47 USD;	 .healthcare
47 USD;	 .insure
47 USD;	 .lease
47 USD;	 .legal
47 USD;	 .memorial
47 USD;	 .pizza
47 USD;	 .restaurant
47 USD;	 .sg
47 USD;	 .surgery
47 USD;	 .tattoo
47 USD;	 .tax
47 USD;	 .tennis
47 USD;	 .university
47 USD;	 .ventures
47 USD;	 .villas
49 USD;	 .condos
49 USD;	 .cruises
49 USD;	 .dating
49 USD;	 .expert
49 USD;	 .flights
49 USD;	 .maison
49 USD;	 .partners
49 USD;	 .viajes
50 USD;	 .limo
50 USD;	 .tienda
50 USD;	 .voyage
50 USD;	 .wien
51 USD;	 .coupons
51 USD;	 .golf
51 USD;	 .hockey
51 USD;	 .jewelry
51 USD;	 .taxi
51 USD;	 .theater
51 USD;	 .tours
55 USD;	 .lgbt
57 USD;	 .mx
57 USD;	 .vegas
58 USD;	 .com.br
64 USD;	 .qa
65 USD;	 .host
66 USD;	 .berlin
66 USD;	 .black
66 USD;	 .poker
69 USD;	 .college
71 USD;	 .global
71 USD;	 .green
71 USD;	 .io
74 USD;	 .ceo
75 USD;	 .gg
76 USD;	 .ac
76 USD;	 .com.ar
76 USD;	 .sh
90 USD;	 .jp
92 USD;	 .fm
93 USD;	 .cl
94 USD;	 .accountants
94 USD;	 .credit
94 USD;	 .energy
94 USD;	 .investments
94 USD;	 .loans
94 USD;	 .tires
100 USD;	 .adult
100 USD;	 .porn
100 USD;	 .sex
101 USD;	 .gold
101 USD;	 .reise
141 USD;	 .casino
141 USD;	 .creditcard
254 USD;	 .hiv
282 USD;	 .sucks
306 USD;	 .movie
```

Of course, you can manipulate the list above and sort it in alphabetic order if you wish.

## aws-route53domains-help

There is a lot more you can do with this API :)

Imagination is the limit.

Type `aws route53domains help` to get the help on the CLI

or go to the documentation page <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/route53domains/list-domains.html>


## antonio-feijao-uk

Thank you, and happy learning.

[Antonio Feijao UK](https://www.antoniofeijao.com)
