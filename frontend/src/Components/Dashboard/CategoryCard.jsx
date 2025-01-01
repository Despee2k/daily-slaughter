const CategoryCard = ({ classification, aveLW, aveCW, quantity }) => {
  return (
    <div className="w-96 h-32 p-4 bg-[#FFFFFF] drop-shadow-md text-[#808180] rounded-3xl">
        <div className="h-10 grid grid-cols-2 font-bold">
            <h1 className="justify-self-start text-lg">{classification}</h1>
            <h1 className="justify-self-end text-3xl">{quantity}</h1>  
        </div>
        <div className="font-semibold">
            <p>Average LW: {aveLW} kg</p>
            <p>Average CW: {aveCW} kg</p>
        </div>
    </div>
  )
}

export default CategoryCard