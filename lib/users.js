const { ObjectId } = require('mongodb');

module.exports = (db) => ({
  getUsers(callback) {
    const collection = db().collection('users');
    collection.find({}).toArray(callback);
  },

  getUser(id, callback) {
    const collection = db().collection('users');
    collection.findOne({ _id: ObjectId(id) }, callback);
  },

  addUser(user, callback) {
    if (!user.name) {
      return callback(new Error('missing user name'));
    }

    const collection = db().collection('users');

    return collection.save(user, { w: 1 }, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, result.ops[0]);
    });
  },
});
