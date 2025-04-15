"use client"

import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Responsive Navigation links 
  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
    { path: "/todos", label: "Todos" },
    { path: "/faq", label: "FAQ" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md py-3" : "py-5"
      }`}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center">
          {/* Home Logo */}
          <NavLink to="/home" className="text-xl font-bold text-gray-800 flex items-center">
            <svg
              className="w-8 h-8 mr-3 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            CompanyName
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Map through navigation links for desktop */}
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-base text-gray-600 hover:text-primary transition-colors relative pb-2 px-3 ${isActive ? "text-primary" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                  </>
                )}
              </NavLink>
            ))}

            {/* Auth buttons for desktop */}
            <div className="flex items-center space-x-4">
              <NavLink to="/login" className="text-base text-primary hover:text-primary/80 transition-colors px-3 py-2">
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="text-base bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md transition-colors"
              >
                Sign Up
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                  isOpen ? "rotate-45 top-2" : "rotate-0 top-0"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                  isOpen ? "w-0 opacity-0 left-1/2" : "w-6 opacity-100 top-2"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 top-2" : "rotate-0 top-4"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu ,  all links are included here */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100 mt-5" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col space-y-4 py-5">
            {/* Map through navigation links for mobile */}
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-base text-gray-600 hover:text-primary transition-colors px-4 py-3 ${
                    isActive ? "text-primary border-l-4 border-primary pl-3" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Auth links for mobile */}
            <NavLink
              to="/login"
              className="text-base bg-green-600 text-white px-5 py-3 rounded-md hover:bg-green-700 transition-colors mx-4 my-2"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="text-base bg-green-600 text-white px-5 py-3 rounded-md hover:bg-green-700 transition-colors mx-4 my-2"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
