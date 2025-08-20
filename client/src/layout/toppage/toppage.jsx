import React from 'react'
import {motion} from 'framer-motion'

import RootLayout from '../RootLayout';

const toppage = ({bgImg, title , className}) => {
    const variants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
        className={`w-full h-[40vh] bg-cover bg-no-repeat bg-center relative items-center justify-center ${className}`}
        style={{ backgroundImage: `url(${bgImg})` }}
        initial="hidden"
        exit="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 , ease: "easeInOut" }}

    >
        <div className="absolute bottom-0 z-10 w-full h-24 bg-gradient-to-b from-transparent to-white"></div>

        <RootLayout className="absolute top-0 left-0 w-full h-full pb-10 pt-[9ch] bg-gradient-to-b from-neutral-900
         via-neutral-800/60 to-neutral-500/50 flex items-center justify-end flex-col gap-3">
            <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -800 }}
            transition={{
            duration: 1.8,
            ease: "easeOut",
            }}
            className="relative flex flex-col items-center justify-center gap-4 px-40"
            >
            <h2 className="-mt-40 text-4xl font-bold text-center md:text-6xl text-slate-200/90 dark:text-white" > {title} </h2>               
            </motion.div>
        </RootLayout>
    </motion.div>
  )
}

export default toppage