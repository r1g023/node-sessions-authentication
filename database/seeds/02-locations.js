const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("locations").insert([
    {
      age: faker.datatype.number(),
      location: faker.address.city(),
      power: faker.datatype.boolean(),
      planet: faker.name.title(),
    },
    {
      age: faker.datatype.number(),
      location: faker.address.city(),
      power: faker.datatype.boolean(),
      planet: faker.name.title(),
    },
    {
      age: faker.datatype.number(),
      location: faker.address.city(),
      power: faker.datatype.boolean(),
      planet: faker.name.title(),
    },
  ]);
};
