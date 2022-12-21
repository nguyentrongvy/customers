const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customer_id: String,
});

const Customer = mongoose.model('Post', customerSchema);
module.exports = Customer;