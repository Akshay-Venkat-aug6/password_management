import React, { Component } from 'react';
import validator from 'validator';

import Alert from '../Forms/Alert/Alert';
import Credentialslayout from '../Layout/CredentialsLayout';
class OtpPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      Inputlist : [
        {
          typeName:"text",
          labelName:"OTP",
          name:"otp"
        },
      ],
      otpvalue: '', error: '', alert:''
    }
    this.handleOtpevent = this.handleOtpevent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOtpevent = event =>{
    this.setState({otpvalue: event.target.value})
  }

  handleRedirect = () =>{
    this.props.history.push('/login')
  }

  handleSubmit = event =>{
    event.preventDefault();
    var otpResult = validator.isInt(this.state.otpvalue)
    var error = this.state.error
    if(!otpResult) this.setState({error: 'OTP is invalid', alert: <Alert Message={error || 'OTP is invalid'} clsalert="danger"/>})
    else{
      this.setState({error: '', alert: <Alert Message='OTP Validate Successfully!!!!!' clsalert="success"/>})
      setTimeout(()=>{
        this.handleRedirect()
      }, 3000)
    }
    
  }

  render(){
    return (
      <React.Fragment>
        <Credentialslayout 
          alert = {this.state.alert}
          title= 'Enter OTP'
          inputlist={this.state.Inputlist}
          forgot =  ''
          buttonname = 'SUBMIT'
          buttonType = "submit"
          linkname = 'BACK'
          linkto='/forgotpassword'
          handlerSubmit = {this.handleSubmit}
          handlerChange = {this.handleOtpevent}
          contents = ''
        />
      </React.Fragment>
    )
  }
}

export default OtpPage