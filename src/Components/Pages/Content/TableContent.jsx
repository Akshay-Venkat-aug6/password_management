import React from 'react';
import Modal from '../../Forms/Modal/updateModal';
import { DELETE_CRE } from '../../../store/credentials/action';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableContent = (props) =>{
  const notifySuccess = () => {
    toast.error('Credentials Deleted SuccessFully!!!!!')
  };
  const { creList } = props;
  
  const handleDelete = (id) =>{
    // console.log(id)
    props.DELETE_CRE({id: id})
    notifySuccess()
  }

  return(
    <>
      <thead>
        <tr>
          <th>#</th>
          <th>Website</th>
          <th>Username / UserEmail</th>
          <th>Password</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { Object.keys(creList)
              .map((id, index)=>
              {
                return <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{creList[id].website}</td>
                  <td>{creList[id].username}</td>
                  <td>{creList[id].password}</td>
                  <td className="edit-row">
                    <Modal 
                      button = 'update'
                      title='Update'
                      cre_id = {id}
                    />
                    <div onClick={ () => handleDelete(id) }>
                      Delete
                    </div>
                  </td>
                </tr> 
              }) }
      </tbody>
    </>
  )
}

const mappingStateToProps = state => {
  return { state: { ...state } };
};

const mappingDispatchToProps = dispatch => {
  return bindActionCreators({ DELETE_CRE }, dispatch);
};

export default connect(mappingStateToProps, mappingDispatchToProps)(TableContent)