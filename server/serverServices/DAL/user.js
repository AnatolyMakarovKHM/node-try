import User from "../schemas/user";

const controller = {};

controller.getUsersPage = function (req, res) {
    return User.find(function(err, users) {
        if (!err) {
            res.render("users-list", {users: users, title: "Users list"});
        } else {
            res.render(err);
        }
    });
};

controller.getUsers = function (req, res){
    return User.find(function (err, users) {
        if (!err) {
            res.send(users);
        } else {
            res.send(err);
        }
    });
};

controller.getUsersById = function(req, res){
    return User.find({account_name:req.params.account_name},function(err,users){
        if (!err) {
            res.send(users);
        } else {
            res.send(err);
        }
    });
};

controller.addUser = function(req, res) {
    const data = req.body;
    const newUser = new User({
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        email: data.email,
        account_name: data.firstname[0] + data.lastname[0] + data.email.split("@")[0]
    });
    newUser.save(function (err) {
        if (!err) {
            res.send(data.email + " - created");
        } else {
            res.send(err);
        }
    });
};

controller.updateUser = function(req, res) {
    //@todo account_name updater
    return User.findOneAndUpdate({account_name:req.params.account_name}, {$set: req.body}, {new: true}, function(err,user){
        if (!err) {
            res.send(user.account_name + " - updated");
        } else {
            res.send(err);
        }
    });
}

controller.deleteUser = function(req, res) {
    return User.findOneAndRemove({account_name:req.params.account_name}, function(err,user){
        if (!err) {
            res.send(user.account_name + " - deleted");
        } else {
            res.send(err);
        }
    });
};

export default controller;