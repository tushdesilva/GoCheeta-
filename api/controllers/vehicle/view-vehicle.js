module.exports = {


  friendlyName: 'View vehicle',


  description: 'Display "Vehicle" page.',

  inputs: {

    id: {
      type: 'string'
    },

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/vehicle/vehicle'
    }

  },


  fn: async function (inputs, exits) {

    var filter = {};
    var data = undefined;

    var categories = await Category.find({visibility:1});
 
    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await Vehicle.findOne(filter);

    }


    return exits.success({
      data: data,
      categories: categories,
    });

  }


};
