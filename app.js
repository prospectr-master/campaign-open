require('dotenv').config();
const mongodb = require('mongodb');
const express = require('express');
const bp = require('body-parser');
const base64 = require('base-64');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgByteString = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=';
const buf = Buffer.from(imgByteString, 'base64');


const mongoConnectString = 'mongodb+srv://' + process.env.MONGOUSER + ':' + process.env.MONGOPASS + '@' + process.env.MONGOURL;

let app = express();

// app.use(bp.urlencoded({ extended: true }));
// app.use(bp.json());

app.get('/:client_id/:encoded_email/:message_id', function(req, res) {
  // Do stuff with the encoded info

})

app.listen(3000, function() {
  console.log("Listening on port 3000");
})
