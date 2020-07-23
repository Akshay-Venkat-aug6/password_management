import firebaseDb from '../Database/config';


const authService = async () =>{
  let valid = window.sessionStorage.getItem('isValid')
  console.log(valid)
  if(valid ===  "true"){
    console.log(valid)
    const id = window.sessionStorage.getItem('token')
    const reponse = await firebaseDb.child('users').orderByChild('id').equalTo(id).once('value')
                          .then((snapShot) =>{
                            if(snapShot.val()) return true
                            else return false
                          })
    return reponse
  }
  else{
    return false
  }
  
}

export default authService