const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Resource = db.resource;
const Organisation = db.organisation;
const Reservation = db.reservation;



exports.resource_create = (req, res) => {
    if(!req.body.name || !req.body.description) {
        res.status(400).send({message: "Wrong resource body"})
    }
    Resource.create({
        name: req.body.name,
        description: req.body.description
    })
    .then(resource => {
        res.status(201).send({ resource })
    })
    .catch(err => {
        res.status(404).send({ message: "Resource not found" });
    });
};

exports.resource_update= (req, res) => {
    Resource.findOne({
        where: {
            id: req.params.resourceId
        }
    })
    .then(async (resource) => {
        if(!resource){
            res.status(404).send({ message: "Resource not found" });
            return;
        }
        if(req.body.name){
            resource.name = req.body.name;
        }
        if(req.body.description){
            resource.description = req.body.description;
        }
        await resource.save();
        res.status(201).send({ resource })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.resource_delete = (req, res) => {
    Resource.findOne({
        where: {
            id: req.params.resourceId
        }
    })
    .then( resource => {
        Reservation.destroy({
            where: { resource_id: resource.id }
        })
        .then(async () => {
            await resource.destroy();
            res.status(201).send({ message: "Deleted" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.resource_get_one = (req, res) => {
    Resource.findOne({
        where: {
            id: req.params.resourceId
        }
    })
    .then(resource => {
        if(resource){
            res.status(201).send({ resource });
        } else{
            res.status(404).send({ message: "Resource not found" });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.resource_get_all = (req, res) => {
    Resource.findAll()
    .then(resources => {
        res.status(200).send({resources})
    })
};