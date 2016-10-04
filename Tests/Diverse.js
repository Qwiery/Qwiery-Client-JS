QUnit.module("Diverse");


asyncTest('Send feedback', function() {

    var f = {
        feedback:{
            comments: "Some feedback here.",
            user: "Anna"
        }
    }
    Qwiery.feedback(f).then(function() {
        ok(true);
        start();
    });

});
