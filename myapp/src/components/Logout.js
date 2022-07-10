import React from 'react'
import { useHistory } from 'react-router';
import  { Redirect } from 'react-router-dom'

const Logout = (props) => {
    const history = useHistory();
    if(!props.status){
        history.push("/login");
    }
    fetch("/logout",{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then((res) => {
        if(res.status===200){
            window.alert("Logout successfully");
            props.method({type:"logout",payload:false});
            history.push("/");
        }else{
            window.alert("got some error");
            history.push("/");
            throw new Error(res.error);
        }
    }).catch((err) => {
        console.log(err);
    });
    return <Redirect to="/"/>
}

export default Logout;