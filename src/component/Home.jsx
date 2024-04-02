// import  { useState } from 'react';
import List from "./Liste";
// import axios from 'axios';
 
const Home = () => {
 
    // const [userField, setUserField] = useState({
    //     user_id:"",
    //     weight:"",
    //     measurements:"",
    //     performance:"BONNE"
    // });
 
    // const changeUserFieldHandler = (e) => {
    //     setUserField({
    //         ...userField,
    //         [e.target.name]: e.target.value
    //     });
    //     //console.log(userField);
 
    // }
    // const [loading,setLoading]=useState()
 
    // const onSubmitChange = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const responce= await axios.post("http://127.0.0.1:8000/api/addnew", userField);
    //         console.log(responce)
    //         setLoading(true);
    //     } catch (err) {
    //         console.log("Something Wrong");
    //     }
    // }
    // if(loading){
    //     return <Home/>
    // }
 
    return (
     <div>
        <List/>
     </div>
    )
};
 
export default Home;