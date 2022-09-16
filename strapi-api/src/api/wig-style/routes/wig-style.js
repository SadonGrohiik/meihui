'use strict';

/**
 * wig-style router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::wig-style.wig-style');
