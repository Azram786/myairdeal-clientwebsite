import React, { forwardRef } from "react";

// Custom Input component with forwardRef
const CustomInput = forwardRef(
  ({ value, onClick, CustomIcon, disabled }, ref) => (
    <div
      className={`flex w-full items-center border-gray-300  rounded p-2 cursor-pointer ${
        disabled ? `bg-slate-200` : ""
      }`}
      onClick={onClick}
      ref={ref}
    >
      {CustomIcon ? <CustomIcon className="text-black mr-2 text-xl " /> : ""}

      <span>{value}</span>
    </div>
  )
);

export default CustomInput;
