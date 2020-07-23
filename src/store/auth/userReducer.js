import firebaseDb from '../../Database/config';
import passwordHash from 'password-hash';
import loginValidate from '../../validation/loginValidate';

const initialState = {
  user: [],
  logIn: ''
}

const userReducer = async (state = initialState, action) => {
  switch(action.type){

    case 'ADD_USER':
      var stateObj = { ...state }
      var hashedPassword = passwordHash.generate(action.payload.password)
      var userData = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        password: hashedPassword,
        isLogged: action.payload.isLogged
      }
      // stateObj.user.push(userData)
     
      firebaseDb.child('users')
        .push(
          userData,
          err =>{
            if(err)
              console.log(err)
          }
        )
     
      return stateObj

    case 'CHECK_USER':
      var stateObjs = { ...state }
      const data = await loginValidate(action.payload.email, action.payload.password);
      console.log(data)
      window.sessionStorage.setItem('isValid', data)
      return stateObjs
    case 'CHECK_ID':
      var stateObjs1 = { ...state }
      // stateObjs1.user.findIndex(users => users.id === action.payload.tokenId)
      // console.log(checkId)
      return stateObjs1
    default:
      return state

  }
}

export default userReducer