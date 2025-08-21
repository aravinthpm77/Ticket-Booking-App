import React, { useState } from 'react'
import { FaX } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'

const WarningMessage = ({ message }) => {
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
                    className="relative flex items-center justify-center w-full p-4 text-sm text-yellow-600 bg-yellow-100 rounded-xl"
                    role="alert"
                >
                    <span className="mx-auto">{message}</span>
                    <button
                        onClick={handleClose}
                        className="absolute text-red-600 -translate-y-1/2 right-4 top-1/2 hover:text-red-800"
                        aria-label="Close"
                    >
                        <FaX className="w-3 h-3" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default WarningMessage