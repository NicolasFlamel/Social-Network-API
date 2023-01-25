const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Username is required',
            trim: true,
            index: {
                unique: true,
                collation: { locale: 'en', strength: 1 }
            }
        },
        email: {
            type: String,
            required: 'Email address is required',
            lowercase: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            { type: Schema.Types.ObjectId, ref: 'thought' }
        ],
        friends: [
            { type: Schema.Types.ObjectId, ref: 'user' }
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;