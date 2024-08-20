import React from "react";

const ModalHistoryData = ({
  isOpen,
  onClose,
  historyData,
  loading,
  onSelect,
  DATAindex
}) => {
  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-full  max-h-[70vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-2 text-white w-8 h-8 bg-red-700 items-center flex rounded-full justify-center "
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-base md:text-xl font-semibold">Select From History</h2>
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center w-96 h-96">
              <div className="w-8 h-8 border-t-2 border-blue-600 border-solid rounded-full animate-spin"></div>
            </div>
          ) : historyData?.passengers?.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b text-left">Title</th>
                  <th className="py-2 px-4 border-b text-left">First Name</th>
                  <th className="py-2 px-4 border-b text-left">Last Name</th>
                  <th className="py-2 px-4 border-b text-left">
                    Passenger Type
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    Date Of Birth
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyData.passengers.map((item, index) => (
                  <tr
                    key={index}
                    className=" hover:bg-gray-400 hover:font-semibold hover:cursor-pointer"
                    onClick={() => onSelect(DATAindex, item)}
                  >
                    <td className="py-2 px-4 border-b">{item.ti || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{item.fN || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{item.lN || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{item.pt || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{item.dob || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No history data available.</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-[#007EC4] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>

    </div>
  );
};

export default ModalHistoryData;
