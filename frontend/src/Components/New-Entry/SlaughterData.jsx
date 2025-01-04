import Button from "../UI/Button";

const SlaughterData = () => {
  let THcss = "px-6 py-3";
  let TDcss = "px-6 py-4";
  let BUTTON1css =
    "px-3 text-[#FFFFFF] bg-[#FA2A55] rounded-md mx-auto hover:bg-[#D5204C]";
  let BUTTON2css =
    "px-3 text-[#FFFFFF] bg-[#4169E1] rounded-md mx-auto hover:bg-[#3654C9]";

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
                ID
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
            <tr className="border-b bg-[#FFFFFF]">
              <td className={TDcss}>1</td>
              <td className={TDcss}>100</td>
              <td className={TDcss}>100</td>
              <td className={TDcss}>Grower</td>
              <td className={`flex justify-center ${TDcss}`}>
                <Button label="D" style={BUTTON1css} />
                <Button label="E" style={BUTTON2css} />
              </td>
            </tr>
            <tr className="border-b bg-[#FFFFFF]">
              <td className={TDcss}>2</td>
              <td className={TDcss}>100</td>
              <td className={TDcss}>100</td>
              <td className={TDcss}>Grower</td>
              <td className={`flex justify-center ${TDcss}`}>
                <Button label="D" style={BUTTON1css} />
                <Button label="E" style={BUTTON2css} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlaughterData;
