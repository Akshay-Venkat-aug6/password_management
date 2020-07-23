import React from 'react';

const Input = props  =>{
  const { typeName, labelName, name, handleFunction, error} = props
  return (
    <div className="user-box">
      <input type={ typeName } name={ name } onChange={ handleFunction } />
      <label>{ labelName }</label>
      <span>{ error }</span>
    </div>
  )
}

export default Input;