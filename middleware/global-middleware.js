const Users = require("../users/users-helper");
const Location = require("../location/location-helper");

module.exports = {
  getById,
  restrictedUser,
  getLocationByID,
};

function getById() {
  return (req, res, next) => {
    Users.getById(req.params.id)
      .then((user) => {
        user
          ? ((req.user = user), next())
          : res.json({ message: `cant find user of id # ${req.params.id}` });
      })
      .catch((err) => next(err));
  };
}

function getLocationByID() {
  return (req, res, next) => {
    Location.getlocationID(req.params.id)
      .then((location) => {
        location
          ? ((req.location = location), next())
          : res.json({ message: `no location of id #${req.params.id} found` });
      })
      .catch((err) => next(err));
  };
}

function restrictedUser() {
  return (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.json({ message: "please validate login and try again" });
    }
  };
}
