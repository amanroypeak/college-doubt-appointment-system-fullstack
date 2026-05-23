import React, { useEffect, useState } from 'react'
import useTeacher from '../Contexts/Context'
import { useNavigate, useParams } from 'react-router-dom'

function AllProfessors() {

  const [disTeacher, setDisTeacher] = useState([])

  const { professors } = useTeacher()

  const { category } = useParams()

  const navigate = useNavigate()

  const applyFilter = () => {

    if (category) {

      setDisTeacher(
        professors.filter((tec) => tec.speciality === category)
      )

    } else {

      setDisTeacher(professors)

    }
  }

  useEffect(() => {
    applyFilter()
  }, [professors, category])

  return (

    <div className="p-10">

      {/* Heading */}

      <h1 className="text-3xl font-bold mb-6">

        {category ? `${category} Professors` : "All Professors"}

      </h1>

      {/* Cards Grid */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {disTeacher.map((item, index) => (

          <div
            key={index}
            onClick={() => navigate(`/Appointments/${item._id}`)}
            className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
          >

            <img
              className="bg-blue-50 w-full h-40 object-cover"
              src={item.image}
              alt=""
            />

            <div className="p-4">

              <div className="flex items-center gap-2 text-sm text-green-500">

                <p className="w-2 h-2 bg-green-500 rounded-full"></p>

                <p>
                  {item.available ? "Available" : "Not Available"}
                </p>

              </div>

              <p className="text-gray-900 text-lg font-medium mt-2">
                {item.name}
              </p>

              <p className="text-gray-600 text-sm">
                {item.speciality}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default AllProfessors