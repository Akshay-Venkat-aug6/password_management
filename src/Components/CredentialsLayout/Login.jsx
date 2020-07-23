import React, { Component } from 'react';
import Alert from '../Forms/Alert/Alert';
import { connect } from 'react-redux';
import { CHECK_USER } from '../../store/auth/action';
import { bindActionCreators } from "redux";

import Credentialslayout from '../Layout/CredentialsLayout';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      Inputlist : [
        {
          typeName: 'email',
          labelName: 'UserEmail',
          name: 'useremail'
        },
        {
          typeName: 'password',
          labelName: 'Password',
          name: 'password'
        }
      ],
      useremail: '', password: '', error:'', isError: false, isSuccess: false
    };
    this.handleEvent = this.handleEvent.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleEvent = (event) =>{
    if(event.target.name === 'useremail') this.setState({useremail: event.target.value})
    if(event.target.name === 'password') this.setState({password: event.target.value})
  }


  handleLogin = event =>{
    event.preventDefault();
    if(!this.state.useremail){
      this.setState({error: 'useremail field is Empty', isError: true, isSuccess: false})
    }
    else if(!this.state.password){
      this.setState({error: 'Password field is Empty', isError: true, isSuccess: false})
    }
    else{

      let userDetails = { useremail: this.state.useremail, password: this.state.password}
      this.props.CHECK_USER(userDetails)
      let login_check = window.sessionStorage.getItem('isValid')
      console.log(login_check)
      if(login_check === "true"){
        this.setState({ isError: false, isSuccess: true })
        setTimeout(()=>{
          this.props.history.push('/')
        }, 5000)

      }
      else this.setState({ error: 'useremail and Password are Incorrect', isError: true, isSuccess: false })
    }
  }
  render(){
    let alert ;
    if(this.state.isError){
      alert = <Alert Message={this.state.error} clsalert="danger"/>
    }
    else if(this.state.isSuccess){
      alert = <Alert Message='Login Successfully!!' clsalert="success"/>
    }
    return (
      <React.Fragment>
        <Credentialslayout 
          alert={alert}
          title="Login"
          inputlist={this.state.Inputlist}
          forgot =  '<Link to="forgotpassword">Forgot Password?</Link>'
          buttonname = 'LOG IN'
          buttonType = "submit"
          linkname = 'Create a New Account'
          linkto='/signup'
          handlerSubmit = {this.handleLogin}
          handlerChange = {this.handleEvent}
          contents = ''
        />
      </React.Fragment>
    )
  }
}

const mappingStateToProps = state => {
  return { state: { ...state } };
};
const mappingDispatchToProps = dispatch => {
  return bindActionCreators({ CHECK_USER }, dispatch);
};

export default connect(
  mappingStateToProps,
  mappingDispatchToProps
)(Login);
