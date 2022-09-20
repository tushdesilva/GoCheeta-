module.exports = {


  friendlyName: 'Populate news',


  description: '',


  fn: async function () {

    var dataArray = [];

    for (let index = 0; index < 20; index++) {

      dataArray.push({
        title: 'Sample News - ' + (index + 1),
        subtitle: 'Subtitle' + (index + 1),
        slug: 'Slug' + (index + 1),
        visibility: 1,
        image: "https://www.archmage.lk/images/logo.png",
        description: "This is the description of News" + (index + 1),
        author: 'sample Author' + (index + 1),

      });

    }

    var createObjects = await News.createEach(dataArray).fetch();

  }


};

