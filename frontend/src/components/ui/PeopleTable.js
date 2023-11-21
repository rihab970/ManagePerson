import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { personSelector } from '../../store/person.slice';
import ModalDeletePerson from './ModalDeletePerson';
import ModalViewPerson from './ModalViewPerson';
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;


export default function PeopleTable() {
    const persons = useSelector(personSelector);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const[id, setId]= useState('')
    // Event handler for opening the modal
    const handleDeletePersonClick = (id) => {
        setShowModalDelete(true);
        setId(id);
    };
    const handleViewPersonClick = (id) => {
        setShowModal(true);
        setId(id);
    };
  return (
    <div>
        <table className = "table table-bordered">
            <thead>
                <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th> Email</th>
                    <th> Age</th>
                    <th> Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                persons.map(person=>{
                    return(
                        <tr key={person._id}>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.email}</td>
                            <td>{person.age}</td>
                            <td>
                                <button className="btn btn-info" onClick={()=>navigate(`/update/${person._id}`)}>Update </button>
                                <button style={{marginLeft: "10px"}}  className="btn btn-danger" onClick={()=>handleDeletePersonClick(person._id)}>Delete </button>
                                <button style={{marginLeft: "10px"}}  className="btn btn-secondary" onClick={()=>handleViewPersonClick(person._id)}>View </button>
                            </td>
                        </tr>
                    )
                  
                })
               }
                
            </tbody>
        </table>
        {showModalDelete && <ModalDeletePerson setShowModalDelete={setShowModalDelete} id={id}  />}
        {showModal && <ModalViewPerson setShowModal={setShowModal} id={id} />}
    </div>
  )
}
