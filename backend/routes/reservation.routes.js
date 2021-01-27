const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/reservations.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/organisation/:organisationId/resource/:resourceId/reservation",
        [
            authJwt.verifyToken,
            authJwt.isBasicOrAdmin,
            authJwt.isInOrganisation
        ],
        controller.reservation_get_all
    );

    app.get(
        "/api/organisation/:organisationId/resource/:resourceId/reservation/:reservationId",
        [
            authJwt.verifyToken,
            authJwt.isBasicOrAdmin,
            authJwt.isInOrganisation
        ],
        controller.reservation_get_one
    );

    app.post(
        "/api/organisation/:organisationId/resource/:resourceId/reservation",
        [
            authJwt.verifyToken,
            authJwt.isBasicOrAdmin,
            authJwt.isInOrganisation
        ],
        controller.reservation_create
    );

    app.delete(
        "/api/organisation/:organisationId/resource/:resourceId/reservation/:reservationId",
        [
            authJwt.verifyToken,
            authJwt.isBasicOrAdmin,
            authJwt.isInOrganisation
        ],
        controller.reservation_cancel
    );

    app.put(
        "/api/organisation/:organisationId/resource/:resourceId/reservation/:reservationId",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
            authJwt.isInOrganisation
        ],
        controller.reservation_update
    );

};