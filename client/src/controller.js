var Marionette = require('backbone.marionette'),
    ContactsView = require('./views/contacts'),
    ContactDetailsView = require('./views/contact_details'),
    AddContactView = require('./views/add');



module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        window.App.views.contactsView = new ContactsView({ collection: window.App.data.contacts });
        window.App.views.layoutView = new LayoutView({ collection: window.App.data.contacts });
        
    },

    home: function() {
        App.core.vent.trigger('app:log', 'Controller: "Home" route hit.');
        var view = window.App.views.contactsView;
//        var view2 = window.App.views.layoutView;
//	var view2 = new LayoutView({ collection: window.App.data.contacts }); 
//        $("#menu").append(view2.el);
//	view2.render(view.render().el);
 //       view2.menu.show(view);
 //       App.core.menu.show(new ContactsView({ collection: window.App.data.contacts }));
//	this.renderView(view2);
 //       App.core.content.close();     
	this.renderView(view);
        window.App.router.navigate('#');
    },

    details: function(id) {
        App.core.vent.trigger('app:log', 'Controller: "Contact Details" route hit.');
        var view = new ContactDetailsView({ model: window.App.data.contacts.get(id)});
        this.renderView(view);
        window.App.router.navigate('details/' + id);
    },

    add: function() {
        App.core.vent.trigger('app:log', 'Controller: "Add Contact" route hit.');
        var view = new AddContactView();
        this.renderView(view);
        window.App.router.navigate('add');
    },

    renderView: function(view) {
        this.destroyCurrentView(view);
        App.core.vent.trigger('app:log', 'Controller: Rendering new view.');
        $('#js-boilerplate-app').html(view.render().el);
         MathJax.Hub.Typeset();
    },

    destroyCurrentView: function(view) {
        if (!_.isUndefined(window.App.views.currentView)) {
            App.core.vent.trigger('app:log', 'Controller: Destroying existing view.');
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});

var LayoutView = Marionette.Layout.extend({
    template: require('../templates/main.hbs'),
    regions:{
      'menu':'#menu',
      'content':'#content'
    },
    events: {
        'click': 'showDetails'
    },

     onRender: function() {
        App.core.vent.trigger('app:log', 'Layout: Rendering new view.');

//          var contactsView = window.App.views.contactsView;
//          var menuView = window.App.views.menuView;
//          this.regions.menu.show(new MenuView());
//          this.content.show(new ContactsView());     
//    window.App.views.layoutView.regions.menu.show(new MenuView());
     },
     onShow: function() {
        App.core.vent.trigger('app:log', 'Layout: Showing new view.');
     }
});

