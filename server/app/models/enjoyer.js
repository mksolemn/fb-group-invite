var mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var EnjoyerSchema = new Schema({
    user_details: {
        username: {type:String, unique: true},
        password: String,
        nameID: {type:String, unique: true},
        userImg: String,
    },
    lastActionTime: { type: Date, default: Date.now },
    userState: {type: String, default: 'undone', enum:['undone','registered', 'confirmed', 'taking_friends','filtering_friends','promoting_page', 'promoting_group']}, // registered, confirmed, taking_friends, filtering_friends, promoting_page, promoting_group, logged_in  
    friendStats: [
        {
            total_friends: Number,
            check_date: Date
        }
    ],
    promoGroup: String,
    groupsToRepost: Array,
    promoPage: String,
    active: Boolean
});

EnjoyerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Enjoyer', EnjoyerSchema);