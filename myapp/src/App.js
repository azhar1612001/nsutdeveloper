import React,{useEffect, useReducer} from "react";
import {Switch,Route} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Error from "./components/Error";

const reducer = (state,action) => {
  if(action.type==="login" || action.type==="logout"){
      return action.payload;
  }
  return state;
}

const addDetail = (state,action) => {
  if(action.type==="profile"){
    return action.payload;
  }
  return state;
}

const user = {name:"",email:"",skills:"",phone:""};

function App() {

  const [state, dispatch] = useReducer(reducer,false);
  const [detail,setdetail] = useReducer(addDetail,user);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/auth",{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      if(res.status===200){
        dispatch({type:"login",payload:true});
        setdetail({type:"profile",payload:{...data.user}});
      }else{
        dispatch({type:"login",payload:false});
      }
   }
 
   fetchData();
    
  },[]);


  return (
    <div className="App">
      <Header status={state}/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/profile" component={() => <Profile status={state} user={detail} method2={setdetail}/>}/>
        <Route exact path="/login" component={() => <Login status={state} method={dispatch} method2={setdetail}/>}/>
        <Route exact path="/register" component={() => <Register status={state}/>}/>
        <Route exact path="/logout" component={() => <Logout status={state} method={dispatch} method2={setdetail}/>}/>
        <Route component={Error}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
