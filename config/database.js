require('dotenv').config();
const mongoose = require('mongoose');
const dbURI = process.env.DATABASE_URI;
mongoose.set('strictQuery', true);

//connect to database
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () =>
    console.log(`Connected to MongoDB at: ${db.host} : ${db.port}`)
);