import React, { Component } from 'react';
import Alert from '../Forms/Alert/Alert';
import Schema from '../../Error/Schema/Error.js';
import Joi from 'joi';
import Credentialslayout from '../Layout/CredentialsLayout';
import { connect } from 'react-redux';
import { ADD_USER } from '../../store/auth/action';
import { bindActionCreators } from "redux";
import EmailValidate from '../../validation/emailValidate';

class Signup extends Component {
  constructor(){
    super();
    this.state = {
      Inputlist : [
        {
          typeName: 'text',
          labelName: 'Username',
          name: 'username'
        },
        {
          typeName: 'email',
          labelName: 'Email',
          name: 'email'
        },
        {
          typeName: 'password',
          labelName: 'Password',
          name: 'password'
        }
      ],
      username: '', useremail: '', password: '', errors: {}, isError: false, success: '', alert: ''
    };
    this.handleUserData = this.handleUserData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.state.errors)
  }
  handleUserData = (event) =>{
    console.log(event.target.name)
    if(event.target.name === 'username') this.setState({ username: event.target.value })
    if(event.target.name === 'email') this.setState({ useremail: event.target.value })
    if(event.target.name === 'password') this.setState({ password: event.target.value })
  }
  
  validate = userDetails => {
    const result = Joi.validate(userDetails, Schema)
    const errors = {}
    if( !result.error ){
      this.setState({isError: false, success: "Registration Successfully!!!!!! "})
      return null
    }
    else{
      for(let list of result.error.details)
        errors[list.path[0]] = list.message
      this.setState({isError: true})
      console.log(this.state.isError)
      return errors
    }
  }
  
  handleRedirect = () =>{
    this.props.history.push('/')
  }

  handleAlert = () =>{
    console.log(this.state.useremail)
    // setTimeout(()=>{
      if(!this.state.isError && this.state.success){
      this.setState({alert: <Alert Message={this.state.success} clsalert="success"/> })
      }
      else if(this.state.isError && !this.state.success){
        this.setState({alert: <Alert 
                    Message={this.state.errors.username || this.state.errors.email || this.state.errors.password} 
                    clsalert="danger"
                  />})
      }
  }

  handleSubmit = async (event) =>{
    event.preventDefault();
    const UserData = {
      username: this.state.username, 
      email: this.state.useremail, 
      password: this.state.password
    }
    
    if(this.state.useremail || this.state.username || this.state.password){
      const validate = await EmailValidate(UserData.email);
      console.log(validate)
      if(validate){
        const usersDetails = this.props.ADD_USER(this.state);
        
        localStorage.setItem('token', usersDetails.payload.id);
        this.setState({isError: false, success: 'Registered Succesffully!!!!!!'})
        if(!this.state.isError){
          // console.log(this.state.success)
          setTimeout(()=>{
            this.handleRedirect()
          }, 5000)
        }
        this.handleAlert()
      }
      else{
        
        let error = {
          username: '',
          email: 'Email already Registered!!!!!',
          password: ''
        }
        this.setState({errors: error, isError: true})
        this.handleAlert()
      }
    }
    else{
      const errors = this.validate(UserData);
      this.setState({errors: errors || {} });
      this.handleAlert()
    }
  }

  render(){
    
    
    
    return (
      <React.Fragment>
        <Credentialslayout 
            alert={this.state.alert}
            title="Sign up"
            inputlist={this.state.Inputlist}
            forgot =  ''
            buttonname = 'SUBMIT'
            buttonType = "submit"
            linkname = 'Already Have an account?'
            linkto='/login'
            handlerSubmit = {this.handleSubmit}
            handlerChange = {this.handleUserData}
            contents = ''
          />
      </React.Fragment>
    )
  }
}

const mappingStateToProps = state => {
  return { user: { ...state.user } };
};
const mappingDispatchToProps = dispatch => {
  return bindActionCreators({ ADD_USER }, dispatch);
};

export default connect(
  mappingStateToProps,
  mappingDispatchToProps
)(Signup);
