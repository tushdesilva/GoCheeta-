parasails.registerPage('slider', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    syncing: false,
    cloudError: "",

    listView: "/slider/sliderlist",
    saveAction: "saveslider",

    saved: false,
    saveAndClose: false,

    formData: {
      id: 0,
      slider_name: "",
      image_url :"",
      order:"",
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
    this.formData.slider_name = this.data ? this.data.slider_name : "";
    this.formData.image_url = this.data ? this.data.image_url: "";
    this.formData.order = this.data ? this.data.order: "";
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
 
  methods: {
    savedAndClose: async function(){
      this.saveAndClose = true;
    },

    handleParsingForm: function () {

      this.formErrors = {};
      this.saved = false;
  
      var argins = this.formData;
  
      if (!argins.slider_name) {
        this.formErrors.slider_name = true;
      }
  
      

      if (!argins.image_url) {
        this.formErrors.image_url= true;
      }

      
      if (!argins.order) {
        this.formErrors.order= true;
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
          window.scrollTo(0, 0);
  
        }
  
        } else {
          this.cloudError = true;
          this.saved = false;
        }
    },
  }
});


