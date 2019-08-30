const { Model } = require('objection');

module.exports = app => Model.knex(app.config.knex);
