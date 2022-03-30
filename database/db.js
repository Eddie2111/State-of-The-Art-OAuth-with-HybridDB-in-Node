//const User      = require('./user');
const mongoose  = require('mongoose');
const mysql     = require('mysql');

// database

const mysqli = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'practicedb'
});


var url = "mongodb://localhost:27017/practicedb";
mongoose.connect(url, (e)=>{
    if (e) {
        console.log("Problems encountered while connecting to MongoDB"+e.message);
    }
    else{
    console.log("MongoDB Connected!");
    }

});

/// created for mongoose and future use

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

/// created for mongoose and future use

//run();
async function run(){
    const user = new User({
        userID: "user_0001",
        name: 'John',
        email: 'test@testmail.com',
        age: 21
    });
await user.save().then(()=>console.log("User saved!")).catch((e)=>console.log(e.message));
console.log(user);

}



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