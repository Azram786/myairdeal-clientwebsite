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
      // setDynamicFormData((prev) => [
      //   ...prev,
      //   {
      //     fromCity: "",
      //     toCity: "",
      //     travelDate: formData.travelDate,
      //   },
      // ]);
      setDynamicFormData((prev) => {
        // Get the last entry in the array to access its toCity value
        const lastEntry = prev[prev.length - 1];

        // Create the new entry using the lastEntry's toCity value for fromCity
        const newEntry = {
          fromCity: lastEntry?.toCity || "",
          toCity: "",
          travelDate: lastEntry.travelDate,
        };

        // Return the new state with the new entry appended
        return [...prev, newEntry];
      });
    } else {
      ReactToast("Maximum of 6 forms allowed");
    }
  };

  // const handleFormDataChange = (index, data) => {
  //   console.log({ data, index })
  //   setDynamicFormData((prev) => {
  //     const newData = [...prev];
  //     newData[index] = { ...newData[index], ...data };
  //     return newData;
  //   });
  // };
  // const handleFormDataChange = (index, data) => {
  //   console.log({ index, data })

  //   setDynamicFormData((prev) => {

  //     const newData = [...prev];

  //     // Update the current index with the new data
  //     newData[index] = { ...newData[index], ...data };

  //     // Check if the next index exists
  //     if (index + 1 < newData.length && data.toCity) {
  //       // Update the fromCity of the next object
  //       newData[index + 1] = { ...newData[index + 1], fromCity: data.toCity };
  //     }

  //     return newData;
  //   });
  // };
  const handleFormDataChange = (index, data) => {
    console.log({ index, data });

    setDynamicFormData((prev) => {
      const newData = [...prev];

      // Update the current index with the new data
      newData[index] = { ...newData[index], ...data };

      // Check if the next index exists
      if (index + 1 < newData.length) {
        // Update the fromCity of the next object if toCity is provided
        if (data.toCity) {
          newData[index + 1] = { ...newData[index + 1], fromCity: data.toCity };
        }

        // Check if travelDate is provided in the current data
        if (data.travelDate) {
          const currentDate = new Date(data.travelDate);
          const nextDate = new Date(newData[index + 1].travelDate);

          // If the current travelDate is greater than the next index's travelDate,
          // update the next index's travelDate
          if (currentDate > nextDate) {
            newData[index + 1] = { ...newData[index + 1], travelDate: data.travelDate };
          }
        }
      }

      return newData;
    });
  };


  const handleFormDateChange = (index, date) => {
    try {

    } catch (error) {

    }
  }
  // const mergeHandler = (index) => {
  //   try {
  //     console.log({ index })

  //   } catch (error) {

  //   }
  // }
  const mergeHandler = (index) => {
    try {
      // Create a copy of the dynamicFormData array to avoid mutating the state directly
      const updatedFormData = [...dynamicFormData];
  
      // Get the current object at the specified index
      const currentData = updatedFormData[index];
  
      // Swap the values of fromCity and toCity
      updatedFormData[index] = {
        ...currentData,
        fromCity: currentData.toCity,
        toCity: currentData.fromCity,
      };
  
      // Update the state with the modified array
      setDynamicFormData(updatedFormData);
  
      console.log("After Swap:", updatedFormData[index]);
  
    } catch (error) {
      console.error("Error while swapping cities:", error);
    }
  };
  
  console.log({ dynamicFormData })

  const removeLastFormHandler = () => {
    if (dynamicFormData.length > 1) {
      setDynamicFormData((prev) => prev.slice(0, -1));
    } else {
      ReactToast("At least two form is required");
    }
  };

  return (
    <div className="flex bg-white flex-col lg:flex-row w-full gap-2">
      <div className="lg:w-[75%] flex flex-col gap-3">
        {dynamicFormData?.map((form, index) => (
          <DynamicForm
            // dateDynamic={
            //   index === 0 ? formData.travelDate :
            //     dynamicFormData[index]?.travelDate
            // }
            dateDynamic={
              index === 0
                ? formData.travelDate > dynamicFormData[index].travelDate ? formData.travelDate : dynamicFormData[index].travelDate : dynamicFormData[index].travelDate || dynamicFormData?.[index - 1].travelDate
            }

            key={index}
            dynamicFormData={dynamicFormData}
            defaultOptions={defaultOptions}
            getCountriesHandlerOne={getCountriesHandlerOne}
            getCountriesHandlerTwo={getCountriesHandlerTwo}
            form={form}
            setDate={(date) => handleFormDateChange(index, date)}
            setForm={(data) => handleFormDataChange(index, data)}
            formData={formData}
            index={index}
            mergeHandler={() => mergeHandler(index)}
          />
        ))}
      </div>

      <div className="flex md:justify-start gap-4 lg:w-[25%]items-center md:items-end justify-between ">
        <button
          className="flex p-3 justify-center items-center bg-[#1B1D29] text-[#D7B56D] rounded-md cursor-pointer"
          onClick={removeLastFormHandler}
        >
          <MdOutlineClear size={"23px"} />
        </button>
        <button
          className="bg-[#D7B56D] p-3 rounded text-black"
          onClick={dynamicFormIncreaseHandler}
        >
          ADD ONE MORE
        </button>
      </div>
    </div>
  );
};

export default MultiCityForm;
