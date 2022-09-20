module.exports = {


  friendlyName: 'Saveslider',


  description: 'Saveslider slider.',


  inputs: {

    id:{
      type: 'string',
     },

    slider_name:{
      type: 'string',
    },

   image_url:{
      type:'string',
    },

    order:{
      type:'number',
    },

    visibility:{ 
      type:'number',
      required :true,
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    
    await Slider.findOrCreate({
      id: inputs.id
    }, 
    {
      slider_name:inputs.slider_name,
      image_url:inputs.image_url,
      order:inputs.order,
      visibility: inputs.visibility,
    })
    .exec(async (err, record, wasCreated) => {

      if (err) {

        return this.res.serverError(err);
      }

      if (wasCreated) {

        return exits.success({
          data: record,
          error_status: record ? 0 : 1
        });
      } else { // UPDATE

        var updatedObj = await Slider.updateOne({
            id: inputs.id
          })
          .set({
            slider_name:inputs.slider_name,
            image_url:inputs.image_url,
            order:inputs.order,
            visibility: inputs.visibility,
            
          });

        return exits.success({
          data: updatedObj,
          error_status: updatedObj ? 0 : 1
        });

      }

    });

  

  }


};


