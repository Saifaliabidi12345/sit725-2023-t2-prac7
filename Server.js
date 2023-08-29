const express = require('express');
const app = express();
const port = 3000;
require('./DBconnection');
let router = require('./Routers/Router');
app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router); 

// Simple funtion of addition of two number for testing purpose
app.get("/addTwoNumbers/:firstNumber/:secondNumber", function (req, res, next) {
    var firstNumber = parseInt(req.params.firstNumber);
    var secondNumber = parseInt(req.params.secondNumber);
    var result = firstNumber + secondNumber || null;
  if(result == null) {
    res.json({result: result, statusCode: 400}).status(400)
  }
  else {res.json({result: result, statusCode: 200}).status(200)}
 })

app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
