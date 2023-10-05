const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: String,           
        lastName: String,
        email: String,
        password: String,
        address: String,
        subType: String,
        subscription: {
            type: Schema.Types.ObjectId, 
            ref: "Subscription",
            default: null
        }
    }, {timestamps: true}
);

module.exports = model('User', userSchema);
