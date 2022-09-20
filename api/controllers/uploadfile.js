module.exports = {

  friendlyName: 'Uploadfile',


  description: 'Uploadfile something.',

  files: ['image'],


  inputs: {

    image: {
      type: 'ref',


    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var util = require('util');
    var image_url = '';

    // Upload the image.
    var files = await sails.helpers.flow.simultaneously(
      [async () => await sails.uploadOne(inputs.image, {
        maxBytes: 30000000,
        maxTimeToBuffer: 30000
      })]

    ).intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
      .intercept((err) => new Error('The photo upload failed: ' + util.inspect(err)))

      ;
    for (var key in files) {
      if (files[key] !== undefined) {
        if (files[key].field == 'image') {
          //image_url = "https://drive.google.com/drive/folders/1nHtNap0NFT58zpHEt-xxG8gmRKVGO8vm?usp=sharing"+ files[key].fd;
          image_url = "https://taxistudio-cad.s3.amazonaws.com/" + files[key].fd;
        }
      }
    }

    return exits.success({
      image_url: image_url
    });

  }


};
