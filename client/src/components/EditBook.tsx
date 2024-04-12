import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface Book {
	book_id: number;
	book_title: string;
	book_author: string;
}

interface EditBookProps {
	book: Book;
}

const EditBook: React.FC<EditBookProps> = ({ book }) => {
	const [updatedBookTitle, setUpdatedBookTitle] = useState<string>(
		book.book_title
	);
	const [updatedBookAuthor, setUpdatedBookAuthor] = useState<string>(
		book.book_author
	);

	const updateBook = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/books/${book.book_id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						book_title: updatedBookTitle,
						book_author: updatedBookAuthor,
					}),
				}
			);

			if (response.ok) {
				console.log("Book updated successfully");
			} else {
				console.error("Failed to update book");
			}
		} catch (error) {
			console.error("Error updating book:", error.message);
		}
	};

	return (
		<>
			<button
				type="button"
				className="btn btn-warning"
				data-toggle="modal"
				data-target={`#editBookModal${book.book_id}`}
			>
				Edit
			</button>

			<div className="modal" id={`editBookModal${book.book_id}`}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Edit Book</h4>
							<button type="button" className="close" data-dismiss="modal">
								&times;
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="bookTitle">Title:</label>
								<input
									type="text"
									className="form-control"
									id="bookTitle"
									value={updatedBookTitle}
									onChange={(e) => setUpdatedBookTitle(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="bookAuthor">Author:</label>
								<input
									type="text"
									className="form-control"
									id="bookAuthor"
									value={updatedBookAuthor}
									onChange={(e) => setUpdatedBookAuthor(e.target.value)}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-warning"
								onClick={updateBook}
							>
								Save Changes
							</button>
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditBook;
