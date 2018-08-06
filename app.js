require('dotenv').config();
const mongodb = require('mongodb');
const express = require('express');
const bp = require('body-parser');
const base64 = require('base-64');
const mongoose = require('mongoose');
const path = require('path');
const Schema = mongoose.Schema;

const imgByteString = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=';
const buf = Buffer.from(imgByteString, 'base64');


const mongoConnectString = 'mongodb+srv://' + process.env.MONGOUSER + ':' + process.env.MONGOPASS + '@' + process.env.MONGOURL;

const connection = mongoose.createConnection(mongoConnectString);

let app = express();

// app.use(bp.urlencoded({ extended: true }));
// app.use(bp.json());

const openSchema = new Schema({
  client_id: String,
  date: { type: Date, default: Date.now },
  email: String,
  creative_id: String
});

const cOpen = mongoose.model('cOpens', openSchema);

app.get('/:client_id/:encoded_email/:creative_id', function(req, res) {
  // Do stuff with the encoded info
  let open = new cOpen({client_id: req.params.client_id, email: req.params.encoded_email, creative_id: req.params.creative_id})

  res.sendFile(path.join(__dirname + '/pixel/px.png'));
})

app.listen(3000, function() {
  console.log("Listening on port 3000");
})
