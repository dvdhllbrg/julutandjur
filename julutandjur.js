const express = require('express');
const apicache = require('apicache').middleware;
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const gm = require('gm').subClass({imageMagick: true});
const app = express();
const storage = multer.diskStorage({

  destination: function(req, file, cb) {
    cb(null, 'public/img');
  },
  filename: function(req, file, cb) {
    var ext;
    if(file.mimetype == 'image/jpeg') {
      ext = '.jpg';
    } else if (file.mimetype == 'image/png') {
      ext = '.png';
    }
    cb(null, req.body.slug + ext);
  }
});
const upload = multer({storage: storage});

const cacheHeaders = {
  'Last-Modified': 'Tue, 6 Dec 2016 16:32:41 GMT',
  'Expires': new Date(Date.now() + 2592000000).toUTCString(),
  'Cache-Control': 'public, max-age=2592000',
  'Vary': 'Accept-Encoding'
};

// serve static assets normally
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/julutandjur');
const Recipe = mongoose.model('Recipe', {
  name: String,
  slug: String,
  category: String,
  info: String,
  srcName: String,
  src: String,
  ingredients: String,
  text: String,
  image: String
});

/*
app.post('/recipes/image', upload.single('img'), function(req, res) {
  res.send('OK');
});

app.post('/recipes', function(req, res) {
  var r = new Recipe(req.body);
  r.save(function(err) {
    res.send('OK');
  });
});
*/

app.get('/recipes', apicache('30 days'), function(req, res) {
  Recipe.find(function(err, recipes) {
    res.set(cacheHeaders);
    res.json(recipes);
  });
});

app.get('/recipes/categories', apicache('30 days'), function(req, res) {
  Recipe.distinct('category', function(err, categories) {
    res.set(cacheHeaders);
    res.json(categories);
  });
});

app.get('/recipes/:category', apicache('30 days'), function(req, res) {
  Recipe.find({category: req.params.category}, function(err, recipe) {
    if(recipes.length == 0) {
      res.status(404).send('Not found');
    } else {
      res.set(cacheHeaders);
      res.json(recipes);
    }
  });
});

app.get('/recipes/:category/:slug', function(req, res) {
  Recipe.find({slug: req.params.slug}, function(err, recipe) {
    if(recipe.length == 0) {
      res.status(404).send('Not found');
    } else {
      res.set(cacheHeaders);
      res.json(recipe);
    }
  });
});

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(8083, '127.0.0.1');
