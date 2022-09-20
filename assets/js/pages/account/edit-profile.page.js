parasails.registerPage('edit-profile', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // Main syncing/loading state for this page.
    syncing: false,
    singleView: '/account',

     // Form data
  formData: {
    tags: [],
    user_group:'',
    location:[],
    user_location:'',
    staff: '',
    isSuperAdmin:'',
    groupOptions:'',
  },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

     // Form rules
     formRules: {
      fullName: {required: true},
      emailAddress: {required: true, isEmail: true},
    },

    // Server error state for the form
    cloudError: '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    _.extend(this, SAILS_LOCALS);

    // Set the form data.
    this.formData.fullName = this.data.fullName;
    this.formData.username = this.data.username;
    this.formData.emailAddress = this.data.emailChangeCandidate ? this.data.emailChangeCandidate : this.data.emailAddress;
    this.formData.id = this.data.id;

    this.singleView = '/account/' + this.data.id;
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    submittedForm: async function(id) {
      if (id == this.me.id) {
      // Redirect to the account page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;
      window.location = '/account';

    } else {
      // Redirect to the account page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
     
      this.syncing = true;
      window.location = '/account/' + id.id;
    }

  },

  handleParsingForm: function() {

    // Clear out any pre-existing error messages.
    this.formErrors = {};

    var argins = this.formData;

    console.log(argins);

    // Validate first name:
    if (!argins.fullName) {
      this.formErrors.fullName = true;
    }

    // Validate email:
    if (!argins.emailAddress) {
      this.formErrors.emailAddress = true;
    }

    // If there were any issues, they've already now been communicated to the user,
    // so simply return undefined.  (This signifies that the submission should be
    // cancelled.)
    if (Object.keys(this.formErrors).length > 0) {
      return;
    }

    return argins;
    },

  }
});
