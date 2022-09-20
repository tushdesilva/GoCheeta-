module.exports = {


  friendlyName: 'Savefaq',


  description: 'Savefaq faq.',


  inputs: {

    id:{
      type: 'string',
     },

    question:{
      type: 'string',
    },
    
    description:{
      type:'string',
    },

    order:{
      type:'number',
    },

    visibility:{ 
      type:'number',
     
    },

  },


  exits: {

  },


  


  fn: async function (inputs, exits) {
    
    await FAQ.findOrCreate({
      id: inputs.id
    }, 
    {
      question:inputs.question,
      order:inputs.order,
      description:inputs.description,
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

        var updatedObj = await FAQ.updateOne({
            id: inputs.id
          })
          .set({
            question:inputs.question,
            order:inputs.order,
            description:inputs.description,
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


