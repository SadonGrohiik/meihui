'use strict';

/**
 * wig-top service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wig-top.wig-top');
