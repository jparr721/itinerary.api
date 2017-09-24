let express = require('express');
let router = express.Router();
let firebase = require('../util/firebase');
let error_handler = require('../util/error_handler');

router.post('/create', (req, res) => {
    if (req.body.trip_id && req.body.user_id) {
        firebase.write('users/' + req.body.user_id + '/trips/' + req.body.trip_id, {
            id: req.body.trip_id,
            name: req.body.name,
            type: req.body.type,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            price: req.body.price,
            image_url: req.body.image_url
        }).then((snapshot) => {
            res.send({status: "OK", data: snapshot});
            return;
        }, (err) => {
            res.status(500).send(error_handler.errorJSON(req.originalUrl, null, "Error creating trip."));
            return;
        });
    } else {
        res.status(403).send(error_handler.errorJSON(req.originalUrl, null, "Invalid POST parameters."));
        return;
    }
});

router.post('/component/add', (req, res) => {
    if (req.body.component_name && req.body.place && req.body.trip_id) {
        firebase.write('trips/' + req.body.trip_id + "/" + req.body.component_name, {
            id: req.body.component_name,
            place: req.body.place,
            type: req.body.type
        }).then((snapshot) => {
            res.send({status: "OK"});
            return;
        }, (err) => {
            res.status(500).send(error_handler.errorJSON(req.originalUrl, err, "Error adding component to trip."));
            return;
        });
    } else {
        res.status(403).send(error_handler.errorJSON(req.originalUrl, null, "Invalid POST parameters."));
        return;
    }
});

router.get('/:trip_id', (req, res) => {
    firebase.read('trips/' + req.params.trip_id).then((data) => {
        res.send(data);
        return;
    }, (err) => {
        res.status(503).send(error_handler.errorJSON(req.originalUrl, err, "Error connecting to server."));
        return;
    });
});

module.exports = router;