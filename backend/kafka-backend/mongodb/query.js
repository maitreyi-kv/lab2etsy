var mongo = require('mongodb');




MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.listCollections({}).toArray(function(err, collections) {
        assert.equal(null, err);
        collections.forEach(function(collection) {
            console.log(collection);
        });
        db.close();
    })
    response.send('Connected - see console for a list of available collections');
  });