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
app.engine('handlebars', exphbs({defaultLayout: 'main',
                                helpers: {
                                    section: function(name, options){
                                        if(!this._sections) this._sections = {};
                                        this._sections[name] = options.fn(this);
                                        return null;
                                    }
                                }}));
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

app.get('/nursery-rhyme', function(req, res){
    res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function(req, res){
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck'
    });
});
//app.use(function(req, res, next){
//    var foo = require("./static/js/partials");
//
//    if(!res.locals.partials) res.locals.partials = {};
//    res.locals.partials.weather = foo.getWeatherData();
//    next();
//});

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

app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});


app.get('/test',function(req,res,next){

    res.render('test',{
        currency: {
            name: 'United States dollars',
            abbrev: 'USD'
        },
        tours: [
            { name: 'Hood River', price: '$99.95' },
            { name: 'Oregon Coast', price: '$159.95' }
        ],
        specialsUrl: '/january-specials',
        currencies: [ 'USD', 'GBP', 'BTC' ]
    });

});

var tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 },
];

//app.get('/api/tours', function(req, res){
//    res.json(tours);
//});

app.put('/api/tour/:id', function(req, res){
    var p = tours.some(function(p){ return p.id == req.params.id });
    if( p ) {
        if( req.query.name ) p.name = req.query.name;
        if( req.query.price ) p.price = req.query.price;
        res.json({success: true});
    } else {
        res.json({error: 'No such tour exists.'});
    }
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