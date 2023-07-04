---
title: "AWS userInfo cookie extra account and username or role information"
layout: splash
#excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["aws", "authentication", "cookie"]
tags:       ["aws", "cookie", "userinfo", "role", "iam"]
---

AWS Console information. Reading the `userInfo` cookie information to display, alert, or anything else you want.  
For example, include a banner on your AWS console with highlighting when you login as "AWS Administrator" role.  
This can then be used in various applications.

---

## sample code that "grabs" the `userInfo` and create an banner alert

```javascript
javascript:(function () {
    function fullDecode (input) {
        let decoded = decodeURIComponent(input);
        return (decoded == input ? decoded : fullDecode(decoded))
    };
    let userInfo = document.cookie.replace(/(?:(?:^|.*;\s*)aws-userInfo\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    alert(JSON.stringify(JSON.parse(fullDecode(userInfo)), null, 4))
})();
```

_source code <https://gist.github.com/ajkerrigan/0e2348d4ed960409b462e8aaca230d36>_

---

## sample code that "grabs" the `userInfo` and outputs in the console

```js
let userInfo = document.cookie.replace(/(?:(?:^|.*;\s*)aws-userInfo\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let decoded = decodeURIComponent(userInfo);
JSON.stringify(JSON.parse(decoded), null, 1);
```

---

TBC...

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com)
