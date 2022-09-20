module.exports = {


  friendlyName: 'View categoryitem',


  description: 'Display "Categoryitem" page.',

  inputs: {
    id:{
      type: 'string',
     },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/category/categoryitem'
    }

  },


   fn: async function (inputs, exits) {

    var filter = {};
    var data = undefined;

    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await Category.findOne(filter);
    }


    return exits.success({
      data: data,
    })

  }


};
