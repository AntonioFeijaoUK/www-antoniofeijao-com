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
	color: #333; }
</style>

<script language="javascript">
	
async function digest_this(event_code) {
	// https://stackoverflow.com/questions/63736585/why-does-crypto-subtle-digest-return-an-empty-object
	inputBytes = new TextEncoder().encode(event_code);
	const hashBytes = await window.crypto.subtle.digest('SHA-256', inputBytes);
	console.log(hashBytes);
	console.log(JSON.stringify({hash: buf2hex(hashBytes)}));     // output sample {"hash":"d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592"}
  console.log(JSON.stringify({hash: buf2Base64(hashBytes)}));  // output sample {"hash":"16j7swfXgJRpypq8sAguT41WUeRtPNt2LQLQvzfJ5ZI="}
}
	
function check_my_password(event_code) {
  digest_this(event_code)
  
  if (event_code.value=="pass1" | event_code.value=="pass2") { location="https://antoniofeijao.com/" }
  else { alert("Not sure about that event code...") } 
  }
	
</script>

<center>
  <h2 style="color:green;">EVENT CODE</h2>
  <input style="color:green; font-size:24px: font-family: 'Lucida Console', 'Courier New', monospace;" type="text" id="event_code" name="event_code" />

  <h2>
  <input style="color:green; font-size:24px: font-family: 'Lucida Console', 'Courier New', monospace;" type="button" value="ENTER" onclick="check_my_password(event_code)" />
  </h2>

</center>
