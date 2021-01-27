const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Resource = db.resource;
const Organisation = db.organisation;
const Reservation = db.reservation;
const moment = require('moment');
const momentRange = require('moment-range');

momentRange.extendMoment(moment);

var periodReserved = async function (req) {


};

exports.reservation_create = async (req, res) => {


    var newReservationRange = moment.range(req.body.start_date, req.body.end_date);

    Reservation.findAll({
        where: {
            canceled: false,
            resource_id: req.params.resourceId
        }
    }).then(reservations => {
        if(reservations.length > 0){
            reservations.forEach(reservation => {
                ok = true
                var reservationRange = moment.range(reservation.start_date, reservation.end_date);
                if (newReservationRange.overlaps(reservationRange)) {
                    ok = false;
                }
                if(ok){
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
                } else {
                    res.status(500).send({ message: "Period reserved" });
                }
            })
        } else{
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
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
        return true;
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

    var newReservationRange = moment.range(req.body.start_date, req.body.end_date);

    Reservation.findAll({
        where: {
            canceled: false,
            resource_id: req.params.resourceId
        }
    }).then(reservations => {
        if(reservations.length > 0){
            if(reservations.length > 0){
                reservations.forEach(reservation => {
                    ok = true
                    var reservationRange = moment.range(reservation.start_date, reservation.end_date);
                    if (newReservationRange.overlaps(reservationRange)) {
                        ok = false;
                    }
                    if(ok){
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
                    }else {
                        res.status(500).send({ message: "Period reserved" });
                    }
                })
            } else{
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
            }
        }})
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