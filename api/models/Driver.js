/**
 * Merchanlist.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name:{            
      type:'string',
      required:true,
    },

    driver_code:{
      type:'string',
      required:true,
    },

    driver_id:{
      type:'string',
  
    },
    contact_number:{
      type:'string',
      required:true,
    },

    email:{
      type:'string',
      required:true,
    },

    address_line1:{
      type:'string',
      required:true,
    },

    address_line2:{
      type:'string',
      
    },

    city:{
      type:'string',
      required:true,
    },

    featured:{
      type:'number',
      required:true,
    },
    visibility:{
      type:'number',
      required:true,
    },

    

    

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


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

