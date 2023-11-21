import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;


export default function UpdateePerson() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [person, setPerson] = useState({});
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
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
};
//update
const handleUpdate = async (e) =>{
    e.preventDefault()
    try {
        await axios.put('/api/person/update',{id, person}).then(res=>{
            if(res.data){
                toast.success('Update with success');
                setTimeout(() => {
                    navigate('/')
                }, 5000);
            }
        }).catch(error => {
               toast.error(error.response.data.message);
        })   
        
    } catch (error) {
        console.log(error.response);
    }
}

  return (
    <div>
       <div className='container mt-5'>
            <h1>Update person</h1>
            <br/>
            <form >
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">FirstName :</label>
                    <input type="text" className="form-control form-control-lg" id="firstname" placeholder="Enter your firstName" 
                    name="firstName" value={person.firstName} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">LastName : </label>
                    <input type="text" className="form-control form-control-lg" id="lastname" placeholder="Enter your lastName"
                    name='lastName' value={person.lastName} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email :  </label>
                    <input type="email" className="form-control form-control-lg" id="email" placeholder="Enter your email"
                    name='email' value={person.email} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age :</label>
                    <input type="number" className="form-control form-control-lg" id="age" placeholder="Enter your age" min="15"
                    name='age' value={person.age} onChange={handleInputChange}/>
                </div>
                <br/>
                <button className="btn btn-success" type="submit" onClick={handleUpdate} >Update</button>
                <button className="btn btn-danger" onClick={()=>navigate("/")} style={{marginLeft: "10px"}}>Cancel</button>
            </form>
            <br/><br/>
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    </div>
  )
}
