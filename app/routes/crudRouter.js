var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');


module.exports = function (model) {
    var router = express.Router();

    router.get('/', passport.authenticate('jwt', {session: false }), function (req, res) {

        var q = model.find(req.query);

        if (req.query.populate || req.query.populate !== undefined){

            var populates = req.query.populate;
            delete req.query.populate;
            q = model.find(req.query);
            var populatesOpt = populates.split('|');
            q.populate(populatesOpt);
        }
        q.exec(function (err, items) {
            res.status(200).json(items);
        })

    });

    router.get('/:id', passport.authenticate('jwt', {session: false }), function (req, res) {
        model.findById(req.params.id, function (err, items) {
            if (!items) {
                res.status(404).json({error: 'Not found'});
            }
            if (!err) {
                res.json(items);
            } else {
                res.status(500).json({error: 'Server error'});
            }
        }).select('-password');
    });

    router.post('/', passport.authenticate('jwt', {session: false}), function (req, res) {
        var post = new model(req.body);


        post.save(function (err, item) {
            if (err) {
                res.status(500).json({error: err, message: 'Server error'});
            }
            else {
                res.status(200).json({message: 'Created', data: item});
            }
        })/*.select('-role')*/;
    });

    router.put('/:id',  passport.authenticate('jwt', { session: false }), function (req, res) {
        model.findById(req.params.id, function (err, items) {
            if (!items) {
                res.status(404).json({error: 'Not found'});
            }
            items.update(req.body, function (err) {
                if (err) {
                    res.status(500).json({error: 'Server error'});
                }
                else {
                    res.status(200).json({message: 'Updated'});
                }
            })

        })/*.select('-password -role -username');*/;
    });

    router.delete('/:id', function (req, res) {
        model.findById(req.params.id, function (err, items) {
            /*    if(app.user.role == '2' || model.owner.equals(req.user._id) || model._id.equals(req.user._id)){*/
            if (!items) {
                res.status(404).json({error: 'Not found'});
            }
            else {
                items.remove(function (err) {
                    if (!err) {
                        res.status(200).json({message: 'Items removed', data: items});
                    } else {
                        res.status(500).json({error: 'Server error'});
                    }
                });
            }
            /*    }
             else{
             res.status(401).json({error:'Access denied'});
             }*/
        });
    });

    return router;
};

