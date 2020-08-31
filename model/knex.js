require("dotenv").config()

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env


var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USER,
      password:DB_PASSWORD
    },
  })

  


  module.exports = knex