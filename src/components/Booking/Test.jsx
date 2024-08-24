import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { getCode, getName, getNames } from "country-list";
import Flag from "react-world-flags";
import Select from "react-select";
const EditPassengerDetails = () => {
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
    pNat: "",
  });
  console.log({ passengerDetails });
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

  const handleInputChange = (e, id = null) => {
    const { name, value } = e.target;
    if (id) {
      setPassengerDetails((prevDetails) =>
        prevDetails.map((passenger) =>
          passenger._id === id ? { ...passenger, [name]: value } : passenger
        )
      );
    } else {
      setNewPassenger((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (passenger) => {
    const newErrors = {};
    if (!passenger.ti) newErrors.ti = "Please select a title";
    if (!passenger.fN) newErrors.fN = "First name is required";
    if (!passenger.lN) newErrors.lN = "Last name is required";
    if (!passenger.dob) newErrors.dob = "Date of birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (id) => setEditingId(id);

  const handleSave = async (id) => {
    const passengerToUpdate = passengerDetails.find((p) => p._id === id);
    if (validateForm(passengerToUpdate)) {
      // Call API to save the updated passenger details
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    // Call API to delete the passenger
    setPassengerDetails((prev) =>
      prev.filter((passenger) => passenger._id !== id)
    );
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

  const handleAdd = async () => {
    if (validateForm(newPassenger)) {
      // Call API to add the new passenger
      setPassengerDetails((prev) => [
        ...prev,
        { ...newPassenger, _id: Date.now().toString() },
      ]);
      setNewPassenger({
        ti: "",
        fN: "",
        lN: "",
        dob: "",
        pNum: "",
        eD: "",
        pid: "",
        pNat: "",
      });
    }
  };

  const startIndex = (currentPage - 1) * passengersPerPage;
  const currentPassengers = passengerDetails.slice(
    startIndex,
    startIndex + passengersPerPage
  );
  const totalPages = Math.ceil(passengerDetails.length / passengersPerPage);

  return (
    <div className="w-full h-full p-4 bg-gray-100 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Edit Passenger Details
      </h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {[
                "Title",
                "First Name",
                "Last Name",
                "DOB",
                "Passport No.",
                "Expiry Date",
                "Issue Date",

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
              <tr key={passenger._id} className="border-b hover:bg-gray-50">
                {["ti", "fN", "lN", "dob", "pNum", "eD", "pid"].map((field) => (
                  <td key={field} className="py-2 px-3">
                    {editingId === passenger._id ? (
                      <input
                        type={
                          field === "dob" || field === "eD" || field === "pid"
                            ? "date"
                            : "text"
                        }
                        name={field}
                        value={passenger[field]}
                        onChange={(e) => handleInputChange(e, passenger._id)}
                        className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      passenger[field] || "N/A"
                    )}
                  </td>
                ))}
                <td className="py-2 px-3">
                  {editingId === passenger._id ? (
                    <button
                      onClick={() => handleSave(passenger._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(passenger._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(passenger._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <h3 className="text-xl font-bold mt-8 mb-4 text-indigo-700">
        Add New Passenger
      </h3>
      <div className="bg-white rounded-lg shadow p-4 grid grid-cols-4 gap-4">
        {["ti", "fN", "lN", "dob", "pNum", "eD", "pid", "pNat"].map((field) => (
          <div key={field}>
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
            {field === "ti" && (
              <select
                name={field}
                value={newPassenger[field]}
                onChange={handleInputChange}
                className={`w-3/4 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Title</option>
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Master">Master</option>
              </select>
            )}{" "}
            {field == "pNat" && (
              <Select
                options={options}
                filterOption={customFilterOption}
                formatOptionLabel={formatOptionLabel}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderColor: errors.nationality
                      ? "red"
                      : provided.borderColor,
                    borderRadius: "4px",
                    borderWidth: "1px",
                    height: "100%",
                    width: "87%",
                    "&:hover": {
                      borderColor: state.isFocused
                        ? "#2684FF"
                        : provided.borderColor,
                    },
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    color: errors.nationality ? "red" : provided.color,
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    padding: "0 8px",
                  }),
                }}
              />
            )}
            {field !== "ti" && field !== "pNat" && (
              <input
                type={
                  field === "dob" || field === "eD" || field === "pid"
                    ? "date"
                    : "text"
                }
                name={field}
                value={newPassenger[field]}
                onChange={handleInputChange}
                className={`w-3/4 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
            {errors[field] && (
              <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
        <div className="col-span-4 mt-4">
          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add Passenger
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPassengerDetails;
