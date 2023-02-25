//initialize database
require('./config/database')

//initializing express
const express = require('express');
const port = 4000;
const app = express();
const path = require('path');

//initializing body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Look for all ejs files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//look for public directory
app.use(express.static(path.join(__dirname, 'public')));

//Initialize Express Layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//Import Routers
const indexRouter = require('./routes/index');
const authRoute = require('./routes/auth');

//Mount Routers
app.use('/', indexRouter);
app.use('/auth', authRoute);

//listen to port
app.listen(port, ()=> {
    console.log(`Hi, the server should be connected on port ${port}`);
});
