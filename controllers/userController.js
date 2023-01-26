const { User } = require('../models');
const { ObjectId } = require('mongoose').Types;

// gets all user
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec();

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get single user
const getSingleUser = async (req, res) => {
  try {
    const foundUser = await User.find({ _id: req.params.userId })
      .populate(['friends', 'thoughts'])
      .exec();

    res.json(foundUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create user
const createUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const createdUser = await User.create({ username, email });

    res.json(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { ...req.body } },
      { new: true }
    );

    updatedUser ? res.json(updatedUser) : res.json({ message: 'No user found' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.userId });

    res.json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// add friend id to user
const addFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const results = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    results ? res.json(results) : res.json({ message: 'No user found' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete friend id from user
const deleteFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const results = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
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
