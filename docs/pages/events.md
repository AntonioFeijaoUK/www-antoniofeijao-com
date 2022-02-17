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
  function check_my_password(event_code) { 
    if (event_code.value=="pass1" | event_code.value=="pass2") { location="https://antoniofeijao.com/" } 
    else { alert("Not sure about that event code...") } 
  } 
</script>

<h2>EVENT CODE</h2>
<input type="text" id="event_code" name="event_code" size="24px"/>

<h2><input value="Login" onclick="check_my_password(event_code)" type="button" size="24px"/></h2>

