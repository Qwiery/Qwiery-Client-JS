# Qwiery client library for JavaScript

This is the JavaScript SDK to access, manage and consume the Qwiery services. 



Use this SDK for your browser applications, it's as simple as this:

    Qwiery.apiKey = "Anonymous";
    Qwiery.ask("What is the meaning of life?").then(function(res){
        // do something with the response e.g.
        console.log(res.Output.Answer[0].Content);
    });


--- 
### Unit tests
Some of the unit tests require admin privileges on Qwiery and have been commented out. There are plenty of tests which go beyond simple testing of the API methods and should give you insights on how Qwiery can be used and how the semantic network, in particular, can be used together with the bot-like functionality of Qwiery.

To change the Qwiery URL, use

    Qwiery.serviceURL = "http://www.qwiery.com/"

To use your apiKey

    Qwiery.apiKey = "your secret key";
    
You can obtain a key by registering or     
---

For more information, see the [Qwiery](http://www.qwiery.com) site.

---

### Change log

####v2016.9.19

_Monday September 19th, 2016._

This release contains almost all functionality offered by Qwiery, including REST access to the language understanding service and the bot functionality.

[The Swagger specification can be obtained as well](http://www.qwiery.com//api-docs.json) and contains additional info. This also allows you to create client-libraries in many different programming languages, see the [Swagger](http://swagger.io) site for more information.
