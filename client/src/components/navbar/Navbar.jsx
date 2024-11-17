/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", link: "/" },
    { label: "Book Now", link: "/book" },
    { label: "About", link: "/about" },
  ];

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > scrollPosition && currentScrollPosition > 50) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }

      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    
    <nav
      className={`w-full h-[10ch] fixed top-0 left-0 lg:px-24 md:px-16 sm:px-7 px-4 backdrop-blur-xl transition-transform ease-in-out duration-300 z-50
        ${isVisible ? "translate-y-0" : "-translate-y-full"} 
         bg-neutral-900 lg:bg-neutral-900/80`}
    >
      <div className="w-full h-full flex items-center  justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl text-white/90 hover:text-white duration-200 font-bold"
        >
          GoBus
        </Link>

        {/* Mobile Hamburger Menu */}
        <div
          className="w-fit md:hidden flex items-center scale-125 justify-center cursor-pointer text-neutral-100"
          onClick={handleOpen}
        >
          {open ? <FaXmark /> : <FaBars />}
        </div>

        {/* Navbar Links */}
        <div
          className={`${ 
            open 
              ? "  grid grid-rows place-items-center bg-neutral-900 absolute right-0 mt-12 top-14 w-72 md:gap-20 gap-4 h-auto justify-center py-5 transition-all duration-300"
              : "hidden md:flex flex-col md:flex-row"
          } 
           md:gap-14 gap-8 md:items-center items-start  md:p-0  sm:p-4 rounded-b-3xl `}
        >
          <ul
            className={`${
              open ? "grid grid-rows place-items-center" : "flex flex-wrap"
            } list-none md:items-center items-start bg-transparent  md:gap-20 gap-4 text-lg text-neutral-100 font-normal`}
          >
            {navItems.map((item, ind) => (
              <li key={ind}>
                <Link
                  to={item.link}
                  className="hover:text-slate-200/90 align-middle items-center justify-center ease-in-out duration-300 transition-transform"
                  onClick={handleClose} 
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Sign-In Button */}
          <div className="flex items-center justify-center">
            <button
              className={`md:w-fit w-full md:px-5 px-6 md:py-2 py-3 bg-slate-200/20 hover:bg-slate-200/30 backdrop-blur-2xl rounded-full text-white hover:text-slate-100 ease-in-out duration-300`}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
