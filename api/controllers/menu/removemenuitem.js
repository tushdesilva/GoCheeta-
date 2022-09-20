module.exports = {


  friendlyName: 'Removemenuitem',


  description: 'Removemenuitem menu.',


  inputs: {

    selectedItems: { // ID ARRAY
      type: "ref",
      required: true,
    },


  },


  exits: {

  },


  fn: async function (inputs,exits) {

    var result = await Menu.destroy({
      id: {
        in: inputs.selectedItems,
      },
    }).fetch();

    return exits.success({
      result: result,
    });

  }


};
