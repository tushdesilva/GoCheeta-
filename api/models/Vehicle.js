/**
 * Vehicle.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    vehicle_id:{
      type: 'string',
      required: true,
    },

    category:{
      type: 'string',
      required: true,
    },

    vehicle_brand: {
      type: "string",
      required: true,
    },

    vehicle_name:{ 
      type:'string',
      required: true,
    },

    vehicle_number:{ 
      type:'string',
      required: true,
    },

    image: {
      type: "string",
      required: true,
    },

    visibility:{ // 0 - Unpublish     1 - Publish
      type:'number',
      defaultsTo: 0,
    },

    featured: { // 0 - not featured   1 - featured
      type: "number",
      defaultsTo: 0,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    category : {
      model : "category",
    },

  },

};

