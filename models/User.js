const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: String,           
        lastName: String,
        email: String,
        password: String,
        subscriptions: [{type: Schema.Types.ObjectId, ref: "Subscription"}]
    }, {timestamps: true}
);

module.exports = model('User', userSchema);
