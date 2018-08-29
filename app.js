require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const express = require('express');
const bp = require('body-parser');
const base64 = require('base-64');
const path = require('path');
const model = require('./model/model')

const mongoConnectStringLocal = 'mongodb://localhost:27017';
// const mongoConnectString = 'mongodb+srv://' + process.env.MONGOUSER + ':' + process.env.MONGOPASS + '@' + process.env.MONGOURL;

let app = express();

// Remove X-Powered-By
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});

const dbName = 'cOpens';


app.get('/trk/:client_id/:encoded_email/:creative_id', function(req, res) {
  // Do stuff with the encoded info
  MongoClient.connect(mongoConnectStringLocal, { useNewUrlParser: true }, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    model.getCollection(db, req.params.client_id, function(r) {
      console.log(r);
      model.updateOrAdd(db, r, req.params.encoded_email, req.params.creative_id, function(r) {
        console.log("Document Inserted");
        client.close();
      });
    })
  });
  res.status(200).type('png').sendFile(path.join(__dirname + '/pixel/px.png'));
});



app.listen(3000, function() {
  console.log('listening on port 3000');
})
