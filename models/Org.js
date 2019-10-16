const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const Bcrypt = require('bcryptjs');

var OrgSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    description:{
        type: String
    },
    badges: [
        
    ]


}, {

    });

UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});



module.exports = mongoose.model('Organization', OrgSchema);