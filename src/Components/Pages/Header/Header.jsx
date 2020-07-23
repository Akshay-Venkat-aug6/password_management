import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../../../assets/images/logo.png';

class Header extends React.Component{
  handleLogOut = () =>{
    window.sessionStorage.setItem('token', null);
    window.sessionStorage.setItem('isValid', null);
    this.props.history.push('/login')
  }
  render(){
    return(
        <Navbar collapseOnSelect expand="lg" bg="#243b55" variant="dark">
        <Navbar.Brand href="/">
          <img
              alt=""
              src={Logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
        </Navbar.Brand>
        
        <Nav>
          <Nav.Link eventKey={2} onClick={() => {this.handleLogOut()}} >
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar>
    )
  }
  
}


export default Header;
