const express = require('express');
const router = require('routes');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    res.send('Hello World!');
})
router.get('/:id', auth, (req, res) => {
    res.send('Hello World!');
})
router.post('/add', auth, (req, res) => {
    res.send('Hello World!');
})
router.post('/remove/:id', auth, (req, res) => {
    res.send('Hello World!');
})
router.get('/edit/:id', auth, (req, res) => {
    res.send('Hello World!');
})

module.exports = router