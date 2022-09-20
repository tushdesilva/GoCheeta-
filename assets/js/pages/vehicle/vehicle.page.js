parasails.registerPage('vehicle', {

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝

  data: {
    syncing: false,
    cloudError: "",

    listView: "/vehicle/vehiclelist",
    saveAction: "savevehicle",

    saved: false,
    saveAndClose: false,

    formData: {
      id: 0,
      visibility: 1, // Published
      featured: 1, //Featured
      vehicle_id: "",
      vehicle_brand: "",
      vehicle_name: "",
      vehicle_number: "",
      category: "",
      image: "",

    },

    formErrors: {},
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {

    _.extend(this, SAILS_LOCALS);

    this.formData.id = this.data ? this.data.id : 0;
    this.formData.visibility = this.data ? this.data.visibility : 1;
    this.formData.featured = this.data ? this.data.featured : 1;
    this.formData.vehicle_id = this.data ? this.data.vehicle_id : "";
    this.formData.category = this.data ? this.data.category : "";
    this.formData.vehicle_name = this.data ? this.data.vehicle_name : "";
    this.formData.vehicle_brand = this.data ? this.data.vehicle_brand : "";
    this.formData.vehicle_number = this.data ? this.data.vehicle_number : "";
    this.formData.image = this.data ? this.data.image : "";

  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    savedAndClose: async function () {

      this.saveAndClose = true;

    },

    // VALIDATION

    handleParsingForm: function () {

      this.formErrors = {};
      this.saved = false;

      var argins = this.formData;

      if (!argins.visibility) {
        this.formErrors.visibility = true;
      }
      if (!argins.featured) {
        this.formErrors.featured = true;
      }
      if (!argins.vehicle_id) {
        this.formErrors.vehicle_id = true;
      }
      if (!argins.category) {
        this.formErrors.category = true;
      }

      if (!argins.vehicle_name) {
        this.formErrors.vehicle_name = true;
      }
      if (!argins.vehicle_brand) {
        this.formErrors.vehicle_brand = true;
      }
      if (!argins.vehicle_number) {
        this.formErrors.vehicle_number = true;
      }
      if (!argins.image) {
        this.formErrors.image = true;
      }


      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      console.log(argins);

      return argins;
    },

    submittedForm: async function (result) {


      if (result.error_status == 0) {

        if (this.saveAndClose == true) {
          window.location.href = this.listView;

        } else {

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
