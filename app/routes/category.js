var express = require('express');
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var passport = require('passport');
var async = require('async');

module.exports = function () {
    var router = express.Router();

    router.get('/tree', passport.authenticate('jwt', {session: false}), function (req, res) {
        var resp = [];
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
                        console.log('DATA', data);
                        item.children = data;
                        var tasks = [];

                        item.children.forEach(
                            (_c) => {
                                tasks.push((cb) => {rpopulate(_c, (__c) => {


                                })})
                            }
                        );


                        async.parallel(tasks)
                        cb(null, item);
                    })
                } else  {
                    cb(null, item)
                }
            }


            items.forEach((item) => {
                rpopulate(item, (err, _i) => {
                    console.log(err, _i);
                    resp.push(_i);
                })
            });


            setTimeout(() => {
                res.status(200).json(resp);
            }, 2000);


        });


    });

    return router;
};