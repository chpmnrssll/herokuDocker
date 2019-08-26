const Mongoose = require('mongoose');
const Post = require('./models/post');

module.exports = {
  getConnection: async () => {
    const DB_NAME = '/posts';
    const DB_PORT = process.env.DB_PORT || 27017;
    const DB_URL = process.env.MONGODB_URI || `mongodb://db:${DB_PORT}${DB_NAME}`;

    return Mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  getPostById: async (db, id) => Post.findById(id),

  /* eslint max-len: off */
  // releaseConnection: async (connection) => connection.release(),
  //
  // createUser: async (db, username, encodedPassword, firstName, lastName) => insert(db, 'user', {
  //   username,
  //   password: encodedPassword,
  //   first_name: firstName,
  //   last_name: lastName,
  // }),
  //
  // updateUser: async (db, id, fields) => updated(await db.execute('UPDATE user SET username = ?, password = ?, first_name = ?, last_name = ? WHERE id = ?', [fields.username, fields.password, fields.firstName, fields.lastName, id])),
  //
  // deleteUser: async (db, id) => updated(await db.execute('UPDATE user SET deleted = true WHERE id = ?', [id])),
  //
  // authenticateUser: async (db, username, password) => {
  //   const [rows] = await db.query('SELECT u.* FROM user u WHERE u.username = ? AND u.password = ? AND u.deleted IS FALSE', [username, password]);
  //
  //   return rows.length ? rows[0] : null;
  // },
  //
  // getAuthTokenForUser: async (db, id) => first(await db.query('SELECT t.token FROM auth_token t WHERE t.user_id = ? and t.date_created < now() and t.date_expired is null order by t.date_created', [id])),
  //
  // createAuthTokenForUser: async (db, id, token) => {
  //   await insert(db, 'auth_token', {
  //     user_id: id,
  //     token,
  //   });
  // },
  //
  // getUserById: async (db, id) => first(await db.query('SELECT * FROM user WHERE id = ? LIMIT 1', [id])),
  //
  // getUserForAuthToken: async (db, token) => first(await db.query('SELECT u.* FROM auth_token t, user u WHERE t.user_id = u.id and t.token = ? LIMIT 1', [token])),
  //
  // getAllUsers: async (db) => all(await db.query('SELECT * FROM user WHERE deleted IS FALSE')),

  // createFile: async (db, fields) => {
  //   const params = [
  //     fields.slug,
  //     fields.ownerType,
  //     fields.ownerId,
  //     fields.category,
  //     fields.name,
  //     fields.contentType,
  //     fields.contentBase64,
  //   ];
  //
  //   return inserted(await db.execute('INSERT INTO file (slug, owner_type, owner_id, category, name, content_type, content_base64) values (?, ?, ?, ?, ?, ?, ?)', params));
  // },
  //
  // getFileById: async (db, id) => first(await db.query('SELECT * FROM file WHERE id = ?', [id])),
  //
  // getFileBySlug: async (db, slug) => first(await db.query('SELECT * FROM file WHERE slug = ?', [slug])),
  //
  // getFiles: async (db, ownerType, ownerId, category) => all(await db.query('SELECT * FROM file WHERE owner_type = ? AND owner_id = ? AND category = ? ORDER BY name', [ownerType, ownerId, category])),
  //
  // deleteFile: async (db, ownerType, ownerId, category, id) => deleted(await db.execute('DELETE FROM file WHERE owner_type = ? AND owner_id = ? AND category = ? AND id = ?', [ownerType, ownerId, category, id])),
};
