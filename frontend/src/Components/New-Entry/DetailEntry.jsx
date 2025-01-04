import WeightInput from "./WeightInput";
import Button from "../UI/Button";

const DetailEntry = () => {
  return (
    <div>
      <h1 className="mb-2 ml-2 text-xl font-bold text-[#808180]">
        Enter Details
      </h1>
      <div className="h-72 w-64 rounded-2xl bg-[#FFFFFF] p-4 shadow-md">
        <WeightInput label="Live Weight" />
        <WeightInput label="Carcass Weight" />
        <div className="mt-8 grid grid-cols-2">
          <Button
            label="Reset"
            style="w-24 h-8 text-[#FFFFFF] bg-[#FA2A55] rounded-xl mx-auto text-lg hover:bg-[#D5204C]"
          />
          <Button
            label="Save"
            style="w-24 h-8 text-[#FFFFFF] bg-[#4169E1] rounded-xl mx-auto text-lg hover:bg-[#3654C9]"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailEntry;
