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
    if (form.id.value=="SECRET_USER") { 
      if (form.pass.value=="SECRET_PASSWORD")
        { location="https://antoniofeijao.com/" } 
        else { alert("Wrong Password") } 
      } 
    else { alert("Wrong Username") } 
  } 
</script>

<form name="login">
Username: < input name="id" size="6" type="text">
Password: < input name="pass" size="6" type="password">
<input value="Login" onclick="pasuser(this.form)" type="button">
</form>
