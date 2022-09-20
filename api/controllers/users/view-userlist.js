module.exports = {


  friendlyName: 'View userlist',


  description: 'Display "Userlist" page.',

  inputs: {

    name: {
      description: 'Search Name',
      type: 'string'
    },

    user_group: {
      description: 'Search User Type',
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
      viewTemplatePath: 'pages/users/userlist'
    }

  },


  fn: async function (inputs, exits) {

    var moment = require('moment');


    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {

      delete this.req.session.userFilterList;

    }

    var formatedLimit = await sails.helpers.limitPerPage(inputs.limit);
    var formatedPage = await sails.helpers.parsePage(inputs.page);

    // VARIABLES
    var data = [];
    var numRecords = 0;
    var filterArr = []
    var filter = {};

    // SET FILTER
    if (typeof this.req.session.userFilterList !== "undefined") {

      if (this.req.session.userFilterList.name && (typeof inputs.name === 'undefined')) {

        inputs.name = this.req.session.userFilterList.name;

      }

    }


    // SET FILTER VALUES
    Object.keys(inputs).forEach((name, i) => {

      var value = inputs[name];

      // NAME
      if (name == 'name' && value != '') {

      // SETTING UP FILTER ARRAY
        filter.or = [];

        let fullName = {
          "fullName": {
            'contains': value
          },
        }

        let email = {
          "emailAddress": {
            'contains': value
          },
        }

        filter.or[0] = fullName;
        filter.or.push(email);

      }

      // STATUS
      if (name == 'status' && value >= 0) {
        filter.status = value;
      }

    });


    // Filtered data
    var data = await User.find(filter).paginate(formatedPage, formatedLimit)
      .meta({
        makeLikeModifierCaseInsensitive: true
      }).meta({enableExperimentalDeepTargets:true})
      .sort('createdAt DESC');


    // Number of rows
    var dataCount = await User.count(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).meta({enableExperimentalDeepTargets:true});

    numRecords = dataCount;


    // ASSIGN THE INPUTS TO SESSION
    this.req.session.userFilterList = inputs;

    var pageCount = Math.ceil(numRecords / formatedLimit);

    console.log(data);

    return exits.success({
      data: data,
      pageCount: pageCount,
      page: formatedPage,
      limit: formatedLimit,
      filter: this.req.session.userFilterList ? this.req.session.userFilterList : {},
    });





  }


};
