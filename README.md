# Safe Mobile Login Demo

A standalone, mobile-first login UI for prototyping.

## Safety
This demo does NOT:
- send credentials to a server
- save credentials in localStorage/cookies
- log credentials to the console
- identify itself as a real financial/payment service

Submitting the form simply replaces the login screen with a blank white loading screen.

## Run
Open `index.html` in a browser.

For a local server, for example:
`python -m http.server 8000`

Then visit:
`http://localhost:8000`
