const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor(row){
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async insert({ username, email, avatar_url }){
    if(!username) throw Error('Please input a username');

    const { rows } = await pool.query( `
    INSERT INTO githubUsers (username, email, avatar_url) VALUES ($1, $2, $3) RETURNING *`, 
    [username, email, avatar_url]);

    return new GithubUser(rows[0]);
  }

  static async findByUsername(username){
    const { rows } = await pool.query(`
    SELECT FROM githubUsers WHERE username=$1`, [username]);

    if(!rows[0])return null;
    return new GithubUser(rows[0]);
  }

  toJSON(){
    return { ...this };
  }
};
