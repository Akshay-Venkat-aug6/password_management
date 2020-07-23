import { uuid } from 'uuidv4';

export const ADD_CRE = credentials => {
  return {
    type: 'ADD_CRE',
    payload:{
      id: uuid(),
      website: credentials.website,
      username: credentials.email,
      password: credentials.password
    }
  }
}

export const DELETE_CRE = creData => {
  console.log(creData)
  return {
    type: 'DELETE_CRE',
    payload:{
      creid: creData.id
    }
  }
}

export const UPDATE_CRE = creData =>{
  console.log(creData)
  return{
    type: 'UPDATE_CRE',
    payload:{
      id: creData.id,
      website: creData.website,
      username: creData.email,
      password: creData.password
    }
  }
}