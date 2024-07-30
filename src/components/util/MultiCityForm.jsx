import DynamicForm from "./DynamicForm";
import ReactToast from "./ReactToast";
import { MdOutlineClear } from "react-icons/md";

const MultiCityForm = ({
  getCountriesHandlerOne,
  getCountriesHandlerTwo,
  defaultOptions,
  dynamicFormData,
  setDynamicFormData,
  formData,
}) => {
  const dynamicFormIncreaseHandler = () => {
    if (dynamicFormData.length < 5) {
      setDynamicFormData((prev) => [
        ...prev,
        {
          fromCity: "",
          toCity: "",
          travelDate: formData.travelDate,
        },
      ]);
    } else {
      ReactToast("Maximum of 5 forms allowed");
    }
  };

  const handleFormDataChange = (index, data) => {
    setDynamicFormData((prev) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], ...data };
      return newData;
    });
  };

  const removeLastFormHandler = () => {
    if (dynamicFormData.length > 1) {
      setDynamicFormData((prev) => prev.slice(0, -1));
    } else {
      ReactToast("At least one form is required");
    }
  };

  return (
    <div className="flex bg-[#ffffff] flex-col lg:flex-row w-full gap-2">
      <div className="lg:w-[75%] flex flex-col gap-3">
        {dynamicFormData.map((form, index) => (
          <DynamicForm
            dateDynamic={
              index === 0 ? formData.travelDate : dynamicFormData[index - 1].travelDate
            }
            key={index}
            dynamicFormData={dynamicFormData}
            defaultOptions={defaultOptions}
            getCountriesHandlerOne={getCountriesHandlerOne}
            getCountriesHandlerTwo={getCountriesHandlerTwo}
            form={form}
            setForm={(data) => handleFormDataChange(index, data)}
            formData={formData}
          />
        ))}
      </div>

      <div className="flex md:justify-start gap-4 lg:w-[25%] items-center md:items-end justify-between ">
        <button
          className="flex p-3 justify-center items-center bg-red-500 text-white rounded-md cursor-pointer"
          onClick={removeLastFormHandler}
        >
          <MdOutlineClear size={"23px"} />
        </button>
        <button
          className="bg-[#1F61BC] p-3 rounded text-white"
          onClick={dynamicFormIncreaseHandler}
        >
          ADD ONE MORE.
        </button>
      </div>
    </div>
  );
};

export default MultiCityForm;
