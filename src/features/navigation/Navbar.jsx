"use client"

import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Add shadow on scroll
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

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "py-4"
      }`}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/home" className="text-xl font-bold text-gray-800 flex items-center">
            <svg
              className="w-8 h-8 mr-2 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            FitLife Oasis
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors relative pb-1 ${isActive ? "text-primary" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                </>
              )}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors relative pb-1 ${isActive ? "text-primary" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                </>
              )}
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors relative pb-1 ${isActive ? "text-primary" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  Services
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                </>
              )}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors relative pb-1 ${isActive ? "text-primary" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  Contact
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                </>
              )}
            </NavLink>
            <NavLink
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Login
            </NavLink>
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

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col space-y-4 py-4">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors px-2 py-1 ${
                  isActive ? "text-primary border-l-4 border-primary pl-1" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors px-2 py-1 ${
                  isActive ? "text-primary border-l-4 border-primary pl-1" : ""
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors px-2 py-1 ${
                  isActive ? "text-primary border-l-4 border-primary pl-1" : ""
                }`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors px-2 py-1 ${
                  isActive ? "text-primary border-l-4 border-primary pl-1" : ""
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors w-full text-center"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

