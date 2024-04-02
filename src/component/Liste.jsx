import  { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
 
 
const List = () => {
    const [progressData, setProgressData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
 
    const fetchData = async () => {
        try {
            const result = await axios("http://127.0.0.1:8000/api/progress");
            console.log(result.data.results);
            setProgressData(result.data.results)
        } catch (err) {
            console.log("somthing Wrong");
        }
    }
 
    const handleDelete=async(id)=>{
        console.log(id);
        await axios.delete("http://127.0.0.1:8000/api/progress/"+id);
        const newData=progressData.filter((item)=>{
            return(
                item.id !==id
            )
        })
        setProgressData(newData);
    }
 
    return(
        <div className="container">
        <h3>Progress Details</h3>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>weight</th>
                    <th>measurements</th>
                    <th>performance</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    progressData.map(( progress, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{ progress.weight} </td>
                                <td>{ progress.measurements} </td>
                                <td>{ progress.performance} </td>
                                <td>{ progress.status} </td>
                                <td>
                                    <NavLink to={`/view/${ progress.id}`} className="mx-2 btn btn-success">View</NavLink>
                                    <NavLink to={`/edit/${ progress.id}`} className="mx-2 btn btn-info">Edit</NavLink>
                                    <button onClick={()=>handleDelete( progress.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
 
            </tbody>
        </table>
        </div>
    );
};
 
export default List;