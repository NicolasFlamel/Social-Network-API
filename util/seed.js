const connection = require('../config/connection');
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  let promises = [];
  console.log('connected');

  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = await User.collection.insertMany(userData);
  const thoughts = await Thought.collection.insertMany(thoughtData);

  const userIds = Object.keys(users.insertedIds).map((key) =>
    users.insertedIds[key].toString()
  );
  const thoughtIds = Object.keys(thoughts.insertedIds).map((key) =>
    thoughts.insertedIds[key].toString()
  );

  userIds.forEach((id, i) => {
    const friendPromise = User.updateMany(
      { _id: { $ne: id } },
      { $addToSet: { friends: id } }
    );
    const thoughtPromise = User.findOneAndUpdate(
      { _id: id },
      { $addToSet: { thoughts: thoughtIds[i] } }
    );
    promises.push(friendPromise, thoughtPromise);
  });

  await Promise.all(promises);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
