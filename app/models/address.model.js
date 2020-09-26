const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    country: String,
    area: String,
    city: String,
    street: String,
    number: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Address', AddressSchema);