/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var port = process.env.PORT;
var routes;
// var books = [];
var books = [{
  id: "568bfa64-6357-4df0-b286-397e74f339de",
  title: "The Lord of the Rings",
  description: "In ancient ting it with his own power so that he could rule all others.",
  isbn: "234234235",
  coverUrl: "https://images-na.ssl-images-amazon.com/images/I/51eq24cRtRL._SX331_BO1,204,203,200_.jpg"
}];

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());
app.use(cors());

var environment = process.env.NODE_ENV;

app.get('/person', function(req,res){
  res.send('Daniel');
});

app.post('/books', function(req, res){
  books.push(req.body);
  res.sendStatus(200);
});

app.put('/books', function(req, res){
  var book = books.find(b=> b.id == req.body.id);
  book.title = req.body.title;
  book.description = req.body.description;

  res.sendStatus(200);
});

app.get('/books', function(req,res){
  res.send(books);
});

app.get('/books/:id', function(req,res){
  var book = books.find(b=>b.id == req.params.id);
  res.send(book);
});

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    case 'dev':
        port = 7203;
        console.log('** DEV **');
        app.use(express.static('./app/'));
        app.use(express.static('./'));
        // app.use(express.static('./tmp'));
        app.use('/*', express.static('./app/index.html'));
    break;
    default:
        console.log('** FINAL **');
        app.use(express.static('./app/'));
        app.use(express.static('./'));
        // app.use(express.static('./tmp'));
        app.use('/*', express.static('./app/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
