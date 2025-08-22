import React, { useEffect, useState } from 'react'
import { PiSteeringWheelBold } from 'react-icons/pi'
import busSeatData from '../../../../../constants/busseat/busSeatData'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../../../../components/alertmessage/errormsg/errormessage'

const BusSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [showError, setShowError] = useState(false)

  const handleSeatClick = (seatId) => {
    const selectedSeat = busSeatData.find((seat) => seat.id === seatId)
    const price = selectedSeat ? selectedSeat.price : null
    if (selectedSeat.status === 'booked') return

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((id) => id !== seatId)
      } else {
        if (prevSelectedSeats.length >= 6) {
          setShowError(true)
          return prevSelectedSeats
        } else {
          return [...prevSelectedSeats, seatId]
        }
      }
    })
  }

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [showError])

  const getSeatName = (seat) => {
    if (seat.status === 'booked') {
      return 'text-primary bg-neutral-300 border border-neutral-400 cursor-not-allowed'
    }
    if (selectedSeats.includes(seat.id)) {
      return 'text-yellow-600 border bg-yellow-200/60 border-yellow-600 cursor-pointer'
    }
    return 'bg-white hover:bg-neutral-50 cursor-pointer'
  }

  

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-5 md:gap-10">
      {/* Seat layout */}
      <div className="flex items-center justify-center w-full col-span-1 p-2 border shadow-sm md:col-span-3 md:p-4 rounded-xl border-neutral-200">
        <div className="w-full space-y-5 md:space-y-7">
          <p className="text-base font-medium text-center text-neutral-600">
            Click on the available seat to reserve your seat.
          </p>

          {/* Rotate the seat layout on mobile */}
          <div className="items-stretch w-full transform md:flex gap-x-1 md:space-y-5 md:rotate-0">
            <div className="w-8 h-fit md:w-10">
              <PiSteeringWheelBold className="mt-4 text-2xl -rotate-90 md:text-3xl md:mt-7 text-neutral-700" size={35}/>
            </div>
            <div className="flex flex-col items-center pl-3 border-l-2 border-dashed border-neutral-300 md:pl-7">
              {/* Add rotation for mobile */}
              <div className="flex-1 space-y-3 origin-bottom-left ">
                {/* First Row */}
                <div className="grid w-full h-auto grid-cols-9 gap-x-5">
                  {busSeatData.slice(0, 9).map((seat) => (
                    <div
                      key={seat.id}
                      className={`w-12 h-12 border border-neutral-300 rounded-md flex items-center justify-center ${getSeatName(seat)}`}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <h6 className="text-base font-bold text-neutral-500">{seat.id}</h6>
                    </div>
                  ))}
                </div>
                {/* Second Row */}
                <div className="grid w-full h-auto grid-cols-9 gap-x-5">
                  {busSeatData.slice(9, 18).map((seat) => (
                    <div
                      key={seat.id}
                      className={`w-12 h-12 border border-neutral-300 rounded-md flex items-center justify-center ${getSeatName(seat)}`}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <h6 className="text-base font-bold text-neutral-500">{seat.id}</h6>
                    </div>
                  ))}
                </div>
                {/* Third Row (empty) */}
                <div className="grid w-full h-auto grid-cols-9 gap-x-5"></div>
                {/* Fourth Row */}
                <div className="grid w-full h-auto grid-cols-9 gap-x-5">
                  {busSeatData.slice(18, 27).map((seat) => (
                    <div
                      key={seat.id}
                      className={`w-12 h-12 border border-neutral-300 rounded-md flex items-center justify-center ${getSeatName(seat)}`}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <h6 className="text-base font-bold text-neutral-500">{seat.id}</h6>
                    </div>
                  ))}
                </div>
                {/* Fifth Row */}
                <div className="grid w-full h-auto grid-cols-9 gap-x-5">
                  {busSeatData.slice(27, 36).map((seat) => (
                    <div
                      key={seat.id}
                      className={`w-12 h-12 border border-neutral-300 rounded-md flex items-center justify-center ${getSeatName(seat)}`}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <h6 className="text-base font-bold text-neutral-500">{seat.id}</h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Info */}
          <div className="flex items-center justify-center w-full gap-4 pt-3 border-t md:gap-6 md:pt-5 border-neutral-200">
            <div className="flex items-center gap-x-2">
              <div className="w-5 h-5 bg-white border rounded-md border-neutral-300"></div>
              <p className="text-sm font-medium text-neutral-600">Available</p>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-5 h-5 border rounded-md bg-neutral-300 border-neutral-300"></div>
              <p className="text-sm font-medium text-neutral-600">Unavailable</p>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-5 h-5 border border-yellow-500 rounded-md bg-yellow-200/80"></div>
              <p className="text-sm font-medium text-neutral-600">Selected</p>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-5 h-5 bg-white border rounded-md border-neutral-300"></div>
              <p className="text-sm font-medium text-neutral-600">Ticket Price: ₹{busSeatData[2]?.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Selection Action */}
      <div className="items-center justify-center w-full col-span-1 px-2 py-2 space-y-3 border shadow-sm md:col-span-2 md:px-6 md:py-4 md:space-y-5 border-neutral-200 rounded-xl bg-neutral-50">
        
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between w-full">
            <h1 className='text-lg font-medium text-neutral-600'>Your Destination</h1>
            <Link to={"/bus-ticket"} className='text-sm font-normal text-sky-600'>
            Change Route
            </Link>
          </div>

          <div className="w-full space-y-0.5">
            <div className="flex items-center justify-between w-full gap-x-5">
              <p className="text-sm font-normal text-neutral-400">
                From <span className="text-sm text-neutral-500/70">(Hosur)</span>
              </p>
             
              <p className="text-sm font-normal text-neutral-400">
                To <span className="text-sm text-neutral-500/70">(Chennai)</span>
              </p>
            </div>
            <div className="flex items-center justify-between w-full gap-x-4">
              <p className="text-sm font-normal text-neutral-500">
                Hosur BusStand <span className="text-sm text-neutral-400">(23:45)</span>
              </p>
             <div className="flex-1 border border-dashed border-neutral-300"></div>
              <p className="text-sm font-normal text-neutral-500">
                Koyambedu <span className="text-sm text-neutral-400">(5:45)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-2">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-medium text-neutral-600">Selected Seats</h1>
            <div className="bg-sky-600/20 rounded-lg py-0.5 px-1.5 text-xs text-neutral-500 font-normal uppercase">
              Non Refundable
            </div>
          </div>
          {
            selectedSeats.length > 0 
              ?
              <div className='flex items-center w-full gap-x-3'>
                {
                  selectedSeats.map((seat, index) => (
                    <div key={index} className='flex items-center gap-x-1'>
                      <p className='flex items-center justify-center p-2 text-sm font-normal rounded-lg bg-neutral-200 text-neutral-500'>{seat}</p>
                    </div>
                  ))
                }
              </div>
              :
              <div className='flex items-center w-full gap-x-3'>
                <p className='flex items-center justify-center p-2 text-sm font-normal rounded-lg bg-neutral-200/60 text-neutral-500'>No seats selected</p>
              </div>
          }
        </div>

        <div className="w-full space-y-2">

          <h1 className="text-lg font-medium text-neutral-600">Fare Details</h1>

          <div className="w-full flex items-center justify-between border-dashed border-l-[1.5px] border-neutral-400 pl-2">
            <h3 className="text-sm font-normal text-neutral-500">Base Fare</h3>
            <p className="text-sm font-normal text-neutral-500">₹{busSeatData[2]?.price}</p>
          </div>
          <div className="flex items-center justify-between w-full gap-x-4">
            <div className='grid text-left'>
              <h3 className="text-base font-normal text-neutral-500">Total Price:</h3>
              <span className="text-sm font-normal text-neutral-500/80">(Including All Taxes)</span>
            </div>
            

            {/*Calculating Total Price */}

            <p className='text-sm font-semibold text-neutral-500'>
              ₹{""}
              {selectedSeats.reduce((total,seatId)=>{
                const seat= busSeatData.find(seat => seat.id === seatId);
                return total + (seat ? seat.price : 0);
              }, 0)}
            </p>

          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          {
            selectedSeats.length > 0 
            ?
            <Link to="bus-tickets/checkout" className='w-full bg-sky-700 hover:bg-sky-700/80 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center uppercase rounded-lg  transition'>
              Proceed to Checkout
            </Link>
            :
            <div className='flex flex-col w-full space-y-0.5 items-center justify-center'>
              <button  className='cursor-not-allowed w-full bg-sky-700/70  text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center uppercase rounded-lg  transition'>
              Proceed to Checkout
            </button>
            <small className='px-3 text-sm font-normal text-neutral-500'>Please select a seat to proceed</small>
            </div>
          }
        </div>
        
      </div>
      {showError && <ErrorMessage message={"You can't select more than 6 seats"} />}
    </div>
  )
}

export default BusSeat