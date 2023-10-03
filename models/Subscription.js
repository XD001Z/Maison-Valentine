const { Schema, model } = require('mongoose');

const subscriptionSchema = new Schema(
    {
        cardNum: String,
        cardName: String,
        expDate: String,
        cvv: String,
        Address: String,
        city: String,
        state: String,
        zip: String,
        subType: String,
        preferance1: String,
        preferance2: String,
        preferance3: String,
        nft: {type: String, default: null}
    }, {timestamps: true}
);

module.exports = model('Subscription', subscriptionSchema);