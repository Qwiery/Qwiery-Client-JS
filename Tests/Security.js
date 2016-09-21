QUnit.module("Security");

asyncTest('No API key', function() {
    Qwiery.apiKey = undefined;
    Qwiery.ask("Whatever")
        .then(function(result) {
            ok(false, "Should not get here.");
            Qwiery.apiKey = "Sharon";
        }).fail(function(xhr, status, message) {
        equal(message, "Unauthorized");
        console.log(xhr.responseText);
        Qwiery.apiKey = "Sharon";
        start();
    });
});

asyncTest('Empty API key', function() {
    Qwiery.apiKey = "  ";
    Qwiery.ask("Anything you like")
        .then(function(result) {
            ok(false, "Should not get here.");
            Qwiery.apiKey = "Sharon";
        }).fail(function(xhr, status, message) {
        equal(message, "Unauthorized");
        console.log(xhr.responseText);
        Qwiery.apiKey = "Sharon";
        start();
    });
});

asyncTest('Unknown API key', function() {
    Qwiery.apiKey = "This is an unknown API key";
    Qwiery.ask("Laplacian of graphs, do you know it?")
        .then(function(result) {
            ok(false, "Should not get here.");
            Qwiery.apiKey = "Sharon";
        }).fail(function(xhr, status, message) {
        equal(message, "Unauthorized");
        console.log(xhr.responseText);
        Qwiery.apiKey = "Sharon";
        start();
    });
});

asyncTest('Not an admin', function() {
    Qwiery.apiKey = "Anonymous";
    Qwiery.lexicUpsert({})
        .then(function(result) {
            ok(false, "Should not get here.");
            Qwiery.apiKey = "Sharon";
        }).fail(function(xhr, status, message) {
        equal(message, "Unauthorized");
        console.log(xhr.responseText);
        Qwiery.apiKey = "Sharon";
        start();
    });
});
