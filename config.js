const mysql = require("mysql");
const con= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"users_node_mysql_db"
});

con.connect((err)=>{
    if(err)
    {
        console.warn("error in connection")
    }
    console.log('connection sucessful')
});

module.exports =con;