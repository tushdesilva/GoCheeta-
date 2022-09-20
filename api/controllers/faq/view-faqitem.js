module.exports = {


  friendlyName: 'View faqitem',


  description: 'Display "Faqitem" page.',

  inputs: {
    id:{
      type: 'string',
     },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/faq/faqitem'
    }

  },


  fn: async function (inputs, exits) {

    var filter = {};
    var data = undefined;

    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await FAQ.findOne(filter);
    }


    return exits.success({
      
      data: data,
    })

  }


};
