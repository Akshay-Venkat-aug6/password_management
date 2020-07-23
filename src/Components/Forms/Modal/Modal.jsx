import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ADD_CRE } from '../../../store/credentials/action';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// import Alert from '../Alert/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Model = (props) =>{
  const notifySuccess = () => {
    toast.success('Credentials Added Successfully!!!')
  };
  const notifyFailure = () => {
    console.log('Easy')
    toast.error("Credentials Not Added!!!")
  };

  const state = {
    website: '', email: '', password: ''
  }
  const handleWebsite = event =>{
    state.website = event.target.value
  }

  const handleEmail = event =>{
    state.email = event.target.value
  }

  const handlePsw = event =>{
    state.password = event.target.value
  }
  
  const handleSubmit = event =>{
    event.preventDefault();
    
    let creData = {
      website: state.website,
      email: state.email,
      password: state.password
    }
    
    if(!state.website || !state.email || !state.password){
      setShow(false)
      notifyFailure()
    }
    else{
      props.ADD_CRE(creData)
      setShow(false)
      notifySuccess()
    }
    setTimeout(()=>{
      window.location.reload()
    }, 2000)
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <ToastContainer 
          autoClose={1000}
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
          <Modal.Title>ADD CREDENTIALS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>WebSite Name</Form.Label>
              <Form.Control type="text" placeholder="Enter WebSitename" onChange={handleWebsite} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter email"  onChange={handleEmail}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handlePsw}/>
            </Form.Group>
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
  return bindActionCreators({ ADD_CRE }, dispatch);
};

export default connect(mappingStateToProps, mappingDispatchToProps)(Model);