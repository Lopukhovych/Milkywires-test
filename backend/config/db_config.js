require('dotenv').config();
const {
  DEV_DATABASE_URL,
  TEST_DATABASE_URL,
  DATABASE_URL,
} = require('./index');

module.exports = {
  development: {
    url: DEV_DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'url',
    logging: 0,
  },
  test: {
    url: TEST_DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'url',
    logging: 0,
  },
  production: {
    url: DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'url',
    logging: 0,
  },
};
