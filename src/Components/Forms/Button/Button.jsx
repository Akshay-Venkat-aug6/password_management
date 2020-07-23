import React from 'react';

const Button = ({buttonName, type}) =>{
  return (
    <button type={type}>
      {buttonName}
    </button>
  )
}

export default Button