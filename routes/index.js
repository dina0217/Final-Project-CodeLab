var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://faysal:1234@ds155218.mlab.com:55218/faysal').then(
    function () {
        console.log("connected")
    }
).catch(
    function (error) {
        console.log(error.message)
    });
var evaluation = mongoose.model('evaluation', {
    Evaluation: String,
    reason: String
});
var form = mongoose.model('form',{
    name: String,
    number: String,
    email: String,
    tourism: String,
    compan: String,
    trip: String
});

/* GET home page. */
router.get('/home', function (req, res) {
    res.render('face');
});

router.get('/places', function (req, res) {
    res.render('tourism');
});

router.get('/reservation', function (req, res) {
    res.render('reservations');
});

router.get('/opinions', function (req, res) {
    res.render('opinions');
});
router.get('/evaluation', function (req, res) {
    res.render('evaluation')
});
router.get('/api/evaluation', function (req, res) {
    evaluation.find(function (error, evaluations) {
        res.json(evaluations);

    })

});
router.post('/evaluation', function (req, res) {
    res.render('evaluation')
});

router.post('/reservation', function (req, res) {
    console.log("text");

    console.log(req.param());

    console.log("trying!");
    var newForm = req.param('form');
    var databaseForm = new form(newForm);

    databaseForm.save().then(function () {
        console.log('saved')
        }).catch(function (error) {
        console.log('error')
    });
});
router.post('/api/evaluation', function (req, res) {
    var newEvaluation = new evaluation(req.param('evaluation'));
    newEvaluation.save().then(function () {
        res.json({
            isSuccess: true,
            message: "Evaluation Saved!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    });
});
router.delete('/api/evaluation', function (req, res) {
    var id = req.param('id');
    evaluation.findByIdAndRemove(id).then(function () {
        res.json({
            isSuccess: true,
            message: "Evaluation Deleted!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    });
});
router.put('/api/evaluation', function (req, res) {
    var editing = req.param('evaluation');
    evaluation.findByIdAndUpdate(editing._id, editing).then(function () {
        res.json({
            isSuccess: true,
            message: "Evaluation Updated!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    });
});

module.exports = router;