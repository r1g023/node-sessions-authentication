const router = require("express").Router();
const Users = require("./users-helper");
const { getById, getLocationByID } = require("../middleware/global-middleware");

router.get("/", (req, res, next) => {
  Users.get()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => next(err));
});

router.get("/:id", getById(), (req, res, next) => {
  res.json(req.user);
});

router.get("/:id/location", getById(), getLocationByID(), (req, res, next) => {
  Users.getUserLocation(req.params.id)
    .then((user) => {
      let result = [];
      for (let i = 0; i < user.length; i++) {
        user[i].power = Boolean(user[i].power);
        result.push(user[i]);
      }
      res.json(result);
    })
    .catch((err) => next(err));
});

router.get("/:id/location/:id", (req, res, next) => {
  const { id } = req.params;
  console.log("{id}", id);
  Users.getUserLocationID(id)
    .then((location) => {
      console.log();
      res.json(location);
    })
    .catch((err) => next(err));
});

router.post(
  "/:id/location",
  getById(),
  getLocationByID(),
  async (req, res, next) => {
    const locbody = req.body;
    const { id } = req.params;
    let userId = await Users.getById(id);
    Users.postUserLocation(locbody, id)
      .then((location) => {
        res.json([
          userId.id,
          userId.username,
          userId.email,
          {
            message: locbody,
          },
        ]);
      })
      .catch((err) => next(err));
  }
);

module.exports = router;
