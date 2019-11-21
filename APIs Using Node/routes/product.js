const express = require('express');
const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user')

const authMiddleware = require('../middleware/authmiddleware');
const adminmiddleware = require('../middleware/adminmiddleware');
const router = express.Router();

async function checkcategoryId(catid) {
    const result = await Category.find({ _id: catid })
    if (result.length == 1) {
        return true
    } else {
        return false
    }
}


router.get('/', async (req, res) => {
    try {
        const result = await Product.find()

        res.send(result);
    } catch (error) {
        res.status(400).send({ message: 'Error' + error.message })
    }
});

router.get('/:id', async (req, res) => {

    try {
        const result = await Product.findById(req.params.id)
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'no data found ' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Bad Request : ' + error.message });
    };
});


router.post('/', [authMiddleware, adminmiddleware], async (req, res) => {

    try {
        const newProduct = new Product({
            name: req.body.name
            , price: req.body.price
            , category: req.body.category
            , image: req.body.image
        });
        const result = await newProduct.save()
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'no data saved' })
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }


});




router.put('/:id', [authMiddleware, adminmiddleware], async (req, res) => {

    try {
        const selectedProduct = await Product.findById(req.params.id)
        if (selectedProduct) {
            selectedProduct.name = req.body.name;
            selectedProduct.image = req.body.image;
            selectedProduct.price = req.body.price;
            selectedProduct.category = req.body.category;
            const updatedProduct = await selectedProduct.save()
            console.log('helloooooooo')
            res.send(updatedProduct);
        } else {
            res.status(404).send({ message: 'no product found' });
        }

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


router.delete('/:id', [authMiddleware, adminmiddleware], (req, res) => {

    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send({ message: 'data already deleted' })
        })
        .catch((error) => {
            res.status(400).send(error.message)
        });

});


module.exports = router;