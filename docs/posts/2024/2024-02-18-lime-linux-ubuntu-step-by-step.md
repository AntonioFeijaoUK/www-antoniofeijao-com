---
date: 2024-02-18
title:lime-linux-ubuntu-step-by-step.md
---

[LiME](https://github.com/504ensicsLabs/LiME/) on Ubuntu Linux, live memory capture.

sources and learning material:

* <https://github.com/504ensicsLabs/LiME/>

* <https://aws.amazon.com/solutions/implementations/automated-forensics-orchestrator-for-amazon-ec2/>
  * solution source code - <https://github.com/aws-solutions/automated-forensic-orchestrator-for-amazon-ec2>
  * specifically file - <https://github.com/aws-solutions/automated-forensic-orchestrator-for-amazon-ec2/blob/main/source/ssm-documents/linux_lime-memory-acquisition.json>

* <https://www.sans.org/tools/sift-workstation/>
 
---

## LiME step by step

My adaptation for manually testing [LiME](https://github.com/504ensicsLabs/LiME/) in a step-by-step method.

**USE AT YOUR RISK**

```bash
## check if LiME is installed

if [[ `lsmod|grep lime|wc -l` -gt 0 ]] ; then
	sudo rmmod lime.ko
fi

kernel_release=$(uname -r)
kernel_name=$(uname -s)

echo "
kernel_release : ${kernel_release}
kernel_name    : ${kernel_name}
"

## function - I executed one line at a time
installLimeApt() {
	sudo apt-get -y update
	sudo apt-get -y install git
	
	sudo apt-get install -y linux-headers-$1
	#sudo apt-get install -y linux-headers-${kernel_release}
	
	sudo apt-get install -y build-essential
	
	cd /tmp && sudo rm -rf LiME
	
	git clone https://github.com/504ensicsLabs/LiME
	# >> could not clone, so I copyed 1 file at a time <<
	
	cd LiME/src
	
	make
	
	lime_path=$(pwd)/lime-$1.ko
	#lime_path=$(pwd)/lime-${kernel_release}.ko
	echo "lime_path : ${lime_path}"
}


# I run the commands one by one
#installLimeApt $kernel_release

# loading the kernel module
sudo insmod $lime_path path=tcp:4444 format=lime localhostonly=1 &

# confirm the LiME kernel module is "listening" on port 4444
netstat -patnl | grep 4444

#sleep 120

if [[ `lsmod|grep lime|wc -l` -gt 0 ]] ; then
	echo "LiME has been loaded"
fi

MEMSIZE=`awk '/MemTotal/ {print $2/1024/1024}' /proc/meminfo`
echo "MEMSIZE: ${MEMSIZE}"

METADATA_FLAG="--metadata uncompressed-size=$MEMSIZE,kernel-name=$kernel_name,kernel-release=$kernel_release"
echo "METADATA_FLAG : ${METADATA_FLAG}"
# sample output >>> `METADATA_FLAG : --metadata uncompressed-size=31.0748,kernel-name=Linux,kernel-release=4.4.0-184-generic`


# copying memory dump into S3
#s3cp() {
# aws s3 cp - {{s3ArtifactLocation}}/linux_memcapture$1 $2 $3 $4
#}

# original command
# cat < /dev/tcp/127.0.0.1/4444 | tee >(gzip | s3cp \".lime.gz\" \"$EXPECTED_SIZE_FLAG\" \"$METADATA_FLAG\" \"$ACL_FLAG\") | sha256sum | s3cp \"_sha256.txt\" \"$ACL_FLAG\"",

# compressed memory
#cat < /dev/tcp/127.0.0.1/4444 | tee >(gzip > ./linux_memcapture.lime.gz)

# raw memory dump

cat < /dev/tcp/127.0.0.1/4444 > ./linux_memcapture.lime
sha256sum linux_memcapture.lime >> _sha256.txt

# remove the kernel module
# most of the time I tested, the kernel module `lime.ko` "removed" itself.

sudo rmmod lime.ko
```

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
