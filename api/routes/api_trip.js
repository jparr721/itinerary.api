let express = require('express');
let router = express.Router();
let firebase = require('../util/firebase');
let error_handler = require('../util/error_handler');

router.post('create', (req, res) => {
    if (req.body.trip_id && req.body.user_id) {
        firebase.write('trips/' + req.body.trip_id, {
            id: req.body.trip_id,
            user: req.body.user_id,
            type: req.body.type
        }).then((snapshot) => {
            res.send({status: "OK"});
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

router.post('component/add', (req, res) => {
    if (req.body.component_id && req.body.place && req.body.trip_id) {
        firebase.write('trips/' + req.body.trip_id + "/" + req.body.component_id, {
            id: req.body.component_id,
            place: req.body.place
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

module.exports = router;