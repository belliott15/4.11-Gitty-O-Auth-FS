-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS githubUsers;

CREATE TABLE githubUsers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR NOT NULL, 
    email VARCHAR, 
    avatar_url VARCHAR
)