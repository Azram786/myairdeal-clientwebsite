import React, { useState, useEffect } from "react";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import CustomInput from "./DatePickerCustom";
import CustomSelect from "./CustomSelect";
import { GoArrowSwitch } from "react-icons/go";

const DynamicForm = ({
  defaultOptions,
  getCountriesHandlerOne,
  getCountriesHandlerTwo,
  setForm,
  formData,
  form,
  dateDynamic,
}) => {
  const [startDate, setStartDate] = useState(dateDynamic);
  console.log({ form })
  console.log({ dateDynamic })
  useEffect(() => {
    setForm({ travelDate: startDate });
  }, [startDate]);

  useEffect(() => {
    setStartDate(() => dateDynamic);
    setForm({ travelDate: startDate });
  }, [dateDynamic]);

  return (



    <div className="flex flex-col p-3 md:p-0 md:flex-row justify-between relative border border-slate-400 rounded-lg gap-2 md:border-none max-w-[1800px] ">

      <div className=" gap-2 md:w-[68%] flex flex-col md:flex-row relative justify-between ">
        <div className="flex md:w-full items-center border rounded p-2 ">
          <div>
            <RiFlightTakeoffFill className="text-2xl md:text-3xl" />
          </div>
          <div className="w-full">
            <CustomSelect
              loadOptions={getCountriesHandlerOne}
              defaultOptions={defaultOptions}
              placeholder="Where From?"
              icon={<RiFlightTakeoffFill />}
              setFormData={(value) => setForm({ fromCity: value })}
              value={form.fromCity}
            />
          </div>
        </div>



        <div className="flex md:w-full items-center border rounded p-2 md:ml-2">
          <div>
            <RiFlightLandLine className="text-2xl md:text-3xl" />
          </div>
          <div className="w-full ">
            <CustomSelect
              loadOptions={getCountriesHandlerTwo}
              defaultOptions={defaultOptions}
              placeholder="Where To?"
              setFormData={(value) => setForm({ toCity: value })}
              value={form.toCity}
            />
          </div>
        </div>

        <div className=" hidden  md:flex items-center justify-center text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-8 h-8 rounded-full">
          <GoArrowSwitch />
        </div>
      </div>



      <div className="flex md:w-[33.333%] flex-col md:flex-row ">
        <div className="rounded flex  items-center border w-full">
          <div className="flex items-center justify-between   w-full    
          ">
            <DatePicker
              minDate={formData.travelDate}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<CustomInput CustomIcon={MdOutlineDateRange} />}
              dateFormat="dd-MM-yyyy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
