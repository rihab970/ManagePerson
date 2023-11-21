import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import axios from 'axios';
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;


export default function ModalViewPerson({ setShowModal, id}) {
    const [person, setPerson]= useState({});
    //get all the information about this person
    async function fetchPerson(){
        await axios.get(`/api/person/${id}`).then(res=>{
              if(res.data){
                setPerson(res.data)
              }
        });
    }
    useEffect(()=>{
        fetchPerson()
    },[])
  return (
    <div>
        <Modal show={true} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Person information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <strong>First Name:</strong> {person.firstName}
                            </div>
                            <div className="mb-3">
                                <strong>Last Name:</strong> {person.lastName}
                            </div>
                            <div className="mb-3">
                                <strong>Email:</strong> {person.email}
                            </div>
                            <div className="mb-3">
                                <strong>Age:</strong> {person.age}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}
