import axios from 'axios';
import React from 'react'
import { Modal, Button} from 'react-bootstrap';
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;

export default function ModalDeletePerson({setShowModalDelete, id}) {
 const deleteButton = async(id)=>{
   try {
      await axios.get(`/api/person/delete/${id}`);
      setShowModalDelete(false);
   } catch (error) {
    console.log(error);
   }
 }
  return (
    <div>
      <Modal show={true} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='alert alert-danger'>Are you sure you want to delete this project: <b> </b>?</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={()=>deleteButton(id)}  >Delete</Button>
        <Button variant="light" onClick={() => setShowModalDelete(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}
