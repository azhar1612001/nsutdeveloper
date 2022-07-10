import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import "./css/profile.css";

const Profile = (props) => {
	const {name,email,skills,phone} = props.user;
	const [button,setbutton] = useState("Edit Detail");
	const [detail,setdetail] = useState({email:email,name:name,skills:skills,phone:phone});
	const history = useHistory();
	if(!props.status){
		history.push("/");
	}

	const inputEvent = (event) =>{
		if(button==="Save Detail"){
			const {name,value} = event.target;
			setdetail((olddata)=>{
				return {...olddata,[name]:value};
			});
		}else{
			console.log("clicked");
		}
	}

	const updateData = async(event) => {
		event.preventDefault();
		if(button==="Edit Detail"){
			setbutton("Save Detail");
			let ele = document.getElementsByClassName("changeBor");
			ele[0].style.border="2px solid blue";
			ele[1].style.border="2px solid blue";
			ele[2].style.border="2px solid blue";
		}else{
			const {name,phone,skills} = detail;
			const res = await fetch("/updateDetail",{
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({email,name,phone,skills})
			});

			const data = await res.json();
			if(res.status===200){
				window.alert("successfully details have been updated");
				setbutton("Edit Detail");
				let ele = document.getElementsByClassName("changeBor");
				ele[0].style.border="none";
				ele[1].style.border="none";
				ele[2].style.border="none";
				props.method2({type:"profile",payload:detail});
				history.push("/profile");
			}else{
				window.alert(data.error);
				setbutton("Edit Detail");
				history.push("/profile");
			}

		}

	}



	return(
		<div className="Profile">
			<div className="update w-50">
				<h1>Profile</h1>
				<form action="" method="post" onSubmit={updateData}>
					<div className="mb-3 row">
						<label for="Email" className="col-sm-5 col-form-label">Email:</label>
						<div className="col-sm-5">
							<input type="text" className="form-control-plaintext" readOnly id="Email" value={email}/>
						</div>
					</div>
					<div className="mb-3 row">
						<label for="name" className="col-sm-5 col-form-label">Name:</label>
						<div className="col-sm-5">
							<input type="text" onChange={inputEvent} name="name" value={detail.name} className="form-control-plaintext changeBor" id="name"/>
						</div>
					</div>
					<div className="mb-3 row">
						<label for="phone" className="col-sm-5 col-form-label">Phone:</label>
						<div className="col-sm-5">
							<input type="number" onChange={inputEvent} name="phone" value={detail.phone} className="form-control-plaintext changeBor" id="phone"/>
						</div>
					</div>
					<div className="mb-3 row">
						<label for="skills" className="col-sm-5 col-form-label">Skills:</label>
						<div className="col-sm-5">
							<input type="text" onChange={inputEvent} name="skills" value={detail.skills} className="form-control-plaintext changeBor" id="skills"/>
						</div>
					</div>
					<button className="btn btn-primary" onSubmit={updateData}>{button}</button>
				</form>
			</div>
		</div>
	);
}

export default Profile;