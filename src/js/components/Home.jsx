import React from "react";

//include images into your bundle
import Component from './Componente';

//create your first component
const Home = () => {
	return (
		<div className="container-fluid d-flex align-items-center justify-content-center bg-primary flex-column" style={{height:'100vh'}}>
			<div className="bg-warning col-4 d-flex justify-content-center align-items-center rounded-2 flex-column">
				<h1 className="text-dark mb-4 mt-4">To do list</h1>
				<Component></Component>
			</div>
		</div>
	);
};

export default Home;