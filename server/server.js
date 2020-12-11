const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const design_router = require('./routers/design_router');
const project_router = require('./routers/project_router');
const CONFIG = require('./config.json');
const app = express();
const port = process.env.PORT || 5000;

var uri = `mongodb+srv://${CONFIG.dbUser}:${CONFIG.dbPw}@clustergh.i9pmr.mongodb.net/<dbname>?retryWrites=true&w=majority`;
mongoose.connect(uri, { useUnifiedTopology:true, useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log('MongoDb database connection established successfully');
});

//Checks if production, then build react app and use build/
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use("/api", design_router);
app.use("/api", project_router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log('Listening on port: ' + port));