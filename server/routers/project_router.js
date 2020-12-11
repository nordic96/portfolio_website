const express = require('express');
const project_router = express.Router();
const projects = require('../models/project');

project_router.route("/fetchProjects").get((req, res) => {
    projects.find({}, (err, result) => {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = project_router;