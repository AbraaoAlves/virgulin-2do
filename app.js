var express = require('express'),
    load = require('express-load'),
    mysql= require('mysql'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.cookieParser('crud_node'));
app.use(express.session());

//app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
//
app.use(express.static(__dirname + '/public'));
app.use(app.router);


load('models')
.then('controllers')
.then('routes').into(app);



app.use(function(req, res, next) {

	res.status(404);
	res.render('not-found');
 
});

app.use(function(error, req, res, next) {
  
	res.status(500);
	res.render('server-error', {error: error});

});

server.listen(app.get('port'),function(){
  
	console.log("servidor no ar");

});

