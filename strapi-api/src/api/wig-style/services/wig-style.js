'use strict';

/**
 * wig-style service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wig-style.wig-style');
