const { User } = require('../models');
const { ObjectId } = require('mongoose').Types;

// gets all user
const getUsers = (req, res) => {
    User.find({}, (err, result) => {
        if (err) {
            res.status(500).send({ err, message: 'Internal Server Error' });
        } else {
            res.status(200).json(result);
        }
    });
};

// get single user
const getSingleUser = (req, res) => {
    User.findOne({ _id: req.params.userId }, (err, results) =>
        err ? res.status(500).json(err) : res.json(results)
    );
};

// create user
const createUser = (req, res) => {
    const { username, email } = req.body;
    User.create({ username, email }, (err, results) =>
        err ? res.status(500).json(err) : res.json(results)
    );
}

// update user
const updateUser = (req, res) => {

}

// delete user
const deleteUser = (req, res) => {

}

const addFriend = (req, res) => {
    const _id = ObjectId(req.params.id);
}

const deleteFriend = (req, res) => {
    const _id = ObjectId(req.params.id);
}

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
};
