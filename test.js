
var express   = require('express');
var app       = express();
var $         = require('jquery')
var database  = require('./database/db');
var data      = require('./pages/pages');
var session   = require('express-session');
//var bodyParser = require('body-parser');
//const { urlencoded } = require('body-parser');

//var cookieParser = require('cookie-parser');

// active databases

//active body parsing for post requests
app.use(express.urlencoded({extended: true}));
app.use(express.json())


// set the view engine to ejs



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
//database.mongoDatabase();
callback(id); //(provide id)

});


// experiment page
app.get('/experiment', function(req, res) {
  res.render('pages/experiment',{title:pagedata.experiment.title});
});

// form pages
app.get('/form', function(req, res) {
  const searchTemplate= " ";
  res.render('pages/form',{
    title:pagedata.form.title,
    keyword:"",
    products:[],
    searchedFor:searchTemplate,
  });
});


app.post('/form', function(req, res) {
  var postData = req.body;
  var searchTemplate = "you searched for ''"+postData.name+"''.";
//mysql query run test
  const sql = "SELECT * FROM `table2` WHERE description LIKE '%"+postData.name+"%'";
  database.mysqli.query(sql, (err,results) => {
if(err){
  console.log(err.message);
} 
console.log(results);
res.render('pages/form',{
  title:pagedata.form.title,
  searchedFor:searchTemplate,
  products:results,
});
}); //end of query
//mysql query run test
  //console.log(postData); check if postData is working
});

app.get("/prac1", function(req,res){
  var searchtemplate = "Type in the box and click submit to render data";  
  res.render('pages/prac1',
  {title:pagedata.prac1.title,
  searchedFor:searchtemplate,}
  );
});
app.post("/prac1",function(req,res){
  var data = req.body;
  var searchtemplate = "you searched for "+data.keyword+".";
  const sql = "SELECT * FROM `table1` WHERE Department LIKE '% "+data.keyword+ "%' ";
  database.mysqli.query(sql,(err,results)=>{
    if (err){
      console.log(err.message);
    }
    console.log(results);
  res.render('pages/prac1',
  {title:pagedata.prac1.title,
  searchedFor:searchtemplate,
});
});
})



//example post request
app.post("/yourpath", (req, res)=>{

  //var postData = req.body;
  //Or if this doesn't work
  var postData = JSON.parse(req.body);
  console.log(postData);
});



// connection created
app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
});


