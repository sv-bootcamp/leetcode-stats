var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
});


var cheerio = require('cheerio');
var request = require('request');

var name = [];
//this is a list of acceptance numbers in anonymous
var solvedProblem = [];

name.push('fguy'); // PL Taehoon Kim
name.push('ethkim'); // PL DH Kim

//here I will leave my id as a punishment(?) kkk
name.push('ochanje210'); // Youngchan Je


//This is where webcrawling happens
for (var i = name.length - 1; i >= 0; i--) {
  request('https://leetcode.com/'+name[i]+'/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var c = cheerio.load(body);
      //solved problem
      //c('.badge').eq(0).text().trim()
      //aceptence num
      //c('.badge').eq(1).text().trim()
      //acceptence rate
      //c('.badge').eq(2).text().trim()
      solvedProblem.push(parseInt(c('.badge').eq(0).text().trim()));
      
    };
  });
};

var port = 8081;
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
  socket.emit('message', {
    msg: solvedProblem
  });
});

console.log("Listening on port " + port);
