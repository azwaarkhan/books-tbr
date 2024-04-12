import React, { useState, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface AddBookProps {}

const AddBook: React.FC<AddBookProps> = () => {
	const [bookTitle, setBookTitle] = useState<string>("");
	const [bookAuthor, setBookAuthor] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const body = { book_title: bookTitle, book_author: bookAuthor };
			const response = await fetch("http://localhost:5000/books", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			console.log(response);
			if (response.ok) {
				window.location.href = "/";
			}
		} catch (err) {
			console.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="add-book-container">
			<h2 className="text-center mb-4">Add A New Book</h2>
			<form className="add-book-form" onSubmit={onSubmitForm}>
				<div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							placeholder="Enter Book Title"
							value={bookTitle}
							onChange={(e) => setBookTitle(e.target.value)}
							required
						/>
						<input
							type="text"
							className="form-control"
							placeholder="Enter Book Author"
							value={bookAuthor}
							onChange={(e) => setBookAuthor(e.target.value)}
							required
						/>
						<button
							className="btn btn-success"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? "Adding..." : "Add Book"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddBook;
