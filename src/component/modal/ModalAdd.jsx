import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import MyHeader from "./nav/MyHeader";
// import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

function ModalAdd({onInsertSuccess}) {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    weight: "",
    measurements: "",
    performance: "",
  });

  const InsertProgress = async (e) => {
    onClose();
    e.preventDefault();
    try {
      if (!token) {
        navigate("/");
        return;
      }
      await axios.post(
        "http://127.0.0.1:8000/api/progress",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({
        weight: "",
        measurements: "",
        performance: "",
      });

      if (onInsertSuccess) {
        onInsertSuccess();
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your progress has been successfully recorded.",
      });
    } catch (err) {
      console.log("error:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = Object.values(err.response.data.errors).join("<br>");
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          html: errors,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Add Progress
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Progress</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
              Progress Create
            </h1>
            <form className="mt-6" onSubmit={InsertProgress}>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Measurements
                </label>
                <input
                  type="text"
                  name="measurements"
                  value={formData.measurements}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Performance
                </label>
                <input
                  type="text"
                  name="performance"
                  value={formData.performance}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-900 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Add Progress
                </button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAdd;
