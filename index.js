require('dotenv').config();
const database = require('./database/db');
const express = require('express');
const app = express();


const port = 3000;

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    database.mongoDatabase();
    var data = {name: "khan", title:"home", tagline: "some tagline"};
    res.render('pages/about',{
        name:data.name,
        title: data.title,
        tagline: data.tagline,
    });
    });

app.listen(port, () => {
  console.log('Server started on port ' + port);
});

//////////////////////////////////////////////////////////////////////////////////////////////**var sqldraft = 
//var sql = "INSERT INTO users SET ?";
//var query = database.mysqlDatabase().query(sql, data,(err, results) => {
//    if(err) throw err;
//    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//});
 //////////////////////////////////////////////////////////////////////////////////////////////