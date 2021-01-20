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
    if (req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
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

function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('student/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle: 'Update Student',
                    student: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list',(req,res)=>{
   // res.json(studnet.body);
   
    Student.find((err,docs) =>{
        if(!err){
            res.render("student/list",{
                list: docs
            });
        }
        else{
               console.log('Error in retrieving student list :' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/list');
        }
        else { console.log('Error in student delete :' + err); }
    });
});

module.exports = router;