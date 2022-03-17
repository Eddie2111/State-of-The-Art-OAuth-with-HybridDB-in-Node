
var express   = require('express');
var app       = express();
var $         = require('jquery')
var database  = require('./database/db');
var data      = require('./pages/pages');
var bodyParser = require('body-parser');
var session   = require('express-session');
var cookieParser = require('cookie-parser');
// active databases

// database.mongoDatabase();
// database.mysqlDatabase();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
// database


//let data = {name: req.body.name};
//  let sql = "INSERT INTO users SET ?";
//  let query = conn.query(sql, data,(err, results) => {
//    if(err) throw err;
//    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//  });


// use res.render to load up an ejs view file

// index page
var pagedata = data;

app.get('/', function(req, res) {

  var pagedata = data;

  res.render('pages/index', {
      mascots: pagedata.homepage.mascots,
      tagline: pagedata.homepage.tagline,
      name: pagedata.homepage.name,
      title: pagedata.homepage.title
  });
});


// calendar page
app.get('/calender', function(req, res) {
    res.render('pages/calender',{title: pagedata.calender.title});
  });

// about page
app.get('/about', function(req, res) {
  res.render('pages/about',{title:pagedata.about.title});
});

//database rendering test
app.get('/database', function(req, res) {
const testarray = ['varios', 'varios2', 'varios3'];
console.log(req.query);
const id = req.query.id;

function callback(id){
  const sql = 'SELECT * FROM experiment WHERE id = '+id;
  database.mysqli.query(sql, (err,results) => {
    if(err) throw err;
    else{

    const result = {
        name     : results[0].name,
        userID   : results[0].userID,
        id       : results[0].id
    }

    res.render('pages/database',{
      title:pagedata.database.title,
      data:result.id,
      id:result.id,
      name:result.name,
      userID:result.userID,
      mascots: pagedata.homepage.mascots, 
      testarray: testarray
    });

    } // end of getting data as "Else"
}); //end of query
}; //end of callback 
callback(id); //(provide id)

});


// experiment page
app.get('/experiment', function(req, res) {
  res.render('pages/experiment',{title:pagedata.experiment.title});
});

// connection created
app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
});


