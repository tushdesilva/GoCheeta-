module.exports = {


  friendlyName: 'View menulist',


  description: 'Display "Menulist" page.',

  inputs:{

    name: {
      description: 'Search Name',
      type: 'string'
    },

    visibility: {
      description: 'Search Name',
      type: 'string'
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
      viewTemplatePath: 'pages/menu/menulist'
    }

  },


  fn: async function (inputs,exits) {


    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {

      delete this.req.session.menufilterlist;

    }

    var formatedLimit = await sails.helpers.limitPerPage(inputs.limit);
    var formatedPage = await sails.helpers.parsePage(inputs.page);

    // VARIABLES
    var data = [];
    var numRecords = 0;
    var filter = {};

    // SET FILTER
    if (typeof this.req.session.menufilterlist !== "undefined") {

      if (this.req.session.menufilterlist.name && (typeof inputs.name === 'undefined')) {

        inputs.name = this.req.session.menufilterlist.name;

      }


      if (this.req.session.menufilterlist.visibility && (typeof inputs.visibility === 'undefined')) {

        inputs.visibility = this.req.session.menufilterlist.visibility;
  
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

    data = await Menu.find(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).paginate(formatedPage, formatedLimit).sort('createdAt DESC');

    // RECORDS
    numRecords = await Menu.count(filter).meta({
      makeLikeModifierCaseInsensitive: true
    });

    this.req.session.menufilterlist = inputs;

    var pageCount = Math.ceil(numRecords / formatedLimit);

    return exits.success({
      data: data,
      pageCount: pageCount,
      page: formatedPage,
      limit: formatedLimit,
      filter: this.req.session.menufilterlist ? this.req.session.menufilterlist : {}
    });

  }


};
