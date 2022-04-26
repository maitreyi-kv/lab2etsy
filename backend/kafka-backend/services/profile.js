const {updateProfileQuery, getProfileQuery} = require('../mongodb/mongoQueries/profile');

function updateProfile(msg, callback) {
  updateProfileQuery(msg).then(r => {
    callback(null, r)
  }).catch(err => console.log("Err======", err));
}

function getProfile(msg, callback) {
  getProfileQuery(msg).then(r => {
    callback(null, r)
  }).catch(err => console.log("Err======", err));
}


module.exports = { updateProfile, getProfile };
