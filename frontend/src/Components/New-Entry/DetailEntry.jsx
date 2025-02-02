import DataInput from "./DataInput";
import Button from "../UI/Button";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const DetailEntry = ({ selectedDate, setSelectedDate, triggerRefresh }) => {
  const [inputData, setinputData] = useState({
    DateAdded: selectedDate,
    LiveWeight: "",
    CarcassWeight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setinputData({
      ...inputData,
      [name]: value,
    });

    if (name === "DateAdded") {
      setSelectedDate(value);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    axios.post(`${API_BASE_URL}/add-entry`, inputData).then(() => {
      triggerRefresh();

      setinputData({
        ...inputData,
        LiveWeight: "",
        CarcassWeight: "",
      });
    });
  };

  return (
    <div>
      <h1 className="mb-2 ml-2 text-xl font-bold text-[#808180]">
        Enter Details
      </h1>
      <div className="h-96 w-64 rounded-2xl bg-[#FFFFFF] p-4 shadow-md">
        <form onSubmit={submitForm}>
          <DataInput
            type="date"
            name="DateAdded"
            value={inputData.DateAdded}
            onChange={handleChange}
            label="Choose Date"
          />
          <DataInput
            type="number"
            name="LiveWeight"
            value={inputData.LiveWeight}
            onChange={handleChange}
            label="Live Weight"
          />
          <DataInput
            type="number"
            name="CarcassWeight"
            value={inputData.CarcassWeight}
            onChange={handleChange}
            label="Carcass Weight"
          />
          <Button
            label="Save"
            style="w-full h-8 mt-8 text-[#FFFFFF] bg-[#4169E1] rounded-xl mx-auto text-lg hover:bg-[#3654C9]"
          />
        </form>
      </div>
    </div>
  );
};

export default DetailEntry;
