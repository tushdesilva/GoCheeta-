parasails.registerPage('userlist', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
   
    syncing: false,
    status_sync: false,
    cloudError: '',
    formErrors: {},

    listView: '/users/userlist',
    itemView: '/users/user',
    removeAction: 'removeuser',

    allSelected: false,
    selectedItems: [],

    deleteModelOpen: false,
    indexClicked : 0,

    formData: {
      name: '',
    },



  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    _.extend(this, SAILS_LOCALS);
    
    this.formData.name = this.filter.name ? this.filter.name : '';
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
       // ********************** SET FUNCTIONS *************************//

    // PEGINATION
    pagination: function(selectedPage, pageCount) {

      var array = [],
      j = 0;

      if (selectedPage + 10 < pageCount) {
        pageCount = selectedPage + 10;
      }

      if (selectedPage - 10 <= 0) {
        selectedPage = 0;
      } else {
        selectedPage = selectedPage - 10
      }

      for (var i = selectedPage; i <= pageCount; i++) {
        array[j] = i;
        j++;
      }

      return array;

    },

    selectAll: function() {

      this.selectedItems = [];

      if (!this.allSelected) {
        for (i in this.data) {
          this.selectedItems.push(this.data[i].id);
        }
      }
    },
    select: function() {
      this.allSelected = false;
    },

    changeStatus: async function(user_id, status, index) {

      this.indexClicked = index;
      this.status_sync = true;

      this.$forceUpdate();

      var result_status = await Cloud.changeuserstatus.with({user_id: user_id, status: status });

      if (result_status.data.id) {

        this.data[this.indexClicked].status = result_status.data.status;
        this.$forceUpdate();


        // // Find item index using _.findIndex
        // var updateObj = _.findIndex(this.data, {
        //   id: result_status.data.id
        // });
        //
        // // Replace item at index using native splice
        // this.data.splice(updateObj, 1, result_status.data);
        // this.$forceUpdate();

        this.status_sync = false;

      }else{

        this.status_sync = false;
        this.cloudError = true;

      }

    },

    deleteItems: async function() {

      if (this.selectedItems.length == 0) {

        alert("Please select an item!");

      } else {

        this.deleteModelOpen = true;

      }

    },

    closeDeleteModal: function() {

      this.deleteModelOpen = false;
      this.cloudError = '';

    },

    handleParsingDeleteForm: function() {

      return {
        selectedItems: this.selectedItems,

      };

    },

    submittedDeleteForm: function(result) {

      if (result.result) {

        for (i = 0; i < result.result.length; i++) {
          _.remove(this.data, {
            id: result.result[i].id
          });
        }

        this.deleteModelOpen = false;
        this.cloudError = '';

        this.$forceUpdate();

      }

    },

    // ********************** SET FUNCTIONS *************************//
  }
});
