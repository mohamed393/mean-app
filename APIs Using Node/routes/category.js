const express = require('express');
const Category = require('../models/category');
const authMiddleware = require('../middleware/authmiddleware');
const adminmiddleware = require('../middleware/adminmiddleware');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const result = await Category.find();
        res.send(result);

    } catch (error) {
        res.status(400).send('Error: ' + error.message)
    }
});

router.post('/', [authMiddleware, adminmiddleware], async (req, res) => {

    try {
        const newCategory = new Category({
            name: req.body.name
        });
        const result = await newCategory.save()
        if (result) {
            res.send(result);
        } else {
            res.status(404).send('no data saved')
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

});



module.exports = router;