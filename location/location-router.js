const router = require("express").Router();
const Location = require("./location-helper");

router.get("/", (req, res, next) => {
  Location.get()
    .then((location) => {
      res.json(location);
    })
    .catch((err) => next(err));
});

module.exports = router;
