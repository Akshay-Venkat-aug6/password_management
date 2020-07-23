import firebaseDb from '../../Database/config';

const initial_state = {
  credentialsData: []
}

const creReducer = async (state = initial_state, action) =>{
  switch(action.type){
    case 'ADD_CRE':
      var creObj = { ...state }
      var creData = {
        id: action.payload.id,
        website: action.payload.website,
        username: action.payload.username,
        password: action.payload.password,
        userid: window.sessionStorage.getItem('token')
      };

      firebaseDb.child('credentials')
        .push(
          creData,
          err =>{
            if(err)
              console.log(err)
          }
        )
      return creObj
    case 'UPDATE_CRE':
      var updateData = {
        website: action.payload.website,
        username: action.payload.username,
        password: action.payload.password,
      }
      console.log(action)
      await firebaseDb
              .child('/credentials/'+ action.payload.id)
              .update({website: updateData.website, username: updateData.username, password: updateData.password})
      return state

    case 'DELETE_CRE':
      await firebaseDb
              .child('/credentials/'+ action.payload.creid)
              .remove()
      return state
    default:
      return state
  }
}

export default creReducer