const mongoose = require('mongoose');
const Product = require('../models/product')
const cartSchema = new mongoose.Schema({
    quantity: Number
    , product: Product.schema
});
const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;