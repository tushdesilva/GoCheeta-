parasails.registerPage('driveritem', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    syncing: false,
    cloudError: "",

    listView: "/driver/driverlist",
    saveAction: "savedriver",

    saved: false,
    saveAndClose: false,

    formData: {
      id: 0,
      name:"",
      visibility: 1,
      driver_code:"",
      driver_id:"",
      category:"",
      contact_number:"",
      email:"",
      address_line1:"",
      address_line2:"",
      city:"",
      featured:1,
    },

    formErrors: {},
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

    _.extend(this, SAILS_LOCALS);

    // POPULATE THE DATA
    this.formData.id = this.data ? this.data.id : 0;
    this.formData.name = this.data ? this.data.name : "";
    this.formData.visibility = this.data ? this.data.visibility : 1;   
    this.formData.featured = this.data ? this.data.featured : 1;
    this.formData.driver_code = this.data ? this.data.driver_code : "";
    this.formData.driver_id = this.data ? this.data.driver_id: "";
    this.formData.category = this.data ? this.data.category : ""; 
    this.formData.contact_number = this.data ? this.data.contact_number : "";
    this.formData.email = this.data ? this.data.email : "";
    this.formData.address_line1 = this.data ? this.data.address_line1 : "";
    this.formData.address_line2 = this.data ? this.data.address_line2 : "";   
    this.formData.city = this.data ? this.data.city : "";
    
    
    //…
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    savedAndClose: async function() {

      this.saveAndClose = true;

  },

  // VALIDATION

  handleParsingForm: function () {

    this.formErrors = {};
    this.saved = false;

    var argins = this.formData;

    if (!argins.name) {
      this.formErrors.name = true;
    }
    if (!argins.driver_code) {
      this.formErrors.driver_code = true;
    }
    if (!argins.driver_id) {
      this.formErrors.driver_id = true;
    }
    if (!argins.category) {
      this.formErrors.category = true;
    }
    if (!argins.contact_number) {
      this.formErrors.contact_number = true;
    }
    if (!argins.email) {
      this.formErrors.email = true;
    }
    if (!argins.category) {
      this.formErrors.category = true;
    }
    if (!argins.address_line1) {
      this.formErrors.address_line1 = true;
    }
    if (!argins.city) {
      this.formErrors.city = true;
    }

    if (Object.keys(this.formErrors).length > 0) {
      return;
    }

    console.log(argins);

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
    //…
  }
});
