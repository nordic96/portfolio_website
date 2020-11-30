const express = require('express');
const design_router = express.Router();
const designs = require('../models/design');

design_router.route("/fetchDesigns").get((req, res) => {
    designs.find({}, (err, result) => {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})

module.exports = design_router;