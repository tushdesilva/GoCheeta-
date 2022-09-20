parasails.registerPage('categoryitem', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    syncing: false,
    cloudError: "",

    listView: "/category/category-list",
    saveAction: "savecategory",

    saved: false,
    saveAndClose: false,

    formData: {
      id: 0,
      category_name: "",
      category_id:"",
      slug:"",
      image:"",
      mobile_image:"",
      description:"",
      visibility: 1,
      
    },
    formErrors: {},
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…

    _.extend(this, SAILS_LOCALS);

    this.formData.id = this.data ? this.data.id : 0;
    this.formData.visibility = this.data ? this.data.visibility : 1;
    this.formData.category_name = this.data ? this.data.category_name : "";
    this.formData.category_id = this.data ? this.data.category_id : "";
    this.formData.slug = this.data ? this.data.slug : "";
    this.formData.image = this.data ? this.data.image: "";
    this.formData.mobile_image = this.data ? this.data.mobile_image: "";
    this.formData.description = this.data ? this.data.description: "";
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
    savedAndClose: async function(){
      this.saveAndClose = true;
    },

    handleParsingForm: function () {

      this.formErrors = {};
      this.saved = false;
  
      var argins = this.formData;
  
      if (!argins.category_name) {
        this.formErrors.category_name = true;
      }
  
       if (!argins.category_id) {
        this.formErrors.category_id = true;
      }

      if (!argins.image) {
        this.formErrors.image= true;
      }

      if (!argins.mobile_image) {
        this.formErrors.mobile_image= true;
      }
      if (!argins.description) {
        this.formErrors.description= true;
      }

      if (!argins.visibility) {
        this.formErrors.visibility = true;
      }
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
  
      return argins;
    },
  
    submittedForm: async function (result) {
      if (result.error_status == 0) {

        if(this.saveAndClose == true)
        {
          window.location.href = this.listView;
  
        }else {
  
          this.saved = true;
          this.formData.id = result.data.id;
          this.formData.slug = result.data.slug;
          window.scrollTo(0, 0);
  
        }
  
        } else {
          this.cloudError = true;
          this.saved = false;
        }
    },
  }
});
