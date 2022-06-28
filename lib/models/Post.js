const pool = require('../utils/pool');

module.exports = class Post {
  id; 
  description;
  created_at;

  constructor(row){
    this.id = row.id;
    this.description = row.description;
    this.created_at = row.created_at;
  }

  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM posts');
    if(!rows) return null;
    return rows.map(row => new Post(row));
  }

  static async insert({ description }){
    const { rows } = await pool.query('INSERT INTO posts (description) VALUES ($1) RETURNING *', 
      [description]);
    return new Post(rows[0]);
  }
};
