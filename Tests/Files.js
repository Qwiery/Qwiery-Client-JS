QUnit.module("Files" );
asyncTest('Get files', function() {

    var image = {
        Type: "Image",
        Title: "Files test " + Qwiery.randomId(),
        "Id": Qwiery.guid(),
        DataType: "Image"
    };

    var doc = {
        Type: "Document",
        Title: "Files test " + Qwiery.randomId(),
        "Id": Qwiery.guid(),
        DataType: "Document"
    };
    expect(3);
    $.when(Qwiery.upsertEntity(image), Qwiery.upsertEntity(doc))
        .then(function() {
            //_.forEach(files, function(f){
            //    console.log(f.Title);
            //});
            $.when(Qwiery.getFiles())
                .then(function(files) {

                    ok(files.length > 0);
                    var foundImage = _.contains(files, function(r) {
                        return r.Id === image.Id
                    });
                    var foundDocument = _.contains(files, function(r) {
                        return r.Id === doc.Id
                    });
                    ok(Qwiery.isDefined(foundImage));
                    ok(Qwiery.isDefined(foundDocument));

                    start();

                });

        });
});

asyncTest('Get images', function() {

    var im1 = {
        DataType: "Image",
        Title: "Files test " + Qwiery.randomId(),
        "Id": Qwiery.guid()
    };

    var im2 = {
        DataType: "Image",
        Title: "Files test " + Qwiery.randomId(),
        "Id": Qwiery.guid()
    };


    expect(3);
    $.when(Qwiery.upsertEntity(im1), Qwiery.upsertEntity(im2))
        .then(function() {
            //_.forEach(files, function(f){
            //    console.log(f.Title);
            //});
            $.when(Qwiery.getImages())
                .then(function(files) {

                    ok(files.length > 0);
                    var foundImages = _.filter(files, function(r) {
                        return r.Id === im1.Id || r.Id === im2.Id;
                    });

                    ok(Qwiery.isDefined(foundImages));
                    ok(foundImages.length === 2);

                    start();

                });

        });
});


asyncTest('Get documents', function() {

    var doc1 = {
        DataType: "Document",
        Title: "Files test " + Qwiery.randomId(),
        "Id": Qwiery.guid()
    };

    var doc2 = {
        DataType: "Document",
        Title: "Files test " + Qwiery.randomId(),
        "Id": Qwiery.guid()
    };


    expect(3);
    $.when(Qwiery.upsertEntity(doc1), Qwiery.upsertEntity(doc2))
        .then(function() {
            $.when(Qwiery.getDocuments())
                .then(function(files) {

                    ok(files.length > 0);
                    var docs = _.filter(files, function(r) {
                        return r.Id === doc1.Id || r.Id === doc2.Id;
                    });

                    ok(Qwiery.isDefined(docs));
                    ok(docs.length === 2);

                    start();

                });

        });
});


asyncTest('Get entity files', function() {

    var im1 = {
        DataType: "Image",
        Title: "Files test " + Qwiery.randomId(),
        "Id": Qwiery.guid()
    };

    var im2 = {
        DataType: "Image",
        Title: "Files test " + Qwiery.randomId(),
        "Id": Qwiery.guid()
    };

    var thought = {
        DataType: "Thought",
        Title: "Files test " + Qwiery.randomId(),
        "Id": Qwiery.guid()
    };

    expect(4);
    $.when(Qwiery.upsertEntity(thought), Qwiery.upsertEntity(im1), Qwiery.upsertEntity(im2))
        .then(function() {
            $.when(Qwiery.connect(thought.Id, im1.Id), Qwiery.connect(thought.Id, im2.Id)).then(
                function() {
                    $.when(Qwiery.getEntityAllImages(thought.Id))
                        .then(function(files) {

                            ok(files.length > 0);
                            var ims = _.filter(files, function(r) {
                                return r.Id === im1.Id || r.Id === im2.Id;
                            });

                            ok(Qwiery.isDefined(ims));
                            ok(ims.length === 2);

                            $.when(Qwiery.getEntityRandomImage(thought.Id, ctx)).then(function(file) {
                                ok(Qwiery.isDefined(file));
                                _.forEach(files, function(f) {
                                    console.log(f.Title);
                                });
                                console.log("Random: " + file.Title);
                                start();
                            });


                        });
                }
            );

        });
});

