const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    req.organisationId = decoded.organisation_id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId
    }
  })
  .then(user => {
    if (user.role_id == 1) {
      next();
      return;
    } else {
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    }
  });
};

isBasicOrAdmin = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId
    }
  })
  .then(user => {
    if(!user){
      res.status(403).send({message: "Not logged in"});
      return;
    }
    if(!user.role_id){
      res.status(403).send({
        message: "Require Admin/Basic Role!"
      });
      return
    }
    if (user.role_id == 1 || user.role_id == 2) {
      next();
      return;
    } else {
      res.status(403).send({
        message: "Require Admin/Basic Role!"
      });
      return;
    }
  });
};

isInOrganisation = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId
    }
  }).then(user => {
    if(user.organisation_id != req.params.organisationId) {
      res.status(403).send({message: "User is not in the organisation"});
      return;
    } else{
      next();
    }
  }).catch(err => {
    res.status(400).send({message: "User does not exist"});
    return;
  })
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isBasicOrAdmin: isBasicOrAdmin,
  isInOrganisation: isInOrganisation
};

module.exports = authJwt;