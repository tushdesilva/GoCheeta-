parasails.registerPage('vehiclelist', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    syncing: false,
    cloudError: '',
    formErrors: {},

    listView: '/vehicle/vehiclelist',
    itemView: '/vehicle/vehicle/',
    removeAction: 'removevehicle',

    allSelected: false,
    selectedItems: [],

    deleteModelOpen: false,

    formData: {
      vehicle_name: '',
      visibility: -1,
    },
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    this.formData.vehicle_name = this.filter.vehicle_name ? this.filter.vehicle_name : '';
    this.formData.visibility = this.filter.visibility >= 0 ? this.filter.visibility : -1;

  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //Edit One Item Button
    showEditView: function(id) {
      window.location.href = this.itemView + id;
     },
  
     //Delete One Item Button
     deleteOneItem: function(id){
      this.selectedItems= [];
      this.selectedItems.push(id);
      this.deleteModelOpen = true;
  
     },

     //Date
     formatDate: function(date){
      var formatedDate = moment(date).format("YYYY-MM-DD");
  
      return formatedDate;
     },
  
      //PAGINATION
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
  
      //Edit One Item Button
      showEditView: function(id) {
      window.location.href = this.itemView + id;
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
  }
});
