# Airhorn for AirOS
Airhorn, by Wesley Williams<br>
moto42@gmail.com

Airhorn simplifies the process of getting that initial connection between a
Station and an Access Point by only showing information about the device you
are looking for, and providing audio and visual cues when the signal to/from
that devices grows stronger, weaker, remains unchanged, or is lost.

## Installation
* Install the appropriate extension for the browser you are using:
* * Tampermonkey for Chrome
* * Greasemonkey for Firefox
* Copy and paste the text of airhorn.js into a new script and enable it.
* Don't forget to disable the script when you are done.

## Now a Tampermonkey script
### The problem
Ok. so, making this a standalone webapp that will just pull information from
the radio's server was a no-go.

CORS was just putting up one road block after another. While I could get around
CORS for downloading .json data, getting the login cookies to do so was turning
into an ever-growing pile of hacks and security holes.

### The Solution
Us Tampermonkey/Greasemonkey to inject my own script into AirOS' webpage and
hijack it to my own ends. This solves the login problems and eleminates CORS
problems entirely, as I am hijacking a page on their own domain. :P
