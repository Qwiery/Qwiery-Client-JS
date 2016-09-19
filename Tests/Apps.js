QUnit.module("Apps");

asyncTest('Add service', function() {
    var appName = Qwiery.randomId();
    var dummyAnswer = "I am a dummy app.";
    var appConfig = {
        config: {
            "name": appName,
            "pipeline": ["oracle"],
            "NOTFOUND": "Not much."
        },
        oracle: [
            {
                "Id": "Tt6d7d76",
                "Grab": [
                    "who are you"
                ],
                "Template": {
                    "Answer": dummyAnswer
                },
                "UserId": "Everyone",
                "Category": "Something Else" // will be replaced when added
            }]
    }
    // Sharon has quota 100
    Qwiery.apiKey = "Sharon";
    Qwiery.addApp(appConfig)
        .then(function(result) {
            ok(Qwiery.isDefined(result.serviceId) && result.serviceId.length > 0);
            start();
        });
});

asyncTest('Zero quota of anonymous', function() {
    var appName = Qwiery.randomId();
    var dummyAnswer = "I am a dummy app.";
    var appConfig = {
        config: {
            "name": appName,
            "pipeline": ["oracle"],
            "NOTFOUND": "Not much."
        },
        oracle: [
            {
                "Id": "Tt6d7d76",
                "Grab": [
                    "who are you"
                ],
                "Template": {
                    "Answer": dummyAnswer
                },
                "UserId": "Everyone",
                "Category": "Something Else" // will be replaced when added
            }]
    }
    Qwiery.apiKey = "Anonymous";
    Qwiery.addApp(appConfig)
        .then(function(result) {
            ok(result.errors.length > 0);
            start();
        });
});


asyncTest('Add service with errors', function() {
    var appName = Qwiery.randomId();
    var dummyAnswer = "I am a dummy app.";
    // name is missing here
    var appConfig = {
        config: {

            "pipeline": ["oracle"],
            "NOTFOUND": "Not much."
        },
        oracle: []
    }
    Qwiery.addApp(appConfig)
        .then(function(result) {
            ok(result.errors.length > 0);
            start();
        });
});
