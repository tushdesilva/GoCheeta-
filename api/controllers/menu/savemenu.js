module.exports = {


  friendlyName: 'Savemenu',


  description: 'Savemenu menu.',


  inputs: {

    id: {
      type: 'string',
    },

    name: {
      type: 'string',
    },

    slug: {
      type: 'string',
    },

    visibility: {
      type: 'number',
    },

    order: {
      type: 'number',
    },

  },



  exits: {

  },


  fn: async function (inputs,exits) {

    
    var slug  = "";

    if(inputs.slug){
      slug = await sails.helpers.slugs(inputs.slug, inputs.id ? inputs.id : '','Menu');
    }else{
      slug = await sails.helpers.slugs(inputs.name, inputs.id ? inputs.id : '','Menu');
    }

    inputs.slug = slug;

    await Menu.findOrCreate({
      id: inputs.id
    }, {
      name:inputs.name,
      slug: inputs.slug,
      visibility: inputs.visibility,
      order: inputs.order,
    
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

        var updatedObj = await Menu.updateOne({
            id: inputs.id
          })
          .set({
            name:inputs.name,
            slug: inputs.slug,
            visibility: inputs.visibility,
            order: inputs.order,
          });

        return exits.success({
          data: updatedObj,
          error_status: updatedObj ? 0 : 1
        });

      }

    });


  }


};
