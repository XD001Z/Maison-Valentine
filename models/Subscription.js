const { Schema, model } = require('mongoose');

const subscriptionSchema = new Schema(
    {
        cardNum: String,
        cardName: String,
        expDate: String,
        cvv: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        subType: String,
        preference1: String,
        preference2: String,
        preference3: String,
        nft: {type: String, default: null}
    }, {timestamps: true}
);

module.exports = model('Subscription', subscriptionSchema);
