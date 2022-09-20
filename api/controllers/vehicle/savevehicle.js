module.exports = {


  friendlyName: 'Savevehicle',


  description: 'Savevehicle vehicle.',


  inputs: {

    id: {
      type: 'string',
    },

    vehicle_id: {
      type: 'string',
    },

    category: {
      type: 'string',
    },

    vehicle_brand: {
      type: "string",
    },

    vehicle_name: {
      type: 'string',
    },

    vehicle_number: {
      type: 'string',
    },

    image: {
      type: "string",
    },

    visibility: { // 0 - Unpublish     1 - Publish
      type: 'number',
    },

    featured: { // 0 - not featured   1 - featured
      type: "number",
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var moment = require('moment');

    await Vehicle.findOrCreate({
      id: inputs.id
    }, {
      visibility: inputs.visibility,
      featured: inputs.featured,
      vehicle_id: inputs.vehicle_id,
      category: inputs.category,
      vehicle_name: inputs.vehicle_name,
      vehicle_brand: inputs.vehicle_brand,
      vehicle_number: inputs.vehicle_number,
      image: inputs.image,



    })
      .exec(async (err, record, wasCreated) => {

        if (err) {

          return this.res.serverError(err);
        }

        if (wasCreated) {

          console.log("hi");
          return exits.success({
            data: record,
            error_status: record ? 0 : 1
          });

        } else { // UPDATE

          var updatedObj = await Vehicle.updateOne({
            id: inputs.id
          })
            .set({
              visibility: inputs.visibility,
              featured: inputs.featured,
              vehicle_id: inputs.vehicle_id,
              category: inputs.category,
              vehicle_name: inputs.vehicle_name,
              vehicle_brand: inputs.vehicle_brand,
              vehicle_number: inputs.vehicle_number,
              image: inputs.image,
            });

          return exits.success({
            data: updatedObj,
            error_status: updatedObj ? 0 : 1
          });

        }

      });

  }


};
