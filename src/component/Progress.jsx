// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import MyHeader from "./nav/MyHeader";
// import Swal from "sweetalert2";

// function Progress() {
//   const navigate = useNavigate();
//   const token = Cookies.get("token");
//   const [formData, setFormData] = useState({
//     weight: "",
//     measurements: "",
//     performance: "",
//   });

//   const InsertProgress = async (e) => {
//     e.preventDefault();
//     try {
   
//       if (!token) {
//         navigate("/");
//         return;
//       }
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/progress",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("ok");
//       console.log(response.data);
//       setFormData({
//         weight: "",
//         measurements: "",
//         performance: "",
//       });
//       Swal.fire({
//         icon: "success",
//         title: "Succès",
//         text: "Votre progrès a été enregistré avec succès.",
//       });
//       navigate("/home");
//     } catch (err) {
//       console.log("error:", err);
//       if (err.response && err.response.data && err.response.data.errors) {
//         const errors = Object.values(err.response.data.errors).join("<br>");
//         Swal.fire({
//           icon: "error",
//           title: "Erreur de validation",
//           html: errors,
//         });
//       }
//     }
//   };
//   useEffect(() => {
//     // const token = Cookies.get("token");
//     if (!token) {
//       navigate("/");
//     }
//   }, [navigate]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <MyHeader />
//       <div className="relative flex flex-col justify-center min-h-screen mx-4 overflow-hidden">
//         <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-100 lg:max-w-xl">
//           <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
//             Progress Create
//           </h1>
//           <form className="mt-6" onSubmit={InsertProgress}>
//             <div className="mb-2">
//               <label className="block text-sm font-semibold text-gray-800">
//                 Weight
//               </label>
//               <input
//                 type="text"
//                 name="weight"
//                 value={formData.weight}
//                 onChange={handleChange}
//                 className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
//               />
//             </div>
//             <div className="mb-2">
//               <label className="block text-sm font-semibold text-gray-800">
//                 Measurements
//               </label>
//               <input
//                 type="text"
//                 name="measurements"
//                 value={formData.measurements}
//                 onChange={handleChange}
//                 className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
//               />
//             </div>
//             <div className="mb-2">
//               <label className="block text-sm font-semibold text-gray-800">
//                 Performance
//               </label>
//               <input
//                 type="text"
//                 name="performance"
//                 value={formData.performance}
//                 onChange={handleChange}
//                 className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
//               />
//             </div>
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-900 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//               >
//                 Add Progress
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Progress;
