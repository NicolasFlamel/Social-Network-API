const { User } = require('../models');
const { ObjectId } = require('mongoose').Types;

// gets all user
const getUsers = (req, res) => {
  User.find({}, '-__v', (err, results) =>
    err ? res.status(500).json(err) : res.json(results)
  );
};

// get single user
const getSingleUser = (req, res) => {
  User.findOne({ _id: req.params.userId }, '-__v', (err, results) =>
    err ? res.status(500).json(err) : res.json(results)
  );
};

// create user
const createUser = (req, res) => {
  const { username, email } = req.body;
  User.create({ username, email }, (err, results) =>
    err ? res.status(500).json(err) : res.json(results)
  );
};

// update user
const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    { $set: { ...req.body } },
    { new: true },
    (err, results) => (err ? res.status(500).json(err) : res.json(results))
  );
};

// delete user
const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.userId }, (err, results) =>
    err ? res.status(500).json(err) : res.json(results)
  );
};

// add friend id to user
const addFriend = (req, res) => {
  const { userId, friendId } = req.params;
  User.findByIdAndUpdate(
    userId,
    { $addToSet: { friends: friendId } },
    { new: true },
    (err, results) => (err ? res.status(500).json(err) : res.json(results))
  );
};

// delete friend id from user
const deleteFriend = (req, res) => {
  const { userId, friendId } = req.params;
  User.findByIdAndUpdate(
    userId,
    { $pull: { friends: friendId } },
    { new: true },
    (err, results) => (err ? res.status(500).json(err) : res.json(results))
  );
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
