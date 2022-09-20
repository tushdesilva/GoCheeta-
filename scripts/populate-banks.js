

module.exports = {


  friendlyName: 'Populate banks',


  description: '',



  fn: async function () {

    sails.log('Running custom shell script... (`sails run populate-banks`)');

    sails.log('Running custom shell script... (`sails run populate-offers`)');

    var dataArray = [];

    for (let index = 0; index < 20; index++) {

      dataArray.push({
       bank_name:'HSBC- ' + (index+1),
       bank_id: 'bid' + (index+1),
       logo:'abc'+ (index+1),
       visibility: 1,
       short_name:'HSBC'+ (index+1),
       description: "This is the description of OFFER" + (index+1),
       
      });
      
    }

    var createObjects = await Banks.createEach(dataArray).fetch();

  }


};

