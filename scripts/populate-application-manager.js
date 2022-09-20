module.exports = {


  friendlyName: 'Populate application manager',


  description: '',


  fn: async function () {

    var dataArray = [];

    for (let index = 0; index < 20; index++) {

      dataArray.push({

        application_id:'Application - ' + (index+1),
        visibility: 1,
        title:'Mr.',
        first_name:'first_name 1'+ (index+1),
        last_name:'last_name 1'+ (index+1),
        nic:'98561234'+ (index+1)+'V',
        date_of_birth:1999-08+(index+1),
        nationality:0,
        contact_no:'+9478718959'+ (index+1),
        email:'abc@example'+ (index+1)+'.com',
        application_status: 0,
        payment_status:1,
        address_line1:'address no 5'+(index+1),
        address_line2:'address no 2'+(index+1),
        city:'Colombo - '+(index+1),
        submitted_date:2022-08+(index+1),
        reviewed_date:2022-08+(index+1),
      });
      
    }

    var createObjects = await Applicationmanager.createEach(dataArray).fetch();
  }


};

