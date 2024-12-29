import LoginInput from "./LoginInput"
import Button from "../UI/Button"

const LoginForm = () => {
  return (
    <div className="w-96 h-80 bg-[#FFFFFF] rounded-2xl relative drop-shadow-md">
        <LoginInput 
            label="Email or Username"
            placeholder="Enter email or username"
        />
        <LoginInput 
            label="Password"
            placeholder="Enter password"
        />
        <Button 
            label="Login"
            style="w-24 h-8 text-[#FFFFFF] bg-[#4169E1] rounded-xl mt-10 mr-8 absolute right-0 hover:bg-[#3654C9]"
        />
    </div>
  )
}

export default LoginForm