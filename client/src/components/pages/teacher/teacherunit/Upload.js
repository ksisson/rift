import React from 'react'
import axios, { post } from 'axios';

class Upload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
   
  }
  fileUpload(file){
    const url = `/new/${this.props.unitId}/note`;
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    this.state.file === null;
    return  post(url, formData,config)
  }

  render()
  {
    //var is empty, will return 
    var button = ""

    if(this.state.file!==null){
     button=  <button className='btn btn-dark' type="submit">Upload</button>

    }
    return (
      
      <form onSubmit={this.onFormSubmit}>
          <input  className='' type="file" onChange={this.onChange} />
          {button}
      </form>
      

   )
  }
}



export default Upload;