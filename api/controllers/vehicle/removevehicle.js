module.exports = {


  friendlyName: 'Removevehicle',


  description: 'Removevehicle vehicle',


  inputs: {
    selectedItems: { // ID ARRAY
      type: "ref",
      required: true,
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var result = await Vehicle.destroy({
      id: {
        in: inputs.selectedItems,
      },
    }).fetch();

    return exits.success({
      result: result,
    });

  }


};
