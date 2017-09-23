var exports = module.exports = {};
let admin = require("firebase-admin");
let service_account = require("../auth/auth.json");

let app_config = admin.initializeApp({
    credential: admin.credential.cert(service_account),
    databaseURL: "https://itinerary-e48aa.firebaseio.com/"
});

exports.database = app_config.database();

exports.write = (url, json) => {
  return new Promise((resolve, reject) => {
      exports.database.ref(url).set(json).then((snapshot) => {
          resolve(snapshot);
      }, (err) => {
          reject(err);
      });
  });
};

exports.createUser = (uuid) => {
    return new Promise((resolve, reject) => {
        exports.database.ref('users/' + uuid).set({
            id: uuid
        }).then((snapshot) => {
            resolve(snapshot);
        }, (err) => {
            reject(err);
        });
    });
};