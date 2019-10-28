var mongoose = require('mongoose');

var orgSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    address: {
      type: String,
      required: true,
      unique: false,
    },

    orgName: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    type: {
      type: String,
      required: true,
      unique: false,
    },
    badges:[{
        granted: Boolean,
        code: String,
        badgename: String,
        venue: String,
        recipient: [{username: String, fullname: String}],
        certificateName: String,
        descriptions: String,
        organization: String,
        date: {
          month: String,
          day: Number,
          year: Number,
        }
    }],
    post: {
      type: String,
      required: false,
      unique: false,
    },
    
    
  });

  module.exports = mongoose.model('Organization', orgSchema);

