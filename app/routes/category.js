var express = require('express');
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var passport = require('passport');
var async = require('async');

module.exports = function () {
    var router = express.Router();

    router.get('/tree', passport.authenticate('jwt', {session: false}), function (req, res) {

        Category.find().exec(function (err, items) {

            function rpopulate(item, cb) {
                if (item.children.length !== 0) {
                    var tasks = [];
                    item.children.forEach((child_id) => {
                        tasks.push((cb) => {
                            Category.findById(child_id, cb);
                        });
                    });
                    async.parallel(tasks, (err, data) => {
                        item.children = data;
                        var tasks = [];
                        item.children.forEach(
                            (_c) => tasks.push((cb) => rpopulate(_c, cb))
                        );
                        async.parallel(tasks, (err, res) => {
                            cb(null, item);
                        })
                    })
                } else  {
                    cb(null, item)
                }
            }


            var tasks = [];
            var ch = [];

            items.forEach((item) => {
                item.children.forEach((_item) => {
                    ch.push(_item);
                });
            });
            items.forEach((item_i)=>{

                var isRoot = true;
                ch.forEach((item) => {
                    if(item.toString() == item_i._id.toString()) {
                        isRoot = false
                    }
                });

                if (isRoot) {
                    tasks.push((cb) => {
                        rpopulate(item_i, cb)
                    });
                }
            });


            async.parallel(tasks, (err, items) => {
                res.status(200).json(items);
            });
        });
    });

    return router;
};