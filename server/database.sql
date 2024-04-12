CREATE DATABASE tbr;

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  book_title VARCHAR(255),
  book_author VARCHAR(255)
);