import  { useEffect, useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
// import { ToastContainer, toast } from 'react-toastify';

function Edit() {
    const navigate = useNavigate();
    // return an object like { id: "123" }   would extract the value "123"
    const { id } = useParams();
    const [formData, setFormData] = useState({
        weight:'', 
        measurements: '', 
        performance: '' 
    });

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = Cookies.get("token");
                const response = await axios.get(`http://127.0.0.1:8000/api/progress/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.progress.weight);
           
                setFormData({
                    weight: response.data.progress.weight ,
                    measurements: response.data.progress.measurements ,
                    performance: response.data.progress.performance 
                });
            } catch (err) {
                console.log('error', err);
            }
        };
        fetchProgress();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("token");
            await axios.put(`http://127.0.0.1:8000/api/progress/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // toast.success("success ,Prgress Update ")
          
            navigate('/home');
        } catch (err) {
            console.log('error', err);
            if (err.response && err.response.data && err.response.data.errors) {
                const errors = Object.values(err.response.data.errors).join("<br>");
                Swal.fire({
                  icon: 'error',
                  title: 'Erreur de validation',
                  html: errors,
                });
              }
        }
        
    };

    return (
        <>
        <div className="relative flex flex-col justify-center min-h-screen mx-4 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
                    Progress Edit
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">Weight</label>
                        <input
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">Measurements</label>
                        <input
                            type="text"
                            name="measurements"
                            value={formData.measurements}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">Performance</label>
                        <input
                            type="text"
                            name="performance"
                            value={formData.performance}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Edit;
