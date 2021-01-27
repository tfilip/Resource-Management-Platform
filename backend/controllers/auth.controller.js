const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Organisation = db.organisation;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.user_signup = (req, res) => {

  // If users sends request with no organisation pin then it creates
  // one automatically
  if (!req.body.organisation_pin) {
    // Create new user
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      role_id: 1,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then(user => {
        Organisation.create({
          admin_id: user.id,
          name: "Newly created organisation",
          //TODO: Check to be sure it's single
          password: Math.floor(10000 + Math.random() * 99999)
        })
          .then(organisation => {
            User.update({ organisation_id: organisation.id },
              { where: { id: user.id } })
              .then(() => {
                res.status(201).send({ user, organisation })
              })
              .catch(err => {
                res.status(500).send({ message: err.message });
              });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      });
  } else {
    Organisation.findOne({
      where: {
        password: req.body.organisation_pin
      }
    })
      .then(organisation => {
        if (!organisation) {
          res.status(400).send({ message: "Invalid Organisation PIN" });
        } else {
          User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            role_id: 2,
            password: bcrypt.hashSync(req.body.password, 8),
            organisation_id: organisation.id
          })
          .then(user => {
            res.status(201).send({ user, organisation })
          })
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }

};

exports.user_signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id, organisation_id: user.organisation_id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      authorities.push("ROLE_" + user.role_id);
      res.status(200).send({
        id: user.id,
        email: user.email,
        roles: authorities,
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};