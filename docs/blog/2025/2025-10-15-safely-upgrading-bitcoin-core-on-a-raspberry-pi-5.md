---
date: 2025-10-15
last_modified_at: 2025-10-15

title: "Safely Upgrading Bitcoin Core on a Raspberry Pi 5 (v27.0 → v30.0)"

#layout: splash
excerpt_separator: <!-- more -->
#permalink: /plugins/

categories:
  - bitcoin
  - raspberry-pi
tags:
  - bitcoin
  - bitcoin-node
  - raspberry-pi
---

# Safely Upgrading Bitcoin Core on a Raspberry Pi (v27.0 → v30.0)

Maintaining a Bitcoin node is both a responsibility and a privilege.  
For security-conscious operators—particularly those running full nodes on Raspberry Pi—upgrading Bitcoin Core demands precision, verification, and adherence to cryptographic trust.  

This concise guide outlines the **safe, auditable procedure** for upgrading your Bitcoin Core node while ensuring full operational integrity.

---

## 🧩 Why Upgrading Matters

Each Bitcoin Core release introduces performance improvements, consensus safety refinements, and peer-to-peer network hardening.  
Skipping upgrades exposes nodes to known vulnerabilities, deprecated RPCs, or network divergence.  

The guiding principle: *verify everything, trust nothing implicitly.*
<!-- more -->

---

## ⚙️ Prerequisites

Before proceeding, ensure:
- You are running a **64-bit Raspberry Pi OS**.
- Your node is currently healthy (`bitcoin-cli getblockchaininfo` returns `"verificationprogress": >0.9999`).
- Adequate free space exists on the data partition.
- You have administrative privileges (`sudo`).

Optional but recommended:
- External SSD storage for the blockchain.
- GPG installed and synchronised with the public keyservers.

---

## 🔒 Step 1: Gracefully Stop the Node

Stop the daemon to preserve database consistency:

```bash
bitcoin-cli stop
```

Wait until the process fully terminates (`pgrep bitcoind` should return nothing).

---

## 📦 Step 2: Download the Official Release

Retrieve the latest **ARM64** binaries from the official Bitcoin Core website:

```bash
wget https://bitcoincore.org/bin/bitcoin-core-30.0/bitcoin-30.0-aarch64-linux-gnu.tar.gz
wget https://bitcoincore.org/bin/bitcoin-core-30.0/SHA256SUMS
wget https://bitcoincore.org/bin/bitcoin-core-30.0/SHA256SUMS.asc
```

Reference:  
[https://bitcoincore.org/en/download/](https://bitcoincore.org/en/download/)

---

## 🧾 Step 3: Verify Authenticity and Integrity

Import and refresh the developer signing keys:

```bash
git clone https://github.com/bitcoin-core/guix.sigs
gpg --import guix.sigs/builder-keys/*
gpg --keyserver hkps://keys.openpgp.org --refresh-keys
```

Then verify the release signatures:

```bash
gpg --verify SHA256SUMS.asc
sha256sum --ignore-missing --check SHA256SUMS
```

Only proceed if verification reports **“Good signature”** and matching checksums.

References:  
- [Bitcoin Core Linux verification instructions](https://bitcoincore.org/en/download/)  
- [Bitcoin Core Guix signatures repository](https://github.com/bitcoin-core/guix.sigs)

---

## 🧰 Step 4: Extract and Install

Extract the verified binaries:

```bash
tar -xvf bitcoin-30.0-aarch64-linux-gnu.tar.gz
```

Install securely into `/usr/local/bin`:

```bash
sudo install -m 0755 -o root -g root -t /usr/local/bin bitcoin-30.0/bin/*
```

This ensures correct ownership, permissions, and atomic replacement—preferred over a simple `cp`.

---

## 🚀 Step 5: Restart and Verify

Start the daemon:

```bash
bitcoind -daemon
```

Confirm the node version:

```bash
bitcoin-cli --version
```

Expected output:
```
Bitcoin Core version v30.0
```

---

## 🧠 Step 6: Validate Node Health

Use the following RPC checks to confirm stability and synchronisation:

```bash
bitcoin-cli getblockchaininfo
bitcoin-cli getpeerinfo | jq '. | length'
bitcoin-cli getnetworkinfo
bitcoin-cli uptime
bitcoin-cli getmempoolinfo
bitcoin-cli getblockcount
```

Key indicators of health:
- `"verificationprogress"` ≈ 1.0  
- Active peers ≥ 8  
- Increasing `getblockcount` values over time  
- No errors in `~/.bitcoin/debug.log`

---

## 🧾 Optional: Create a Health-Check Script

For convenience, create a script such as `/usr/local/bin/bitcoin-status.sh`:

```bash
#!/bin/bash
echo "Bitcoin Node Status - $(date)"
bitcoin-cli getblockchaininfo | jq '{blockcount: .blocks, sync: .verificationprogress}'
bitcoin-cli getnetworkinfo | jq '{version: .version, peers: .connections}'
bitcoin-cli uptime
```

Make it executable with `chmod +x`.

---

## 🛡️ Security Notes

- Never install from unofficial mirrors or Snap packages unless you verify maintainers’ trust chains.
- Always validate signatures—never trust checksums alone.
- Keep GPG keys refreshed to detect revoked or replaced keys.
- Avoid automatic upgrade scripts that skip cryptographic verification.

---

## 🧭 Conclusion

A Bitcoin node’s integrity rests on disciplined operational hygiene.  
By verifying signatures, ensuring correct permissions, and performing cryptographically sound upgrades, you contribute to the network’s resilience while maintaining personal sovereignty over your infrastructure.

In essence:  
**A secure node is a verified node.**

---

### References
- [Bitcoin Core Official Downloads](https://bitcoincore.org/en/download/)
- [Bitcoin Core Guix Signatures](https://github.com/bitcoin-core/guix.sigs)
- [Bitcoin Developer RPC Reference](https://developer.bitcoin.org/reference/rpc/index.html)
- [RaspiBolt: Bitcoin Client Guide](https://raspibolt.org/guide/bitcoin/bitcoin-client.html)

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
