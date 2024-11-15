/* eslint-disable jsx-a11y/img-redundant-alt */
import React,{useRef} from "react";
import { motion ,useScroll, useTransform } from "framer-motion";
import { AuroraBackground } from "../../../components/ui/AuroraBg/aurora-background";
import SearchBox from "./searchbox";
import { WobbleCard } from "../../../components/ui/Wobble-card/wobble-card";
import img1 from '../../../assets/1.jpg'
import img2 from '../../../assets/2.jpg'
const Hero =() =>{
    
        const  containerRef = useRef(null);
      
        const { scrollYProgress } = useScroll({
          target: containerRef,
          offset: ["start end", "end start"], 
        });
        const scale = useTransform(scrollYProgress, [0.1, 1], [1.12, 0.85]);
        const borderRadius = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]);
        const yPosition = useTransform(scrollYProgress, [0, 1, 2], [0, 0, -100]); // Vertical parallax effect

    return(
        <motion.div ref={containerRef}>
            <motion.div
            style={{
                scale,
                borderRadius,
                overflow: "hidden" ,
                y: yPosition,
            }}
            transition={{
              type: "spring", // Smooth spring effect
              stiffness: 50, // Adjust for smoothness
              damping: 20, // Adjust for slowing down
            }}
            className="w-full h-full flex items-center justify-center" 
            >
            <AuroraBackground 
        >
            <motion.div
          style={{
            scale,
            // Apply scaling effect to AuroraBackground
          }}>
            
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                    <div className="text-3xl md:text-7xl font-bold text-slate-300 mt-6 dark:text-white text-center">
                    Now, Get more than just 
                    </div>
                    <div className="font-extralight text-base md:text-5xl text-slate-500 dark:text-neutral-200 py-4">
                    bus tickets with us! 
                    </div>
                    
                    <SearchBox/>


                    <div className=" lg:grid grid-rows-1 lg:grid-cols-3 gap-4 hidden ">
                    <WobbleCard
                        containerClassName="col-span-3 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
                        className=""
                    >
                        <div className="max-w-xs">
                        <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Comfortable journeys, just a click away
                        </h2>
                        <p className="mt-4 text-left  text-base/6 text-neutral-200">
                        Your next destination is closer than you think.
                        Get your seat and travel with ease!
                        </p>
                        </div>
                        
                        <img
                        src={img1}
                        width={500}
                        height={500}
                        alt="linear demo image"
                        className="absolute -right-4 lg:-right-[0%] grayscale filter -bottom-10 object-contain rounded-2xl"
                        />
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                        <h2 className="max-w-96  text-left z-10 text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Skip the lines secure your spot online!
                        </h2>
                        <p className="mt-4 max-w-[26rem] z-10 text-left w-3/5  text-base/6 text-neutral-200">
                        Find the best route for your next trip.
                        Sit back, relax, and enjoy the journey!
                        </p>
                        <img
                        src={img2}
                        width={500}
                        height={500}
                        alt="linear demo image"
                        className="absolute -right-4 -z-10  lg:-right-[65%] lg:-top-[100%] grayscale filter -bottom-20 object-contain rounded-2xl"
                        />
                    </WobbleCard>
                    
                    </div>
                </motion.div>
                </motion.div>
            </AuroraBackground>
            </motion.div>
        </motion.div>
    )
}
export default Hero;