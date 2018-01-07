//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bordyparser = require('body-parser');
var cors = require('cors');

var app = express();

//connecting to mongodb
mongoose.connect('mongodb://localhost:27017/tourofheroes');

//on connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database @27017');
});

mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('Error in database connection' + err);
  }
});

const route = require('./routes/heroRoutes');

//adding middleware
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bordyparser.json());
app.use(bordyparser.urlencoded({'extended':'true'}));


//add routes
app.use('/api', route);

  // app.get('/', (req, res) => {
  //   res.send('oksia');
  // });

//testing server
const port = 3000;
app.listen(port, () => {
  console.log('Server Started at port: ' + port);
});
