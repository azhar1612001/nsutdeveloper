import React,{useState} from "react";
import {NavLink} from "react-router-dom";
import TocIcon from '@material-ui/icons/Toc';

const MenuRendering = (props) => {
	if(props.status){
		return(
			<div className="right-menu" id="right">
				<NavLink activeClassName="active-status" exact to="/logout">Logout</NavLink>
				<NavLink activeClassName="active-status" exact to="/profile">Profile</NavLink>
			</div>
		);
	}
	return(
		<div className="right-menu" id="right">
			<NavLink activeClassName="active-status" exact to="/login">Login</NavLink>
			<NavLink activeClassName="active-status" exact to="/register">Register</NavLink>
		</div>
	);
}


const Header = (props) => {
	const [state, setstate] = useState(false);
	const handler = () => {
		const head = document.getElementById("head");
		const right = document.getElementById("right");
		if(state==false){
			head.style.display = "block";
			right.style.display = "block";
			setstate(true);
		}else{
			head.style.display = "none";
			right.style.display = "none";
			setstate(false);
		}
	}
	return(
		<header>
			<div className="header-main">
				<div className="logo"><NavLink exact to="/"><h1>Development</h1></NavLink></div>
				<div className="menu-toggle"><TocIcon onClick={handler} style={{color: "red"}}/></div>
				<div className="head-menu" id="head">
					<ul className="head-menu-items">
						<NavLink activeClassName="active-items" exact to="/">Home</NavLink>
						<NavLink activeClassName="active-items" exact to="/about">About Us</NavLink>
						<NavLink activeClassName="active-items" exact to="/contact">Contact Us</NavLink>
					</ul>
				</div>
				<MenuRendering status={props.status}/>
			</div>
		</header>
	);
}

export default Header;