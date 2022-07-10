import React ,{useState}from 'react';
import { useHistory } from 'react-router-dom';
import "./css/login.css";

const Login = (props) => {
    const history = useHistory();
    if(props.status){
        history.push("/");
    }

    const [email, setemail] = useState("");
    const [password,setpassword] = useState("");

    const inputEmail = (event) => {
        setemail(event.target.value);
    }

    const inputPassword = (event) => {
        setpassword(event.target.value);
    }

    const submitData = async (event) => {
        event.preventDefault();
        const res = await fetch("/login",{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email,password})
        });
        const data = await res.json();
        if(res.status===200){
            window.alert("login successfully");
            props.method({type:"login",payload:true});
            props.method2({type:"profile",payload:data.userExist});
            history.push("/");
        }else{
            console.log(data);
            window.alert("Invalid data");
            history.push("/login");
        }
    }

    return (
        <div className="Login">
            <div className="login-page">
                <h1>Login</h1>
                <form method="post" onSubmit={submitData}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" value={email} onChange={inputEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" value={password} onChange={inputPassword} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <button type="submit" onSubmit={submitData} className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;