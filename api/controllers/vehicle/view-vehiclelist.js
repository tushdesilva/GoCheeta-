module.exports = {


  friendlyName: 'View vehiclelist',


  description: 'Display "Vehiclelist" page.',

  inputs: {

    vehicle_brand: {
      type: "string",
    },

    vehicle_name:{ 
      type:'string',
    },

    category:{
      type: 'string',
    },

    vehicle_number:{ 
      type:'string',
    },

    visibility:{
      type: 'number',
    },

    page: {
      description: 'Page Number of the Pagenation',
      type: 'number'
    },

    limit: {
      description: 'Limit Records Per Page',
      type: 'number'
    },


  },

  exits: {

    success: {
      viewTemplatePath: 'pages/vehicle/vehiclelist'
    }

  },


  fn: async function (inputs, exits) {

    /// IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {

      delete this.req.session.vehiclefilterlist;

    }

    var formatedLimit = await sails.helpers.limitPerPage(inputs.limit);
    var formatedPage = await sails.helpers.parsePage(inputs.page);

    var data = [];
    var numRecords = 0;
    var filter = {};

    // SET FILTER
    if (typeof this.req.session.vehiclefilterlist !== "undefined") {

      if (this.req.session.vehiclefilterlist.vehicle_name && (typeof inputs.vehicle_name === 'undefined')) {

        inputs.vehicle_name = this.req.session.vehiclefilterlist.vehicle_name;

      }

      if (this.req.session.vehiclefilterlist.visibility && (typeof inputs.visibility === 'undefined')) {

        inputs.visibility = this.req.session.vehiclefilterlist.visibility;

      }
    }

    // SET FILTER VALUES
    Object.keys(inputs).forEach((name, i) => {

      var value = inputs[name];

      // NAME
      if (name == 'vehicle_name' && value != '') {

        filter.vehicle_name = {
          'contains': inputs.vehicle_name
        };

      }

      if (name == 'visibility' && value != -1) {

        filter.visibility = inputs.visibility

      }

    });

    // FIND THE RECORDS

    data = await Vehicle.find(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).populate("category").paginate(formatedPage, formatedLimit).sort('createdAt DESC');

    // RECORDS
    numRecords = await Vehicle.count(filter).meta({
      makeLikeModifierCaseInsensitive: true
    });

    this.req.session.vehiclefilterlist = inputs;

    var pageCount = Math.ceil(numRecords / formatedLimit);
    return exits.success({
      data: data,
      pageCount: pageCount,
      page: formatedPage,
      limit: formatedLimit,
      filter: this.req.session.vehiclefilterlist ? this.req.session.vehiclefilterlist : {}
    });


  }


};
