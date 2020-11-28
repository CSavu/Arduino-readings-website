const express = require("express");
const app = express();
var mysql = require('mysql');
var fs = require('fs');

var selectQ = "SELECT * FROM readings";
var json;
var obj = {
  "readings": []
}

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "alcohol"
});

con.connect(function(err) {
  if (err) throw err;
  cn();
  function cn()
  {
      con.query(selectQ, function (err, result, fields) {
        if (err) throw err;

        console.log("success");
        fs.readFile(__dirname + '/public/data.json', 'utf-8', function(err, data){
          if (err) throw err;

          obj.readings = []; // clear the array & json file before adding new elements
          obj.readings.push(result);
          json = JSON.stringify(obj);
          fs.writeFile(__dirname + '/public/data.json', json, function(){});
        });
      });
  }
  setInterval(cn, 5000);
});

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
