import { uuid } from 'uuidv4';

export const ADD_USER = userData =>{
  // console.log(userData)
  return{
    type: 'ADD_USER',
    payload: {
      id: uuid(),
      username: userData.username,
      email: userData.useremail,
      password: userData.password,
      isLogged: true
    }
  }
}

export const CHECK_USER = userData =>{
  console.log(userData)
  return {
    type: 'CHECK_USER',
    payload : {
      email: userData.useremail,
      password: userData.password
    }
  }
}

export const CHECK_TOKEN = tokenId => {
  return{
    type: "CHECK_TOKEN",
    payload: {
      tokenId: tokenId
    }
  }
}


export const LOG_OUT = tokenId =>{
  return{
    type: "LOG_OUT",
    payload:{
      tokenId: tokenId
    }
  }
}