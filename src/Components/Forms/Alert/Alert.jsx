import React from 'react';

const Alert = (props) =>{
  let message ;
  message = props.Message
  return (
    <div className={`alert alert-danger ${props.clsalert}`} role="alert">
      {message}
    </div>
  )
}

export default Alert;