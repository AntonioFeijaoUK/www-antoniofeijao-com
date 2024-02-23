---
date: 2022-02-16
title: "Change video playback speed rate with javascript"
categories: ["Javascript", "Multimedia"]
tags: ["playbackRate", "video", "javascript"]
---

Change video playback speed rate with javascript

You can run these commands in the 

```js
document.getElementsByTagName("video")[0].playbackRate = '1.00'
document.getElementsByTagName("video")[0].playbackRate = '1.50'
document.getElementsByTagName("video")[0].playbackRate = '1.75'
document.getElementsByTagName("video")[0].playbackRate = '2.00'
document.getElementsByTagName("video")[0].playbackRate = '2.50'
```

You can also save them as a bookmark link

sample with querySelector('video')

```js
javascript: (function () {    document.querySelector('video').playbackRate = 1.00;})();
javascript: (function () {    document.querySelector('video').playbackRate = 1.50;})();
javascript: (function () {    document.querySelector('video').playbackRate = 1.75;})();
javascript: (function () {    document.querySelector('video').playbackRate = 2.00;})();
javascript: (function () {    document.querySelector('video').playbackRate = 2.50;})();
```

sample with getElementsByTagName("video")

```js
javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 1.00;})();
javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 1.50;})();
javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 1.75;})();
javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 2.00;})();
javascript: (function () {    document.getElementsByTagName("video")[0].playbackRate = 2.50;})();
```

sample with getElementsByTagName("audio")

```js
javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 1.00;})();
javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 1.50;})();
javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 1.75;})();
javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 2.00;})();
javascript: (function () {    document.getElementsByTagName("audio")[0].playbackRate = 2.50;})();
```
