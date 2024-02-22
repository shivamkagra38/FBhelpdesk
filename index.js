//Importing Modules
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

//
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static("views/static"));
//

//Establising Mysql Connetion
var con = mysql.createConnection({
  host: "db4free.net",
  user: "shivamk",
  password: "ravi*123#",
  database:"projecttsi"
});

con.connect(function(err){

  if(err){
    console.log("Error !");
  }
  else
  {
    console.log("Connected !");
  }

});
//

app.listen(8080); // Setting port
console.log("Server Started on port 8080"); // Server Started Message

app.get('/', function(req, res){ //Create Account
    res.render("CreateAccount") ;
  });

app.get('/login', function(req, res){ // Login Page
    res.render("Login") ;
  });

  app.post('/signup', function(req, res){ // Sign up 
    var request = req.body;
    var sql = "INSERT INTO info (name, email,password,remember) VALUES ('"   + request.name + "','" + request.email + "','" + request.password + "','" + request.remember+"')" ;
    con.query(sql,function(err){

      if(err)
      {
        console.log(err);
        res.send("Not able to connect with database ! ");
      }
      else
       {
       // res.render("Login");
       res.redirect('/login');

       }
    });
    
  });

  app.post('/loginRequest', function(req,res){

    var request = req.body;
    var sql = "SELECT name,email,password FROM info WHERE email='"+request.email+"' AND "+"password='"+request.password+"'";
    con.query(sql,function(err,result)
    {

      if(err)
      {
        console.log(err);
        res.send("Not able to connect with database ! ");
      }
      else{
        console.log(result);
        if(Object.keys(result).length==0)
        {
          res.send("User Not Identified !");
        }
        else{
        res.send("Login Succesful !");
        }
      }
    
    });

  });