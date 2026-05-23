import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTeacher from "../Contexts/Context";
import axios from "axios";
import { toast } from "react-toastify";

function MyAppointments() {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    professors,
    backendUrl,
    token,
    getProfessorsData
  } = useTeacher();

  const [prof, setProf] = useState(null);

  const [slots, setSlots] = useState([]);

  const [slotIndex, setSlotIndex] = useState(0);

  const [slotTime, setSlotTime] = useState("");

  //  FIND PROFESSOR 
  useEffect(() => {

    const found = professors.find((p) => p._id === id);

    if (found) {
      setProf(found);
    }

  }, [professors, id]);

  //  GENERATE SLOTS 
  useEffect(() => {

    if (!prof) return;

    let today = new Date();

    let allSlots = [];

    for (let i = 0; i < 7; i++) {

      let current = new Date(today);

      current.setDate(today.getDate() + i);

      // skip sunday
      if (current.getDay() === 0) continue;

      let end = new Date(current);

      end.setHours(17, 0, 0, 0);

      current.setHours(10);
      current.setMinutes(0);

      let daySlots = [];

      while (current < end) {

        daySlots.push({
          datetime: new Date(current),
          time: current.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });

        current.setMinutes(current.getMinutes() + 30);
      }

      allSlots.push(daySlots);
    }

    setSlots(allSlots);

  }, [prof]);

  //  BOOK 
  const bookAppointment = async () => {

    if (!token) {

      toast.error("Please Login First");

      navigate("/login");

      return;
    }

    if (!slotTime) {
      toast.error("Select a slot");
      return;
    }

    try {

      const slotDate =
        slots[slotIndex][0].datetime.toDateString();

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          ProfId: id,
          slotDate,
          slotTime,
        },
        {
          headers: { token },
        }
      );

      if (data.success) {

        toast.success("Appointment Booked");

        // refresh professors
        await getProfessorsData();

        // instantly lock slot locally
        setProf((prev) => ({
          ...prev,
          slots_booked: {
            ...prev.slots_booked,
            [slotDate]: [
              ...(prev.slots_booked?.[slotDate] || []),
              slotTime,
            ],
          },
        }));

        setSlotTime("");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error(error.message);

    }
  };

  //  LOADING 
  if (!prof) {
    return (
      <p className="text-center mt-10 text-xl">
        Loading...
      </p>
    );
  }

  return (
    <div className="p-10">

      {/* PROFILE */}
      <div className="flex gap-6 bg-white p-6 rounded-xl shadow">

        <img
          src={prof.image}
          alt=""
          className="w-40 h-40 object-cover rounded-lg"
        />

        <div>

          <h1 className="text-3xl font-bold">
            {prof.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {prof.speciality}
          </p>

        </div>

      </div>

      {/* DAYS */}
      <div className="flex gap-3 mt-8 overflow-x-auto">

        {slots.map((day, index) => {

          const date = new Date(day[0]?.datetime);

          return (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`px-4 py-3 border rounded-full cursor-pointer min-w-fit
              ${
                slotIndex === index
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {date.toDateString().slice(0, 10)}
            </div>
          );
        })}
      </div>

      {/* TIME */}
      <div className="flex flex-wrap gap-3 mt-6">

        {slots[slotIndex]?.map((item, i) => {

          const slotDate =
            slots[slotIndex][0].datetime.toDateString();

          const isBooked =
            prof.slots_booked?.[slotDate]?.includes(item.time);

          return (
            <button
              key={i}
              disabled={isBooked}
              onClick={() => setSlotTime(item.time)}
              className={`px-4 py-2 border rounded-full transition
              ${
                isBooked
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-blue-500 hover:text-white"
              }
              ${
                slotTime === item.time
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {item.time}
            </button>
          );
        })}
      </div>

      {/* BUTTON */}
      <button
        onClick={bookAppointment}
        className="mt-8 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-8 py-3 rounded-full shadow hover:scale-105 transition"
      >
        Book Appointment
      </button>

    </div>
  );
}

export default MyAppointments;