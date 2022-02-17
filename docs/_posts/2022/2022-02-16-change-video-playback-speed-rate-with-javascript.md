---
layout: post
title: "Change video playback speed rate with javascript"
categories: ["Javascript", "Multimedia"]
tags: ["playbackRate", "video", "javascript"]
---

Change video playback speed rate with javascript

You can run these commands in the 

`document.getElementsByTagName("video")[0].playbackRate = '1.0'`
`document.getElementsByTagName("video")[0].playbackRate = '1.5'`
`document.getElementsByTagName("video")[0].playbackRate = '1.75'`
`document.getElementsByTagName("video")[0].playbackRate = '2.0'`
`document.getElementsByTagName("video")[0].playbackRate = '2.5'`


You can also save them as a bookmark link

sample with querySelector('video')

`javascript: (function () {    document.querySelector('video').playbackRate = 1.0;})();`
`javascript: (function () {    document.querySelector('video').playbackRate = 1.5;})();`
`javascript: (function () {    document.querySelector('video').playbackRate = 1.75;})();`
`javascript: (function () {    document.querySelector('video').playbackRate = 2.0;})();`
`javascript: (function () {    document.querySelector('video').playbackRate = 2.5;})();`


sample with getElementsByTagName("video")

`javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 1.0;})();`
`javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 1.5;})();`
`javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 1.75;})();`
`javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 2.0;})();`
`javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 1.5;})();`


sample with getElementsByTagName("audio")

`javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 1.0;})();`
`javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 1.5;})();`
`javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 1.75;})();`
`javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 2.0;})();`
`javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 2.5;})();`

