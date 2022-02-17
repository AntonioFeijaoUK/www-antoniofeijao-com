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
	color: #333;
}
</style>

<script language="javascript">
  function pasuser(form) { 
    if (form.id.value=="pass") { 
      if (form.pass.value=="pass1" | form.pass.value=="pass2")
        { location="https://antoniofeijao.com/" } 
        else { alert("Wrong Password") } 
      } 
    else { alert("Wrong Username") } 
  } 
</script>


Username: <input name="id" size="6" type="text">Username</input>

Password: <input name="pass" size="6" type="password">Password</input>

<input value="Login" onclick="pasuser(this.form)" type="button">



<input type="text" id="name" name="name"/>

