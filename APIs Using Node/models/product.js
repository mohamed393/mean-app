const mongoose = require('mongoose');
const Category = require('../models/category')
const productSchema = new mongoose.Schema({
    name: String
    , price: Number
    , category: String
    , image: String
});
const Product = mongoose.model('product', productSchema);
module.exports = Product;