#Airhorn for AirOS

##Now a Tampermonkey script
###The problem
Ok. so, making this a standalone webpage that will just pull information from
the radio's server was a no-go.

CORS was just putting up one road block after another. While I could get around
CORS for downloading .json data, getting the login cookies to do so was turning
into an ever-growing pile of hacks and security holes.

###The Solution
Us Tampermonkey/Greasemonkey to inject my own script into AirOS' webpage and
hijack it to my own ends. This solves the login problems and eleminates CORS
problems entirely, as I am hijacking a page on their own domain. :P
