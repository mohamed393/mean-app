const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: String
    , price: Number
    , category: String
    , imageUrl: String
});
const Product = mongoose.model('product', productSchema);
module.exports = Product;