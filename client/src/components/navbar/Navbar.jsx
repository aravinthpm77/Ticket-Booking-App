import { Link } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/clerk-react";
import {UserButton} from "@clerk/clerk-react";
const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const { user } = useUser(); // <-- Add this

  const navItems = [
    { label: "Home", link: "/" },
    { label: "Book Now", link: "/bus-ticket" },
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
      <div className="flex items-center justify-between w-full h-full">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-bold duration-200 text-white/90 hover:text-white"
        >
          GoBus
        </Link>

        {/* Mobile Hamburger Menu */}
        <div
          className="flex items-center justify-center scale-125 cursor-pointer w-fit md:hidden text-neutral-100"
          onClick={handleOpen}
        >
          {open ? <FaXmark /> : <FaBars />}
        </div>

        {/* Navbar Links */}
        <div
          className={`${
            open
              ? "grid grid-rows place-items-center bg-neutral-900 absolute right-0 mt-12 top-14 w-72 md:gap-20 gap-4 h-auto justify-center py-5 transition-all duration-300"
              : "hidden md:flex flex-col md:flex-row"
          } 
           md:gap-14 gap-8 md:items-center items-start  md:p-0  sm:p-4 rounded-b-3xl`}
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
                  className="items-center justify-center align-middle transition-transform duration-300 ease-in-out hover:text-slate-200/90"
                  onClick={handleClose} 
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Sign-In / Logout Button and Operator Dashboard */}
          <div className="flex items-center justify-center gap-x-2">
            <SignedOut>
              <Link
                to="login"
                className="w-full px-6 py-3 text-center text-white duration-300 ease-in-out rounded-full md:w-fit md:px-5 md:py-2 bg-slate-200/20 hover:bg-slate-200/30 backdrop-blur-2xl hover:text-slate-100"
              >
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              {/* Show Operator Dashboard link if user is operator */}
              {user?.unsafeMetadata?.role === "operator" && (
                <Link
                  to="/operator/dashboard"
                  className="w-full px-6 py-3 text-center text-white duration-300 ease-in-out bg-green-600 rounded-full md:w-fit md:px-5 md:py-2 hover:bg-green-700 backdrop-blur-2xl hover:text-white"
                >
                  Dashboard
                </Link>
              )}
              <SignOutButton
                className="w-full px-6 py-3 text-center text-white duration-300 ease-in-out bg-red-600 rounded-full cursor-pointer md:w-fit md:px-5 md:py-2 hover:bg-red-700 backdrop-blur-2xl hover:text-white"
                redirectUrl="/"
              />
              {/* User Profile button/modal */}
              <div className="ml-2">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
