import firebaseDb from '../Database/config';

const emailValidate = async (useremail) =>{
  let checkValue;
  let response = await firebaseDb.once("value")
                          .then(function(snapshot) {
                              snapshot.forEach(function(childSnapshot) {
                                var childData = childSnapshot.val();
                                var check;
                                check = Object.keys(childData).map(id => childData[id].email === useremail)
                                if(!check.includes(true)){
                                  checkValue =  true
                                }
                                else{
                                  checkValue =  false
                                }
                              });
                              return checkValue
                          });
    // console.log("checks "+ response)
    if(response === undefined){ response = true}
    return response
}

export default emailValidate