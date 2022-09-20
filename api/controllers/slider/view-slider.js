module.exports = {


  friendlyName: 'View slider',


  description: 'Display "Slider" page.',

  inputs: {
    id:{
      type: 'string',
     },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/slider/slider'
    }

  },


  fn: async function (inputs, exits) {

    var filter = {};
    var data = undefined;

    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await Slider.findOne(filter);
    }


    return exits.success({
      data: data,
    })

  }


};

