
module.exports = {


  friendlyName: 'Populate cards',


  description: '',


  fn: async function () {

  

    var dataArray = [];

    for (let index = 0; index < 20; index++) {

      dataArray.push({
        name:'Sample Card - ' + (index+1),
        card_id: 'CARD' + (index+1),
        visibility: 1,
        image: "https://www.archmage.lk/images/logo.png",
        description: "Tis is the description of Cards" + (index+1),
        card_price: 5000,
        number_of_cards: 1
      });
      
    }

    var createObjects = await Cards.createEach(dataArray).fetch();

  }


};

