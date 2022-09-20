parasails.registerPage('faqitem', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    syncing: false,
    cloudError: "",

    listView: "/faq/faq-list",
    saveAction: "savefaq",

    saved: false,
    saveAndClose: false,

    formData: {
      id: 0,
      question: "",
      description:"",
      order:0,
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
    this.formData.question = this.data ? this.data.question: "";
    this.formData.description = this.data ? this.data.description: "";
    this.formData.order = this.data ? this.data.order: 0;
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
  
      if (!argins.question) {
        this.formErrors.question= true;
      }
  
       if (!argins.description) {
        this.formErrors.description = true;
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

