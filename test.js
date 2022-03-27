
var express   = require('express');
var app       = express();
var $         = require('jquery')
var database  = require('./database/db');
var data      = require('./pages/pages');
var session   = require('express-session');
var multar    = require('mutlar');

//var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');

// active databases


// set the view engine to ejs
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


// use res.render to load up an ejs view file
app.set('view engine', 'ejs');

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


// index page
var pagedata = data; //loads all required page data

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

const id = req.query.id;

function callback(id){
  if (!id){  // if id is not defined or is null
    res.render('pages/database',{
      title:pagedata.database.title,
      data    : " ",
      id      : " ",
      name    : " ",
      userID  : " ",
      mascots : pagedata.homepage.mascots, 
      testarray: testarray
    });
  }
  else{
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
  } // end of else
}; //end of callback 
database.mongoDatabase();
callback(id); //(provide id)

});


// experiment page
app.get('/experiment', function(req, res) {
  res.render('pages/experiment',{title:pagedata.experiment.title});
});

app.get('/form', function(req,res){
    //const sql = 'SELECT * FROM experiment WHERE id = '+id;
    const sql ="SELECT * FROM experiment WHERE name LIKE '%"+id+"%'";
    database.mysqli.query(sql, (err,results) => {
    if(err) throw err;
    else{

    const result = {
        name     : results[0].name,
        userID   : results[0].userID,
        id       : results[0].id
    }
  
  res.render('pages/form'){title:pagedata.form.title});
});

// connection created
app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
});


