module.exports = {


  friendlyName: 'View sliderlist',


  description: 'Display "Sliderlist" page.',


  inputs: {
    slider_name: {
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
      viewTemplatePath: 'pages/slider/sliderlist'
    }

  },


  fn: async function (inputs,exits) {
    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {
    
      delete this.req.session.sliderfilterlist;
    
    }
    var formatedLimit = await sails.helpers.limitPerPage(inputs.limit);
        var formatedPage = await sails.helpers.parsePage(inputs.page);
    
    var data = [];
    var numRecords = 0;
    var filter = {};
    
    // SET FILTER
    if (typeof this.req.session.sliderfilterlist !== "undefined") {
    
    if (this.req.session.sliderfilterlist.slider_name && (typeof inputs.slider_name === 'undefined')) {
    
      inputs.slider_name = this.req.session.sliderfilterlist.slider_name;
    
    
    }
    if (this.req.session.sliderfilterlist.visibility && (typeof inputs.visibility === 'undefined')) {
    
      inputs.visibility = this.req.session.sliderfilterlist.visibility;
    
    }
    }
    
    // SET FILTER VALUES
    Object.keys(inputs).forEach((name, i) => {
    
    var value = inputs[name];
    
    // NAME
    if (name == 'slider_name' && value != '') {
    
      filter.slider_name = {
        'contains': inputs.slider_name
      };
    
    }
    
    if (name == 'visibility' && value != -1) {
    
      filter.visibility = inputs.visibility
    
    }
    
    });
    
    // FIND THE RECORDS
    
    data = await Slider.find(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).paginate(formatedPage, formatedLimit).sort('createdAt DESC');
    
    // RECORDS
    numRecords = await Slider.count(filter).meta({
      makeLikeModifierCaseInsensitive: true
    });
    
    this.req.session.sliderfilterlist = inputs;
    
    var pageCount = Math.ceil(numRecords / formatedLimit);
    
    return exits.success({
      data: data,
      pageCount: pageCount,
      page: formatedPage,
      limit: formatedLimit,
      filter: this.req.session.sliderfilterlist ? this.req.session.sliderfilterlist : {}
    });
    
    }
    
    
        
      
    
    
    };
