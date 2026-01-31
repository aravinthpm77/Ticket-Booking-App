import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ErrorMessage = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [countDown, setCountDown] = useState(9);

    useEffect(()=>{
        if(countDown > 0){
            const timer = setTimeout(() => {
                setCountDown(prev=>prev-1);
            },900
        );
        return () => clearTimeout(timer);

        }else{
            setIsVisible(false);
            
        }
    },[countDown]);

    if(!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y: 50 }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                    }}
                    className="fixed z-50 flex items-center justify-center gap-10 p-4 text-sm text-red-100 shadow-lg right-10 top-20 bg-red-500/90 w-fit rounded-xl"
                    role="alert"
                >
                    <span className="mx-auto">{message}</span>
                    <span
                        
                        className="text-white right-4"
                    >
                        {countDown}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
export default ErrorMessage