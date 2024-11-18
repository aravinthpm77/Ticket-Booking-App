import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import React, { useEffect, useState } from "react";

export const MovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };

  // Variants for the scroll animation
  const scrollVariants = {
    hidden: { opacity: 0, y: -50 }, // Initial state: hidden and slightly up
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } // Animated state: visible and in place
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={scrollVariants}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <motion.li
              className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-zinc-300 px-8 py-6 md:w-[450px]"
              style={{
                background:
                  "linear-gradient(180deg, var(--zinc-200), var(--zinc-100))"
              }}
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <blockquote>
                <div className="flex justify-between">
                  <div className="grid grid-cols">
                    <span className="relative z-20 text-sm leading-[1.6] text-gray-900 font-semibold">
                      {item.TravelsName}
                    </span>
                    <span className="relative z-20 text-xs leading-[1.6] text-gray-800/70 font-normal">
                      {item.type}
                    </span>
                  </div>
                  <div className="grid grid-cols">
                    <span className="relative z-20 text-sm leading-[1.6] text-gray-800/70 font-normal">
                      Starts from<br /> <p className="text-gray-800 font-bold">INR {item.price}</p>
                    </span>
                  </div>
                </div>

                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-950 font-bold">
                      {item.from}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-800/70 font-normal">
                      {item.fromtime}
                    </span>
                  </span>
                  <span className="flex flex-col gap-1 px-3">
                    <span className="text-sm leading-[1.6] text-gray-800/70 font-normal">
                      <p>
                        - - - - - {item.fulltime} Hr 00 Min - - - - - -
                      </p>
                    </span>
                  </span>

                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-950 font-bold">
                      {item.to}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-800/70 font-normal">
                      {item.totime}
                    </span>
                  </span>
                </div>

                <div className="flex mt-2">
                  <span className="flex flex-row gap-2 z-20 text-xs leading-[1.6] text-gray-800/50 font-normal">
                    {item.facility?.map((items, key) => (
                      <p key={key}>{items} </p>
                    ))}
                  </span>
                </div>
                <button className="md:w-fit mt-2 w-full md:px-5 md:py-2 bg-gray-700 hover:bg-gray-800 backdrop-blur-2xl rounded-md text-white ease-in-out duration-300">
                  View Seats
                </button>
              </blockquote>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};
