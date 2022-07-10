import React,{useState} from 'react';
import "./css/register.css";
import { useHistory } from 'react-router';

const Register = (props) => {
    const history = useHistory();
    if(props.status){
        history.push("/");
    }

    const [detail,setdetail] = useState({name:"",email:"",password:"",cpassword:"",skills:"",phone:""});

    const inputEvent = (event) => {
        const {name,value} = event.target;
        setdetail((olddata) => {
            return {...olddata,[name]:value};
        });
    }
    
    const submitData = async (event) => {
        event.preventDefault();
        const {name,email,password,cpassword,skills,phone} = detail;
        const res = await fetch("/register",{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name,email,password,cpassword,skills,phone})
        });

        const data = await res.json();
        if(res.status===200){
            window.alert("Registation successfully");
            history.push("/login");
        }else{
            window.alert(data.error);
            history.push("/");
        }
    }

    return (
        <div className="Register">
            <div className="register-page">
                <h1>Registation</h1>
                <form method="post" onSubmit={submitData} className="row g-3">
                    <div className="col-md-6">
                        <label for="inputName" className="form-label">Name</label>
                        <input type="text" name="name" onChange={inputEvent} value={detail.name} className="form-control" id="inputName"/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email" name="email" onChange={inputEvent} value={detail.email} className="form-control" id="inputEmail4"/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" name="password" onChange={inputEvent} value={detail.password} className="form-control" id="inputPassword4"/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label">Confirm Password</label>
                        <input type="password" name="cpassword" onChange={inputEvent} value={detail.cpassword} className="form-control" id="inputPassword4"/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputSkill" className="form-label">Skills</label>
                        <input type="text" name="skills" onChange={inputEvent} value={detail.skills} className="form-control" id="inputSkill"/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputPhone" className="form-label">Phone Number</label>
                        <input type="number" name="phone" onChange={inputEvent} value={detail.phone} className="form-control" id="inputPhone"/>
                    </div>
                    <div class="col-12">
                        <button onSubmit={submitData} class="btn btn-primary">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Register;