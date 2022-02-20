const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const design_router = require('./routers/design_router');
const project_router = require('./routers/project_router');
const dotenv = require('dotenv');
const rateLimiter = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 17000;
dotenv.config();

var uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_SECRET}@clustergh.i9pmr.mongodb.net/<dbname>?retryWrites=true&w=majority`;
if (process.env.NODE_ENV == 'development') {
    console.log(uri);
}

mongoose.connect(uri, { useUnifiedTopology:true, useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log('MongoDb database connection established successfully');
});

//Adding rate-limit middleware
var limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

//Checks if production, then build react app and use build/
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

//Connecting all routers for API
app.use("/api", design_router);
app.use("/api", project_router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log('Listening on port: ' + port));