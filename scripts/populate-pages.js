module.exports = {


  friendlyName: 'Populate pages',


  description: '',


  fn: async function () {

    var dataArray = [];

    for (let index = 0; index < 20; index++) {

      dataArray.push({
        title: 'Sample Page - ' + (index + 1),
        page_content: 'content' + (index + 1),
        slug: 'Slug' + (index + 1),
        visibility: 1,
        meta_title: 'Sample Meta Title' + (index + 1),
        meta_image: "https://www.archmage.lk/images/logo.png",
        meta_description: "This is the description " + (index + 1),
        meta_keyword: 'sample Keyword' + (index + 1),


      });

    }

    var createObjects = await Pages.createEach(dataArray).fetch();

  }


};

