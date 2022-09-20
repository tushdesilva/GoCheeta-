module.exports = {


  friendlyName: 'Populate offers',


  description: '',


  fn: async function () {

    sails.log('Running custom shell script... (`sails run populate-offers`)');

    var dataArray = [];

    for (let index = 0; index < 20; index++) {

      dataArray.push({
        category:'Hotels - ' + (index+1),
        merchant: 'Kingsbury' + (index+1),
        offer_heading: 'Seasonal Offer',
        image: "https://www.archmage.lk/images/logo.png",
        mobile_image: "https://www.archmage.lk/images/logo.png",
        discount_type: 1,
        discount: 20,
        card_type: 'Gold',
        visibility: 1,
        description: "This is the description of OFFER" + (index+1),
        termsandconditions: 'Term' +  (index+1),
        valid_date_from: (index + 1),
        valid_date_to: (index + 2),
        start_publish_date: (index + 3),
        featured: 1,
        offer_id: "id" + (index+1),
      });
      
    }

    var createObjects = await Offer.createEach(dataArray).fetch();

  }


};

