module.exports = {


  friendlyName: 'View edit password',


  description: 'Display "Edit password" page.',

  inputs: {

    id: {
      description: 'User ID',
      required: true,
      type:'string',
    },

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-password'
    }

  },


  fn: async function (inputs,exits) {

    return exits.success({
      user_id:inputs.id
    });

  }


};
