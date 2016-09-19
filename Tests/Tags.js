QUnit.module("Tags" );
asyncTest('Add agenda item and fetch the agenda', function() {
    var birthday = {
        Start: "7/09/2015",
        End: "10/09/2015",
        DataType: "Appointment",
        Title: "Random appointmen t" + Qwiery.randomId()
    };

    expect(1);
    $.when(Qwiery.upsertEntity(birthday))
        .then(function(id) {
            $.when(Qwiery.getAgenda()).then(function(items) {
                ok(items !== null && items.length > 0);
                console.log(items[0]);
                start();
            });
        });
});


asyncTest('Favorites make/get/remove', function() {
    var thought = {
        "Id": Qwiery.guid(),
        Title: "Favoriting test " + Qwiery.randomId(),
        Description: "Testing things",
        DataType: "Thought"
    };
    expect(6);
    $.when(Qwiery.upsertEntity(thought))
        .then(function(id) {
            $.when(Qwiery.makeFavorite(id)).then(function(b) {
                ok(b); // will always return true
                $.when(Qwiery.isFavorite(id)).then(function(isit) {
                    ok(isit);
                    $.when(Qwiery.getFavorites()).then(function(favs) {
                        ok(favs.length > 0);
                        var found = _.find(favs, function(r) {
                            return r.Title === thought.Title;
                        });
                        ok(found);
                        $.when(Qwiery.unFavorite(id)).then(function(bb) {
                            ok(bb);
                            $.when(Qwiery.isFavorite(id)).then(function(not) {
                                ok(!not);
                                start();
                            });
                        });
                    });


                });

            });
        });
});