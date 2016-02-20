var Backbone = require('backbone'),
    MenuModel = require('../models/menu');

module.exports = ContactsCollection = Backbone.Collection.extend({
    model:  MenuModel,
    url: '/'
});
