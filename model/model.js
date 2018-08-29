const ObjectId = require('mongodb').ObjectID;

module.exports = {
  getCollection: function(db, client_id,cb) {
    const collection = db.collection('meta');
    // Check if client_id is malformed;  must be a string of 24 hex characters
    if (client_id.length !== 24) {
      console.log("Malformed client_id, open logging failed (for now...)");
      // TODO: handle failed opens here somehow, maybe stick an in 'Other' collection tied to client.close();
      return;
    }
    collection.findOne({ "_id" : new ObjectId(client_id) }, function(e, r) {
      if (e) throw e;
      if (!r) {
        console.log("Bad client ID, returning");
        return;
      }
      cb(r.client);
    });
  },
  updateOrAdd: function(db, collectionName, encodedEmail, creativeId, cb) {
    const collection = db.collection(collectionName);
    collection.update(
      // QUERY
      {encoded_email: encodedEmail, date: new Date().toISOString().split('T')[0], creative_id: creativeId, client_name: collectionName},
      // UPDATE
      {$inc: {count: 1}, $set: {client_name: collectionName, encoded_email: encodedEmail, date: new Date().toISOString().split('T')[0]}},
      // OPTIONS
      {upsert: true},
      // CALLBACK
      function(e, r) {
        if (e) throw e;
        cb(r);
      }
    )
  }
}
