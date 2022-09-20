module.exports = {


  friendlyName: 'Populatecategory',


  description: 'Populatecategory something.',


  fn: async function () {

    var dataArray = [];

    for (let index = 0; index < 20; index++) {

      dataArray.push({
        category_name:'Hotel Category - ' + (index+1),
        category_id: 'HOL' + (index+1),
        visibility: 1,
        image: "https://www.archmage.lk/images/logo.png",
        mobile_image: "https://www.archmage.lk/images/logo.png",
        description: "Tis is the description of HOTEL" + (index+1)
      });
      
    }

    var createObjects = await Category.createEach(dataArray).fetch();


  }


};

