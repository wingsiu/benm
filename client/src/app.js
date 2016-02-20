var Marionette = require('backbone.marionette'),
    Controller = require('./controller'),
    Router = require('./router'),
    ContactModel = require('./models/contact'),
    MenuModel = require('./models/menu'),
    MenuView = require('./views/menu'),
    ContactsView = require('./views/contacts'),
    MenuCollection = require('./collections/menus'),
    ContactsCollection = require('./collections/contacts');

var menu=new MenuModel();
menu.set({name:"Home"});
var menus = new MenuCollection();
//menus.add(menu);
//menu.set({name:"Sign in"});
menus.add([{name:"Home"},{name:"Students"},{name:"Class"},{name:"Sign Out"}]);
//menus.add([{name:"Home"}]);
//menus.add([{name:"Home"},{name:"Sign Out"}]);
console.log("Menu:" ,menus);


module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application();

    App.core.on("initialize:before", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data = {};

	App.core.addRegions({
               menu:"#menu",
               content:"#content"
         });

        // load up some initial data:
        var contacts = new ContactsCollection();
        contacts.fetch({
            success: function() {
                App.data.contacts = contacts;
                App.core.vent.trigger('app:start');
            }
        });
    });

    App.core.vent.bind('app:start', function(options){
        App.core.vent.trigger('app:log', 'App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            App.core.vent.trigger('app:log', 'App: Backbone.history starting');
            Backbone.history.start();

            App.core.menu.show(new MenuView({ collection: menus }));
//            App.core.content.show(new ContactsView({ collection: App.data.contacts }));

        }

        //new up and views and render for base app here...
        App.core.vent.trigger('app:log', 'App: Done starting and running!');
    });

    App.core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });

    App.core.start();
};
