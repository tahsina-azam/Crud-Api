const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
  fullName: {
      type: String
  }  ,
  email: {
      type:String
  },
  mobile: {
      type:String
  },
  roll: {
      type: String
  }
});

mongoose.model('Student',studentSchema);