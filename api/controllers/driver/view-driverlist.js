module.exports = {


  friendlyName: 'View driverlist',


  description: 'Display "Driverlist" page.',

  inputs:{

    name: {
      description: 'Search Name',
      type: 'string'
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
      viewTemplatePath: 'pages/driver/driverlist'
    }

  },


  fn: async function (inputs , exits) {

   // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
   if (_.isEmpty(inputs)) {

    delete this.req.session.driverfilterlist;

  }

  var formatedLimit = await sails.helpers.limitPerPage(inputs.limit);
  var formatedPage = await sails.helpers.parsePage(inputs.page);

  // VARIABLES
  var data = [];
  var numRecords = 0;
  var filter = {};

  // SET FILTER
  if (typeof this.req.session.driverfilterlist !== "undefined") {

    if (this.req.session.driverfilterlist.name && (typeof inputs.name === 'undefined')) {

      inputs.name = this.req.session.driverfilterlist.name;

    }


    if (this.req.session.driverfilterlist.visibility && (typeof inputs.visibility === 'undefined')) {

      inputs.visibility = this.req.session.driverfilterlist.visibility;

    }

  }

  // SET FILTER VALUES
  Object.keys(inputs).forEach((name, i) => {

    var value = inputs[name];

    // NAME
    if (name == 'name' && value != '') {

      filter.name = {
        'contains': inputs.name
      };

    }

    if (name == 'visibility' && value != -1) {

      filter.visibility = inputs.visibility

    }

  });

  // FIND THE RECORDS

  data = await Driver.find(filter).meta({
    makeLikeModifierCaseInsensitive: true
  }).paginate(formatedPage, formatedLimit).sort('createdAt DESC').populate('category');

  // RECORDS
  numRecords = await Driver.count(filter).meta({
    makeLikeModifierCaseInsensitive: true
  });

  this.req.session.driverfilterlist = inputs;

  var pageCount = Math.ceil(numRecords / formatedLimit);



  return exits.success({
    data: data,
    pageCount: pageCount,
    page: formatedPage,
    limit: formatedLimit,
    filter: this.req.session.driverfilterlist ? this.req.session.driverfilterlist : {}
  });

  }


};