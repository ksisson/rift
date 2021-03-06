import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import axios from "axios";


class TeacherLogin extends React.Component{

    state = {
        username : "",
        password: ""
    }

    componentDidMount(){
        //will check whether user is logged in
        axios.get("/getsession").then(res=>{
            if(res.data.user !==undefined){
                this.props.history.push("/teacherclassselect");
            }
            else{
                // console.log("not logged in");
            }
        })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
      
    }
    //function to create a user
    createUser = () => {
        // console.log(this.state);
        if(this.state.username==="" || this.state.password==="" ){
            alert("Fill all fields!");
        }
        else{
            // console.log("Sending data to create");
            if(this.state.password.length<6){
                alert("Password needs to be at least 6 characters!");
            }
            else{
                axios.post("/teacherlogin/create", {
                    username: this.state.username,
                    password: this.state.password
                }).then((sessionData)=>{
                    // console.log("data sent to backend!");
                    // console.log(sessionData);
                    this.props.history.push("/teacherclassselect");
                }).catch((err) =>{
                    console.log(err);
                    alert("Username already exists!");
                });

            }
          
    
           

        }
      
    }
    //function to verify user
    verifyUser = () =>{
        if(this.state.username==="" || this.state.password===""){
            alert("Fill all fields!");
        }
        else{
            // console.log(this.state);
            // console.log("sending data to verify");
            axios.post("/teacherlogin/verify", {
                username: this.state.username,
                password: this.state.password
            }).then((sessionData)=>{
                //"user" refers to req.session
                // console.log("data sent to backend!");
                // console.log(sessionData);
                this.props.history.push("/teacherclassselect");
            }).catch(err=>{
                console.log(err);
                alert("Check username or password!");
            });

        }
       

    }

    render(){
        return (
            <div className='Wrapper1'>
            <div className="logoContainer row">
                <img className='logo' src="https://png.icons8.com/material/50/ffffff/jet-engine.png"/>
                <h2 className='logotitle'>Rift</h2>
            </div>
            <div className='row'>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="login">
                        <h3 className="loginheader">Teacher Login</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Enter Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Enter Username" 
                                onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Enter Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter Password" 
                                onChange={this.handleInputChange}
                                />
                            </div>
                            <button type="button" onClick={this.createUser} className="btn gradbtn btn-dark" id="createlogin">Create</button>

                            <button type="button" onClick={this.verifyUser} className="btn gradbtn btn-dark" id="teacherlogin">Login</button>
                        </form>
                    </div>
                    </div>
                <div className="col-md-2"></div>
            </div>
            </div>
        )
    };
}
  



export default TeacherLogin;