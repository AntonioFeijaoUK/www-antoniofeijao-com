---
title: "Raspberry Pi 4 testing USB Wireless"

date: 2021-08-21
last_modified_at: 2021-08-21

categories:
    - Linux
    - Raspberry-Pi
    - Wifi
tags:
    - linux
    - raspberry-pi
    - wifi
---

Raspberry Pi 4 USB Wireless dongles that work out-of-the-box

Tested on Raspberry Pi 4 with Linux version 5.10.59-v7l+

```bash

dmesg | grep "Machine model"
[    0.000000] OF: fdt: Machine model: Raspberry Pi 4 Model B Rev 1.1


cat /proc/version
Linux version 5.10.59-v7l+ (dom@buildbot) (arm-linux-gnueabihf-gcc-8 (Ubuntu/Linaro 8.4.0-3ubuntu1) 8.4.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #1447 SMP Thu Aug 19 12:25:41 BST 2021

```


## Hercules USB dongle - DID worked out-of-the-box




```bash

usb 1-1.3: new high-speed USB device number 3 using xhci_hcd
usb 1-1.3: New USB device found, idVendor=06f8, idProduct=e033, bcdDevice= 2.00
usb 1-1.3: New USB device strings: Mfr=1, Product=2, SerialNumber=3
usb 1-1.3: Product: 802.11n WLAN Adapter
usb 1-1.3: Manufacturer: Realtek
usb 1-1.3: SerialNumber: 00e04c000001
rtl8192cu: Chip version 0x10
rtl8192cu: Board Type 0
rtl_usb: rx_max_size 15360, rx_urb_num 8, in_ep 1
rtl8192cu: Loading firmware rtlwifi/rtl8192cufw_TMSC.bin
ieee80211 phy1: Selected rate control algorithm 'rtl_rc'
usbcore: registered new interface driver rtl8192cu
rtl8192cu: MAC auto ON okay!
rtl8192cu: Tx queue select: 0x05



lsusb  | grep Realtek
Bus 001 Device 003: ID 06f8:e033 Guillemot Corp. Hercules HWNUp-150 802.11n Wireless N Pico [Realtek RTL8188CUS]


lsusb -t

/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/1p, 480M
    |__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/4p, 480M
        |__ Port 3: Dev 3, If 0, Class=Vendor Specific Class, Driver=rtl8192cu, 480M


iwconfig wlan1
wlan1     IEEE 802.11  ESSID:off/any
          Mode:Managed  Access Point: Not-Associated   Tx-Power=20 dBm
          Retry short limit:7   RTS thr=2347 B   Fragment thr:off
          Encryption key:off
          Power Management:off
          
```


## TP Link - did NOT work out-of-the-box 

```bash

usb 1-1.2: new high-speed USB device number 4 using xhci_hcd
usb 1-1.2: New USB device found, idVendor=2357, idProduct=012d, bcdDevice= 2.10
usb 1-1.2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
usb 1-1.2: Product: 802.11ac NIC
usb 1-1.2: Manufacturer: Realtek
usb 1-1.2: SerialNumber: 123456


lsusb | grep TP
Bus 001 Device 004: ID 2357:012d TP-Link

lsusb -t

 Port 2: Dev 4, If 0, Class=Vendor Specific Class, Driver=, 480M


iwconfig
# show no new interface as it does not have drivers for it...

```

## Wifi AC - did NOT work out-of-the-box


```bash

usb 1-1.1: USB disconnect, device number 5
usb 1-1.3: new high-speed USB device number 6 using xhci_hcd
usb 1-1.3: New USB device found, idVendor=0bda, idProduct=c811, bcdDevice= 2.00
usb 1-1.3: New USB device strings: Mfr=1, Product=2, SerialNumber=3
usb 1-1.3: Product: 802.11ac NIC
usb 1-1.3: Manufacturer: Realtek
usb 1-1.3: SerialNumber: 123456


lsusb
Bus 001 Device 006: ID 0bda:c811 Realtek Semiconductor Corp.

lsusb -t
 Port 3: Dev 6, If 0, Class=Vendor Specific Class, Driver=, 480M
 
 iwconfig
# show no new interface as it does not have drivers for it...

```


testing drivers - <https://github.com/cilynx/rtl88x2bu>

or follow these instructions <https://thepihut.com/blogs/raspberry-pi-tutorials/how-to-setup-a-rtl881cu-usb-wifi-adapter-with-the-raspberry-pi-4>

this didn't work for me...

```bash

sudo apt install git bc dkms

mkdir usb-wifi-drivers

cd usb-wifi-drivers

git clone https://github.com/whitebatman2/rtl8821CU

cd rtl8821CU


## edit Makefil and update/change for your Raspberry Pi

vim Makefile

look for section 

###################### Platform Related #######################

## update for your "Platform", example below for Raspberry Pi 4

CONFIG_PLATFORM_I386_PC = n
CONFIG_PLATFORM_ARM_RPI = y
CONFIG_PLATFORM_ARM_RPI3 = n
```

---

Happy learning

[Antonio Feijao UK](https://antonio.cloud)
