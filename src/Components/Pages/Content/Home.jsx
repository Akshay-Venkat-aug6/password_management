import React, { Component } from 'react';
import Header from '../Header/Header';

import '../../../assets/css/style.css';
import Modal from '../../Forms/Modal/Modal';
// import Alert from '../Content/Home';
import authService from '../../../service/authService';
import { ADD_CRE } from '../../../store/credentials/action';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Table from './Table';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      website: '', email: '', password: '', listCre: [], count: 0, message: ''
    }
  }

  async componentDidMount() {
    const authValue = await authService();
    if(!authValue) this.props.history.push('/login')
    
  }

  render(){
    return(
      <>
        <Header />
        
        <div className="add-cre">
          <div className="add-form">
            <Modal 
              button = 'ADD'
              title='Add Credentials'
            />
          </div>
        </div>
        <div className="table-box">
          <Table />
        </div>  
      </>
    )
  }
}

const mappingStateToProps = state => {
  return { state: { ...state } };
};
const mappingDispatchToProps = dispatch => {
  return bindActionCreators({ ADD_CRE }, dispatch);
};


export default connect(
  mappingStateToProps,
  mappingDispatchToProps
)(Home);