module.exports = {


  friendlyName: 'View faq list',


  description: 'Display "Faq list" page.',

  inputs: {
    question: {
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
      viewTemplatePath: 'pages/faq/faq-list'
    }

  },


  fn: async function (inputs,exits) {
    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {
    
      delete this.req.session.faqfilterlist;
    
    }
    var formatedLimit = await sails.helpers.limitPerPage(inputs.limit);
        var formatedPage = await sails.helpers.parsePage(inputs.page);
    
    var data = [];
    var numRecords = 0;
    var filter = {};
    
    // SET FILTER
    if (typeof this.req.session.faqfilterlist !== "undefined") {
    
    if (this.req.session.faqfilterlist.question && (typeof inputs.question === 'undefined')) {
    
      inputs.question = this.req.session.faqfilterlist.question;
    
    
    }
    if (this.req.session.faqfilterlist.visibility && (typeof inputs.visibility === 'undefined')) {
    
      inputs.visibility = this.req.session.faqfilterlist.visibility;
    
    }
    }
    
    // SET FILTER VALUES
    Object.keys(inputs).forEach((name, i) => {
    
    var value = inputs[name];
    
    // NAME
    if (name == 'question' && value != '') {
    
      filter.question = {
        'contains': inputs.question
      };
    
    }
    
    if (name == 'visibility' && value != -1) {
    
      filter.visibility = inputs.visibility
    
    }
    
    });
    
    // FIND THE RECORDS
    
    data = await FAQ.find(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).paginate(formatedPage, formatedLimit).sort('createdAt DESC');

    console.log("FAQ",data );
    
    // RECORDS
    numRecords = await FAQ.count(filter).meta({
      makeLikeModifierCaseInsensitive: true
    });

    
    this.req.session.faqfilterlist = inputs;
    
    var pageCount = Math.ceil(numRecords / formatedLimit);
    
    return exits.success({
      data: data,
      pageCount: pageCount,
      page: formatedPage,
      limit: formatedLimit,
      filter: this.req.session.faqfilterlist ? this.req.session.faqfilterlist : {}
    });
    
    }
    
  };

