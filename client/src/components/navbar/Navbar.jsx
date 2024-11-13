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
    <nav className={`w-full h-[8ch] fixed top-0 left-0 lg:px-24 md:px-16 sm:px-7 px-4 backdrop-blur-lg transition-transform duration-300 z-50 
    ${isVisible < 50  ? "transalte-y-0 " : "-translate-y-full"} 
    ${scrollPosition > 150 ? "bg-neutral-500/10 ":"bg-neutral-100/10"} 
    `}
    > 


        <div className="w-full h-full flex items-center justify-between">

            <Link to='/' className="text-4xl text-red-600 font-bold">
                Bus
            </Link>
            <div className="w-fit md:hidden flex items-center scale-125 justify-center cursor-pointer flex-col gap-1 text-neutral-700" onClick={handleOpen}>
                {
                    open? <FaXmark/>: <FaBars/>
                }
            </div>
            <div className={`${open ? "flex absolute mt-2 top-14 left-0 w-full h-auto md:relative bg-neutral-500/10 " : "hidden top-0" } flex-1 md:flex flex-col md:flex-row md:gap-14 gap-8 md:items-center items-start md:p-0 sm:p-4  justify-end md:bg-transparent  md:shadow-none sm:shadow-md shadow-md rounded-xl`}>
                <ul className="list-none flex md:items-center items-start flex-wrap md:gap-8 gap-4 text-lg text-neutral-500 font-normal" >
                    
                    {navItems.map((item,ind) => (
                        
                        <li key={ind}>
                            <Link to={item.link} className="hover:text-red-500 ease-in-out duration-300 transition-transform">
                                {item.label}
                            </Link>
                        </li>      
                    ))}
                </ul>

                <div className="flex items-center justify-center">
                    <button className="md:w-fit w-full md:px-4 px-6 md:py-1 py-2 5 bg-red-500 border border-red-500 hover:border-red-400 md:rounded-full rounded-xl text-base font-normal text-neutral-50 hover:text-red-500 ease-in-out duration-300">
                        Sign In
                    </button>
                </div>

            </div>
        </div>
    </nav>
  )
}

export default Navbar