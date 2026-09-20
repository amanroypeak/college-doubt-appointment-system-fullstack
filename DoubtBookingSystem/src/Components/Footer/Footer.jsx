import { Link } from "react-router-dom"
import { assets } from "../../assets/Use"

export default function Footer() {

    return (

        <footer className="bg-white border-y">

            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">

                <div className="md:flex md:justify-between">

                    {/* LEFT SECTION */}

                    <div className="mb-6 md:mb-0">

                        <div className="flex items-center gap-4">

                            {/* DoubtApp Logo */}

                            <Link to="/" className="flex items-center">

                                <img
                                    src={assets.Logo2}
                                    className="mr-3 h-16"
                                    alt="Logo"
                                />

                            </Link>


                            {/* Admin / Professor Login */}

                            <a
                                href="http://localhost:5174"
                                className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition"
                            >
                                Admin / Professor Login
                            </a>

                        </div>


                        {/* Description */}

                        <p className="text-gray-600 mt-4 max-w-2xl">
                            Doubt App helps students easily schedule sessions with teachers,
                            manage doubts efficiently, track bookings, receive timely support,
                            improve learning experience, and organize academic queries in a
                            simple, user-friendly digital platform.
                        </p>

                    </div>


                    {/* RIGHT SECTION */}

                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">

                        {/* RESOURCES */}

                        <div>

                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                Resources
                            </h2>

                            <ul className="text-gray-500 font-medium">

                                <li className="mb-4">

                                    <Link
                                        to="/"
                                        className="hover:underline"
                                    >
                                        Home
                                    </Link>

                                </li>

                                <li>

                                    <Link
                                        to="/about"
                                        className="hover:underline"
                                    >
                                        About
                                    </Link>

                                </li>

                            </ul>

                        </div>


                        {/* FOLLOW US */}

                        <div>

                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                Follow us
                            </h2>

                            <ul className="text-gray-500 font-medium">

                                <li className="mb-4">

                                    <a
                                        href="https://github.com/amanroypeak"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>

                                </li>

                                <li>

                                    <a
                                        href="https://www.linkedin.com/in/aman-roy-46a13a368/"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LinkedIn
                                    </a>

                                </li>

                            </ul>

                        </div>

                    </div>

                </div>


                {/* LINE */}

                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />


                <div className="sm:flex sm:items-center sm:justify-between">

                </div>

            </div>

        </footer>

    )
}
