import React, { useState } from 'react'
import { FaX } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'

const ErrorMessage = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = () => {
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                    }}
                    className="absolute right-0 z-50 flex items-center justify-center gap-10 p-4 -my-20 text-sm text-red-600 bg-red-400 shadow-lg mx-80 w-fit rounded-xl"
                    role="alert"
                >
                    <span className="mx-auto">{message}</span>
                    <button
                        onClick={handleClose}
                        className="text-red-600 right-4 hover:text-red-800"
                        aria-label="Close"
                    >
                        <FaX className="w-3 h-3" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
export default ErrorMessage