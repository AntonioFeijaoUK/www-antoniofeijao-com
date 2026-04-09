---
title: "Bitcoin Basics and Advanced Node Operations"
date: 2025-03-01
description: "Introductory Bitcoin learning notes."
---



This document provides an overview of Bitcoin’s fundamentals, cryptographic underpinnings, running your own full node, configuring Bitcoin Core (including the `bitcoin.conf` file), transaction signing (including offline signing), and an explanation of tokens and multi-currency concepts on Bitcoin.

Each section includes links to reliable sources for further reading.

---

## 1. Bitcoin Fundamentals

### 1.1. Decentralized Digital Currency

- **Blockchain & Decentralization:**  
  Bitcoin operates on a distributed ledger (blockchain) where each block contains a list of transactions. Every node in the network verifies these transactions independently.
  
- **Peer-to-Peer (P2P) Network:**  
  Nodes communicate directly (typically over TCP, using port 8333 for mainnet) to propagate transactions and blocks.  
  *For more details, see [Bitcoin.org – How Bitcoin Works](https://bitcoin.org/en/how-it-works).*

### 1.2. Asymmetric Cryptography in Bitcoin

- **Private and Public Keys:**  
  - A **private key** is a large random number kept secret—similar to an SSH private key.
  - A **public key** is derived from the private key using elliptic curve multiplication (specifically the secp256k1 curve).
  - A **Bitcoin address** is produced by hashing the public key (using SHA-256 followed by RIPEMD-160), then encoding it in Base58Check.

- **Digital Signatures:**  
  Transactions are signed using the private key; the signature is verified with the public key, ensuring authenticity and integrity.  
  *Learn more at [Bitcoin.org – Cryptography](https://bitcoin.org/en/developer-guide#cryptography).*

---

## 2. Creating Your Own Bitcoin Address

### 2.1. Key Generation Process

- **Concept:**  
  Similar to creating an SSH key pair, you generate a random private key, derive the corresponding public key, and then generate a Bitcoin address.

### 2.2. Example Code (Python)

```python
import os, hashlib, ecdsa, base58

# Generate a random 32-byte private key
private_key = os.urandom(32)

# Generate the signing key using secp256k1 curve
sk = ecdsa.SigningKey.from_string(private_key, curve=ecdsa.SECP256k1)
vk = sk.get_verifying_key()
public_key = b'\x04' + vk.to_string()  # Uncompressed public key format

# Generate Bitcoin address
sha256_bpk = hashlib.sha256(public_key).digest()
ripemd160_bpk = hashlib.new('ripemd160', sha256_bpk).digest()
network_byte = b'\x00' + ripemd160_bpk  # 0x00 is the version byte for mainnet
checksum = hashlib.sha256(hashlib.sha256(network_byte).digest()).digest()[:4]
binary_address = network_byte + checksum
address = base58.b58encode(binary_address)
print("Bitcoin Address:", address.decode())
```
*This script demonstrates key generation and address creation. Use it as a basis for developing your own non-custodial wallet.*

---

## 3. Running Your Own Bitcoin Full Node

### 3.1. What Is a Full Node?

- **Definition:**  
  A full node downloads and verifies the entire Bitcoin blockchain, enforcing all consensus rules.

- **Benefits:**
  - **Autonomy:** Independent verification of transactions and blocks.
  - **Privacy & Security:** No reliance on third-party services to query transaction data.
  - **Network Health:** Contributes to the decentralization and resilience of the network.

### 3.2. Setting Up Bitcoin Core on Linux

#### Hardware & Environment Considerations

- **Requirements:**  
  - Adequate disk space (the blockchain is hundreds of gigabytes; consider a pruned node if necessary).
  - A stable internet connection.
  - A secure and hardened Linux system.

#### Installation Steps

1. **Download & Verify Bitcoin Core:**  
   Get the latest release from the [Bitcoin Core official website](https://bitcoincore.org/en/download/). Verify the signature for authenticity.

2. **Install Bitcoin Core:**  

   ```bash
   sudo apt-get update
   sudo apt-get install bitcoin-core
   ```
3. **Configure Your Node:**  

   Create or edit `~/.bitcoin/bitcoin.conf` (see next section for details).

4. **Start the Node:**  

   ```bash
   bitcoind -daemon
   ```
   Verify synchronization:
   ```bash
   bitcoin-cli getblockchaininfo
   ```

*More details available in the [Bitcoin Core Documentation](https://bitcoincore.org/en/doc/).*

---

## 4. Configuring bitcoin.conf

### 4.1. Essential Configuration Options

```
server=1
daemon=1
txindex=1
rpcuser=yourusername
rpcpassword=yoursecurepassword
rpcallowip=127.0.0.1
rpcport=8332
```

- **`rpcuser` and `rpcpassword`**: Used for authentication when querying your node via `bitcoin-cli` or external applications.
- **`txindex=1`**: Enables full transaction indexing, allowing faster queries.

*For more, refer to the [Bitcoin Core Configuration Documentation](https://bitcoincore.org/en/doc/).*

---

## 5. Creating and Signing Transactions

### 5.1. Offline Signing Workflow

1. **Create a Raw Transaction (Online):**

   ```bash
   bitcoin-cli createrawtransaction '[{"txid":"<UTXO_txid>", "vout":<index>}]' '{"<destination_address>":amount}'
   ```

2. **Sign the Transaction (Offline):**

   ```bash
   bitcoin-cli signrawtransactionwithkey <unsigned_tx_hex> '["<your_private_key>"]'
   ```

3. **Broadcast the Signed Transaction (Online):**

   ```bash
   bitcoin-cli sendrawtransaction <signed_tx_hex>
   ```

---

## 6. Understanding Tokens and Multi-Currency Concepts

### 6.1. Bitcoin’s Native Model

- **Single Asset (BTC):**  
  Bitcoin addresses natively hold BTC represented as UTXOs. The blockchain itself does not differentiate between multiple tokens or currencies.

### 6.2. Tokens via Additional Protocols

- **Colored Coins & Omni Layer:**  
  Protocols like Colored Coins and Omni Layer allow extra data (metadata) to be embedded in Bitcoin transactions, “coloring” some satoshis to represent other assets.  
  *More details: [Omni Layer Specification](https://github.com/OmniLayer/spec).*

### 6.3. Multi-Token Blockchains

- **Ethereum Example:**  
  Blockchains with smart contracts (e.g., Ethereum) natively support multiple tokens (ERC-20, ERC-721, etc.) on a single address.  
  In these ecosystems, the address’s balance for various tokens is tracked by smart contracts rather than the blockchain protocol itself.

*For more insight, check out the [Ethereum Whitepaper](https://ethereum.org/en/whitepaper/).*

---

## 7. Additional Resources

- [Bitcoin.org – How Bitcoin Works](https://bitcoin.org/en/how-it-works)
- [Bitcoin Developer Guide](https://bitcoin.org/en/developer-guide)
- [Bitcoin Core Documentation](https://bitcoincore.org/en/doc/)
- [Omni Layer GitHub Repository](https://github.com/OmniLayer/spec)
- [Ethereum Whitepaper](https://ethereum.org/en/whitepaper/)

---

## Conclusion

By leveraging your expertise in cybersecurity, Linux, and networking, you can confidently manage Bitcoin’s cryptographic model—from generating your own private key and Bitcoin address to running a full node and securely signing transactions offline. Understanding the `bitcoin.conf` file and RPC configuration further empowers you to operate a self-reliant, secure Bitcoin environment. Additionally, knowing how Bitcoin handles tokens through external protocols or comparing it with multi-token platforms like Ethereum provides valuable context for exploring broader blockchain applications.

Refer to the linked sources for deeper dives into each topic, and reach out with any further questions.

---

Happy learning,
[Antonio Feijao UK](https://www.antoniofeijao.com/)
