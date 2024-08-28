import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactToast from "../../util/ReactToast";

const TicketRaising = ({ bookingId, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectedHeading, setSelectedHeading] = useState("");
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}ticket/create-ticket`,
        { bookingId, ...data, product: "Flight" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        ReactToast("Ticket Raised Successfully");
        closeModal();
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      ReactToast("Error while Raising Ticket ");
      // Handle error (show an error message to the user)
    }
  };

  // Handle radio button change
  const handleRadioChange = (value) => {
    setSelectedHeading(value);
    setValue("heading", value); // Update react-hook-form value
  };

  return (
    <div className="w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col justify-center h-full md:py-0  px-10"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {[
              "New Complaint",
              "Unresolved Complaint",
              "Write to management",
            ].map((heading) => (
              <label
                key={heading}
                className={` block text-center mb-1 border p-2 rounded-md cursor-pointer ${
                  selectedHeading === heading
                    ? "text-[#D7B56D] bg-[#1B1D29]"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  value={heading}
                  {...register("heading", { required: "Choose a heading" })}
                  className="hidden"
                  checked={selectedHeading === heading}
                  onChange={() => handleRadioChange(heading)}
                />
                {heading}
              </label>
            ))}
            {errors.heading && (
              <p className="text-red-500 text-sm">{errors.heading.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Add Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-[98%] rounded border border-gray-300 p-2"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* <div>
            <label className="block mb-1">Select Product</label>
            <select
              {...register("product", {
                required: "Product selection is required",
              })}
              className="p-2 w-[98%] border border-gray-300 rounded"
            >
              <option value="">Select a product</option>
              <option value="Product 1">Product 1</option>
              <option value="Product 2">Product 2</option>
              <option value="Product 3">Product 3</option>
            </select>
            {errors.product && (
              <p className="text-red-500 text-sm">{errors.product.message}</p>
            )}
          </div> */}
        </div>
        <div className="flex w-full justify-center">
          <button
            type="submit"
            className="text-[#D7B56D] bg-[#1B1D29] px-8 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketRaising;
