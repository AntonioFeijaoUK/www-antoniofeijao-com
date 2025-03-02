---
date: 2024-11-14
last_modified_at: 2024-11-14

title: "Hashcat in AWS GPUs NVIDIA and password cracking, including performance benchmarks"

#layout: splash
excerpt_separator: <!--more-->
#permalink: /plugins/

categories:
  - aws
  - hashcat
  - gpu
tags:
  - aws
  - hashcat
  - gpu
---

Cracking Passwords with Hashcat - Performance Benchmarks and Security Implications
<!-- more -->
!!! Important
    DISCLAIMER - this is for educational porpuses only!
    You are responsable for your own actions.

!!! Alert
    GPUs instances can be expensive!
    Make sure you know and you can affort the cost of the instances you are selecting

---

## Introduction

**Hashcat** is a widely-used, high-performance tool for cracking password hashes.

Its versatility across various platforms, including local machines and cloud instances, highlights how quickly seemingly complex passwords can be broken.

This post delves into the practical applications of Hashcat, explores password security risks, and presents benchmark comparisons between Apple's M1 chip and AWS GPU instances.
<!-- more -->

---

## What is Hashcat?

- **Hashcat**: An advanced password recovery tool that uses various attack modes to crack password hashes.

- **Supported Hashes**: Works with multiple hash algorithms (e.g., MD5, SHA-1, bcrypt).

- **Common Use Cases**: 
  - Security assessments and penetration testing.
  - Auditing password strength in organisational environments.
  - Educating users on the risks of weak passwords.

---

## Attack Types in Hashcat

Hashcat supports multiple attack modes, making it highly flexible:

- **Brute-Force Attack** (`-a3`): Attempts every possible combination of characters.

- **Dictionary Attack** (`-a0`): Uses a precompiled list of potential passwords (wordlists).

- **Hybrid Attack** (`-a6` or `-a7`): Combines dictionary and brute-force techniques.

- **Mask Attack** (`-a3`): Tests custom patterns (e.g., uppercase letters, digits, special characters).

---

### Why Dictionary Words Should Be Avoided

- **Dictionary Attacks** are fast since they leverage common words, making passwords like "Password123!" easy to crack.

- Even slight variations of dictionary words are vulnerable. For example, "`P@ssw0rd!`" is broken in seconds using a hybrid attack.

- The combination of a dictionary with masks allows attackers to extend the search space efficiently, breaking passwords like "Autumn2023!" quickly.

---

## Cracking Passwords - Practical Example

In this section, I demonstrate how to use `Hashcat` to crack `MD5` hashes using a **brute force attack**, that includes lowercase letters, digits, and special characters.

### Command Used

```bash
hashcat -m0 hashes-file.txt -a3 -1'?l?d!$' '?1?1?1?1?1?1?1?1' --increment --increment-min 1
```

* `-m0` - Specifies MD5 hash mode.

* `-a3` - Uses a brute-force mask attack.

* `-1 '?l?d!$'` - Defines a custom character set (lowercase letters, digits, and special characters `!` and `$`).

* `'?1?1?1?1?1?1?1?1'` - Tests all combinations up to 8 characters.

---

## Benchmark Results: Apple M1 vs AWS GPU Instances

Here is a comparison of performance between an Apple M1 chip and AWS GPU instances.

### Apple M1 Results

```bash
Hash Mode: 0 (MD5)
Speed: ~1414.1 MH/s

## Time to crack: Less than 4 minutes for all combinations of 8 characters, including special characters.
```

### AWS Instances:

* Without CUDA drivers

```bash
Speed.#1.........:   173.7 MH/s (5.13ms) @ Accel:1024 Loops:128 Thr:1 Vec:8
```

* After installing CUDA drivers:

```bash
sudo apt install -y cuda-drivers
```

* GPU Performance (NVIDIA enabled):

```
Initial speed: ~7812.4 MH/s

Optimised speed: ~22261.4 MH/s
```

## Analysis

The AWS GPU instance, once properly configured with CUDA drivers, was over **15 times faster** than the Apple M1 chip.

This highlights the significant advantage of using dedicated GPUs for computationally intensive tasks like hash cracking.

Even at 7812.4 MH/s, an AWS GPU can crack weak passwords with special characters within minutes, stressing the risk of using non-complex passwords.

---

## Dictionary and Mask Attacks

Practical Advice

Dictionary Files - Leverage existing wordlists, such as rockyou.txt, for initial attacks.

```bash
hashcat -m0 -a0 hashes-without-md5 /path/to/wordlist.txt
```

## Mask Attack for Patterns

Use masks to target common password patterns, e.g., "Autumn2023!".

```bash
hashcat -m0 -a3 '?u?l?l?l?l?d?d?d!' --increment
```

Combining dictionary and mask attacks significantly reduces cracking time for passwords that follow predictable patterns.

---

## Security Implications

Password Complexity - These results demonstrate how even passwords with special characters can be broken quickly if they are not long enough.

Password Policy Recommendations - Use passwords of at least 16 characters.

Incorporate upper and lower case letters, numbers, and a variety of special characters.

Avoid using dictionary words or common phrases.

Implement multi-factor authentication (MFA) to reduce risks.

Best of the best - **use a trusted password manager with integrated PassKey**.
 
Best best best - Password Manager + hardward Passkey

---

## Conclusion

The benchmarks show that with tools like Hashcat, attackers can leverage cloud computing power to break passwords at an alarming speed.

Organisations must enforce strong password policies and leverage modern authentication methods to mitigate risks.

---

## Would You Like to Know More?

Feel free to reach out if you would like additional details on.

Optimising Hashcat performance.

Further cloud configurations for faster hash cracking.

Advanced attack strategies for red team assessments.

---

Useful sources that I used

* <https://hashcat.net/hashcat/>
* <https://docs.aws.amazon.com/dlami/latest/devguide/gpu.html>
* <https://security.stackexchange.com/questions/201931/hashcat-specify-number-of-characters>
* <https://github.com/initstring/passphrase-wordlist>
  
---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)

