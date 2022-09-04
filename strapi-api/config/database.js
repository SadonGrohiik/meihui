const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'mydb'),
      user: env('DATABASE_USERNAME', 'Loremonger'),
      password: env('DATABASE_PASSWORD', 'azarut'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      // ssl: {
      //   rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),  //Uncomment this for the actual server
      // },
    },
    debug: false,
  },
});
