import NavBarLink from "./NavBarLink";

const NavBar = ({ handleLogout }) => {
  return (
    <nav className="relative flex h-16 w-screen items-center bg-[#FFFFFF] px-4 drop-shadow-md">
      <h1 className="mr-16 text-2xl font-extrabold text-[#808180]">
        Daily Slaughter
      </h1>
      <NavBarLink dest="/" label="Dashboard" />
      <NavBarLink dest="/new-entry" label="New Entry" />
      <button
        className="absolute right-0 mr-8 h-8 w-24 rounded-xl border-2 border-[#808180] font-bold text-[#808180]"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
