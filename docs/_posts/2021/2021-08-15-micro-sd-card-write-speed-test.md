---
title: "Micro-SD cards write speed test"

date: 2021-08-15
last_modified_at: 2021-08-15

categories:
    - Linux
    - Raspberry-Pi
tags:
    - linux
    - raspberry-pi
    - ssh
    - dd
    - micro-sd
---

While copy the Raspberry Pi image into a couple of micro-sd cards using the method "setting up a headless raspberry pi" (link below),

source <https://www.raspberrypi.org/documentation/computers/configuration.html#setting-up-a-headless-raspberry-pi>

I noticed the different speeds writes betweek micro-sd cards, therefore, create this post to list their writing speed.

---

`diskutil list`

`diskutil unmountDisk /dev/disk4`

----

`sudo dd bs=1m if=2021-05-07-raspios-buster-armhf-lite.img of=/dev/rdisk4 ; sync`

----

```bash
touch /Volumes/boot/ssh

touch /Volumes/boot/wpa_supplicant.conf

#vim /Volumes/boot/wpa_supplicant.conf

cat <<EOF > /Volumes/boot/wpa_supplicant.conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=GB

network={
        scan_ssid=1
        ssid="MY_WIFI_NAME"
        psk="MY_WIFI_PASSWORD"
        proto=RSN
        key_mgmt=WPA-PSK
        pairwise=CCMP
        auth_alg=OPEN
}

EOF
```

`cat /Volumes/boot/wpa_supplicant.conf`

`diskutil list`

`sudo diskutil eject /dev/rdisk4`


### micro-sd card write speed results

sd-card - Sandisk Extreme 32 GB, V30, [3] A1  
1874853888 bytes transferred in 26.577356 secs (70543281 bytes/sec) - 70.54 MB/sec  

sd-card - Lexar 1000x, 32 GB [3]  
1874853888 bytes transferred in 40.834400 secs (45913590 bytes/sec) - 45.91 MB/sec  

sd-card - Lexar 633x, 32 GB [1]  
1874853888 bytes transferred in 105.653969 secs (17745229 bytes/sec) - 17.74 MB/sec  


sd-card - ScanDisk Ultra, 16 GB, A1 (10)  
1874853888 bytes transferred in 138.986259 secs (13489491 bytes/sec) - 13.48 MB/sec  

sd-card - Sandisk Ultra, 64 GB, (10)  
1874853888 bytes transferred in 258.922797 secs (7240976 bytes/sec) - 7.24 MB/sec  



---

Happy learning

[Antonio Feijao UK](https://antonio.cloud)

