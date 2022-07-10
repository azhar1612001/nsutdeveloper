import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import "./css/contact.css";

const Contact = () => {
	const history = useHistory();
	const [message,setmessage] = useState({name:"",email:"",phone:"",content:""});

	const inputEvent = (event) => {
		const {name,value} = event.target;
		setmessage((olddata) => {
			return {...olddata,[name]:value};
		});
	}

	const submitData = async(event) => {
		event.preventDefault();
		const {name,email,phone,content} = message;
		const res = await fetch("/message",{
			method: "POST",
			headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name,email,phone,content})
        });
        const data = await res.json();
        if(res.status===200){
            window.alert("Message has been sent successfully");
            history.push("/");
        }else{
            console.log(data);
            window.alert("Invalid data");
            history.push("/");
        }
	}

	return(
		<div className="Contact">
		<h1>Contact Us</h1>
			<div className="details">
				<div><EmailIcon style={{ color: "red"}}/>noreplydeveloper16@gmail.com</div>
				<div><PhoneIcon style={{ color: "blue"}}/>+918700989777</div>
			</div>
			<div className="contact-page">
				<div className="sendMail">
					<form method="post" onSubmit={submitData}>
						<div className="form-group mb-2">
							<label for="name">Name</label>
							<input type="text" name="name" value={message.name} onChange={inputEvent} className="form-control" id="name" placeholder="Name"/>
						</div>
						<div className="form-group mb-2">
							<label for="exampleFormControlInput1">Email address</label>
							<input type="email" name="email" value={message.email} onChange={inputEvent} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
						</div>
						<div className="form-group mb-2">
							<label for="phone">Phone Number</label>
							<input type="number" name="phone" value={message.phone} onChange={inputEvent} className="form-control" id="phone" placeholder="Phone Number"/>
						</div>
						<div className="form-group mb-2">
							<label for="exampleFormControlTextarea1">Example textarea</label>
							<textarea className="form-control" name="content" value={message.content} onChange={inputEvent} id="exampleFormControlTextarea1" rows="3"></textarea>
						</div>
						<button type="submit" onSubmit={submitData} class="btn btn-primary">Send</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Contact;