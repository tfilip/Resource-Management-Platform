const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.organisation = require("../models/organisation.model.js")(sequelize, Sequelize);
db.resource = require("../models/resource.model.js")(sequelize, Sequelize);
db.reservation = require("../models/reservation.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsTo(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.belongsToMany(db.organisation, {
    through: "user_organisation",
    foreignKey: "userId",
    otherKey: "organisationId"
});

db.resource.belongsTo(db.organisation, {
    through: "resource_organisation",
    foreignKey: "resourceId",
    otherKey: "organisationId"
});

db.reservation.belongsTo(db.user, {
    through: "reservation_user",
    foreignKey: "reservationId",
    otherKey: "userId"
});

db.reservation.belongsTo(db.resource, {
    through: "reservation_resource",
    foreignKey: "reservationId",
    otherKey: "resourceId"
});

db.ROLES = ["admin", "viewer", "basic"];

module.exports = db;