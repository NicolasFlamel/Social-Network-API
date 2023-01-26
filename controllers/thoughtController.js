const { Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

// gets all thoughts
const getThoughts = (req, res) => {
  Thought.find({}, '-__v', (err, results) =>
    err ? res.status(500).json(err) : res.json(results)
  );
};

// get single thought
const getSingleThought = (req, res) => {
  Thought.findOne({ _id: req.params.userId }, '-__v', (err, results) =>
    err ? res.status(500).json(err) : res.json(results)
  );
};

// create thought
const createThought = (req, res) => {
  const { username, email } = req.body;
  Thought.create({ username, email }, (err, results) =>
    err ? res.status(500).json(err) : res.json(results)
  );
};

// update thought
const updateThought = (req, res) => {
  Thought.findByIdAndUpdate(
    req.params.userId,
    { $set: { ...req.body } },
    { new: true },
    (err, results) => (err ? res.status(500).json(err) : res.json(results))
  );
};

// delete thought
const deleteThought = (req, res) => {
  Thought.deleteOne({ _id: req.params.userId }, (err, results) =>
    err ? res.status(500).json(err) : res.json(results)
  );
};

// add friend id to thought
const addReaction = (req, res) => {
  const { userId, friendId } = req.params;
  Thought.findByIdAndUpdate(
    userId,
    { $addToSet: { friends: friendId } },
    { new: true },
    (err, results) => (err ? res.status(500).json(err) : res.json(results))
  );
};

// delete friend id from thought
const deleteReaction = (req, res) => {
  const { userId, friendId } = req.params;
  Thought.findByIdAndUpdate(
    userId,
    { $pull: { friends: friendId } },
    { new: true },
    (err, results) => (err ? res.status(500).json(err) : res.json(results))
  );
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
};
