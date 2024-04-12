const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

app.use(cors());
app.use(express.json());

// add a new book
app.post("/books", async (req, res) => {
	try {
		const { book_title, book_author } = req.body;
		const newBook = await pool.query(
			"INSERT INTO books (book_title, book_author) VALUES($1, $2) RETURNING *",
			[book_title, book_author]
		);

		res.json(newBook.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// get all books
app.get("/books", async (req, res) => {
	try {
		const allBooks = await pool.query("SELECT * FROM books");
		res.json(allBooks.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get a book by title/author
app.get("/books/search", async (req, res) => {
	try {
		const { query } = req.query;
		const searchTerm = `%${query}%`; // add wildcards to search for titles or authors containing the provided string
		const books = await pool.query(
			"SELECT * FROM books WHERE book_title LIKE $1 OR book_author LIKE $1",
			[searchTerm]
		);

		res.json(books.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// update a book
app.put("/books/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { book_title, book_author } = req.body;
		const updateBook = await pool.query(
			"UPDATE books SET book_title = $1, book_author = $2 WHERE book_id = $3",
			[book_title, book_author, id]
		);

		res.json("Book was updated!");
	} catch (err) {
		console.error(err.message);
	}
});

// delete a book
app.delete("/books/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteBook = await pool.query(
			"DELETE FROM books WHERE book_id = $1",
			[id]
		);
		res.json("Book was deleted!");
	} catch (err) {
		console.log(err.message);
	}
});

app.listen(5000, () => {
	console.log("server has started on port 5000");
});
