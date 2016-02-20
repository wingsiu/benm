var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Contact = new Schema({
    email:      { type: String },
    name: {
        first:  { type: String },
        last:   { type: String }
    },
    phone:      { type: String },
    gravatar:   { type: String }
});

var Menu = new Schema({
    level:      { type: Number },
    order:      { type: Number },
    title:      { type: String },
    page:       { type: String },
    name:       { type: String },
    readRole:	{ type:	Number },
    editRole:	{ type: Number },
    createBy:	{ type: String }
});


module.exports = {
    Contact: mongoose.model('Contact', Contact)
};
