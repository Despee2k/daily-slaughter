import NavBarLink from "./NavBarLink"

const NavBar = () => {
  return (
    <nav className="w-screen h-16 px-4 bg-[#FFFFFF] items-center flex relative drop-shadow-md">
        <h1 className="text-[#808180] font-extrabold text-2xl mr-16">Daily Slaughter</h1>
        <NavBarLink 
          dest="/"
          label="Dashboard"
        />
        <NavBarLink 
            dest="/new-entry"
            label="New Entry"
        />
        <button className="w-24 h-8 mr-8 absolute right-0 text-[#808180] font-bold border-2 border-[#808180] rounded-xl">Log out</button>
    </nav>
  )
}

export default NavBar
