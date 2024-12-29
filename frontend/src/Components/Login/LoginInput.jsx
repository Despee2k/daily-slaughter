const LoginInput = ({ label, placeholder}) => {
  return (
    <div className="flex flex-col mt-8">
      <label className="text-[#808180] ml-8 mb-2 text-lg">{label}</label>
      <input
        type="text"
        className="text-[#808180] w-80 mx-auto p-2 rounded-md border-2 focus:outline-none focus:ring focus:ring-[#808180]" 
        placeholder={placeholder}></input>
    </div>
  )
}

export default LoginInput
