import { useEffect, useState } from "react";
import axios from "axios";

const DataSummary = ({ selectedYear, selectedMonth }) => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(true);
  const THcss = "border px-6 py-3";
  const TDcss = "border px-6 py-3";

  useEffect(() => {
    if (!selectedYear || !selectedMonth) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint =
          selectedMonth === "yearly"
            ? `http://localhost:5000/analytics/year?year=${selectedYear}`
            : `http://localhost:5000/analytics/month?year=${selectedYear}&month=${selectedMonth}`;

        const response = await axios.get(endpoint);
        setAnalyticsData(response.data || {});
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setAnalyticsData({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (loading) {
    return <div className="py-4 text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-2 ml-2 px-6 py-2 text-2xl font-bold text-[#808180]">
        {selectedMonth === "yearly"
          ? "Yearly Summary"
          : monthNames[selectedMonth - 1]}
      </h1>
      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="w-full text-[#808180]">
          <thead className="border-b bg-[#FFFFFF] font-bold uppercase">
            <tr>
              <th className={THcss} rowSpan="2">
                {selectedMonth === "yearly" ? "Month" : "Date"}
              </th>
              <th className={THcss} colSpan="3">
                Grower
              </th>
              <th className={THcss} colSpan="3">
                Fattener
              </th>
              <th className={THcss} colSpan="3">
                Culd
              </th>
            </tr>
            <tr>
              <th className={THcss}>LW</th>
              <th className={THcss}>CW</th>
              <th className={THcss}>Count</th>
              <th className={THcss}>LW</th>
              <th className={THcss}>CW</th>
              <th className={THcss}>Count</th>
              <th className={THcss}>LW</th>
              <th className={THcss}>CW</th>
              <th className={THcss}>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(analyticsData).length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="py-8 text-center text-lg text-[#808180]"
                >
                  No data available for this period
                </td>
              </tr>
            ) : (
              Object.entries(analyticsData).map(([key, data]) => (
                <tr key={key}>
                  <td className={TDcss}>
                    {selectedMonth === "yearly" ? monthNames[key - 1] : key}
                  </td>
                  <td className={TDcss}>{data.Grower?.avgLW || "0"}</td>
                  <td className={TDcss}>{data.Grower?.avgCW || "0"}</td>
                  <td className={TDcss}>{data.Grower?.count || "0"}</td>
                  <td className={TDcss}>{data.Fattener?.avgLW || "0"}</td>
                  <td className={TDcss}>{data.Fattener?.avgCW || "0"}</td>
                  <td className={TDcss}>{data.Fattener?.count || "0"}</td>
                  <td className={TDcss}>{data.Culd?.avgLW || "0"}</td>
                  <td className={TDcss}>{data.Culd?.avgCW || "0"}</td>
                  <td className={TDcss}>{data.Culd?.count || "0"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataSummary;
