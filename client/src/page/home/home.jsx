import React from "react"
const Home=()=> {
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col">
        <div className="w-full h-screen flex items-center justify-center ">
            <h1 className="text-5xl text-neutral-900 font-bold">This is Home Section.</h1>
        </div>
        {/*About Sections*/}
        <div className="w-full h-screen flex items-center justify-center bg-neutral-950 text-white">
            <h1 className="text-5xl  font-bold">This is About Section.</h1>
        </div>
        
    </div>

  )
}

export default Home