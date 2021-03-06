import React from 'react'; 
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import firebaseDB from '../../../Database/config';

import TableContent from '../../Pages/Content/TableContent';

class Cretable extends React.Component{
  state = {
    responseList : ''
  }
  
  async componentDidMount() {
    this.handleCredentials();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.responseList !== this.state.responseList) {
      this.handleCredentials();
    }
  }

  handleCredentials = async () =>{
    const responseList = await firebaseDB
                            .child('credentials')
                            .orderByChild('userid')
                            .equalTo(window.sessionStorage.getItem('token'))
                            .once('value')
                            .then(snapShot =>{
                              return snapShot.val()
                            })
    console.log(responseList)
    this.setState({responseList: responseList})
  }

  handleDelete = (creid, id) =>{
    this.props.DELETE_CRE({userid:id, creid: creid})
  }
  
  render(){
    let data ;
    if(!this.state.responseList){
      data = <div className="data-found">No Data Found</div>
    }
    else{
      data = <TableContent creList = {this.state.responseList} />
    }
    return (
      <Table striped hover variant="dark">
        {data}
      </Table>
    )
  }
}

const mappingStateToProps = state => {
  return { credentialsData: { ...state.credentials } };
};

export default connect(mappingStateToProps)(Cretable)