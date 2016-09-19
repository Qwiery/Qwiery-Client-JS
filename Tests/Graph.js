QUnit.module("Graph" );
asyncTest('Connect entities', function() {
    var john = {
        FirstName: 'John',
        LastName: 'Carston',
        DataType: "Person",
        Title: "Entity test " + Qwiery.randomId()
    };
    var maria = {
        FirstName: 'Maria',
        LastName: 'Olguar',
        DataType: "Person",
        Title: "Entity test " + Qwiery.randomId()
    };
    var johnId, mariaId;
    expect(3);
    $.when(Qwiery.upsertEntities([john, maria]))
        .then(function(u) {
            johnId = u[0];
            mariaId = u[1];
            $.when(Qwiery.linkEntities(johnId, mariaId, 'awesome')).then(function(linkId) {
                ok(linkId !== null);
                $.when(Qwiery.getRelated(johnId)).then(function(relatedNodes) {
                    ok(relatedNodes.length === 1);
                    ok(relatedNodes[0].Relationship === 'awesome');
                    start();
                });
            });
        });
});