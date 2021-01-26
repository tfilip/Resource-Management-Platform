const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Resource = db.resource;
const Organisation = db.organisation;



exports.resource_create = (req, res) => {
    Resource.create({
        name: req.name,
        description: req.description
    })
    .then(resource => {
        res.status(201).send({ resource })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.resource_update= (req, res) => {
    Resource.findOne({
        where: {
            id: req.body.resource_id
        }
    })
    .then(async (resource) => {
        resource.name = req.body.name;
        resource.description = req.body.description;
        await resource.save();
        res.status(201).send({ user, organisation })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.resource_delete = (req, res) => {

};

exports.resource_read = (req, res) => {

};