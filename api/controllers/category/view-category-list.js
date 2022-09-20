module.exports = {


  friendlyName: 'View category list',


  description: 'Display "Category list" page.',
  

  inputs: {
    category_name: {
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
      viewTemplatePath: 'pages/category/category-list'
    }

  },


  fn: async function (inputs,exits) {
    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {
    
      delete this.req.session.categoryfilterlist;
    
    }
    var formatedLimit = await sails.helpers.limitPerPage(inputs.limit);
        var formatedPage = await sails.helpers.parsePage(inputs.page);
    
    var data = [];
    var numRecords = 0;
    var filter = {};
    
    // SET FILTER
    if (typeof this.req.session.categoryfilterlist !== "undefined") {
    
    if (this.req.session.categoryfilterlist.category_name && (typeof inputs.category_name === 'undefined')) {
    
      inputs.category_name = this.req.session.categoryfilterlist.category_name;
    
    
    }
    if (this.req.session.categoryfilterlist.visibility && (typeof inputs.visibility === 'undefined')) {
    
      inputs.visibility = this.req.session.categoryfilterlist.visibility;
    
    }
    }
    
    // SET FILTER VALUES
    Object.keys(inputs).forEach((name, i) => {
    
    var value = inputs[name];
    
    // NAME
    if (name == 'category_name' && value != '') {
    
      filter.category_name = {
        'contains': inputs.category_name
      };
    
    }
    
    if (name == 'visibility' && value != -1) {
    
      filter.visibility = inputs.visibility
    
    }
    
    });
    
    // FIND THE RECORDS
    
    data = await Category.find(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).paginate(formatedPage, formatedLimit).sort('createdAt DESC');
    
    // RECORDS
    numRecords = await Category.count(filter).meta({
      makeLikeModifierCaseInsensitive: true
    });
    
    this.req.session.categoryfilterlist = inputs;
    
    var pageCount = Math.ceil(numRecords / formatedLimit);
    
    return exits.success({
      data: data,
      pageCount: pageCount,
      page: formatedPage,
      limit: formatedLimit,
      filter: this.req.session.categoryfilterlist ? this.req.session.categoryfilterlist : {}
    });
    
    }
    
    
        
      
    
    
    };
