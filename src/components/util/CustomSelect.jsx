import React from "react";
import AsyncSelect from "react-select/async";

const customStyles = {
  control: (provided) => ({
    ...provided,
    display: "flex",
    boxShadow: "none",
    border: "none",
    cursor: "pointer"
  }),
};

const CustomPlaceholder = ({ icon, text }) => (
  <div>
    <span>{text}</span>
  </div>
);

const CustomSelect = ({

  placeholder,
  icon,
  loadOptions,
  defaultOptions,
  setFormData,
  // defaultValue,
  myFormData,
  value
}) => {

  const formattedValue = value
    ? {
      value: value,
      label: value,
    }
    : null;



  //----------------**important**-----------------------------------------
  // i know  this code sucks 
  // i wrote this in 15 days so useless states are here and there 
  // but if it works dont touch  
  return (
    <AsyncSelect
      isClearable={true}
      className="cursor-context-menu"
      styles={customStyles}
      placeholder={<CustomPlaceholder icon={icon} text={placeholder} />}
      defaultOptions={defaultOptions}


      value={formattedValue}

      loadOptions={loadOptions}
      onChange={(value) => {
        if (value) setFormData(value.value);
        else setFormData("");
      }}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default CustomSelect;
