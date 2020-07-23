import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../Forms/Input/Input';
import Button from '../Forms/Button/Button';
import '../../assets/css/credentials.css';

const CredentialsLayout = (props) =>{
  const { 
      alert, 
      title, 
      inputlist, 
      forgot, 
      contents, 
      buttonname, 
      buttonType, 
      linkname, 
      linkto, 
      handlerSubmit, 
      handlerChange } = props
      
  let forgots ;
  if(forgot){
    forgots = <Link to="forgotpassword">Forgot Password?</Link>
  }

  return(
    <React.Fragment>
      {alert}
      <div className="login-box">
        <h2>{title}</h2>
        <div className="content">
          {contents}
        </div>
        <form onSubmit={handlerSubmit}>
          {inputlist.map((list) =>
            <Input 
              typeName={list.typeName} 
              labelName={list.labelName} 
              name={list.name}
              handleFunction = {handlerChange}
            />
          )}
          {forgots}
          <br/>
          <Button buttonName={buttonname} type={buttonType}/>
          <hr className="line"/>
          <div className="login-signup">
            <Link to={ linkto }>{linkname}</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default CredentialsLayout