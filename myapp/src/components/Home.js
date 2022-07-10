import React from "react";
import CodeIcon from '@material-ui/icons/Code';
import LanguageIcon from '@material-ui/icons/Language';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import StorageIcon from '@material-ui/icons/Storage';
import AndroidIcon from '@material-ui/icons/Android';
import azh from "./../images/azh.jpeg";
import abhi from "./../images/abhi.jpg";
import akh from "./../images/akh.jpeg";
import sun from "./../images/sun.jpeg";

const Home = () => {
	return(
		<div className="home">
			<div className="home-top">
				<div className="home-content">
					<h1>Welcome to Development Side</h1>
					<p>We are happy to see you all and we hope it will be greatfull time for us. Here you can join us by making Registation then we will work together and we will achieve great success in our life.</p>
				</div>
			</div>
			<div className="lower-content">
				<div className="lower"><h3><CodeIcon style={{ color: "red" }}/>Competative Programmer</h3></div>
				<div className="lower"><h3><LanguageIcon style={{ color: "blue" }}/>Web Development</h3></div>
				<div className="lower"><h3><AcUnitIcon style={{ color: "#da7d35" }}/>Machine Learning</h3></div>
				<div className="lower"><h3><StorageIcon style={{ color: "rgba(255,0,0)" }}/>Database Management</h3></div>
				<div className="lower"><h3><AndroidIcon style={{ color: "green" }}/>Android Development</h3></div>
			</div>
			<div className="middle-content">
				<h1>Mern Development, Our Team</h1>
			</div>
			<div className="main-team">
				<div className="team">
					<div className="team-card">
						<div className="team-img">
							<img src={azh} alt="teamImage"/>
						</div>
						<div className="team-detail">
							<h2>Azhar Ali</h2>
							<p>Owner, Developer</p>
						</div>
					</div>
					<div className="team-card">
						<div className="team-img">
							<img src={abhi} alt="teamImage"/>
						</div>
						<div className="team-detail">
							<h2>Abhijeet Puri</h2>
							<p>Developer</p>
						</div>
					</div>
					<div className="team-card">
						<div className="team-img">
							<img src={akh} alt="teamImage"/>
						</div>
						<div className="team-detail">
							<h2>Akhil</h2>
							<p>Designer</p>
						</div>
					</div>
					<div className="team-card">
						<div className="team-img">
							<img src={sun} alt="teamImage"/>
						</div>
						<div className="team-detail">
							<h2>Sunil Pal</h2>
							<p>Programmer</p>
						</div>
					</div>
				</div>
			</div>
			<div className="home-end">
				<div>
					<h1>For be a Member of Our Commumity Do Register</h1>
				</div>
			</div>
		</div>
	);
}

export default Home;