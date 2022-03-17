const mongoose = require('mongoose');
const mysql = require('mysql');

// database

const mysqli = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'practicedb'
});

function mysqlDatabase() {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'practicedb'
    });
    let sql = 'SELECT * FROM experiment WHERE id = 1';
    let query = connection.query(sql, (err,results) => {
        if(err) throw err;
        else{
        const result = {
            name    : results[0].name,
            email   : results[0].email,
            id      : results[0].id
        }
        //console.log(result);
        }
    });
    connection.end();   
}



function mongoDatabase() {
    var url = "mongodb://localhost:27017/";
    mongoose.connect(url, function(err, db) {
        if (err) throw err;
        //console.log("NOSQL Connected!");
        db.close();
    });
}



module.exports = {mongoDatabase, mysqlDatabase, mysqli};