import DetailEntry from "../Components/New-Entry/DetailEntry"
import NavBar from "../Components/UI/NavBar"
import SlaughterData from "../Components/New-Entry/SlaughterData"

const NewEntry = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>

      <main className="mx-40 my-10 flex gap-20">
        <DetailEntry />
        <SlaughterData />
      </main>
    </div>
  )
}

export default NewEntry
