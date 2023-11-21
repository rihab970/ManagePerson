import React, { useEffect} from 'react'
import PeopleTable from '../components/ui/PeopleTable'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useDispatch } from 'react-redux';
import { personAction } from '../store/person.slice';
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;


export default function Home(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
    //set all people
    async function fetchPeople(){
        await axios.get('/api/person/all').then(res=>{
            dispatch(personAction(res.data))
        })
    }
    useEffect(()=>{
      fetchPeople();
    },[])
    
    return(
      <div>
        <br/>
        <h2 className="text-center">Persons List</h2>
        <br/>
        <div className = "row">
          <div className="col-6">
              <button className="btn btn-primary"  onClick={()=>navigate("/add")}> Add Employee</button>
          </div>
        </div><br></br>
        <div className = "row">
          <PeopleTable/>
        </div>

   </div>
       
    )
}