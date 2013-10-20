
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/chunk',function(req,res)
{
	var input = req.query.items;
    var numOfChunks = req.query.chunk;

	var getChunk= function(input,num)
		{
		    var division=Math.floor(input.length/num);
		    var remainder=input.length%num;
		    var chunks=[];
		    for(i=0;i<num-remainder;i++)
		    {
		    	var chunk= input.splice((input.length-division));
		    	chunks.push(chunk);
		    }
		    for(i=0;i<remainder;i++)
		    {
		    	var chunky= input.splice(input.length-(division+1));
		    	chunks.push(chunky);
		    }
			return chunks.reverse();
		};
    res.send(getChunk(input,numOfChunks));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
