import React from "react";
import {useHistory} from "react-router-dom";
import "./css/error.css";

const Error = () => {
	const history = useHistory();
	return(
		<div className="Error">
			<div className="error-page">
				<h1>Oops Page not Found</h1>
				<h2>404 Error</h2>
				<button onClick={() => {history.goBack()}} className="btn btn-primary">Go Back</button>
			</div>
		</div>
	);
}

export default Error;