import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/Use";
import useTeacher from "../Contexts/Context";

export default function Header() {

    const navigate = useNavigate()
    const [showIcon, setShowIcon] = useState(false)

    const { token, setToken,userData } = useTeacher()

    const logout = () => {
        setToken('')
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">

                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center">
                        <img src={assets.Logo2} className="mr-3 h-12" alt="Logo" />
                    </Link>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center lg:order-2">

                        {/* TOKEN CHECK */}
                        {token && userData ? (
                            <div className="flex items-center gap-2 cursor-pointer group relative">

                                <img className="w-8 rounded-full" src={userData.image} alt="" />
                                <img className="w-2.5" src={assets.Dropdown} alt="" />

                                {/* DROPDOWN */}
                                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">

                                    <div className="w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">

                                        <p onClick={() => navigate("/profile")} className="hover:text-black cursor-pointer">
                                            My Profile
                                        </p>

                                        <p onClick={() => navigate("/appointments")} className="hover:text-black cursor-pointer">
                                            Appointments
                                        </p>

                                        <p onClick={logout} className="hover:text-black cursor-pointer">
                                            Logout
                                        </p>

                                    </div>

                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                            >
                                Create Account
                            </button>
                        )}

                        {/* MOBILE MENU ICON */}
                        <img
                            onClick={() => setShowIcon(true)}
                            src={assets.MenuIcon}
                            alt=""
                            className="w-8 h-8 cursor-pointer lg:hidden"
                        />

                        {/* MOBILE MENU */}
                        <div className={`${showIcon ? "fixed w-full" : "h-0 w-0"} lg:hidden top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>

                            <div className="flex items-center justify-between px-5 py-6">
                                <img className="w-36" src={assets.Logo2} alt="" />
                                <img
                                    className="w-7"
                                    onClick={() => setShowIcon(false)}
                                    src={assets.cross}
                                    alt=""
                                />
                            </div>

                            <ul className="flex flex-col items-center justify-center h-[70vh] gap-6 text-lg font-medium">

                                <NavLink onClick={() => setShowIcon(false)} to="/"
                                    className={({ isActive }) =>
                                        `${isActive ? "text-orange-700" : "text-gray-700"}`
                                    }
                                >
                                    Home
                                </NavLink>

                                <NavLink onClick={() => setShowIcon(false)} to="/allprofessors"
                                    className={({ isActive }) =>
                                        `${isActive ? "text-orange-700" : "text-gray-700"}`
                                    }
                                >
                                    All Professors
                                </NavLink>

                                <NavLink onClick={() => setShowIcon(false)} to="/about"
                                    className={({ isActive }) =>
                                        `${isActive ? "text-orange-700" : "text-gray-700"}`
                                    }
                                >
                                    About
                                </NavLink>

                            </ul>

                        </div>

                    </div>

                    {/* DESKTOP MENU */}
                    <div className="hidden lg:flex lg:order-1">

                        <ul className="flex gap-8 font-medium">

                            <NavLink to="/" className={({ isActive }) =>
                                isActive ? "text-orange-700" : "text-gray-700"
                            }>
                                Home
                            </NavLink>

                            <NavLink to="/about" className={({ isActive }) =>
                                isActive ? "text-orange-700" : "text-gray-700"
                            }>
                                About
                            </NavLink>

                            <NavLink to="/allprofessors" className={({ isActive }) =>
                                isActive ? "text-orange-700" : "text-gray-700"
                            }>
                                All Professors
                            </NavLink>

                        </ul>

                    </div>

                </div>

            </nav>
        </header>
    )
}