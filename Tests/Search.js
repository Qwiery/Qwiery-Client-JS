QUnit.module("Search" );
asyncTest('Search news', function() {

    expect(2);
    $.when(Qwiery.searchWeb('Latest', 'News'))
        .then(function(results) {
            ok(results !== undefined && results !== null);
            ok(results.length > 0);
            console.log(results[0]);
            start();
        });
});

asyncTest('Search images', function() {

    expect(2);
    $.when(Qwiery.searchWeb('Show me images of images of elephants', 'Image'))
        .then(function(results) {
            ok(results !== undefined && results !== null);
            ok(results.length > 0);
            console.log(results[0]);
            start();
        });
});


asyncTest('Search web', function() {

    expect(2);
    $.when(Qwiery.searchWeb('Quantum gravity'))
        .then(function(results) {
            ok(results !== undefined && results !== null);
            ok(results.length > 0);
            console.log(results[0]);
            start();
        });
});

asyncTest('Search alpha', function() {

    expect(2);
    $.when(Qwiery.searchAlpha('Coffee'))
        .then(function(results) {
            ok(results !== undefined && results !== null);
            ok(results.Entities.length > 0);
            console.log(results.Entities[0]);
            start();
        });
});

asyncTest('Search wikipedia', function() {

    expect(3);
    $.when(Qwiery.searchWikipedia('anorexia'))
        .then(function(results) {
            ok(Qwiery.isDefined(results));
            ok(Qwiery.isDefined(results.Page));
            ok(Qwiery.isDefined(results.Other));
            console.log(results.Page);
            start();
        });
});

asyncTest('Search news', function() {

    expect(2);
    $.when(Qwiery.searchNews('Quantum gravity'))
        .then(function(results) {
            ok(results !== undefined && results !== null);
            ok(results.length > 0);
            console.log(results[0]);
            start();
        });
});

asyncTest('Search graph', function() {

    expect(2);
    var address = {

        DataType: "Address",
        Title: "Unit test " + Qwiery.randomId(),
        AddressLine1: "Somewhere",
        "Id": Qwiery.guid()
    };
    Qwiery.upsertEntity(address).then(function() {
        $.when(Qwiery.searchGraph('*', 'Address'))
            .then(function(results) {
                ok(Qwiery.isDefined(results));
                ok(results.length > 0);
                console.log(results[0]);
                start();
            });
    });

});