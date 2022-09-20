module.exports = {


  friendlyName: 'Savedriver',


  description: 'Savedriver driver.',


  inputs: {

    id: {
      type: 'string',

    },

    name: {
      type: 'string',

    },

    driver_code: {
      type: 'string',

    },

    driver_id: {
      type: 'string',

    },

    category: {
      type: 'string',

    },


    contact_number: {
      type: 'string',

    },

    email: {
      type: 'string',

    },

    address_line1: {
      type: 'string',

    },

    address_line2: {
      type: 'string',

    },

    city: {
      type: 'string',

    },

    featured: {
      type: 'number',

    },
    visibility: {
      type: 'number',

    },


    merchant: {
      type: 'string',
    },



  },


  exits: {

  },


  fn: async function (inputs, exits) {


    await Driver.findOrCreate({
      id: inputs.id
    },
      {

        name: inputs.name,
        visibility: inputs.visibility,
        driver_code: inputs.driver_code,
        driver_id: inputs.driver_id,
        category: inputs.category,
        contact_number: inputs.contact_number,
        email: inputs.email,
        address_line1: inputs.address_line1,
        address_line2: inputs.address_line2,
        city: inputs.city,
        featured: inputs.featured,
        driver: inputs.driver,

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

          var updatedObj = await Driver.updateOne({
            id: inputs.id
          })
            .set({
              name: inputs.name,
              visibility: inputs.visibility,
              driver_code: inputs.driver_code,
              driver_id: inputs.driver_id,
              category: inputs.category,
              contact_number: inputs.contact_number,
              email: inputs.email,
              address_line1: inputs.address_line1,
              address_line2: inputs.address_line2,
              city: inputs.city,
              featured: inputs.featured,
              driver: inputs.driver,
            });

          return exits.success({
            data: updatedObj,
            error_status: updatedObj ? 0 : 1
          });

        }

      });

  }


};
