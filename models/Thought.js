const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    trim: true,
  },
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
