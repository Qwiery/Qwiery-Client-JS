QUnit.module("Entities" );
asyncTest('Update an entity', function() {
    var product = {
        UnitPrice: 30.78,
        UnitsInStock: 95,
        Discontinued: false,
        DataType: "Product",
        Title: "GetEntity test " + Qwiery.randomId(),
        "Id": Qwiery.guid(),
    };
    expect(1);
    //stop(1);
    $.when(
        Qwiery.upsertEntity(product)
        )
        .then(function(data) {
            ok(data !== null);
            console.log(data);
            start();
        });
});

// You can use $typekey, Type or type to specify the type of object to create.
// Just Title and Description leads to a Thought.
asyncTest('Upsert with just Title/Description gives a Thought', function() {
    var entity = {
        Title: "Elvis",
        Description: "The King"
    };

    expect(1);
    Qwiery.upsertEntity(entity).then(function(id) {
        Qwiery.getEntity(id).then(function(data) {
            ok(data.DataType === "Thought");
            start();
        });
    });
});

asyncTest('Upsert with Type specification.', function() {
    var entity = {
        Title: "Elvis",
        Description: "The King",
        Type: "Address"
    };

    expect(1);
    Qwiery.upsertEntity(entity).then(function(id) {
        Qwiery.getEntity(id).then(function(data) {
            ok(data.DataType === "Address");
            start();
        });
    });
});

asyncTest('Get/upsert many entities.', function() {
    var entities = [];
    for(var k = 0; k < 7; k++) {
        entities.push({
            Title: "Entity " + Qwiery.randomId()
        });
    }

    expect(3);
    Qwiery.upsertEntities(entities).then(function(ids) {
        ok(ids.length === 7);
        Qwiery.getEntities(ids).then(function(data) {
            ok(Qwiery.isDefined(data));
            ok(data.length === 7);
            start();
        });
    });
});


asyncTest('Get and update an entity', function() {
    var product = {
        UnitPrice: Math.floor(Math.random() * 1000),
        UnitsInStock: 95,
        Discontinued: false,
        DataType: "Product",
        Title: "GetEntity test " + Qwiery.randomId(),
        "Id": Qwiery.guid(),
    };
    var newTitle = "New title " + Qwiery.randomId();
    expect(3);
    // add it
    $.when(Qwiery.upsertEntity(product))
        .then(function(id) {
            ok(id !== null);
            console.log("New entity added: " + id);
            // get it
            $.when(Qwiery.getEntity(id)).then(function(data) {
                ok(data.Id === id);
                data.Title = newTitle;
                // update it
                $.when(Qwiery.upsertEntity(data)).then(function(id) {
                    // get it again
                    $.when(Qwiery.getEntity(id)).then(function(newdata) {
                        ok(newdata.Title === newTitle);
                        start();
                    });
                });
            });
        });
});


asyncTest('Add/Get/Delete an entity', function() {
    var product = {
        UnitPrice: Math.floor(Math.random() * 1000),
        UnitsInStock: 95,
        Discontinued: false,
        DataType: "Product",
        Title: "GetEntity test " + Qwiery.randomId(),
        "Id": Qwiery.guid(),
    };
    expect(4);
    $.when(
        Qwiery.upsertEntity(product)
        )
        .then(function(id) {
            ok(id !== null);
            console.log("New entity added: " + id);
            $.when(Qwiery.getEntity(id)).then(function(data) {
                ok(data.Id === id);
                console.log("Entity was fetched.");
                $.when(Qwiery.deleteEntity(id)).then(function(success) {
                    ok(success === true);
                    $.when(Qwiery.getEntity(id)).then(function(shouldbeempty) {
                        ok(shouldbeempty === null);
                        console.log("Entity was deleted.");
                        start();
                    });
                });
            });
        });
});