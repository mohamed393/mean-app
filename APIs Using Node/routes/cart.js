const express = require('express');
const Cart = require('../models/shoppingCart');
const router = express.Router();


router.post('/', async (req, res) => {

    try {
        const newCart = new Cart({
            quantity: req.body.quantity
            , product: req.body.product
        });
        const result = await newCart.save()
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'no data saved' })
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }


});

router.get('/', async (req, res) => {
    try {
        const result = await Cart.find()

        res.send(result);
    } catch (error) {
        res.status(400).send({ message: 'Error' + error.message })
    }
});

module.exports = router;
