import { useNavigate, useParams } from "react-router-dom";
import useTeacher from "../Contexts/Context";

export default function Professors() {

  const { professors } = useTeacher()

  const { category } = useParams()
  const navigateto = useNavigate()

  const filtered = professors.filter(
    (item) => item.speciality === category
  )

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        {category} Professors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {filtered.map((item, index) => (

          <div
            key={index}
            className="p-4 shadow rounded-lg bg-white"
          >

            <h2 className="text-xl font-semibold">
              {item.name}
            </h2>

            <p className="text-gray-500">
              {item.speciality}
            </p>

            <img
              onClick={() => navigateto(`/Appointments/${item._id}`)}
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            />

          </div>
        ))}

      </div>

    </div>
  )
}