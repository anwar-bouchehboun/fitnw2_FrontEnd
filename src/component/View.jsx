import axios from 'axios';
import  { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
 
const View = () => {
    const {id}=useParams();
    // console.log(id);
    const[progress,setProgressData]=useState([]);
    const navigate = useNavigate();
 
    useEffect(()=>{
        fetchProgress();
    },[id]);
 
    const fetchProgress=async()=>{
        try{
        const result=await axios.get("http://127.0.0.1:8000/api/progress/"+id);
        console.log(result.data.progress);
        setProgressData(result.data.progress)
 
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    const clickToBackHandler=()=>{
        navigate('/');
    }
 
    return <div>
        <div className="container">
            <div className='row'>
                <div className=''>
 
                    <h1>Progress Details</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>weight</th>
                                <th>measurements</th>
                                <th>performance</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{ progress.weight} </td>
                                <td>{ progress.measurements} </td>
                                <td>{ progress.performance} </td>
                                <td>{ progress.status} </td>
                            </tr>
 
                        </tbody>
                    </table>
                </div>
 
            </div>
        </div>
        <div className='container d-flex justify-content-center'>
            <div><button className='btn btn-primary' onClick={clickToBackHandler}>Back To Home</button></div>
        </div>
    </div>;
};
 
export default View;