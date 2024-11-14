/* eslint-disable no-unused-vars */


import { Link } from "react-router-dom"
import {FaBars,FaXmark} from "react-icons/fa6"
import { useEffect, useState } from "react"
const Navbar =()=> {
    
    
    
    const [scrollPosition,setScrollPosition]=useState(0);
    const [isVisible,setIsVisible]=useState(0);
    const [open,setOpen]=useState(0);

    const navItems=[
        {label:"Home",link:'/'},
        {label:"Service",link:'/service'},
        {label:"Booking",link:'/booking'},
        {label:"About",link:'/about'},

    ]

    const handleOpen = ()=>{
        setOpen(!open)
    }
    const handleClose =()=>{
        setOpen(false)
    }

    useEffect(()=>{
        const handleScroll = () =>{
            const currentScrollState=window.scrollY;

           

            if (currentScrollState > scrollPosition && currentScrollState > 50 ){
                setIsVisible(false);
            }
            
            else{
                setIsVisible(true);
            }

            setScrollPosition(currentScrollState);

        };

        window.addEventListener('scroll',handleScroll);

        return()=> {
            window.removeEventListener('scroll',handleScroll)
        };
        
    },[scrollPosition]);

  return (
    <nav className={`w-full h-[8ch] fixed top-0 left-0 lg:px-24 md:px-16  sm:px-7 px-4 backdrop-blur-2xl  transition-transform duration-300 z-50 
    ${isVisible < 50  ? "transalte-y-0 " : "-translate-y-full"} 
    ${scrollPosition > 150 ? "bg-neutral-500 ":"bg-neutral-100/5"} 
    `}
    > 


        <div className="w-full h-full flex items-center justify-between">

            <Link to='/' className="text-4xl text-white/90 hover:text-white duration-200 font-bold">
            GoBus
            </Link>
            <div className="w-fit md:hidden flex items-center scale-125 justify-center cursor-pointer flex-col gap-1 text-neutral-100" onClick={handleOpen}>
                {
                    open? <FaXmark/>: <FaBars/>
                }
            </div>
            <div className={`${open ? "grid absolute mt-2 top-14 left-0 w-full h-auto md:relative bg-gradient-to-r from-black via-slate-800 to-slate-500 justify-center py-5 backdrop-blur-2xl" : "hidden top-0 justify-end md:bg-transparent" } flex-1 md:flex flex-col md:flex-row md:gap-14 gap-8 md:items-center items-start md:p-0 sm:p-4    md:shadow-none sm:shadow-md shadow-md rounded-b-3xl`}>
                <ul className="list-none flex md:items-center items-start flex-wrap md:gap-8 gap-4 text-lg text-neutral-100 font-normal" >
                    
                    {navItems.map((item,ind) => (
                        
                        <li key={ind}>
                            <Link to={item.link} className="hover:text-slate-200/90  ease-in-out duration-300 transition-transform">
                                {item.label}
                            </Link>
                        </li>      
                    ))}
                </ul>

                <div className="flex items-center justify-center">
                    <button className={`${open? "border-spacing-x-9 border-x-white":""}md:w-fit w-full md:px-5 px-6 md:py-2 py-3 5 bg-slate-800/70 hover:bg-slate-800/90  backdrop-blur-2xl  rounded-full  text-white hover:text-slate-200/90  ease-in-out duration-300`}>
                        Sign In
                    </button>
                </div>

            </div>
        </div>
    </nav>
  )
}

export default Navbar