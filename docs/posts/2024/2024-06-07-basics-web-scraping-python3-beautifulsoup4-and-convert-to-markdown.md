---
date: 2024-06-07
title: "Basics web scraping using Python3 with BeautifulSoup4 and then convert to Markdown"

categories:
  - linux
  - python
  - webscraping
  - beautifulsoup4
  - markdown

tags:
  - linux
  - python
  - webscraping
  - beautifulsoup4
  - markdown
---

Basics web scraping using Python3 with BeautifulSoup4 and then converting to Markdown

## Basic Python BeautifulSoup4 web scraping and then Markdown


```python
pip install requests
pip install beautifulsoup4
pip install markdownify

import markdownify 

import requests
from bs4 import BeautifulSoup

def beautifulsoup_web_scrape_url(url):
  response = requests.get(url)
  soup = BeautifulSoup(response.content, 'html.parser')
  return str(soup)

url = "https://www.antoniofeijao.com/"

data = beautifulsoup_web_scrape_url(url)

print(data)



# convert html to markdown 
h = markdownify.markdownify(data, heading_style="ATX") 
  
print(h)


f = open("result.txt", "w")
f.write("##result file done. Woops! I have deleted the content!##")
f.write(h)
f.close()

#open and read the file after the overwriting:
f = open("result.txt", "r")
print(f.read())


```

## inspiration-from 

* <https://youtu.be/od6AaKhKYmg> - `How to do Web Scraping in 2024 with LLM Agents` from `Prompt Engineering`
* <https://www.w3schools.com/python/python_file_write.asp>
* <https://www.geeksforgeeks.org/how-to-convert-html-to-markdown-in-python/>

* <https://en.wikipedia.org/wiki/Web_scraping>
* <https://pypi.org/project/beautifulsoup4/>

---

## Happy learning

by [Antonio Feijao UK](https://www.antoniofeijao.com/)



