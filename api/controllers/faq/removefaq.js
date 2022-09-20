module.exports = {


  friendlyName: 'Removefaq',


  description: 'Removefaq faq.',


  inputs: {
    selectedItems: { // ID ARRAY
      type: "ref",
      required: true,
  },

  },


  exits: {

  },


  fn: async function (inputs,exits) {

    var result = await FAQ.destroy({
      id: {
        in: inputs.selectedItems,
      },
    }).fetch();

  
    return exits.success({
      result: result,
    });

  }


};
