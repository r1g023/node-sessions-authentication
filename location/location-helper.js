const db = require("../database/dbConfig");

module.exports = {
  get,
  getlocationID,
};

function get() {
  return db("locations").orderBy("id");
}

function getlocationID(id) {
  return db("locations").where({ id }).first();
}
