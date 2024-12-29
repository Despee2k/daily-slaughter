import LoginForm from "../Components/Login/LoginForm"

const LoginPage = () => {
  return (
    <div className="w-screen h-screen">
      <h1 className="text-[#808180] font-extrabold text-3xl mb-16 p-4">Daily Slaughter</h1>
      <div className="flex justify-center mb-4">
        <h1 className="text-[#808180] font-bold text-3xl">LOGIN</h1>
      </div>
      <main className="flex items-center justify-center">
          <LoginForm />
      </main>
    </div>
  )
}

export default LoginPage
