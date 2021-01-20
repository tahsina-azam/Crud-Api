const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
  fullName: {
      type: String,
      required: 'This field is required.'
  }  ,
  email: {
      type:String,
      required: 'This field is required.'
  },
  mobile: {
      type:String
  },
  roll: {
      type: String
  }
});


mongoose.model('Student',studentSchema);