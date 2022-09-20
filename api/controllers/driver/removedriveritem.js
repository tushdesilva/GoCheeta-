module.exports = {


  friendlyName: 'Removedriveritem',


  description: 'Removedriveritem driver.',


  inputs: {

    selectedItems: { // ID ARRAY
      type: "ref",
      required: true,
    },

  },


  exits: {

  },


  fn: async function (inputs,exits) {

     // All done.
     var result = await Driver.destroy({
      id: {
        in: inputs.selectedItems,
      },
    }).fetch();

  
    return exits.success({
      result: result,
    });


  }


};
