/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var port = process.env.PORT;
var data = require('./data.js');
var books = data.books;
var routes;

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
  book.readed = req.body.readed;
  if (book.readed){
    if (book.year == null){
      setDate(book);
    }
  } else {
    book.day = null;
    book.month = null;
    book.year = null;
  }

  function setDate(book){
    var date = new Date();
    book.day = date.getDate();
    book.month = date.getMonth() + 1;
    book.year = date.getFullYear();
  }

  res.sendStatus(200);
});

app.get('/books', function(req,res){
  if (req.query.year === undefined){
      res.send(books);
    } else {
      console.log(req.query.year);
      res.send(books.filter(b=> b.year == req.query.year));
  }
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
    case 'production':
        console.log('** FINAL **');
        app.use(express.static('./app/'));
        app.use(express.static('./'));
        // app.use(express.static('./tmp'));
        app.use('/*', express.static('./app/index.html'));
    break;
    default:
        port = 7203;
        console.log('** DEV1 **');
        app.use(express.static('./app/'));
        app.use(express.static('./'));
        // // app.use(express.static('./tmp'));
        app.use('/*', express.static('./app/index.html'));
    break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
