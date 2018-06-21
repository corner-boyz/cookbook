require('dotenv').config();

const knex = require('knex')({
  dialect: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: true
  }
})

const createTables = () => {
  const query = `CREATE TABLE IF NOT EXISTS users(
    email TEXT NOT NULL PRIMARY KEY,
    password TEXT,
    name TEXT
  );
  CREATE TABLE IF NOT EXISTS pantries(
    pantryId SERIAL PRIMARY KEY,
    name TEXT
  );
  CREATE TABLE IF NOT EXISTS usersPantries(
    email TEXT NOT NULL REFERENCES users(email),
    pantryId INT NOT NULL REFERENCES pantries(pantryId),
    PRIMARY KEY(email, pantryId)
  );
  CREATE TABLE IF NOT EXISTS ingredients(
    ingredient TEXT NOT NULL,
    pantryId INT NOT NULL REFERENCES pantries(pantryId),
    quantity INT NOT NULL,
    PRIMARY KEY(ingredient, pantryId)
  );`
  knex.raw(query).then((results) => {
    console.log('SUCCESS creating tables:', results);
  }).catch((err) => {
    console.error('ERROR creating tables:', err);
  })
};
createTables();

module.exports.knex = knex;