Slapface Server
===============

### Introduction

This is an ldapserver with a restful interface for creating users and groups. 

### Dev environment
You'll need node, npm to run locally, logging is done with bunyan, 

1. run ````npm install``` to get the dependencies

2. To run the tests, use ````gulp test````

3. To build, run ````gulp````

####Optionally 

Build a docker container, after ````gulp```` run

````docker build -t tlcowling/slapface .````

then start the container, which should have all that you need (default port is currently 3004)

````docker run -p 3004:3004 -it tlcowling/slapface````

### FAQs

- Hate the name?  
I don't blame you, but then again... naming projects has never been my forte...

- Whats the point? 
Sometimes people just really really insist on using LDAP even though you may tell them countless times that its a little complicated... Still, those people usually know best...
