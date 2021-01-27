const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Resource = db.resource;
const Organisation = db.organisation;
const Reservation = db.reservation;
// require('moment')
// require('moment-js')

var periodReserved = function (req) {

    var newReservationRange = moment.range(req.body.start_date, req.body.end_date);

    Reservation.findAll({
        where: {
            canceled: false,
            resource_id: req.params.resourceId
        }
    }).then(reservations => {
        reservations.forEach(reservation => {
            var reservationRange = moment.range(reservation.start_date, reservation.end_date);
            if (newReservationRange.overlaps(reservationRange)) {
                return true;
            }
        })
    });

    return false;
};

exports.reservation_create = (req, res) => {

    console.log(periodReserved(req));

    console.log(req.userId);
    Reservation.create({
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        canceled: false,
        description: req.body.description,
        resource_id: req.params.resourceId,
        user_id: req.userId
    })
    .then(reservation => {
        res.status(201).send({ reservation })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.reservation_cancel = (req, res) => {
    Reservation.findOne({
        where: {
            id: req.params.reservationId
        }
    })
    .then(async (reservation) => {
        reservation.canceled = true;
        await reservation.save();
        res.status(201).send({ reservation })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.reservation_update = (req, res) => {

    Reservation.findOne({
        where: {
            id: req.params.reservationId
        }
    })
    .then(async (reservation) => {
        reservation.start_date = req.body.start_date;
        reservation.end_date = req.body.end_date;
        reservation.description = req.body.description;
        await reservation.save();
        res.status(201).send({ reservation })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.reservation_get_all = (req, res) => {
    Reservation.findAll()
        .then(reservations => {
            res.status(200).send({ reservations })
        })
};

exports.reservation_get_one = (req, res) => {
    Reservation.findOne({
        where: {
            id: req.params.reservationId
        }
    })
    .then(reservation => {
        if (reservation) {
            res.status(200).send({ reservation });
        } else {
            res.status(404).send({ message: "Reservation not found" });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};