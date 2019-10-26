const express = require('express');
const Product = require('../models/product');

const authMiddleware = require('../middleware/authmiddleware');
const adminmiddleware = require('../middleware/adminmiddleware');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await Product.find()
        res.send(result);
    } catch (error) {
        res.status(400).send('Error' + error.message)
    }
});

router.get('/:id', authMiddleware, async (req, res) => {

    try {
        const result = await Product.findById(req.params.id)

        if (result) {
            res.send(result);
        } else {
            res.status(404).send('no data found ');
        }
    } catch (error) {
        res.status(400).send('Bad Request : ' + error.message);
    };
});


router.post('/', [authMiddleware,adminmiddleware], async (req, res) => {
    try {
        const newProduct = new Product({
            title: req.body.title
            , price: req.body.price
            , category: req.body.category
            , imageUrl: req.body.imageUrl
        });
        const result = await newProduct.save()
        if (result) {
            res.send(result);
        } else {
            res.status(404).send('no data saved')
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
});




router.put('/:id', [authMiddleware, adminmiddleware], async (req, res) => {

    try {
        const selectedProduct = await Product.findById(req.params.id)
        if (selectedProduct) {
            selectedProduct.title = req.body.title;
            selectedProduct.imageUrl = req.body.imageUrl;
            selectedProduct.price = req.body.price;
            selectedProduct.category = req.body.category;
            const updatedProduct = await selectedProduct.save()
            res.send(updatedProduct);
        } else {
            res.status(404).send('no product found');
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.delete('/:id', [authMiddleware, adminmiddleware], (req, res) => {

    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send('data already deleted')
        })
        .catch((error) => {
            res.status(400).send(error.message)
        });

});


module.exports = router;