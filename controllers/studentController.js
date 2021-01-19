const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/',(req,res)=>{
    res.render("student/addOrEdit",{
        viewTitle : "Insert Student"
    });
});

router.post('/',(req,res)=>{
  insertRecord(req,res);
});

function insertRecord(req,res){
  var student = new Student();
  student.fullName =req.body.fullName;
  student.email =req.body.email;
  student.mobile =req.body.mobile;
  student.roll =req.body.roll;
  student.save((err, doc) => {
      if(!err){
          res.redirect('student/list');
      }
      else{
          console.log('Error during record insertion : '+ err);
      }
  });
}

router.get('/list',(req,res)=>{
    res.json('from list');
});

module.exports = router;