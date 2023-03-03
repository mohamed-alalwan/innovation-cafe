//initialize database
require('./config/database');

//initialize firebase
var admin = require("firebase-admin");

var serviceAccount = require("./google-api-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


//initializing express
const express = require('express');
const port = 4000;
const app = express();
const path = require('path');

//initializing csrf
const csrf = require('csurf');

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
const itemRoute = require('./routes/item');
const adminRoute = require('./routes/admin');
const profileRoute = require('./routes/profile');
const cartRoute = require('./routes/cart');

//Mount Routers
app.use('/home', indexRouter);
app.use('/auth', authRoute);
app.use('/item', itemRoute);
app.use('/admin', adminRoute);
app.use('/profile', profileRoute);
app.use('/cart', cartRoute);
app.get('/', (req, res) => {
    res.redirect('/home');
});

//listen to port
app.listen(port, ()=> {
    console.log(`Hi, the server should be connected on port ${port}`);
});
