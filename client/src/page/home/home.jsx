import React from "react"
import Hero from "./hero/hero"
import { Service } from "./service/service"
import { MovingCard } from "./cards/movingcards"
import Footer from "../../components/footer/footer"
const Home=()=> {
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col">
        <div className="space-y-16 w-full min-h-screen pb-16 ">
          
          <Hero/>
          <Service/>
          <MovingCard/>
          <Footer/>
        </div>
        
    </div>

  )
}

export default Home