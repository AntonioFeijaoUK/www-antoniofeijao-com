---
layout: default
title: Events
permalink: /events/
categories: ["Events", "Activities"]
tags: ["events", "activities"]
---

<style>
	body {
    background-image: url('/assets/images/dima-pechurin-JUbjYFvCv00-unsplash-medium-door.jpeg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #cccccc;
    /* height: 500px; */
    
    /* position: relative; */
  
    /* transform: translate(-50%, -50%); */
    color: white;
    /* text-align: center; */
    /* position: absolute; */
  }
</style>


<script language="javascript">

// from: https://stackoverflow.com/a/40031979/9014097
function buf2hex(buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

// from https://stackoverflow.com/a/11562550/9014097
function buf2Base64(buffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
}

// from https://stackoverflow.com/questions/63736585/why-does-crypto-subtle-digest-return-an-empty-object
async function digest_this(event_code) {

    inputBytes = new TextEncoder().encode(event_code);

    const hashBytes = await window.crypto.subtle.digest('SHA-256', inputBytes);

    // console.log("This is raw hashBytes :" + hashBytes);
    // console.log("This is the JSON.stringify of hashBytes :" + JSON.stringify(hashBytes) );

    console.log(JSON.stringify({ hash: buf2hex(hashBytes) }));     // output sample {"hash":"d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592"}
    console.log(JSON.stringify({ hash: buf2Base64(hashBytes) }));  // output sample {"hash":"16j7swfXgJRpypq8sAguT41WUeRtPNt2LQLQvzfJ5ZI="}

    digest_result = (buf2hex(hashBytes))
    console.log("digest_result is : " + digest_result)

    pass1 = "be777e1c1380a74447b462723b7002240abd5f2714187f240c63699ba9810ee5"
    pass2 = "be777e1c1380a74447b462723b7002240abd5f2714187f240c63699ba9810ee5"

    if (digest_result.value == pass1.value || digest_result.value == pass2.value) { location = "https://antoniofeijao.com/" }
    else { alert("Not sure about that event code...") }

    alert("Ready to move on?")

    return (digest_result);
}


function check_my_password(event_code) {
    digest_result = digest_this(event_code)
    console.log("digest_result in the function is : " + digest_result)
}
	
</script>

<center>
  <h2 style="color:green;">EVENT CODE</h2>
  
  <input style="color:green; font-size:32px; font-family: 'Lucida Console', 'Courier New', monospace;" type="text" id="event_code" name="event_code" onSubmit="check_my_password(event_code)" />

  <input style="color:green; font-size:32px; font-family: 'Lucida Console', 'Courier New', monospace;" type="button" value="ENTER" onclick="check_my_password(event_code)" />
  

</center>
