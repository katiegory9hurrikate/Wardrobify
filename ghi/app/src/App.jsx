import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import HatList from "./HatList";
import HatForm from "./HatForm";
import NewShoes from "./NewShoes";
import ShoesList from "./ShoesList";

function App() {
	// if (props.hats === undefined) {
	// 	return null;
	// }
	return (
		<>
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/hats" element= {<HatList />} />
					<Route path="/hats/new" element= {<HatForm />} />
					<Route path="/shoes" element={<ShoesList />} />
					<Route path="/shoes/new" element={<NewShoes />} />
				</Routes>
			</div>
		</BrowserRouter>
		</>
	);
}

export default App;
