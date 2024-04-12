import React, { Fragment } from "react";
import "./App.css";
import AddBook from "./components/AddBook.tsx";
import ListBooks from "./components/AllBooks.tsx";

function App() {
	return (
		<Fragment>
			<div className="container">
				<AddBook />
				<ListBooks />
			</div>
		</Fragment>
	);
}

export default App;
