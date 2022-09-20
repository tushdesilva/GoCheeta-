module.exports = {


  friendlyName: 'Savecategory',


  description: 'Savecategory category.',


  inputs: {

    id:{
      type: 'string',
     },

    category_name:{
      type: 'string',
    },

    category_id:{
      type: 'string',
    },
    
    slug:{
      type: "string",
   
    },
    image:{
      type:'string',
    },

    mobile_image:{
      type:'string',
    },

    description:{
      type:'string',
    },

    visibility:{ 
      type:'number',
      required :true,
    },

    category:{
      type:'string',
    },

  },




  exits: {

  },


  fn: async function (inputs, exits) {
    
    var slug  = "";

    if(inputs.slug){
      slug = await sails.helpers.slugs(inputs.slug, inputs.id ? inputs.id : '','Category');
    }else{
      slug = await sails.helpers.slugs(inputs.category_name, inputs.id ? inputs.id : '','Category');
    }

    inputs.slug = slug;

    await Category.findOrCreate({
      id: inputs.id
    }, 
    {
      category_name:inputs.category_name,
      category_id:inputs.category_id,
      slug: inputs.slug,
      image:inputs.image,
      mobile_image:inputs.mobile_image,
      description:inputs.description,
      visibility: inputs.visibility,
      category : inputs.category,
      catergory:inputs.catergory,
    })
    .exec(async (err, record, wasCreated) => {

      if (err) {

        return this.res.serverError(err);
      }

      if (wasCreated) {

        return exits.success({
          data: record,
          error_status: record ? 0 : 1
        });
      } else { // UPDATE

        var updatedObj = await Category.updateOne({
            id: inputs.id
          })
          .set({
            category_name:inputs.category_name,
            category_id:inputs.category_id,
            slug: inputs.slug,
            image:inputs.image,
            mobile_image:inputs.mobile_image,
            description:inputs.description,
            visibility: inputs.visibility,
            category : inputs.category,
            catergory:inputs.catergory,
          });

        return exits.success({
          data: updatedObj,
          error_status: updatedObj ? 0 : 1
        });

      }

    });

  

  }


};


