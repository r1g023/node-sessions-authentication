const db = require("../database/dbConfig");

module.exports = {
  get,
  getById,
  registerUser,
  loginUser,
  getUserLocation,
  postUserLocation,
  getUserLocationID,
};

function get() {
  return db("users").orderBy("id");
}

function getById(id) {
  return db("users").where({ id }).first();
}

//GET /api/users/:id/location
function getUserLocation(id) {
  return db("user_location")
    .join("users", "users.id", "=", "user_location.user_id")
    .join("locations", "locations.id", "user_location.location_id")
    .where({ user_id: id })
    .select("username", "age", "location", "power", "planet");
}

//POST /api/users/:id/location
function postUserLocation(data, id) {
  return db("locations")
    .insert(data, "ids")
    .then((ids) => {
      return db("user_location").insert({ user_id: id, location_id: ids });
    });
}

function getUserLocationID(id) {
  console.log("useriD---->", id);
  return db("user_location").then((ids) => {
    console.log(ids, "ids---->");
    return db("user_location").where({ user_id: ids, location_id: id });
  });
}

//--------------------AUTH-------------------//
function registerUser(data) {
  return db("users")
    .insert(data, "ids")
    .then((ids) => {
      return db("users").where({ id: ids }).first();
    });
}

function loginUser(filter) {
  return db("users").where(filter).first();
}
//--------------------AUTH-------------------//
