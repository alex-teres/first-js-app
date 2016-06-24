var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var Article = mongoose.model('article');


module.exports = function (app) {
    var router = express.Router();


    return router;
};
/*    router.get('/myArticles', passport.authenticate('jwt', {session: false}), function (req, res) {
        Article.find({owner: app.user._id}, function (err, article) {
            if (!article) {
                res.status(404).json({error: 'Articles not found'});
            }
            if (!err) {
                res.status(200).json(article);
            } else {
                res.status(500).json({error: 'Server error'});
            }

        });

    });*/

