import { motion } from "framer-motion";
import React from "react";

const TicketCard = ({items}) => {
  return (
    <div>
          {items.map((item) => (
            <div
              className="flex flex-col w-full px-8 py-6 space-y-2 transition-all duration-300 ease-in-out border border-b-0 rounded-2xl border-zinc-300 "
              style={{
                background:
                  "linear-gradient(180deg, var(--zinc-200), var(--zinc-100))"
              }}
              key={item.id}
            >
                <div className="flex justify-between">
                  <div className="grid grid-cols">
                    <span className="relative z-20 text-sm leading-[1.6] text-gray-900 font-semibold">
                      {item.TravelsName}
                    </span>
                    <span className="relative z-20 text-xs leading-[1.6] text-gray-800/70 font-normal">
                      {item.type}
                    </span>
                  </div>

                  
                    <div className="flex mt-2">
                        <span className="flex flex-row gap-2 z-20 text-xs leading-[1.6] text-gray-800/50 font-normal">
                            {item.facility?.map((items, key) => (
                            <p key={key}>{items} </p>
                            ))}
                        </span>
                    </div>
                    
                    
                    
                </div>

                  
                  
                  
                <div className="flex items-center justify-between w-full px-4 gap-x-5">

                    <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-950 font-bold">
                      {item.from}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-800/70 font-normal">
                      {item.fromtime}
                    </span>
                  </span>

                    <div className="flex-1 mt-1 border border-dashed border-neutral-500"></div>

                    <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-950 font-bold">
                      {item.to}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-800/70 font-normal">
                      {item.totime}
                    </span>
                  </span>
                </div>
                  
                

                <div className="flex justify-between">
                    <button className="w-full h-12 mt-2 text-white duration-300 ease-in-out bg-gray-700 rounded-md md:w-fit md:px-5 md:py-2 hover:bg-gray-800 backdrop-blur-2xl">
                        View Seats
                    </button>
                    <div className="flex flex-row items-center justify-center gap-5">
                        <span className=" z-20 text-sm leading-[1.6] text-gray-800/70 font-normal">
                        Starts from 
                        </span>
                        <p className="w-full h-10 mt-2 text-sm leading-[1.6] text-white duration-300 ease-in-out bg-gray-700 rounded-md md:w-fit md:px-5 md:py-2 hover:bg-gray-800 backdrop-blur-2xl">INR {item.price}</p>
                    </div>
                </div>

              
            </div>
          ))}
        
      </div>
  )
}

export default TicketCard