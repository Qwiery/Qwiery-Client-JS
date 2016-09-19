QUnit.module("Authentication");

// asyncTest('Get all users', function() {
//     Qwiery.getAllUsers()
//         .then(function(all) {
//
//             ok(Qwiery.isDefined(all));
//             ok(all.length > 0);
//             start();
//         });
// });

asyncTest('Local register', function() {
    expect(5);
    var newEmail = "User_" + Qwiery.randomId();
    var newPassword = "Password_" + Qwiery.randomId();
    $.when(Qwiery.registerLocal(newEmail, newPassword))
        .then(function(newUser) {

            ok(Qwiery.isDefined(newUser.id));
            ok(Qwiery.isDefined(newUser.local));
            ok(newUser.local.email === newEmail.toLowerCase());
            // let's not send the password back and forth
            ok(Qwiery.isUndefined(newUser.local.password));
            ok(Qwiery.isUndefined(newUser.error));
            start();
        });
});

asyncTest('Local connect new user', function() {

    expect(4);
    var newEmail = "User_" + Qwiery.randomId();
    var newPassword = "Password_" + Qwiery.randomId();
    $.when(Qwiery.registerLocal(newEmail, newPassword))
        .then(function(newUser) {
            $.when(Qwiery.connectLocal(newEmail, newPassword))
                .then(function(user) {
                    ok(user.local.email === newEmail.toLowerCase());
                    // password should not be sent
                    ok(Qwiery.isUndefined(user.local.password));
                    ok(Qwiery.isDefined(user.id));
                    ok(user.id === newUser.id);
                    start();
                });

        });
});

asyncTest('Local register existing user', function() {

    expect(2);
    var newEmail = "User_" + Qwiery.randomId();
    var newPassword = "Password_" + Qwiery.randomId();
    $.when(Qwiery.registerLocal(newEmail, newPassword))
        .then(function(newUser) {

            $.when(Qwiery.registerLocal(newEmail, "whatever")).then(
                function(noUser) {
                    ok(Qwiery.isDefined(noUser.error));
                    console.log("Error when Email already in user: " + noUser.error);
                    ok(Qwiery.isUndefined(noUser.local));
                    start();
                }
            );

        });
});

asyncTest('Local register with missing password', function() {
    expect(1);
    var newEmail = "User_" + Qwiery.randomId();

    $.when(Qwiery.registerLocal(newEmail, ""))
        .then(function(u) {
            ok(Qwiery.isDefined(u.error));
            start();
        });
});

asyncTest('Local register with missing password', function() {
    expect(1);
    var newEmail = "User_" + Qwiery.randomId();

    $.when(Qwiery.registerLocal(newEmail, null))
        .then(function(u) {
            ok(Qwiery.isDefined(u.error));
            start();
        });
});

asyncTest('Local register with missing email', function() {
    expect(1);

    $.when(Qwiery.registerLocal("", "Asdfa"))
        .then(function(u) {
            ok(Qwiery.isDefined(u.error));
            start();
        });
});

asyncTest('Local register with missing email', function() {
    expect(1);

    $.when(Qwiery.registerLocal(null, "Asdfa"))
        .then(function(u) {
            ok(Qwiery.isDefined(u.error));
            start();
        });
});

asyncTest('Local register but already a local user', function() {

    expect(2);
    var newEmail = "User_" + Qwiery.randomId();
    var newPassword = "Password_" + Qwiery.randomId();
    $.when(Qwiery.registerLocal(newEmail, newPassword))
        .then(function(currentUser) {
            // how can a user register when he already is logged in with a local user?
            $.when(Qwiery.registerLocal(newEmail, "whatever", currentUser)).then(
                function(answer) {
                    ok(Qwiery.isDefined(answer.error));
                    console.log("Error when doing a double registration: " + answer.error);
                    ok(Qwiery.isUndefined(answer.local));
                    start();
                }
            );

        });
});

asyncTest('Local register when having a social account but local exists', function() {

    expect(2);
    var newEmail = "User_" + Qwiery.randomId();
    var newPassword = "Password_" + Qwiery.randomId();
    $.when(Qwiery.registerLocal(newEmail, newPassword))
        .then(function(otherUser) {
            // otherUser represents the credentials that the social user wants to use
            var socialUser = {
                facebook: {
                    id: 123456
                }
            };

            $.when(Qwiery.registerLocal(newEmail, "whatever", socialUser)).then(
                function(answer) {
                    ok(Qwiery.isDefined(answer.error));
                    console.log("Error when Email already in user for social user: " + answer.error);
                    ok(Qwiery.isUndefined(answer.local));
                    start();
                }
            );

        });
});

