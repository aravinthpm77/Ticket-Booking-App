import React from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "../../../components/ui/AuroraBg/aurora-background";
const Hero =() =>{
    const varients ={
        hidden:{opacity :0 ,y:-800},
        visible:{opacity:1,y:0}

    };
    return(
        <motion.div>
            <AuroraBackground>
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
                    <div className="text-3xl md:text-7xl font-bold text-slate-300 dark:text-white text-center">
                    Now, Get more than just 
                    </div>
                    <div className="font-extralight text-base md:text-5xl text-slate-500 dark:text-neutral-200 py-4">
                    bus tickets with us!
                    </div>
                    <button className="bg-slate-100/5 hover:bg-slate-100/10 duration-300 backdrop-blur-2xl  rounded-full w-fit text-white hover:text-slate-300 px-4 py-2">
                    Book Now
                    </button>
                </motion.div>
            </AuroraBackground>
        </motion.div>
    )
}
export default Hero;