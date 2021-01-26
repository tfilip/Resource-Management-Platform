const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const db = require("./models");
const Role = db.role;

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: 1 }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RMS" });
});

db.sequelize.sync({force: 1}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
    Role.create({
      id: 1,
      name: "admin",
      resource_create: 1,
      resource_view: 1,
      resource_delete: 1,
      resource_reserve: 1,
    });
    Role.create({
      id: 2,
      name: "basic",
      resource_create: 0,
      resource_view: 1,
      resource_delete: 0,
      resource_reserve: 1,
    });
    Role.create({
      id: 3,
      name: "viewer",
      resource_create: 0,
      resource_view: 1,
      resource_delete: 0,
      resource_reserve: 0,
    });
  }

require('./routes/auth.routes')(app);
require('./routes/resource.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});