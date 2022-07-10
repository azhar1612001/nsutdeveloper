import React from "react";
import "./css/about.css";

const About = () => {
	return (
		<div className="about">
			<div className="about-top">
				<div className="top-content"><h1>About Us</h1></div>
			</div>
			<div className="aboutus">
				<div className="aboutus-img"><img src="https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="..." /></div>
				<div className="aboutus-content">
					<h1>Developer</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quidem maxime sint, voluptatem, et amet animi
					recusandae ipsa quibusdam esse unde magnam fugit? Totam suscipit reiciendis maiores voluptatibus ratione
					minima!Lorem23<br/>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt magni, nam cumque ab facere, ad, sapiente sint
					nihil veniam iure et. Fuga, veniam repudiandae. Accusamus cum asperiores aliquam necessitatibus alias cumque sit
					explicabo, ullam deleniti repudiandae! Inventore assumenda porro minima?<br/>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla architecto cumque, impedit suscipit quod accusamus
					iusto omnis. Id perspiciatis quod consequuntur eum, laborum ex, nam suscipit repellat dolorem non illo nulla minima
					totam, maiores cupiditate aliquam iste ea veritatis esse velit corporis iusto recusandae distinctio earum. Corporis
					nisi dolor ipsum?
					</p>
				</div>
			</div>
			<div className="lower-about">
				<div>
					<h1>We are happy to see you here</h1>
					<p>Kepp visiting</p>
				</div>
			</div>
		</div>
	);
}

export default About;