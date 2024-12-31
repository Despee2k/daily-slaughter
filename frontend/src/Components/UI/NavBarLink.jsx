import { NavLink } from "react-router-dom";

const NavBarLink = ({ dest, label }) => {
  return (
    <div>
      <NavLink to={dest} 
        className={ ({isActive}) => isActive
        ? "font-bold text-[#1E1E1E] px-8 underline underline-offset-4 decoration-2 decoration-[#1E1E1E]"
        : "font-bold text-[#808180] px-8"
      }>
        {label}
      </NavLink>
    </div>
  )
}

export default NavBarLink