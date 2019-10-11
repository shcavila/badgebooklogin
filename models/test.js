const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require("bcryptjs");

var testSchema = new Schema({
    name:{
        type: String
    },
    email: {
        type: String 
    },
    password:{
        type: String
    }
})

testSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});

// testSchema.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, Bcrypt.compare(plaintext, this.password));
// };

module.exports = mongoose.model('test',testSchema)