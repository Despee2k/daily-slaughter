import NavBar from "../Components/UI/NavBar"
import CategoryCard from "../Components/Dashboard/CategoryCard"
import Select from 'react-select';

const HomePage = ({ handleLogout }) => {
  const options = [
    { value: 'latest', label: 'Latest'},
    { value: 'monthyl', label: 'Monthly'},
    { value: 'yearly', label: 'Yearly'},
  ]

  return (
    <div>
      <header>
        <NavBar handleLogout={handleLogout} /> 
      </header>
      <main className="mx-40">
        <div className="flex justify-end my-10">
          <Select options={options} className="w-36 text-[#808180] font-semibold outline-none focus:ring focus:ring-[#808180]"/>
        </div>
        <div className="flex justify-between">
          <CategoryCard 
            classification="GROWER"
            aveLW="100"
            aveCW="100"
            quantity="100"
          />
          <CategoryCard 
            classification="GROWER"
            aveLW="100"
            aveCW="100"
            quantity="100"
          />
          <CategoryCard 
            classification="GROWER"
            aveLW="100"
            aveCW="100"
            quantity="100"
          />
        </div>
      </main>
    </div>
  )
}

export default HomePage
