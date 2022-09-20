module.exports = {


  friendlyName: 'Populate merchant',


  description: '',


  fn: async function () {

    var dataArray = [];

        for (let index = 0; index < 15; index++) {
    dataArray.push({
    

            name:'name ' + (index+1),
            visibility: 1 ,
            merchant_code:'test' + (index+1),
            category:'test ',
            logo:'Application  ', 
            contact_number:'077' + (index+1),
            email:'test ' + (index+1),
            address_line1:'test' + (index+1),
            address_line2:'test'+ (index+1), 
            city:'test'+ (index+1),
            country:'test' + (index+1),
            description:'test'+ (index+1), 
            website:'test ' + (index+1),  
            featured:1 ,  
            contact_person_1_name:'test' + (index+1),
            contact_person_1_contact_number:'099'  + (index+1) ,
            contact_person_1_email:'test' + (index+1), 
            contact_person_1_designation:'test' + (index+1),

    });
      
    }

    var createObjects = await Merchant.createEach(dataArray).fetch();

    

  }


};

