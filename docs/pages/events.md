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
	
  async function check_my_password(event_code) {
	
	const digest = await window.crypto.subtle.digest('SHA-256', event_code.value);
	console.log(digest);
	
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
