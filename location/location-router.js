const router = require("express").Router();
const Location = require("./location-helper");
const { getLocationByID } = require("../middleware/global-middleware");

router.get("/", (req, res, next) => {
  Location.get()
    .then((location) => {
      let result = [];
      for (let i = 0; i < location.length; i++) {
        location[i].power = Boolean(location[i].power);
        result.push(location[i]);
      }
      res.json(location);
    })
    .catch((err) => next(err));
});

router.get("/:id", getLocationByID(), (req, res, next) => {
  res.json(req.location);
});

module.exports = router;
