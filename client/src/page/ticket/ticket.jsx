import React from 'react'
import TopLayout from '../../layout/toppage/toppage'
import busimg from '../../assets/bg-bus.jpg'
import { motion } from 'framer-motion'
const Ticket = () => {
  return (
    <div className='w-full pb-12 space-y-12 '>
        <TopLayout 
        bgImg={busimg}
        title={"Reserve your ticket"}
        />
        <div className='sticky top-0 z-30 flex flex-col items-center justify-center w-full py-4 space-y-5 bg-neutral-0'>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -800 }}
            transition={{
            duration: 1.35,
            ease: "easeOut",
            }}
            className="text-3xl font-bold text-center text-neutral-700"
          >
            <h2 className="" > Want to change the route? </h2>               
          </motion.div>
        </div>
         
        <div className="relative grid w-full h-auto grid-cols-4 gap-16" ></div>
    </div>
  )
}

export default Ticket