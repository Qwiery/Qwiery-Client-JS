QUnit.module("Oracle Mock");
asyncTest('Update an entity', function() {
    var product = {
        UnitPrice: 30.78,
        UnitsInStock: 95,
        Discontinued: false,
        DataType: "Product",
        Title: "GetEntity test " + Qwiery.randomId(),
        "Id": Qwiery.guid()
    };
    expect(2);

    $.when(
        Qwiery.upsertEntity(product)
    )
        .then(function(data) {
            var id = product.Id;
            $.when(Qwiery.getEntity(id)).then(function(d) {
                ok(d.Id === id);
                ok(d.Title === product.Title);
                start();
            });

        });
});


asyncTest('A tree is a plant', function() {

    expect(4);
    var v1 = Qwiery.randomId();
    var v2 = Qwiery.randomId();
    $.when(Qwiery.ask("A " + v1 + " is a " + v2)).then(function(d) {
        ok(Qwiery.isDefined(d));
        ok(Qwiery.isDefined(d.Output.Answer));
        console.log(d.Output.Answer);
        $.when(Qwiery.searchGraph(v1)).then(function(r) {
            ok(r.length > 0);
            $.when(Qwiery.searchGraph(v2)).then(function(s) {
                ok(s.length > 0);
                start();
            });
        });

    });
});


// asyncTest('Lexic exists', function() {
//
//     expect(1);
//     var v1 = Qwiery.randomId();
//     var rnd = "Something random " + v1;
//     // only admin can do this
//     Qwiery.apiKey = "Sharon";
//     $.when(Qwiery.lexicUpsert({
//         Id: -1,
//         Grab: rnd,
//         Template: '{"Answer": "Not really important."}'
//     })).then(function(d) {
//
//         $.when(Qwiery.lexicExists(rnd)).then(function(d) {
//             ok(d === true);
//             start();
//         });
//     });
//
// });
//
// asyncTest('Admin only', function() {
//
//     expect(1);
//     var v1 = Qwiery.randomId();
//     Qwiery.apiKey = "Anonymous";
//     var rnd = "Something random " + v1;
//     $.when(Qwiery.lexicUpsert({
//         Id: -1,
//         Grab: rnd,
//         Template: '{"Answer": "Not really important."}'
//     })).fail(function(xhr, status, msg) {
//         ok(msg === "Unauthorized")
//         start();
//     });
//
// });


asyncTest('I like', function() {

    expect(4);
    var v1 = Qwiery.randomId();

    $.when(Qwiery.ask("I like " + v1)).then(function(d) {
        var session = d;
        ok(Qwiery.isDefined(session.Output.Answer));
        ok(Qwiery.isDefined(session.Output.Answer[0]));
        ok(session.Output.Answer[0].DataType === "SimpleContent");
        $.when(Qwiery.ask("What do I like")).then(function(dd) {
            ok(dd.Output.Answer[0].Content === "You like chatting with me. You said you like " + v1 + ".");
            start();
        });
    });

});
