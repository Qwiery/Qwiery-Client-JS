QUnit.module("Personalization" );
asyncTest('The topics of the user', function() {

    expect(1);
    $.when(Qwiery.getTopics())
        .then(function(topics) {
            ok(true);
            console.log(topics);
            start();
        });
});

asyncTest('The personalization of the user', function() {

    expect(1);
    $.when(Qwiery.getPersonalization())
        .then(function(items) {
            ok(true);
            console.log(items);
            start();
        });
});

asyncTest('The personality of the user', function() {

    expect(1);
    $.when(Qwiery.getPersonality())
        .then(function(items) {
            ok(true);
            console.log(items);
            start();
        });
});

asyncTest('The trail of the user', function() {

    expect(2);
    $.when(Qwiery.getTrail())
        .then(function(items) {
            ok(true);
            // first item should be the earliest
            if(items.length>1){
                var t0 = new Date(items[0].Timestamp);
                var t1 = new Date(items[items.length-1].Timestamp);
                ok(t0>=t1);
            }else{
                ok(true);
            }
            start();
        });
});

asyncTest('The psy profile of the user', function() {

    expect(1);
    $.when(Qwiery.getPsy())
        .then(function(items) {
            ok(true);
            console.log(items);
            start();
        });
});
