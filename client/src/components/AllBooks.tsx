import React, { Fragment, useEffect, useState } from "react";
import EditBook from "./EditBook.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface Book {
	book_id: number;
	book_title: string;
	book_author: string;
}

interface ListBooksProps {}

const ListBooks: React.FC<ListBooksProps> = () => {
	const [books, setBooks] = useState<Book[]>([]);

	const getBooks = async () => {
		try {
			const response = await fetch("http://localhost:5000/books");
			const jsonData = await response.json();
			setBooks(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	};

	const deleteBook = async (id: number) => {
		try {
			await fetch(`http://localhost:5000/books/${id}`, {
				method: "DELETE",
			});
			setBooks(books.filter((book) => book.book_id !== id));
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getBooks();
	}, []);

	return (
		<Fragment>
			<h2 className="text-center mb-4">List of Books</h2>
			<table className="table table-striped">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Title</th>
						<th scope="col">Author</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book) => (
						<tr key={book.book_id}>
							<td>{book.book_title}</td>
							<td>{book.book_author}</td>
							<td>
								<div className="btn-group" role="group">
									<EditBook book={book} />
									<button
										className="btn btn-danger"
										onClick={() => deleteBook(book.book_id)}
									>
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default ListBooks;
