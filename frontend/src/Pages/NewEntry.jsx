import DetailEntry from "../Components/New-Entry/DetailEntry";
import NavBar from "../Components/UI/NavBar";
import SlaughterData from "../Components/New-Entry/SlaughterData";
import { useState } from "react";

const NewEntry = ({ handleLogout }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => {
    setRefreshFlag((curr) => !curr);
  };

  return (
    <div>
      <header>
        <NavBar handleLogout={handleLogout} />
      </header>

      <main className="mx-40 my-10 flex gap-20">
        <DetailEntry
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          triggerRefresh={triggerRefresh}
        />
        <SlaughterData selectedDate={selectedDate} refreshFlag={refreshFlag} />
      </main>
    </div>
  );
};

export default NewEntry;
