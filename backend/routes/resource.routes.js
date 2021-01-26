const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/resource.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/organisation/:organisationId/resource/",
        [
            authJwt.verifyToken,
            authJwt.isBasicOrAdmin,
            authJwt.isInOrganisation
        ],
        controller.resource_read
    );

    app.post(
        "/api/organisation/:organisationId/resource/",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
            authJwt.isInOrganisation
        ],
        controller.resource_create
    );

    app.put(
        "/api/organisation/:organisationId/resource/",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
            authJwt.isInOrganisation
        ],
        controller.resource_update
    );

    app.delete(
        "/api/organisation/:organisationId/resource/",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
            authJwt.isInOrganisation
        ],
        controller.resource_delete
    );

};