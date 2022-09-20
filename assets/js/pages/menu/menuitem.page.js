parasails.registerPage('menuitem', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    syncing: false,
    cloudError: "",

    listView: "/menu/menulist",
    saveAction: "savemenu",

    saved: false,
    saveAndClose: false,

    formData: {
      id: 0,
      name: "",
      slug:"",
      visibility: 1, // Published
      order: 0,
    },

    formErrors: {},

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    // POPULATE THE DATA
    this.formData.id = this.data ? this.data.id : 0;
    this.formData.name = this.data ? this.data.name : "";
    this.formData.slug = this.data ? this.data.slug : "";
    this.formData.visibility = this.data ? this.data.visibility : 1;
    this.formData.order = this.data ? this.data.order : 0;


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

      if (!argins.order) {
        this.formErrors.order = true;
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