asyncTest('New Facebook connect', function() {

    expect(4);
    var fo = {
        id: 2345,
        name: "wert_ewtr"
    };
    $.when(Qwiery.connectFacebook(fo))
        .then(function(newUser) {
            ok(Qwiery.isDefined(newUser.id));
            ok(Qwiery.isDefined(newUser.facebook));
            ok(newUser.facebook.id === fo.id.toString());
            ok(newUser.facebook.name === fo.name);
            start();
        });
});

asyncTest('Facebook re-connect', function() {

    expect(3);
    var fo = {
        id: Qwiery.randomId(),
        name: "ASDfergb adf",
        first_name: "ASDfergb adf"
    };
    $.when(Qwiery.connectFacebook(fo))
        .then(function(newUser) {
            $.when(Qwiery.connectFacebook(fo))
                .then(function(u) {
                    ok(u.facebook.id === fo.id);
                    ok(u.facebook.name === fo.name);
                    ok(u.id === newUser.id);
                    start();
                });
        });
});

asyncTest('Facebook already in use', function() {

    expect(1);
    var fo = {
        id: Qwiery.randomId(),
        name: "afsioj"
    };
    $.when(Qwiery.connectFacebook(fo))
        .then(function() {
            // this local user tries to add a Facebook account
            // but it's already taken by another user
            var currentUser = {
                local: {email: "JustMe", password: "2342"}
            };
            $.when(Qwiery.connectFacebook(fo, currentUser))
                .then(function(u) {
                    console.log("Error when Facebook is already taken: " + u.error);
                    ok(Qwiery.isDefined(u.error));

                    start();
                });
        });
});

asyncTest('New Google connect', function() {

    expect(4);
    var go = {
        id: 408234,
        name: "piovpo5"
    };
    $.when(Qwiery.connectGoogle(go))
        .then(function(newUser) {
            ok(Qwiery.isDefined(newUser.id));
            ok(Qwiery.isDefined(newUser.google));
            ok(newUser.google.id === go.id.toString());
            ok(newUser.google.name === go.name);
            start();
        });
});

asyncTest('Google already in use', function() {

    expect(1);
    var go = {
        id: Qwiery.randomId(),
        name: "wertw"
    };
    $.when(Qwiery.connectGoogle(go))
        .then(function() {
            // this local user tries to add a Facebook account
            // but it's already taken by another user
            var currentUser = {
                local: {email: "JustMe", password: "2342"}
            };
            $.when(Qwiery.connectGoogle(go, currentUser))
                .then(function(u) {
                    console.log("Error when Google is already taken: " + u.error);
                    ok(Qwiery.isDefined(u.error));
                    start();
                });
        });
});

// asyncTest('Change user name', function() {
//     expect(3);
//     var newEmail = "User_" + Qwiery.randomId();
//     var newPassword = "Password_" + Qwiery.randomId();
//     Qwiery.registerLocal(newEmail, newPassword)
//         .then(function(newUser) {
//             ok(newUser.username == "not known");
//             Qwiery.apiKey = newUser.apiKey;
//             $.when(Qwiery.changeUsername("Akadi"))
//                 .then(function(updatedTicket) {
//
//                     ok(Qwiery.isUndefined(updatedTicket.error));
//                     ok(updatedTicket.local.username == "Akadi");
//                     start();
//                 });
//         });
// });

asyncTest('Bad API key', function() {

    expect(2);

    var somekey = Qwiery.randomId();
    var originalKey = Qwiery.apiKey;
    Qwiery.apiKey = somekey;
    Qwiery.upsertEntity({Title: "does not matter"}).error(function(xhr, status, err) {
        var error = Qwiery.formatErrorMessage(xhr, err);
        console.log(error);
        ok(err === "Unauthorized");//HTTP 401
        ok(error.Message === "A user with the specified API key could not be found.");
        Qwiery.apiKey = originalKey;
        start();
    })
        .then(function(id) {
            ok(false);
            ok(false); // expecting 2 tests
            Qwiery.apiKey = originalKey;
            start();
        });

});

asyncTest('No API key', function() {

    expect(2);


    var originalKey = Qwiery.apiKey;
    Qwiery.apiKey = null;
    Qwiery.upsertEntity({Title: "does not matter"}).error(function(xhr, status, err) {
        var error = Qwiery.formatErrorMessage(xhr, err);
        console.log(error);
        ok(err === "Unauthorized");//HTTP 401
        ok(error.Message === "The ApiKey is empty. Login and use the supplied API key to make requests.");
        Qwiery.apiKey = originalKey;
        start();
    })
        .then(function(id) {
            ok(false);
            ok(false);
            Qwiery.apiKey = originalKey;
            start();
        });

});