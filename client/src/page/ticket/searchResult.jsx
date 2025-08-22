import React from 'react'
import TicketCard from '../../components/ticket/ticketcard'

const SearchResult = () => {
  return (
    <div className='w-full col-span-3 space-y-10 pt-11'>
        <div className="space-y-6 ">
            <TicketCard items={[{   id:1,
                                    from: "Hosur",
                                    to:"Chennai",
                                    fromtime:23.45,
                                    totime:5.45,
                                    fulltime:6.00,
                                    AvailableSeats: 10,
                                    totalSeats: 40,
                                    price:"850",
                                    TravelsName:"KMRL Travels",
                                    type:"NON AC Seater",
                                    facility:['Tracking','Bed Sheet','Water Bottle','Pillow','Reading Lamp','CCTV']
                                },{   id:2,
                                    from: "Hosur",
                                    to:"Chennai",
                                    fromtime:23.45,
                                    totime:5.45,
                                    fulltime:6.00,
                                    AvailableSeats: 10,
                                    totalSeats: 40,
                                    price:"850",
                                    TravelsName:"KMRL Travels",
                                    type:"NON AC Seater",
                                    facility:['Tracking','Bed Sheet','Water Bottle','Pillow','Reading Lamp','CCTV']
                                }]}  />
        </div>
    </div>
  )
}

export default SearchResult