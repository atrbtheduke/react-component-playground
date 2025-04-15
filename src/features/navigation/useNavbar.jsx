"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const useNavbar = () => {
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
  return {
    isOpen,
    scrolled,
    toggleMenu,
  }
}

export default useNavbar

