module.exports = {


  friendlyName: 'Removeslider',


  description: 'Removeslider slider.',


  inputs: {
    selectedItems: { // ID ARRAY
      type: "ref",
      required: true,
  },
},


  exits: {

  },


  fn: async function (inputs,exits) {

    var result = await Slider.destroy({
      id: {
        in: inputs.selectedItems,
      },
    }).fetch();

  
    return exits.success({
      result: result,
    });

  }


};





