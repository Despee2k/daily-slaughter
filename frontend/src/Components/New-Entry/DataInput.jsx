const DataInput = ({ type, label, name, value, onChange }) => {
  return (
    <div className="mt-4 flex flex-col">
      <label className="mb-2 text-lg text-[#808180]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-44 rounded-md border-2 p-1 text-[#808180] focus:border-transparent focus:outline-none focus:ring focus:ring-[#808180]"
      ></input>
    </div>
  );
};

export default DataInput;
