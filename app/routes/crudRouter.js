var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var _  = require('lodash');


module.exports = function (model, conf) {
    var router = express.Router();

    var noGet = _.findIndex(conf.noAuth, function (noAuthRoute) {return noAuthRoute == 'get'}) > -1;
    var noGetId = _.findIndex(conf.noAuth, function (noAuthRoute) {return noAuthRoute == 'getId'}) > -1;
    var noPost = _.findIndex(conf.noAuth, function (noAuthRoute) {return noAuthRoute == 'post'}) > -1;
    var noPut = _.findIndex(conf.noAuth, function (noAuthRoute) {return noAuthRoute == 'put'}) > -1;
    var noDelete = _.findIndex(conf.noAuth, function (noAuthRoute) {return noAuthRoute == 'delete'}) > -1;


    if (!noGet) {
        //console.log('Adding Auth');
        router.get('/', passport.authenticate('jwt', {session: false }))
    }
    if (!noGetId) {
        //console.log('Adding Auth');
        router.get('/:id', passport.authenticate('jwt', {session: false }))
    }
    if (!noPost) {
        //console.log('Adding Auth');
        router.post('/:id', passport.authenticate('jwt', {session: false }))
    }
    if (!noPut) {
        //console.log('Adding Auth');
        router.put('/:id', passport.authenticate('jwt', {session: false }))
    }
    if (!noDelete) {
        //console.log('Adding Auth');
        router.delete('/:id', passport.authenticate('jwt', {session: false }))
    }

    router.get('/', function (req, res) {

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

    router.get('/:id', function (req, res) {
        model.findById(req.params.id, function (err, items) {
            if (!items) {
                res.status(404).json({error: 'Not found'});
            }
            if (!err) {
                res.json(items);
            } else {
                res.status(500).json({error: 'Server error'});
            }
        });
    });

    router.post('/', function (req, res) {
        var post = new model(req.body);


        post.save(function (err, item) {
            if (err) {
                res.status(500).json({error: err, message: 'Server error'});
            }
            else {
                res.status(200).json({message: 'Created', data: item});
            }
        });
    });

    router.put('/:id',  function (req, res) {
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

        });
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

