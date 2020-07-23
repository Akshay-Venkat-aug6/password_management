import firebaseDb from '../Database/config';
import passwordHash from 'password-hash';
const loginValidation = async (email, password) =>{
  let passwordCheck;
  const response = await firebaseDb.child('users').orderByChild('email').equalTo(email).once('value')
                    .then(function(snap){
                      // console.log(snap.val())
                      const user = snap.val();
                      // console.log(user)
                      if(!user){
                        window.sessionStorage.setItem('isValid', false)
                        return false
                      }
                      passwordCheck = Object.keys(user).map(id =>{
                        const pcheck = passwordHash.verify(password, user[id].password)
                        // console.log(pcheck)
                        if(pcheck){
                          window.sessionStorage.setItem('token', user[id].id) 
                          window.sessionStorage.setItem('isValid', true)
                        }
                        return pcheck
                      })
                      return passwordCheck
                    });
  
  return response
}

export default loginValidation;