const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: String,           
        lastName: String,
        email: String,
        password: String,
        membership: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('User', userSchema);
