import { useRef } from "react";
import { assets } from "../../assets/Use";
import { Link } from "react-router-dom";

export default function Home() {

  const specialtyRef = useRef(null);

  const handleScroll = () => {
    specialtyRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">

      {/*  HERO SECTION  */}
      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex flex-col md:flex-row items-center justify-between px-10 py-16">

          {/* LEFT CONTENT */}
          <div className="text-white max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Book Appointment <br />
              With our Professors
            </h1>

            <p className="mt-4 text-sm md:text-base text-gray-200">
              Simply browse through our extensive list of trusted Professors,
              schedule your appointment hassle-free.
            </p>

            <button
              onClick={handleScroll}
              className="mt-6 bg-white text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Book appointment →
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="mt-10 md:mt-0">
            <img
              src={assets.Professor}
              alt="Doctors"
              className="w-[300px] md:w-[450px] object-contain"
            />
          </div>

        </div>
      </div>

      {/*  SPECIALITY SECTION  */}
      <div
        ref={specialtyRef}
        className="text-center py-16 px-4"
      >
        <h2 className="text-3xl font-semibold text-gray-800">
          Find by Department
        </h2>

        <p className="text-gray-500 mt-3">
          Simply browse through our extensive list of trusted Professors,
          schedule your appointment hassle-free.
        </p>

        {/* ICONS */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">

          {/* ITEM 1 */}
          <Link to={'/allprofessors/physics'}>
          
          <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition">
            <img src={assets.Phy}  className="w-20 h-20 rounded-full bg-gray-200 p-2" />
            <p className="mt-2 text-sm">Physics</p>
          </div>
          </Link>

          {/* ITEM 2 */}
           <Link to={'/allprofessors/computersci'}>
          <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition">
            <img src={assets.Comp} className="w-20 h-20 rounded-full bg-gray-200 p-2" />
            <p className="mt-2 text-sm">Computer Science</p>
          </div>
          </Link>

          {/* ITEM 3 */}
           <Link to={'/allprofessors/zoo'}>
          <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition">
            <img src={assets.Zoo} className="w-20 h-20 rounded-full bg-gray-200 p-2" />
            <p className="mt-2 text-sm">Zoology</p>
          </div>
          </Link>

          {/* ITEM 4 */}
           <Link to={'/allprofessors/bot'}>
          <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition">
            <img src={assets.Botany} className="w-20 h-20 rounded-full bg-gray-200 p-2" />
            <p className="mt-2 text-sm">Botany</p>
          </div>
          </Link>

          {/* ITEM 5 */}
          <Link to={'/allprofessors/maths'}>
          <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition">
            <img src={assets.Compass} className="w-20 h-20 rounded-full bg-gray-200 p-2" />
            <p className="mt-2 text-sm">Maths</p>
          </div>
          </Link>

          {/* ITEM 6 */}
          <Link to={'/allprofessors/chem'}>
          <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition">
            <img src={assets.Chem} className="w-20 h-20 rounded-full bg-gray-200 p-2" />
            <p className="mt-2 text-sm">Chemistry</p>
          </div>
          </Link>

        </div>
      </div>

    </div>
  );
}