import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Components/CredentialsLayout/Login';
import Signup from '../Components/CredentialsLayout/Signup';
import ForgotPassword from '../Components/CredentialsLayout/ForgotPassword';
import OtpPage from '../Components/CredentialsLayout/OtpPage';
import Home from '../Components/Pages/Content/Home';

const Router = () =>{
  return(
    <React.Fragment>
      <Switch>
        {/* Login Page */}
        <Route exact path="/login" component={Login}/>
        {/* Signup Page */}
        <Route exact path="/Signup" component={Signup}/>
        {/* Forgot Password */}
        <Route exact path="/forgotpassword" component={ForgotPassword}/>
        {/* Otp Page */}
        <Route exact path="/forgotpassword/otp" component={OtpPage}/>
        <Route path="/" component={Home}/>
      </Switch>
    </React.Fragment>
  )
}

export default Router