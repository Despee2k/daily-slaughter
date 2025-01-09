const LoginInput = ({ label, placeholder, name, value, onChange, type }) => {
  return (
    <div className="mt-8 flex flex-col">
      <label className="mb-2 ml-8 text-lg text-[#808180]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mx-auto w-80 rounded-md border-2 p-2 text-[#808180] focus:border-transparent focus:outline-none focus:ring focus:ring-[#808180]"
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default LoginInput;
