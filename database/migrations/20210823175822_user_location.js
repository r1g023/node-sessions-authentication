exports.up = function (knex) {
  return knex.schema.createTable("user_location", (tbl) => {
    tbl
      .integer("user_id")
      .unsigned()
      .notNull()
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("location_id")
      .unsigned()
      .notNull()
      .references("locations.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.primary(["user_id", "location_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_location");
};
