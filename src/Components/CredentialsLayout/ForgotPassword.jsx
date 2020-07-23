import React, { Component } from 'react';
import validator from 'validator';
import '../../assets/css/credentials.css';

// import Alert from '../Forms/Alert/Alert';
import Alert from '../Forms/Alert/Alert';
import Credentialslayout from '../Layout/CredentialsLayout';


class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      Inputlist : [
        {
          typeName:"text",
          labelName:"Email",
          name:"Useremail"
        },
      ],
      email: '', error:'', success:''}
    this.handleEmailevent = this.handleEmailevent.bind(this);
    this.handlePswSubmit = this.handlePswSubmit.bind(this);
  }

  handleEmailevent = event =>{
    console.log(event.target.value)
    this.setState({email: event.target.value})
  }

  handlePage = () =>{
    this.props.history.push('/forgotpassword/otp')
  }

  handlePswSubmit = event =>{
    event.preventDefault();
    console.log(this.state.email)
    const result = validator.isEmail(this.state.email)
    if(!result){
      this.setState({error: 'Email is Not valid'})
    }
    else{
      this.setState({success: 'OTP is sended to Registered Mail!!!!'})
      console.log(this.state.success)
      setTimeout(()=>{
        this.handlePage()
      }, 5000)
    }
  }

  render(){
    let alert;
    if(this.state.error){
      alert = <Alert Message={this.state.error} clsalert="danger"/>
    }
    else if(this.state.success){
      alert = <Alert Message={this.state.success} clsalert="success"/>
    }
    return(
      <React.Fragment>
        <Credentialslayout 
          alert={alert}
          title="Forgot Password"
          inputlist={this.state.Inputlist}
          forgot =  ''
          buttonname = 'SEND LINK'
          buttonType = "submit"
          linkname = 'BACK'
          linkto='/login'
          handlerSubmit = {this.handlePswSubmit}
          handlerChange = {this.handleEmailevent}
          contents = 'Enter the Email id Where you used to registeration. We send the OTP to your registered Mail id.'
        />
      </React.Fragment>
    )
  }
}

export default ForgotPassword;