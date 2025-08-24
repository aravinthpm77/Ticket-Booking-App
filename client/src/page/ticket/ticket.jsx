import React from 'react'
import TopLayout from '../../layout/toppage/toppage'
import busimg from '../../assets/bg-bus.jpg'
import { motion } from 'framer-motion'
import BusSearch from '../home/hero/searchbox'
import Filter from './filter/filter'
import SearchResult from './searchResult'
const Ticket = () => {
  return (
    <div className='w-full pb-12 space-y-12 '>
        <TopLayout 
        bgImg={busimg}
        title={"Reserve your ticket"}
        className={'z-0'}
        />
        <div className='sticky top-0 z-0 flex flex-col items-center justify-center w-full space-y-5 bg-neutral-0'>
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
            <h2 className="" > Want to book the route? </h2>   
                   
          </motion.div>
          <BusSearch className="z-50" />     
        </div>

        <div className="absolute grid -z-10 h-auto grid-cols-4 gap-16 px-[clamp(1rem,5vw,4rem)]">
          <div className="col-span-1">
            <Filter/>
          </div>
          <SearchResult className="col-span-3" />
        </div>
    </div>
  )
}

export default Ticket