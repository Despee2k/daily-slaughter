import { NavLink } from "react-router-dom";

const NavBarLink = ({ dest, label }) => {
  return (
    <div>
      <NavLink
        to={dest}
        className={({ isActive }) =>
          isActive
            ? "px-8 font-bold text-[#1E1E1E] underline decoration-[#1E1E1E] decoration-2 underline-offset-4"
            : "px-8 font-bold text-[#808180]"
        }
      >
        {label}
      </NavLink>
    </div>
  );
};

export default NavBarLink;
