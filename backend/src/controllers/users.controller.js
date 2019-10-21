const usersCtrl = {};
usersCtrl.getUsers = (req, res) => res.send('Users []')
usersCtrl.createUser = (req, res) => res.send('User created')
usersCtrl.deleteUser = (req, res) => res.send('User deleted')
module.exports = usersCtrl;