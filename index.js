/**
 * Root vars 
 **/

let express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
let dbConn = require('./BackEnd/database/config');
const beRoutes = require('./BackEnd/Routes/api');
//const feRoutes = require('./FrontEnd/routes/web');

/**
 * Initialization
 **/
let app = express();
//initialize json parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({ extended: false })
);
//setting the use of cross origin request source to connect with angular app
app.use(cors());
//setting the static path for routing resources
app.use(express.static(path.join(__dirname, 'FrontEnd')));
//setting location of node modules
app.use(express.static(path.join(__dirname, 'node_modules')));

//setting Routing for BE
app.use('/', beRoutes);
//Setting Routing for FE
//app.use('/api', feRoutes);

//config the port usign arrow notation function
const portListener = process.env.PORT || 4000;
app.listen(portListener, () => {
    console.log('Testing of portListener: ' + portListener)
});

//connect to DataBase
console.log("Getting the string connection to db: " + dbConn.strConn);

mongoose.Promise = global.Promise;
mongoose.connect(dbConn.strCon, {
    useNewUrlParser : true
}).then(function () {
    console.log('Connection successfully...');
}).catch(function (error) {
    console.log('Connection was not completed: '+error);
})