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
};
