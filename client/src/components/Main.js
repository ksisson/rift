import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import StudentLogin from "./logins/StudentLogin"
import TeacherLogin from "./logins/TeacherLogin"
import StudentHomePage from "./pages/student/StudentHomePage";
import TeacherClassSelect from "./pages/teacher/TeacherClassSelect"; 
import TeacherHomePage from "./pages/teacher/TeacherHomePage";



const Main = () =>(
  <Router>
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/studentlogin" component={StudentLogin} />
      <Route exact path="/teacherlogin" component={TeacherLogin} />
      <Route exact path="/teacherclassselect" component={TeacherClassSelect}/>
      <Route exact path="/studenthomepage" component={StudentHomePage} />
      <Route exact path="/teacherhomepage" component={TeacherHomePage}/>
      
    </div>
  </Router>
  

  

);

export default Main;