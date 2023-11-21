import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;

export default function AddPerson() {

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();
    const submitHandler = async(e) =>{
        e.preventDefault()
        try{
            await axios.post('/api/person/add', {lastName, firstName, email, age}).then(res =>{
                if(res.data){
                    toast.success("Person successfully added")
                    setTimeout(() => {
                           navigate("/");
                    }, 5000);
                }
            }).catch(error=>{
                toast.warning(error.response.data.message)
            })
        }catch(error){
           console.log(error.response.data.message)
           toast.error(error.response.data.message)
        } 
    }

  return (
    <div>
        <div className='container mt-5'>
            <h1>New person</h1>
            <br/>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">FirstName :</label>
                    <input type="text" className="form-control form-control-lg" id="firstname" placeholder="Enter your firstName"
                    value={firstName} onChange={(e) =>setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">LastName : </label>
                    <input type="text" className="form-control form-control-lg" id="lastname" placeholder="Enter your lastName"
                    value={lastName} onChange = {(e) => setLastName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email :  </label>
                    <input type="email" className="form-control form-control-lg" id="email" placeholder="Enter your email"
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age :</label>
                    <input type="number" className="form-control form-control-lg" id="age" placeholder="Enter your age" min="15"
                    value={age} onChange={(e) => setAge(e.target.value)}/>
                </div>
                <br/>
                <button className="btn btn-success" type="submit" >Save</button>
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
