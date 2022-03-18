const User      = require('./user');
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
        console.log("Problems encountered while connecting to MongoDB");
    }
    else{
    console.log("MongoDB Connected!");
    }

});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});
run();
async function run(){
    const user = new User({
        name: 'John',
        email: 'test@testmail.com',
        password: 'test'
    });
await user.save().then(()=>console.log("User saved!")).catch((e)=>console.log(e));
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