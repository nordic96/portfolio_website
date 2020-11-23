const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const projects = require('./models/project');
const designs = require('./models/design');
const router =  express.Router();

const app = express();
const port = process.env.PORT || 5000;

var uri = "mongodb+srv://admin:nordic96@clustergh.i9pmr.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology:true, useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log('MongoDb database connection established successfully');
});

//Checks if production, then build react app and use build/
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use("/api", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.route("/fetchProjects").get((req, res) => {
    projects.find({}, (err, result) => {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.route("/fetchDesigns").get((req, res) => {
    designs.find({}, (err, result) => {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(port, () => console.log('Listening on port: ' + port));