const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.send('this will be the main login page');
});

module.exports = router;
