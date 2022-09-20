
/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /': { action: 'view-homepage-or-redirect' },
  'GET /welcome/:unused?': { action: 'dashboard/view-welcome' },

  'GET /faq': { action: 'view-faq' },
  'GET /legal/terms': { action: 'legal/view-terms' },
  'GET /legal/privacy': { action: 'legal/view-privacy' },
  'GET /contact': { action: 'view-contact' },

  'GET /signup': { action: 'entrance/view-signup' },
  'GET /email/confirm': { action: 'entrance/confirm-email' },
  'GET /email/confirmed': { action: 'entrance/view-confirmed-email' },

  'GET /login': { action: 'entrance/view-login' },
  'GET /password/forgot': { action: 'entrance/view-forgot-password' },
  'GET /password/new': { action: 'entrance/view-new-password' },
  'GET /account/:id?':            { action: 'account/view-account-overview' },
  'GET /account/password/:id?':   { action: 'account/view-edit-password' },
  'GET /account/profile/:id?':    { action: 'account/view-edit-profile' },
  'GET /account': { action: 'account/view-account-overview' },
  'GET /account/password': { action: 'account/view-edit-password' },
  'GET /account/profile': { action: 'account/view-edit-profile' },
  'GET /menu/menulist': { action: 'menu/view-menulist' },
  'GET /menu/menuitem': { action: 'menu/view-menuitem' },
  'GET /menu/menuitem/:id': { action: 'menu/view-menuitem' },
  'GET /applicationmanager/applicationmanagerlist': { action: 'applicationmanager/view-applicationmanagerlist' },
  'GET /applicationmanager/applicationmanageritem': { action: 'applicationmanager/view-applicationmanageritem' },
  'GET /applicationmanager/applicationmanageritem/:id': { action: 'applicationmanager/view-applicationmanageritem' },
  'GET /account': { action: 'account/view-account-overview' },
  'GET /account/password': { action: 'account/view-edit-password' },
  'GET /account/profile': { action: 'account/view-edit-profile' },
  'GET /menu/menulist': { action: 'menu/view-menulist' },
  'GET /menu/menuitem': { action: 'menu/view-menuitem' },
  'GET /menu/menuitem/:id': { action: 'menu/view-menuitem' },
  'GET /bank/banklist': { action: 'bank/view-banklist' },
  'GET /bank/bank': { action: 'bank/view-bank' },
  'GET /bank/bank/:id': { action: 'bank/view-bank' },
  'GET /category/category-list': { action: 'category/view-category-list' },
  'GET /category/categoryitem': { action: 'category/view-categoryitem' },
  'GET /category/categoryitem/:id': { action: 'category/view-categoryitem' },
  'GET /slider/sliderlist': { action: 'slider/view-sliderlist' },
  'GET /slider/slider': { action: 'slider/view-slider' },
  'GET /slider/slider/:id': { action: 'slider/view-slider' },
  'GET /driver/driverlist': { action: 'driver/view-driverlist' },
  'GET /driver/driveritem': { action: 'driver/view-driveritem' },
  'GET /driver/driveritem/:id': { action: 'driver/view-driveritem' },
  'GET /cards/cardslist': { action: 'cards/view-cardslist' },
  'GET /cards/cardsitem': { action: 'cards/view-cardsitem' },
  'GET /cards/cardsitem/:id': { action: 'cards/view-cardsitem' },

  'GET /newsmanager/newslist': { action: 'newsmanager/view-newslist' },
  'GET /newsmanager/newsitem': { action: 'newsmanager/view-newsitem' },
  'GET /newsmanager/newsitem/:id': { action: 'newsmanager/view-newsitem' },

  'GET /vehicle/vehiclelist': { action: 'vehicle/view-vehiclelist' },
  'GET /vehicle/vehicle': { action: 'vehicle/view-vehicle' },
  'GET /vehicle/vehicle/:id': { action: 'vehicle/view-vehicle' },
  'GET /faq/faq-list': { action: 'faq/view-faq-list' },
  'GET /faq/faqitem': { action: 'faq/view-faqitem' },
  'GET /faq/faqitem/:id': { action: 'faq/view-faqitem' },


  'GET /pagemanager/pagelist': { action: 'pagemanager/view-pagelist' },
  'GET /pagemanager/pageitem': { action: 'pagemanager/view-pageitem' },
  'GET /pagemanager/pageitem/:id': { action: 'pagemanager/view-pageitem' },




  'GET /users/userlist': { action: 'users/view-userlist' },
  'GET /users/user': { action: 'users/view-user' },
  'GET /users/user/:id': { action: 'users/view-user' },


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms': '/legal/terms',
  '/logout': '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout': { action: 'account/logout' },
  'PUT   /api/v1/account/update-password': { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile': { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card': { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login': { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup': { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },

  'POST  /api/v1/entrance/update-password-and-login': { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message': { action: 'deliver-contact-form-message' },

  'DELETE /api/v1/vehicle/removevehicle': { action: 'vehicle/removevehicle' },
  'POST /api/v1/vehicle/savevehicle': { action: 'vehicle/savevehicle' },

  'POST /api/v1/uploadfile': { action: 'uploadfile' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },
  'DELETE /api/v1/menu/removemenuitem': { action: 'menu/removemenuitem' },
  // 'POST /api/v1/bank/savebank': { action: 'bank/savebank' },
  'DELETE /api/v1/bank/removebank': { action: 'bank/removebank' },
  'POST /api/v1/menu/savemenu': { action: 'menu/savemenu' },
  'POST /api/v1/driver/savedriver': { action: 'driver/savedriver' },
  'DELETE /api/v1/driver/removedriveritem': { action: 'driver/removedriveritem' },
  'DELETE /api/v1/applicationmanager/removeapplication': { action: 'applicationmanager/removeapplication' },
  'POST /api/v1/applicationmanager/saveapplication': { action: 'applicationmanager/saveapplication' },
  'POST  /api/v1/entrance/update-password-and-login': { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message': { action: 'deliver-contact-form-message' },
  'DELETE /api/v1/menu/removemenuitem': { action: 'menu/removemenuitem' },
  'POST /api/v1/menu/savemenu': { action: 'menu/savemenu' },
  'POST /api/v1/category/savecategory': { action: 'category/savecategory' },
  'DELETE /api/v1/category/removecategory': { action: 'category/removecategory' },
  'POST /api/v1/slider/saveslider': { action: 'slider/saveslider' },
  'DELETE /api/v1/slider/removeslider': { action: 'slider/removeslider' },
  'POST /api/v1/cards/savecards': { action: 'cards/savecards' },
  'DELETE /api/v1/cards/removecards': { action: 'cards/removecards' },
  'POST /api/v1/uploadfile': { action: 'uploadfile' },
  'POST /api/v1/newsmanager/savenews': { action: 'newsmanager/savenews' },
  'DELETE /api/v1/newsmanager/removenews': { action: 'newsmanager/removenews' },
  'POST /api/v1/users/saveuser': { action: 'users/saveuser' },
  'DELETE /api/v1/users/removeuser': { action: 'users/removeuser' },
  'POST /api/v1/pagemanager/savepage': { action: 'pagemanager/savepage' },
  'DELETE /api/v1/pagemanager/removepage': { action: 'pagemanager/removepage' },
  'POST /api/v1/faq/savefaq': { action: 'faq/savefaq' },
  'DELETE /api/v1/faq/removefaq': { action: 'faq/removefaq' },
  'POST /api/v1/bank/savebank': { action: 'bank/savebank' },

  'POST /api/v1/vehicle/savevehicle': { action: 'vehicle/savevehicle' },
  'DELETE /api/v1/vehicle/removevehicle': { action: 'vehicle/removevehicle' },




};
