var express = require('express');

function routerFact(model) {
    var router = express.Router();
    router.get('/', function (req, res) {
        model.find(function (err, items) {
            res.status(200).json(items);
        });
        	.get('/:id')


    });

    return router
}

module.exports = routerFact;