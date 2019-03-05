'use strict';
const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, require: true },
    intro: { type: String, require: true },
    underwraps: { type: String, require: true },
    qaTitle: { type: String, require: true },
    qaContent: { type: String, require: true },
    communitySpotlightFeature: { type: String, require: true },
    communitySpotlightContent: { type: String, require: true },
    fieldTitle: { type: String },
    fieldContent: { type: String, require: true },
    active: { type: Boolean, default: true },
    user_Id: { type: mongoose.Schema.Types.ObjectId 

    }
});

newsletterSchema.set('timestamps', true);

newsletterSchema.set ('toJSON', {
    virtuals: true,
    transform: (doc, result) => {
        delete result.__v;
        delete result._id;
    }
});

module.exports = mongoose.model('Newsletter', newsletterSchema);

