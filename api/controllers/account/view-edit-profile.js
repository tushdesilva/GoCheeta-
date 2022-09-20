module.exports = {


  friendlyName: 'View edit profile',


  description: 'Display "Edit profile" page.',


  inputs: {

    id: {
      type: 'string'
    }

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-profile',
    }

  },


  fn: async function (inputs , exits) {

    var myId;
    var isSuperAdmin = this.req.me.isSuperAdmin;

    if (inputs.id == null) {
      myId = this.req.me.id;
    } else {
      myId = inputs.id;
    }

    var data = await User.findOne({
      id: myId
    });

    // If billing features are enabled, include our configured Stripe.js
    // public key in the view locals.  Otherwise, leave it as undefined.

    return exits.success({
      data: data,
      isSuperAdmin: isSuperAdmin
    });

  }


};
