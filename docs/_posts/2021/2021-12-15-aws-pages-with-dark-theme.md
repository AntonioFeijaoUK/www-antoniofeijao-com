---
title: "AWS pages with dark-theme feature"

date: 2021-12-15
last_modified_at: 2021-12-15

categories:
    - AWS
    - Javascript
tags:
    - aws
    - javascript
    - themes
    - css
    - html
---

Have you tried the AWS dark theme feature with cookie named `awsc-color-theme`?

Still a work in progress from AWS but looks pretty good already, and if you prefer darker pages, I think you will like this tip.

To try this feature, on your browser do the following:

Open the browser **Developer-Tools** *(right-click then Inspect, or F12 or fn+F12 for MacOS)*,  
go to **Application**, then **Storage**, then **Cookies**, choose the available cookie.

At the end of the list that open, double click after the last row to create a new cookie entry.

In this new cookie entry

add the "Name" as `awsc-color-theme` <-- !! "awsc-", not just "aws-"

add "Value" as `dark`,

and finally "Path" as `.amazon.com`

Then refresh the page.

---

## creating the awsc-color-theme cookie entry

`awsc-color-theme`, `dark`, `.amazon.com`
 
![00-awsc-color-theme-cookies.png](/assets/images/00-awsc-color-theme-cookies.png)

---

## before the awsc-color-theme cookie entry

![01-awsc-color-theme-s3-light.png](/assets/images/01-awsc-color-theme-s3-light.png)

---

## after the awsc-color-theme cookie entry

![02-awsc-color-theme-s3-dark.png](/assets/images/02-awsc-color-theme-s3-dark.png)


---

## Credits

First I found about this feature was from [barney_parker](https://twitter.com/barney_parker),

then found it in here <https://twitter.com/rpadovani93/status/1419583500290859008>

---

Happy learning!

[Antonio Feijao UK](https://antonio.cloud)
