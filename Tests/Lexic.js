QUnit.module("Lexic" );
asyncTest('Asks a question', function() {
    expect(1);
    //$.when(Qwiery.ask("add person: Jan Janssen"))
    $.when(Qwiery.ask("What is anorexia"))
        .then(function(answer) {
            ok(true);
            console.log(answer);
            start();
        });
});


// asyncTest('Upsert and delete', function() {
//     expect(4);
//     var question = "question_" + Qwiery.randomId();
//     $.when(Qwiery.lexicExists(question))
//         .then(function(exists) {
//             try {
//                 ok(!exists);
//                 $.when(Qwiery.lexicUpsert({
//                     Id: -1,
//                     Grab: question,
//                     Template: '{"Answer":"This answer should never appear."}'
//                 })).then(
//                     function(newId) {
//                         ok(Qwiery.isDefined(newId));
//                         $.when(Qwiery.lexicExists(question))
//                             .then(function(existsNow) {
//                                 ok(existsNow);
//                                 $.when(Qwiery.lexicDelete(newId))
//                                     .then(function(existsNow) {
//                                         ok(existsNow);
//                                         start();
//                                     });
//                             });
//                     }
//                 );
//             } catch(e) {
//                 ok(false);
//                 start();
//             }
//
//         });
// });
asyncTest('Should answer to the test question', function() {
    expect(1);
    $.when(Qwiery.ask("Special test question"))
        .then(function(reply) {
            try {
                var answer = reply.Output.Answer[0].Content;
                ok(answer === "This is part of a testing procedure, please ignore.");
            } catch(e) {
                ok(false);
            }
            start();
        });
});

asyncTest('Hello question should exist', function() {
    expect(1);
    $.when(Qwiery.lexicExists("Hello $1"))
        .then(function(b) {
            ok(b);
            start();
        });
});

asyncTest('Nonsense question should not exist', function() {
    expect(1);
    $.when(Qwiery.lexicExists("asdf hasdlkfjh as"))
        .then(function(b) {
            ok(!b);
            start();
        });
});

asyncTest('RandomRecord should return something', function() {
    expect(1);
    $.when(Qwiery.lexicRandomRecord())
        .then(function(reply) {
            try {
                var question = reply.Grab;
                console.log(question);
                ok(Qwiery.isDefined(question));
            } catch(e) {
                ok(false);
            }
            start();
        });
});

asyncTest('Random question return something', function() {
    expect(1);
    $.when(Qwiery.lexicRandomQuestion())
        .then(function(question) {
            console.log(question);
            ok(Qwiery.isDefined(question));
            start();
        });
});

