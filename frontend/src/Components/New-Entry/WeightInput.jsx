const WeightInput = ({ label }) => {
  return (
    <div className="mt-6 flex flex-col">
      <label className="mb-2 text-lg text-[#808180]">{label}</label>
      <input
        type="text"
        className="w-44 rounded-md border-2 p-1 text-[#808180] focus:border-transparent focus:outline-none focus:ring focus:ring-[#808180]"
      ></input>
    </div>
  );
};

export default WeightInput;
