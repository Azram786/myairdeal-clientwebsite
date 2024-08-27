import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { getCode, getName, getNames } from "country-list";
import Flag from "react-world-flags";
import Select from "react-select";
import ReactToast from "../util/ReactToast";
import { BiArrowBack } from "react-icons/bi";

const EditPassengerDetails = ({ setIsModalOpen }) => {
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPassenger, setNewPassenger] = useState({
    ti: "",
    fN: "",
    lN: "",
    dob: "",
    pNum: "",
    eD: "",
    pid: "",
    pNat: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const passengersPerPage = 5;

  const { token } = useSelector((state) => state.auth);
  const countryNames = getNames();
  const options = countryNames.map((country) => ({
    label: country,
    value: getCode(country),
  }));

  useEffect(() => {
    getPassengersHandler();
  }, []);

  const getPassengersHandler = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}user/all-passengers`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPassengerDetails(response.data.passengers);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassenger((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNationalityChange = (selectedOption) => {
    setNewPassenger((prev) => ({
      ...prev,
      pNat: selectedOption,
    }));
    setErrors((prev) => ({ ...prev, pNat: "" }));
  };

  const validateForm = (passenger) => {
    const newErrors = {};
    if (!passenger.ti) newErrors.ti = "Please select a title";
    if (!passenger.fN) newErrors.fN = "First name is required";
    if (!passenger.lN) newErrors.lN = "Last name is required";
    if (!passenger.dob) newErrors.dob = "Date of birth is required";
    if (!passenger.pNat) newErrors.pNat = "Nationality is required";

    const passportFields = ["pNum", "eD", "pid"];
    const filledPassportFields = passportFields.filter(
      (field) => passenger[field]
    );

    if (filledPassportFields.length > 0 && filledPassportFields.length < 3) {
      passportFields.forEach((field) => {
        if (!passenger[field]) {
          newErrors[field] = "All passport details are required";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (passenger) => {
    console.log({ passenger });
    setNewPassenger({
      ...passenger,
      pNat: passenger.pNat
        ? options.find((option) => option.value === passenger.pNat)
        : null,
    });
    setEditingId(passenger._id);
  };

  const handleUpdate = async () => {
    if (validateForm(newPassenger)) {
      try {
        const updatedPassenger = {
          ...newPassenger,
          pNat: newPassenger.pNat ? newPassenger.pNat.value : null,
        };
        console.log({ updatedPassenger });
        const response = await axios.put(
          `${
            import.meta.env.VITE_SERVER_URL
          }user/edit-passenger?passengerId=${editingId}`,
          updatedPassenger,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200)
          ReactToast("Passenger updated successfully");
        getPassengersHandler();
        setNewPassenger({
          ti: "",
          fN: "",
          lN: "",
          dob: "",
          pNum: "",
          eD: "",
          pid: "",
          pNat: null,
        });
        setEditingId(null);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_SERVER_URL
        }user/remove-passenger?passengerId=${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getPassengersHandler();
      ReactToast("Passenger Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAdd = async () => {
    if (validateForm(newPassenger)) {
      try {
        const passengerToAdd = {
          ...newPassenger,
          pNat: newPassenger.pNat ? newPassenger.pNat.value : null,
        };
        const response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}user/add-passenger`,
          passengerToAdd,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) ReactToast("Passenger added successfully");
        getPassengersHandler();
        setNewPassenger({
          ti: "",
          fN: "",
          lN: "",
          dob: "",
          pNum: "",
          eD: "",
          pid: "",
          pNat: null,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewPassenger({
      ti: "",
      fN: "",
      lN: "",
      dob: "",
      pNum: "",
      eD: "",
      pid: "",
      pNat: null,
    });
  };

  const customFilterOption = (option, inputValue) => {
    const { label, value } = option;
    return (
      label.toLowerCase().includes(inputValue.toLowerCase()) ||
      value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const formatOptionLabel = ({ label, value }) => (
    <div className="flex items-center">
      <Flag code={value} style={{ width: "20px", marginRight: "8px" }} />
      {label}
    </div>
  );

  const startIndex = (currentPage - 1) * passengersPerPage;
  const currentPassengers = passengerDetails.slice(
    startIndex,
    startIndex + passengersPerPage
  );
  const totalPages = Math.ceil(passengerDetails.length / passengersPerPage);

  return (
    <div className="w-full h-full p-2 sm:p-4 bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#D7B56D] mb-2 sm:mb-0">
          {editingId ? "Edit Passenger" : "Add New Passenger"}
        </h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="flex items-center text-lg sm:text-xl font-bold text-[#1B1D29] hover:text-[#31354d]"
        >
          <BiArrowBack className="mr-1" />
          Go back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0  md:gap-2 lg:gap-4">
          {["ti", "fN", "lN", "dob", "pNum", "eD", "pid", "pNat"].map(
            (field) => (
              <div key={field} className="mb-4 ">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field === "ti"
                    ? "Title"
                    : field === "fN"
                    ? "First Name"
                    : field === "lN"
                    ? "Last Name"
                    : field === "dob"
                    ? "Date of Birth"
                    : field === "pNum"
                    ? "Passport Number"
                    : field === "eD"
                    ? "Expiry Date"
                    : field === "pid"
                    ? "Issue Date"
                    : "Nationality"}
                </label>
                {field === "ti" ? (
                  <select
                    name={field}
                    value={newPassenger[field]}
                    onChange={handleInputChange}
                    className={`w-3/4 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7B56D] ${
                      errors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Master">Master</option>
                  </select>
                ) : field === "pNat" ? (
                  <Select
                    options={options}
                    value={newPassenger.pNat}
                    onChange={handleNationalityChange}
                    filterOption={customFilterOption}
                    formatOptionLabel={formatOptionLabel}
                    styles={selectStyles}
                    // className="w-3/4"
                  />
                ) : (
                  <input
                    type={
                      field === "dob" || field === "eD" || field === "pid"
                        ? "date"
                        : "text"
                    }
                    name={field}
                    max={
                      field === "dob"
                        ? new Date().toISOString().split("T")[0]
                        : undefined
                    }
                    value={newPassenger[field]}
                    onChange={handleInputChange}
                    className={`w-3/4 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D7B56D] ${
                      errors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            )
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={editingId ? handleUpdate : handleAdd}
            className="bg-[#1B1D29] text-[#D7B56D] px-4 py-2 rounded hover:bg-[#31354d] w-full sm:w-auto"
          >
            {editingId ? "Update Passenger" : "Add Passenger"}
          </button>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="text-[#1B1D29] bg-[#D7B56D] px-4 py-2 rounded hover:bg-[#eace92] w-full sm:w-auto"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mt-4 overflow-x-auto">
        <table className="w-full">
          <thead className="text-[#D7B56D]">
            <tr>
              {[
                "Title",
                "First Name",
                "Last Name",
                "DOB",
                "Passport No.",
                "Expiry Date",
                "Issue Date",
                "Nationality",
                "Actions",
              ].map((header) => (
                <th key={header} className="py-2 px-3 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPassengers.map((passenger) => (
              <tr
                key={passenger._id}
                className="text-[#1B1D29] border-b hover:bg-gray-50"
              >
                {["ti", "fN", "lN", "dob", "pNum", "eD", "pid"].map((field) => (
                  <td key={field} className="py-2 px-3">
                    {passenger[field] || "N/A"}
                  </td>
                ))}
                <td className="py-2 px-3">
                  {getName(passenger.pNat) || "N/A"}
                </td>
                <td className="py-2 px-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(passenger)}
                      className="text-[#1B1D29] bg-[#D7B56D] px-3 py-1 rounded hover:bg-[#e2c88f]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(passenger._id)}
                      className="bg-[#1B1D29] text-[#D7B56D] px-3 py-1 rounded hover:bg-[#494f6c]"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`m-1 px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-[#D7B56D] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    borderColor: state.isFocused ? "#2684FF" : "#E5E7EB",
    borderRadius: "4px",
    borderWidth: "1px",
    height: "44px",
    width: "83%",
    "&:hover": {
      borderColor: state.isFocused ? "#2684FF" : "#E5E7EB",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "4px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 6px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#4F46E5"
      : state.isFocused
      ? "#E5E7EB"
      : "white",
    color: state.isSelected ? "white" : "black",
  }),
};

export default EditPassengerDetails;
