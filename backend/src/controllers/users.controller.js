const usersCtrl = {};
const User = require('../models/User');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
usersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    res.json(user);
};
usersCtrl.createUser = async (req, res) => {
    const {username, email} = req.body;
    const newUser = new User({
        username: username,
        email: email
    });
    await newUser.save();
    res.json('User created');
};
usersCtrl.updateUser = async (req, res) => {
    const { username, email, name } = req.body;
    await User.findOneAndUpdate(req.params.id, {
        username,
        email
    });
    console.log(req.params.id, req.body);
    res.json({message: 'User Updated'});
};
usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json('User deleted');
};
module.exports = usersCtrl;