const newRelic = require('newrelic');
const express = require('express');
const path = require('path');
const model = require('../models/postgresModel.js');
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
  console.log('req.params.id: ', req.params.id);
  const { id } = req.params;
  model.getOneById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log('')
    });
});

app.post('/carousels', (req, res) => {
  let data = req.body;
  if (data._id) {
    res.status(403).send('cannot post to database with existing _id');
  }
  return model.insertOne(data)
    .then((response) => {
      console.log('response from insertOne: ', response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log('error in app.post() endpoing: ', err);
      res.status(500).send(err);
    });
});

app.put('/carousels/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  model.updateCarousel(id, data)
    .then((response) => {
      console.log('response from updateCarousel: ', response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log('error inside endpoint app.put(): ', err);
      res.status(500).json(err);
    });
});

app.delete('/carousels/:id', (req, res) => {
  const { id } = req.params;
  model.deleteCarousel(id)
    .then((response) => {
      console.log('response in endpoint app.delete(): ', response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log('error in endpoint app.delete(): ', err);
      res.status(500).json(err);
    });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app



