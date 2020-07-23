import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UPDATE_CRE } from '../../../store/credentials/action';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import firebaseDb from '../../../Database/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateModal = (props) =>{
  
  const notifySuccess = () => {
    toast.success('Credentials Updated Successfully!!!')
  };
  const notifyFailure = () => {
    console.log('Easy')
    toast.error("Error in Updating Credentials !!!!!")
  };
  const [website, setWebsite] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('');

  const handleWebsite = event =>{
    // state.website = event.target.value
    setWebsite(event.target.value)
  }

  const handleEmail = event =>{
    // state.email = event.target.value
    setUser(event.target.value)
  }

  const handlePsw = event =>{
    // state.password = event.target.value
    setPassword(event.target.value)
  }
  
  const handleSubmit = event =>{
    event.preventDefault();
    
    let creData = {
      id: id,
      website: website,
      email: user,
      password: password
    }
    console.log(website)
    if(!website || !user || !password){
      setShow(false)
      notifyFailure()
    }
    else{
      props.UPDATE_CRE(creData)
      setShow(false)
      notifySuccess()
    }   
  }

  const handleCredentials = async (id) =>{
    const responseCre = await firebaseDb
                                .child('/credentials/'+id)
                                .once('value')
                                .then(snapShot =>{
                                  // console.log('Hai')
                                  //   console.log(snapShot.val())
                                    return snapShot.val()
                                })
    console.log(responseCre)
    // const change = Object.keys(responseCre).map(index =>{
    //                   return responseCre[index]
    //                 })
    setId(id)              
    setWebsite(responseCre.website)
    setUser(responseCre.username)
    setPassword(responseCre.password)
    console.log(website)
    console.log(user)
    console.log(password)
    setCredentials(credentialsData.concat(responseCre) )
  }

  const [show, setShow] = useState(false);
  const [credentialsData, setCredentials] = useState([]);
  const handleClose = () => setShow(false);
  
  const handleShow = () => {
    setShow(true);
    handleCredentials(props.cre_id)
  }

  return (
    <React.Fragment>
      <ToastContainer 
          autoClose={2000}
          position="top-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <div onClick={handleShow}>
        {props.title}
      </div>
      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>UPDATE CREDENTIALS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} >
          {/* {credentialsData.map((list) => 
            <> */}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>WebSite Name</Form.Label>
                <Form.Control type="text" placeholder="Enter WebSitename" value={website} onChange={handleWebsite} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter email" value={user}  onChange={handleEmail}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePsw}/>
              </Form.Group> 
            {/* </>
          )} */}
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
          
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
const mappingStateToProps = state => {
  return { state: { ...state } };
};

const mappingDispatchToProps = dispatch => {
  return bindActionCreators({ UPDATE_CRE }, dispatch);
};

export default connect(mappingStateToProps, mappingDispatchToProps)(UpdateModal);