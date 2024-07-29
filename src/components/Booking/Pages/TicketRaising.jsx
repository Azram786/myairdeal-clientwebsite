import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TicketRaising = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {

    console.log(data);
    navigate("/confirmation");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Raise a Ticket</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Issue Description</label>
          <textarea
            {...register("issue", { required: "Issue description is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.issue && <p className="text-red-500 text-sm">{errors.issue.message}</p>}
        </div>
        <button type="submit" className="bg-[#007EC4] text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TicketRaising;
