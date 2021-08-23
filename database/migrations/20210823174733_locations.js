exports.up = function (knex) {
  return knex.schema.createTable("locations", function (tbl) {
    tbl.increments("id");
    tbl.integer("age", 128).notNull();
    tbl.string("location", 128).notNull();
    tbl.boolean("power").notNull().defaultTo(0); // true or false
    tbl.string("planet", 128).notNull();
  });
};

exports.down = function (knex) {
  return knex.schemadropTableIfExists("locations");
};
