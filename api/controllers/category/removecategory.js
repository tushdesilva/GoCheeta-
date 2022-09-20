module.exports = {


  friendlyName: 'Removecategory',


  description: 'Removecategory category.',


  inputs: {
    selectedItems: { // ID ARRAY
      type: "ref",
      required: true,
  },
},


  exits: {

  },


  fn: async function (inputs,exits) {

    var result = await Category.destroy({
      id: {
        in: inputs.selectedItems,
      },
    }).fetch();

  
    return exits.success({
      result: result,
    });

  }


};

