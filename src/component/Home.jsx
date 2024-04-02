import { useEffect, useState } from "react";
import MyHeader from "./nav/MyHeader";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

// import { data } from 'autoprefixer';

const Home = () => {
  const navigate = useNavigate();
  // STRING___Function
  const [userProgress, setUserProgress] = useState(null);
  const fetchProgress = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        navigate("/");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Données de la réponse :", response.data.progress);

      setUserProgress(response.data.progress);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      } else {
        console.error("Error fetching user details:", error);
      }
    }
  };
  useEffect(() => {
    fetchProgress();
  }, [navigate]);
// delete 
const handleDeleteConfirmation = (id) => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas récupérer cet élément!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };
  
  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://127.0.0.1:8000/api/progress/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newProgress = userProgress.filter((item) => item.id !== id);
      setUserProgress(newProgress);
      Swal.fire({
        icon: 'success',
        title: 'Supprimé!',
        text: 'Votre élément a été supprimé avec succès.'
      });
    } catch (error) {
      console.error("Erreur:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la suppression. Veuillez réessayer.'
      });
    }
  };

  
// status
  const updateStatus = async (id) => {
    try {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `http://127.0.0.1:8000/api/progress/status/${id}`;
      await axios.put(url, null, config).then((data) => {
        console.log(data);
        fetchProgress();
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      <MyHeader />
      <h3 className="my-3 text-3xl font-semibold ms-36">Welcome To Compte</h3>
      <div className="flex flex-col max-w-2xl mx-auto">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 mx-4 md:mx-0 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-sm font-light text-left">
                <thead className="font-medium border-b border-red-700">
                  <tr className="bg-red-300 ">
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      weight
                    </th>
                    <th scope="col" className="px-6 py-4">
                      measurements
                    </th>
                    <th scope="col" className="px-6 py-4">
                      performance
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userProgress &&
                    userProgress.map((user, i) => (
                      <tr className="border-b dark:border-neutral-500" key={i}>
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.weight}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.measurements}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.performance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* <NavLink to={`/status/${user.id}`}  className={`font-medium ${user.status === 'terminé' ? 'text-green-700' : 'text-red-700'}`} >
                        {user.status}
                        </NavLink> */}
                          <button
                            className="font-semibold "
                            style={{
                              color:
                                user.status === "Terminé" ? "green" : "red",
                            }}
                            disabled={user.status === "Terminé" ? true : false}
                            onClick={() => updateStatus(user.id)}
                          >
                            {user.status}
                          </button>
                        </td>
                        <td>
                          <NavLink
                            to={`/edit/${user.id}`}
                            className="font-medium text-blue-600 me-3"
                          >
                            Edit
                          </NavLink>
                          <button
                            className="font-medium text-red-700 "
                            onClick={() => handleDeleteConfirmation(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
