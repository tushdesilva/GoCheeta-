module.exports = {


  friendlyName: 'View account overview',


  description: 'Display "Account Overview" page.',

  inputs: {

    id: {
      type: 'string'
    }
  },


  exits: {

    success: {
      viewTemplatePath: 'pages/account/account-overview',
    }

  },


  fn: async function (inputs,exits) {

    var myId;
    var user = '';

    if (inputs.id == null) {
      myId = this.req.me.id;
      user = this.req.me.id;

    } else {
      myId = inputs.id;
    }

    var data = await User.findOne({
      id: myId
    });

    // If billing features are enabled, include our configured Stripe.js
    // public key in the view locals.  Otherwise, leave it as undefined.

    return exits.success({
      stripePublishableKey: sails.config.custom.enableBillingFeatures ? sails.config.custom.stripePublishableKey : undefined,
      data: data,
      user: user
    });

  }


};
