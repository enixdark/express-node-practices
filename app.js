/**
 * Created by enixdark on 12/14/14.
 */

var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var cons = require('consolidate');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');


var app = express();
//app.engine('html',cons.swig);
//app.set('view engine','html');
//app.set('views',__dirname + "/views");
app.use(bodyParser.urlencoded({
    extended: true
}));
//var handlebars = require('express3-handlebars')
//    .create({ defaultLayout:'main' });
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
//app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
//app.set('views',__dirname + "/views");
//app.use(express.compress());
app.use(express.static(__dirname + '/static'));
//app.use(express.static(__dirname + '/views'));

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});


app.get("/",function(req,res){
    //if(err){
    //    throw err;
    //}
    res.render('home');
});

app.get('/about',function(req,res,next){
    //if(err){
    //    throw err;
    //}

    var foo = require("./static/js/fortune");
    res.render('about',{ fortune : foo.getFortune(),pageTestScript: '/qa/test-about.js' });
});

app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});



app.use(function(err,req,res,next){
    //if(err){
    //    throw err;
    //}
    res.status(404);
    res.render('error/404_page');
});

app.use(function(err,req,res,next){
    if(err){
        throw err;
    }
    res.status(500);
    res.render('error/505_page');
});




//function serverStatic(res,path,contentType,responseCode){
//    if(!responseCode)
//        responseCode = 200;
//    fs.readFile(__dirname+path,function(err,data){
//        console.log(__dirname);
//       if(err){
//           throw err;
//       }
//       else{
//           res.writeHead(responseCode,{'Content-Type':contentType});
//           res.end(data);
//       }
//    });
//}
//
//http.createServer(function(req,res){
//    //res.writeHead(200,{"Content-type":"text/plain"});
//    //res.end("hello world");
//    var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
//    switch (path){
//        case '':
//            serverStatic(res,'/views/index.html',{"Content-type":"text/html"});
//            break;
//        case '/angular':
//            serverStatic(res,'/static/bower_components/angular/angular.js',{"Content-type":"text/javascript"});
//            break;
//        default:
//            serverStatic(res, '/views/error/404_page.html', 'text/html', 404);
//            break;
//    }
//}).listen('3000');
app.listen(8000,function(err) {
    if(err) throw err;
    console.log("this server starting at localhost:8000");
    console.log(__dirname);

});