import { useEffect, useState } from "react";
import axios from "axios";

const SlaughterData = ({ selectedDate, refreshFlag }) => {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    LiveWeight: "",
    CarcassWeight: "",
  });

  useEffect(() => {
    if (selectedDate) {
      const fetchEntries = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/entries-by-date?DateAdded=${selectedDate}`,
          );
          setEntries(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchEntries();
    }
  }, [selectedDate, refreshFlag]);

  // Handle delete entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-entry?id=${id}`);
      const response = await axios.get(
        `http://localhost:5000/entries-by-date?DateAdded=${selectedDate}`,
      );
      setEntries(response.data);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // Handle edit mode
  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setEditForm({
      LiveWeight: entry.LiveWeight,
      CarcassWeight: entry.CarcassWeight,
    });
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/update-entry?id=${editingId}`,
        editForm,
      );
      const response = await axios.get(
        `http://localhost:5000/entries-by-date?DateAdded=${selectedDate}`,
      );
      setEntries(response.data);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  let THcss = "px-6 py-3";
  let TDcss = "px-6 py-4";
  let BUTTON1css =
    "px-3 text-[#FFFFFF] bg-[#FA2A55] rounded-md mx-auto hover:bg-[#D5204C]";
  let BUTTON2css =
    "px-3 text-[#FFFFFF] bg-[#4169E1] rounded-md mx-auto hover:bg-[#3654C9]";
  let inputCss =
    "w-20 rounded-md border-2 p-1 text-[#808180] focus:border-transparent focus:outline-none focus:ring focus:ring-[#808180]";

  return (
    <div>
      <h1 className="mb-2 ml-2 text-xl font-bold text-[#808180]">
        Daily Slaughter Data
      </h1>
      <div className="relative overflow-x-auto rounded-2xl shadow-md">
        <table className="w-full text-[#808180]">
          <thead className="border-b bg-[#FFFFFF] font-bold uppercase">
            <tr>
              <th scope="col" className={THcss}>
                No.
              </th>
              <th scope="col" className={THcss}>
                Live Weight (KG)
              </th>
              <th scope="col" className={THcss}>
                Carcass Weight (KG)
              </th>
              <th scope="col" className={THcss}>
                Classification
              </th>
              <th scope="col" className={THcss}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm font-semibold">
            {entries.map((entry, index) => (
              <tr key={entry.id} className="border-b bg-[#FFFFFF]">
                <td className={TDcss}>{index + 1}</td>
                <td className={TDcss}>
                  {editingId === entry.id ? (
                    <input
                      type="number"
                      className={inputCss}
                      value={editForm.LiveWeight}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          LiveWeight: e.target.value,
                        })
                      }
                    />
                  ) : (
                    entry.LiveWeight
                  )}
                </td>
                <td className={TDcss}>
                  {editingId === entry.id ? (
                    <input
                      type="number"
                      className={inputCss}
                      value={editForm.CarcassWeight}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          CarcassWeight: e.target.value,
                        })
                      }
                    />
                  ) : (
                    entry.CarcassWeight
                  )}
                </td>
                <td className={TDcss}>{entry.Classification}</td>
                <td className={`flex justify-center ${TDcss}`}>
                  <button
                    className={BUTTON1css}
                    onClick={() => handleDelete(entry.id)}
                  >
                    D
                  </button>
                  {editingId === entry.id ? (
                    <button className={BUTTON2css} onClick={handleSaveEdit}>
                      S
                    </button>
                  ) : (
                    <button
                      className={BUTTON2css}
                      onClick={() => handleEdit(entry)}
                    >
                      E
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlaughterData;
