import { useState, useEffect } from "react";
import DataSummary from "../Components/Dashboard/DataSummary";
import NavBar from "../Components/UI/NavBar";

const Dashboard = ({ handleLogout }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const yearArray = Array.from(
      { length: currentYear - 2024 },
      (_, i) => currentYear - i,
    );
    setYears(yearArray);
  }, [currentYear]);

  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  const handleMonthSelect = (monthId) => {
    setSelectedMonth(monthId);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(parseInt(year));
  };

  return (
    <div>
      <header>
        <NavBar handleLogout={handleLogout} />
      </header>
      <main className="container mx-auto my-10 px-4 py-6">
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-4">
            <select
              value={selectedYear}
              onChange={(e) => handleYearSelect(e.target.value)}
              className="rounded-lg px-6 py-2 text-xl text-[#808180] shadow-md focus:border-transparent focus:outline-none"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            {months.map((month) => (
              <button
                key={month.id}
                onClick={() => handleMonthSelect(month.id)}
                className={`rounded-lg px-4 py-2 transition-all duration-200 ${
                  selectedMonth === month.id
                    ? "bg-[#4169E1] text-white"
                    : "bg-white text-[#808180] shadow-md hover:bg-[#3654C9] hover:text-white"
                }`}
              >
                {month.name}
              </button>
            ))}
            <button
              onClick={() => handleMonthSelect("yearly")}
              className={`rounded-lg px-4 py-2 ${
                selectedMonth === "yearly"
                  ? "bg-[#4169E1] text-white"
                  : "bg-white text-[#808180] shadow-md hover:bg-[#3654C9] hover:text-white"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white shadow-md">
          <DataSummary
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
