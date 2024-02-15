---
categories:
    - AWS
    - Linux
    - Security
tags:
    - aws
    - linux
    - security
---

AWS VPC flowlogs CloudWatch logs CloudTrail logs and filters examples

Official Documentations - <https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html>

---

## Basic sample VPC-flow-logs

`[version, account, eni, source, destination, srcport, destport="8000", protocol, packets, bytes, windowstart, windowend, action, flowlogstatus]`

---

## VPC flow logs example with combination of AND

`[version, account, eni, source="185.2*", destination, (srcport!="80" && srcport!="443"), (destport!="80" && destport!="443"), protocol, packets, bytes, windowstart, windowend, action, flowlogstatus]`

---

## Basic Expressions Operators

`=`     -- EQUAL

`!=`    -- NOT EQUAL

`<`     -- SMALL THAN

`>`     -- GRATER THEN

`<=`    -- SMALL OR EQUAL

`>=`    -- GRATER OR EQUAL

`&&`    -- AND

`||`    -- OR

---

## Cloud Trail Logs Filter examples

- filter by Failure Console Logins  'ConsoleLogin="Failure"'

`{ $.eventSource = "signin.amazonaws.com" && $.responseElements.ConsoleLogin = "Failure" }`

- exclude know IP address

`{ ($.sourceIPAddress != "52.123.123.5") && ($.sourceIPAddress != "33.123.123.*") && ($.sourceIPAddress != "*.amazonaws.com") }`

- AWS login without using MFA

`{ $.eventSource="signin.amazonaws.com" && $.additionalEventData.MFAUsed="No" }`

---

Happy learning

[Antonio Feijao UK](https://www.antoniofeijao.com/)
