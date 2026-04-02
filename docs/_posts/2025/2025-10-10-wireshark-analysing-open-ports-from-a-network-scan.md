---
date: 2025-10-10
last_modified_at: 2025-10-10

title: "Analysing Open Ports from a Network Scan using Wireshark"

#layout: splash
excerpt_separator: <!-- more -->
#permalink: /plugins/

categories:
  - wireshark
  - networking
tags:
  - wireshark
  - nmap
  - networking
---

# **Analysing Open Ports from a Network Scan using Wireshark**

## **Introduction**

When investigating a network scan or penetration test, identifying which ports were detected as open is one of the most valuable insights a `.pcap` file can reveal.  
This guide demonstrates how to filter, interpret, and extract open ports from a capture involving two hosts, for example:

- **Source:** `192.168.1.18` (the scanning host)  
- **Destination:** `192.168.1.25` (the target host)

---

## **Understanding the Scan Type**

Different scan techniques produce different network signatures.

The way open ports are confirmed depends on the **transport protocol** and **scan method** used:
<!-- more -->

| Scan Type | Protocol | Typical Open-Port Response |
|------------|-----------|----------------------------|
| TCP SYN Scan | TCP | Target replies with `SYN/ACK` |
| TCP Connect Scan | TCP | Full 3-way handshake (SYN → SYN/ACK → ACK) |
| UDP Scan | UDP | No response (open) or ICMP Port Unreachable (closed) |

---

## **Filtering Open TCP Ports**

For TCP-based scans, focus on responses from the **target** (`192.168.1.25`) that indicate an open port.  
A TCP packet with both the **SYN** and **ACK** flags set means the port is open.

### **Wireshark Display Filter**

```wireshark
ip.src == 192.168.1.25 && tcp.flags.syn == 1 && tcp.flags.ack == 1
```

Each packet matching this filter represents an **open TCP port**.  
The `tcp.srcport` field identifies which port is open on the target.

---

## **Full TCP Connect Scan Detection**

If the scan performed full connection attempts (e.g., Nmap with `-sT`), you can confirm open ports by identifying completed 3-way handshakes.

### **Filter for SYN/ACK responses**

```wireshark
ip.src == 192.168.1.25 && tcp.flags.syn == 1 && tcp.flags.ack == 1
```

### **Filter for completed handshakes**

```wireshark
ip.src == 192.168.1.18 && tcp.flags.ack == 1 && tcp.flags.syn == 0 && tcp.flags.fin == 0 && tcp.flags.rst == 0
```

Together, these indicate successful TCP connections to open ports.

---

## **Filtering UDP Scan Results**

UDP scanning is less straightforward because open UDP ports often **do not reply**.  
Closed UDP ports, however, usually respond with an **ICMP Port Unreachable** message.

### **Wireshark Filter for Closed UDP Ports**

```wireshark
ip.src == 192.168.1.25 && icmp.type == 3 && icmp.code == 3
```

If a UDP packet is sent from the scanner and **no ICMP response** follows, that port is either **open or filtered**.

---

## **Extracting Open Ports via Tshark**

If you wish to process the `.pcap` from the command line and list all open TCP ports quickly, use:

```bash
tshark -r scan.pcap \
-Y "ip.src==192.168.1.25 && tcp.flags.syn==1 && tcp.flags.ack==1" \
-T fields -e tcp.srcport | sort -n | uniq
```

This command:

- Reads the pcap file `scan.pcap`
- Filters for `SYN/ACK` packets from the target (open port indicator)
- Outputs the source ports (open ports)
- Sorts and deduplicates them

---

## **Visual Analysis in Wireshark**

For a graphical overview:

1. Open **Statistics → Conversations → TCP**.  
2. Sort by the **Address B** column (the target host).  
3. Look for connections where the **State** shows multiple packets exchanged (SYN, SYN/ACK, ACK).  

Alternatively, use **Statistics → Endpoints → TCP** to summarise all TCP ports and connections.

---

## **TL;DR**

| Scenario | Filter | Meaning |
|-----------|---------|----------|
| TCP SYN scan | `ip.src==192.168.1.25 && tcp.flags.syn==1 && tcp.flags.ack==1` | Target port open |
| TCP Connect scan | `ip.src==192.168.1.18 && tcp.flags.ack==1 && tcp.flags.syn==0 && tcp.flags.fin==0 && tcp.flags.rst==0` | Full connection established |
| UDP scan | `ip.src==192.168.1.25 && icmp.type==3 && icmp.code==3` | Closed UDP port (absence implies open/filtered) |
| Extract open ports | `tshark -r scan.pcap -Y "...SYN/ACK..." -T fields -e tcp.srcport | sort -n | uniq` | List of open ports |

---

## **Conclusion**

By combining Wireshark display filters and `tshark` automation, it becomes straightforward to distinguish open, closed, and filtered ports from captured network scans.  
These techniques are essential for forensic analysts and penetration testers validating scan results or investigating lateral movement attempts.

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
