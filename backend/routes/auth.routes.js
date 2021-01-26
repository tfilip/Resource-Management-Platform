const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post(
        "/api/auth/user_signup",
        [
            verifySignUp.checkDuplicateEmail,
            verifySignUp.checkRolesExisted,
            verifySignUp.checkHasNecessaryFields,
            verifySignUp.checkIsMail
        ],
        controller.user_signup
    );

    app.post("/api/auth/user_signin", controller.user_signin);
};