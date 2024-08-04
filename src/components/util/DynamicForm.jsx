import React, { useState, useEffect } from "react";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import CustomInput from "./DatePickerCustom";
import CustomSelect from "./CustomSelect";

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

  useEffect(() => {
    setForm({ travelDate: startDate });
  }, [startDate]);

  useEffect(() => {
    setStartDate(() => dateDynamic);
    setForm({ travelDate: startDate });
  }, [dateDynamic]);

  return (
    <div className="flex flex-col p-3 md:p-0 md:flex-row justify-between relative border border-slate-400 rounded-lg gap-2 md:border-none">
      <div className="flex md:w-1/3 items-center border rounded p-2">
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

      <div className="flex md:w-1/3 items-center border rounded p-2">
        <div>
          <RiFlightLandLine className="text-2xl md:text-3xl" />
        </div>
        <div className="w-full">
          <CustomSelect
            loadOptions={getCountriesHandlerTwo}
            defaultOptions={defaultOptions}
            placeholder="Where To?"
            setFormData={(value) => setForm({ toCity: value })}
            value={form.toCity}
          />
        </div>
      </div>

      <div className="flex md:w-[36%] flex-col md:flex-row">
        <div className="rounded flex items-center border w-full">
          <div className="flex items-center justify-between w-full">
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
