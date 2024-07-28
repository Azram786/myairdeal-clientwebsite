import React from "react";
import AsyncSelect from "react-select/async";

const customStyles = {
  control: (provided) => ({
    ...provided,
    display: "flex",
    boxShadow: "none",
    border: "none",
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
}) => {
  return (
    <AsyncSelect
      isClearable={true}
      styles={customStyles}
      placeholder={<CustomPlaceholder icon={icon} text={placeholder} />}
      defaultOptions={defaultOptions}
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
