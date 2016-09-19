QUnit.module("Profile");
asyncTest('Topics', function() {

    var topic = Qwiery.randomId();

    expect(2);
    $.when(Qwiery.ask('Add topic ' + topic))
        .then(function() {
            $.when(Qwiery.getTopics())
                .then(function(topics) {

                    ok(topics.length > 0);
                    var found = _.find(topics, function(r) {
                        return r.Type === topic;
                    });
                    ok(Qwiery.isDefined(found));

                    start();

                });

        });
});

asyncTest('Personalization', function() {

    var value = Qwiery.randomId();

    expect(3);
    $.when(Qwiery.ask('Add personalization ' + value))
        .then(function() {
            $.when(Qwiery.getPersonalization())
                .then(function(pers) {
                    var key;
                    var found = _.find(pers, function(v) {

                        if(v.value === value) {
                            key = v.key;
                            return true;
                        } else {
                            return false;
                        }
                    });
                    ok(Qwiery.isDefined(found));
                    ok(Qwiery.isDefined(key));
                    Qwiery.clearPersonalization(key).then(function() {
                        // should be gone now
                        Qwiery.getPersonalization().then(function(pers2) {
                            found = _.find(pers2, function(v, k) {
                                return k === key;
                            });
                            ok(Qwiery.isUndefined(found));
                            start();
                        });
                    });
                });
        });
});

asyncTest('Personality', function() {

    // Predefined personality values get mapped to an MBTI type
    // If there is no mapping (which happens for random values) there won't be an MBTI type.
    var value = 'Factual';

    expect(2);
    $.when(Qwiery.ask('Add personality ' + value))
        .then(function() {
            $.when(Qwiery.getPersonality())
                .then(function(pers) {

                    var found = _.find(pers, function(r) {
                        return r.Type === value;
                    });
                    ok(Qwiery.isDefined(found));
                    // to know the value I'd have to reset all values and so on
                    //ok(pers[value]===1);
                    $.when(Qwiery.getPsy()).then(function(f) {
                        var count = 0;
                        for(var m in f) {
                            if(f.hasOwnProperty(m)) {
                                count++;
                            }
                        }
                        ok(count > 0);
                        start();
                    });
                });

        });
});

asyncTest('User', function() {

    expect(1);
    $.when(Qwiery.getUser())
        .then(function(u) {
            ok(u.Username === "Sharon Ambjorn");
            start();
        });
});

asyncTest('Trail', function() {
    expect(2);
    var question = "Unit test " + Qwiery.randomId();
    var count;
    Qwiery.ask("Hello").then(function() {
        $.when(Qwiery.getTrail())
            .then(function(u) {
                count = u.length;
                ok(count > 0);
                Qwiery.ask(question).then(function() {
                    Qwiery.getTrail().then(function(t) {
                        var q = t[0].Input;
                        ok(q === question);
                        start();
                    });
                });

            });
    });
});

asyncTest('User stats', function() {
    var thought = {
        DataType: "Thought",
        Title: "Stats test " + Qwiery.randomId(),
        "Id": Qwiery.guid()
    };
    expect(1);
    var count;
    $.when(Qwiery.getStats())
        .then(function(stats) {
            count = stats.NodeCount;
            Qwiery.upsertEntity(thought).then(function() {
                Qwiery.getStats().then(function(statsAfter) {
                    ok(statsAfter.NodeCount = count + 1);
                    start();
                })
            });
        });
});

asyncTest('User history', function() {

    expect(3);
    var count;
    Qwiery.ask("Hello").then(function() {
        $.when(Qwiery.getHistory(17))
            .then(function(history) {
                ok(history.length <= 17);
                var one = _.sample(history);
                Qwiery.getHistoryItem(one.CorrelationId).then(function(item) {
                    ok(Qwiery.isDefined(item));
                    ok(item.Key.CorrelationId === one.CorrelationId);
                    start();
                });
            });
    });

});
