module.exports = {


  friendlyName: 'View merchantitem',


  description: 'Display "Merchantitem" page.',

  inputs: {

    id: {
      type: 'string',
    },

    

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/driver/driveritem'
    }

  },


  fn: async function (inputs , exits) {

    var filter = {};
    var data = undefined;
    var categories = await Category.find({visibility:1});
 
    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await Driver.findOne(filter);

    }


    return exits.success({
      data: data,
      categories: categories,
    });

  }


};
