import React, { useEffect, useState } from "react";
import useTeacher from "../Contexts/Context";
import axios from "axios";
import { toast } from "react-toastify";

function Appointments() {

  const {
    professors,
    backendUrl,
    token,
    getProfessorsData
  } = useTeacher();

  const [appointments, setAppointments] = useState([]);

  //  GET USER APPOINTMENTS 

  const getUserAppointments = async () => {

    try {

      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        {
          headers: { token }
        }
      );

      if (data.success) {

        setAppointments(data.appointments);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);
      toast.error(error.message);

    }
  };

  //  CANCEL APPOINTMENT 

  const handleCancel = async (appointmentId) => {

    try {

      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token }
        }
      );

      if (data.success) {

        toast.success(data.message);

        // reload appointments
        getUserAppointments();

        // reload professors slots instantly
        getProfessorsData();

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);
      toast.error(error.message);

    }
  };

  // LOAD APPOINTMENTS 

  useEffect(() => {

    if (token) {

      getUserAppointments();

    }

  }, [token]);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        My Appointments
      </h1>

      <div className="flex flex-col gap-6">

        {appointments.length === 0 ? (

          <p>No appointments found</p>

        ) : (

          appointments.map((app, index) => {

            const teacher = professors.find(
              (t) => t._id === app.ProfId
            );

            return (

              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-xl shadow"
              >

                {/* LEFT SIDE */}

                <div className="flex items-center gap-6">

                  <img
                    src={teacher?.image}
                    alt={teacher?.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  <div>

                    <h2 className="text-xl font-semibold">
                      {teacher?.name}
                    </h2>

                    <p className="text-gray-500 capitalize">
                      {teacher?.speciality}
                    </p>

                    <p className="mt-2 text-sm">
                      Date: {app.slotDate}
                    </p>

                    <p className="text-sm">
                      Time: {app.slotTime}
                    </p>

                  </div>

                </div>

                {/* RIGHT SIDE */}

                {app.cancelled ? (

                  <button
                    disabled
                    className="mt-4 md:mt-0 px-6 py-2 bg-red-100 text-red-500 rounded-full cursor-not-allowed"
                  >
                    Cancelled
                  </button>

                ) : app.isCompleted ? (

                  <button
                    disabled
                    className="mt-4 md:mt-0 px-6 py-2 bg-green-100 text-green-600 rounded-full cursor-not-allowed"
                  >
                    Completed
                  </button>

                ) : (

                  <button
                    onClick={() => handleCancel(app._id)}
                    className="mt-4 md:mt-0 px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
                  >
                    Cancel Appointment
                  </button>

                )}
              </div>
            );
          })
        )}

      </div>

    </div>
  );
}

export default Appointments;