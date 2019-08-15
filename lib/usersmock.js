module.exports = () => {
  this.users = [];

  return {

    getUsers(callback) {
      process.nextTick(() => {
        callback(null, this.users);
      });
    },

    getUser(id, callback) {
      process.nextTick(() => {
        // will explore *much* better ways of doing this in future sessions
        let i;
        let user;

        for (i = 0; i < this.users.length; i += 1) {
          user = this.users[i];
          if (user.id === id) {
            return callback(null, user);
          }
        }

        // not found
        return callback();
      });
    },

    addUser(user, callback) {
      process.nextTick(() => {
        if (!user.name) {
          return callback(new Error('missing user name'));
        }

        const newUser = {
          ...user,
          id: (this.users.length + 1).toString(),
        };

        this.users.push(newUser);

        return callback(null, newUser);
      });
    },
  };
};
