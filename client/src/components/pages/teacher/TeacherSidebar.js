import React from "react";


 const TeacherSidebar = (props) => {

    var button;
    if(props.userType ==="student"){
        console.log("student type");
        button ="";
    }
    else{
        // console.log(" teacher type");

        button =  
        <div className='addUnitbtn'>
             <input type="input" id="newUnit" onChange={props.handleInputChange} value={props.inputvalue} />

             <button className="btn btn-dark btn-block" id="newbtn" type="button" onClick={props.addUnit}>Add Unit</button>
        </div> 
    }

     return(
     <div className="sidebar">
     <h2>
         Units
    </h2>
        {props.units.map(item => (<button className='btn btn-dark unitList btn-block' onClick={()=>props.selectUnit(item._id, item.name)} key={item._id}>{item.name}</button>))}
       
        
        {button}
        
    </div>
 )
}

 export default TeacherSidebar;