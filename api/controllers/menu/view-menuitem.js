module.exports = {


  friendlyName: 'View menuitem',


  description: 'Display "Menuitem" page.',

  inputs: {

    id: {
      type: 'string'
    },

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/menu/menuitem'
    }

  },


  fn: async function (inputs, exits) {

    var filter = {};
    var data = undefined;
 
    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await Menu.findOne(filter);

    }


    return exits.success({
      data: data,
    });

  }


};
