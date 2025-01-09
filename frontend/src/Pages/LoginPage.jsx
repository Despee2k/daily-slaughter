import LoginForm from "../Components/Login/LoginForm";

const LoginPage = ({ setToken }) => {
  return (
    <div>
      <h1 className="mb-16 p-4 text-2xl font-extrabold text-[#808180]">
        Daily Slaughter
      </h1>
      <div className="mb-4 flex justify-center">
        <h1 className="text-3xl font-bold text-[#808180]">LOGIN</h1>
      </div>
      <main className="flex items-center justify-center">
        <LoginForm setToken={setToken} />
      </main>
    </div>
  );
};

export default LoginPage;
