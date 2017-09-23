let express = require('express');
let router = express.Router();
let firebase = require('../util/firebase');
let error_handler = require('../util/error_handler');

router.post("/create", (req, res) => {
    if (req.body.id) {
        firebase.createUser(req.body.id).then((snapshot) => {
            res.send({status: "OK"});
            return;
        }, (err) => {
            res.status(500).send(error_handler.errorJSON(req.originalUrl, err, "Error creating user."));
            return;
        });
    } else {
        res.status(403).send(error_handler.errorJSON(req.originalUrl, null, "No user id provided in json format."));
        return;
    }
});

module.exports = router;