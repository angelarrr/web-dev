var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3003);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  var qParams = [];

  for (var q in req.query){
    qParams.push({'key': q,'value': req.query[q]});
  }

  var context = {};
  context.getDataList = qParams;
  context.requestType = 'GET';

  res.render('request', context);
});

app.post('/', function(req,res){
  var qParams = [];
  for (var p in req.query) {
  	qParams.push({'key': p, 'value': req.query[p]});
  }
  var context = {};
  context.qDataList = qParams;

  var data = [];
  for (var p in req.body){
    data.push({'key': p,'value': req.body[p]});
  }
  context.postDataList = data;

  context.requestType = 'POST';
  res.render('request', context);
});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log("Express started on port " + app.get('port'));
})