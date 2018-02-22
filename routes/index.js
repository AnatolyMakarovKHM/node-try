var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodetry1');

var userSchema = mongoose.Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  }
});

var User = mongoose.model('user',userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users',function(req,res){
  return User.find(function(err,users){
    if (!err) {
      res.render('users-list', {
        users: users,
        title: 'Users list'
      });
    } else {
      res.render(err);
    }
  })
})

router.get('/api/users',function(req,res){
  return User.find(function(err,users){
    if (!err) {
      res.send(users);
    } else {
      res.send(err);
    }
  })
})

router.get('/api/users/:firstname',function(req,res){
  return User.find({firstname:req.params.firstname},function(err,users){
    if (!err) {
      res.send(users);
    } else {
      res.send(err);
    }
  })
})

router.post('/api/users/add',function(req,res){
  var data = req.body;
  console.log(req.body);
  var newUser;
  newUser = new User({
    firstname: data.firstname,
    lastname: data.lastname,
    password: data.password,
    email: data.email
  });
  newUser.save(function(err){
    if (!err) {
      res.send(data.email + ' - created');
      return console.log(data.email + ' - created');
    } else {
      res.send(err);
      return console.log(err);
    }
  })
})

router.post('/api/users/remove',function(req,res){
    var data = req.body;
    console.log(req.body);
    User.remove()
})


/*
router.get('/users', function(req, res, next) {
    res.render('users', { userList: getResponse });
});
*/


module.exports = router;
