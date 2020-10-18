const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require ('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const db = 'mongodb+srv://User1:DBs1yWHBoj4saGph@cluster0.q9wpq.mongodb.net/cluster0?retryWrites=true&w=majority'


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
}).on('error', function(error) {
    console.log('Connection error:', error)
});

const statsRouter = require('./routes/stats');
const usersRouter = require('./routes/users');

app.use('/stats', statsRouter);
app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});
