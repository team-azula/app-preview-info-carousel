const express = require('express');
const path = require('path');
const Carousels = require('../database/model.js');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express();
const PORT =  3003;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 'http://ec2-52-53-128-255.us-west-1.compute.amazonaws.com:80'

// 52.53.128.255
// http://localhost:3003/?id=3

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/carousels/:id', (req, res) => {
  Carousels.find({id: req.params.id}, (err, results) => {
    if (err) {
      return console.log('error getting from db: ', err)
    }
    res.json(results)
  })
})



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app



