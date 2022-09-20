module.exports = {

  isCurrentPage: function(req, menuitem) {
    var pathArr = req.path.split('/');
    return (pathArr[1] === menuitem)
  },
 
  getMenu: async function(req) {

    var menu = await Menu.find({ visibility: 1 });

    console.log(menu);
    
    return menu;

  },



}
