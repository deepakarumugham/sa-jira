require('dotenv').config();
const express =   require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');
const app = express();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});

const db = mongoose.connection;
const options = {
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials: false
};
db.on('error', (error) => {
    console.error("Error: "  + error);
});
db.once('open', () => console.log("DB Connected successfully"));

app.listen(process.env.PORT || 4000);

app.use(express.json());
app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use('/users', cors(options), usersRouter);
app.use('/tickets', cors(options), ticketsRouter);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', ['GET','POST','DELETE','UPDATE','PUT','PATCH']);
    res.header('Access-Control-Allow-Headers', '*');
    next();
};

app.use(allowCrossDomain);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send("Error while handling request");
});