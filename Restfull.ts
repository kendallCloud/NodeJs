var require;
//conectar BD
var mysql = require('mysql');
var bodyParser = require('body-parser');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4321",
  port:'3306',
  database:"mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//conectar a puerto

const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log("El servidor está inicializado en el puerto 8080");
 });

app.get('/get',function (req, res) {
  var sql = "SELECT * FROM posts;" 
  con.query(sql, function (err,result) {  
  if (err) throw err; 
  res.send(result);
  console.log(result);
  }); 

});

app.post('/post', function (req, res) {
  console.log(JSON.stringify(req.body));

  var sql ="INSERT INTO `posts` (`title`, `status`,`content`,`user_id`) VALUES (?)";
  con.query(sql,req.body,function (err, result) {  
  if (err) throw err;  
  console.log("1 record inserted");  
  });  

  res.send(req.status);
});

app.post('/editar', function (req, res) {
  console.log("entra a editar");
  console.log(JSON.stringify(req.body));
  var id= req.body.id;
  var updateData=req.body;
  var sql = "UPDATE `posts` SET title = ? WHERE id= ?";
  con.query(sql, [updateData.title, id], function (err, data) {
  if (err) throw err;
  console.log(data.affectedRows + " record(s) updated");
});

  res.send(req.status);
});



app.delete('/delete',function (req, res) {
    var sql = "DELETE FROM posts WHERE id = ?;";
    con.query(sql,req.body.id,function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
});