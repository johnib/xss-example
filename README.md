# Cross-Site Scripting Simple Example

## Abstract
Many websites allow people to add comments, mostly at the bottom of the page.
By taking user-input comes great responsibility for validating the input and 
eliminate chances for scripts to be run on other user's browsers.

## Install
```
npm install
```

## Run
```
node webserver.js
node listener.js
```

## This project
This project is a simple example of a website that allows adding and viewing 
comments.

It comes with two versions:
1. XSS-proof: `http://localhost:3000/`.
2. XSS-vulnerable: `http://localhost:3000/xss`

If you add malicious code as a comment in the vulnerable endpoint - you'll 
notice that once the page is reloaded - the malicious code actually executes.

## How to demo
I have added two examples:
1. LocalStorage theft.
2. Keylogging.

Open `demo-scripts.html`, each one of the scripts should be tested separately
(meaning - cleaning the db file and restarting the webserver).
