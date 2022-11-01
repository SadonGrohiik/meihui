'use strict';
/**
 * cart controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::cart.cart', ({ strapi }) => ({
    async find(ctx) {
        const { query } = ctx;

        const entity = await strapi.service('api::cart.cart').find(query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },
}));
