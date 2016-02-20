var Marionette = require('backbone.marionette');

var itemView = Marionette.ItemView.extend({
    template: require('../../templates/menu.hbs'),
//    el:"li",
    tagName:"li",
    className:"nav navbar-nav",
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    events: {
        'click': 'showDetails'
    },

    showDetails: function() {
        window.App.core.vent.trigger('app:log', 'Contacts View: showDetails hit.');
        window.App.controller.home();
    }
});



module.exports = CollectionView = Marionette.CollectionView.extend({
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
    },
//    regions:{menu:"#menu"},
    itemView: itemView
});
