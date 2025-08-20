import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const BusSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);

  const reverseCities = () => {
    setFrom(to);
    setTo(from);
  };
  const handleChange = (date) => {
    setDate(date); // Update startDate when a new date is selected
  };

  return (
    <div className="flex items-center  rounded-full w-[450px] md:w-[600px] lg:w-[1000px] mx-auto ">
      
      <div className="flex items-center flex-grow pl-3 ml-1 border-r border-gray-300 bg-slate-100 p-7 rounded-s-full lg:pl-5">
        <img width="20" height="20" src="https://img.icons8.com/small/50/bus.png" alt="bus" className=''/>
        <input
          type="text"
          placeholder="From Station"
          className="w-full text-gray-700 placeholder-gray-800 bg-transparent border-none outline-none placeholder:text-sm lg:placeholder:text-lg placeholder:font-thin placeholder:pl-2"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>

      {/* Reverse Button */}
      <button
        className="bg-white border border-gray-300 w-12 h-12 justify-center items-center align-middle p-3 rounded-full absolute ml-[95px] md:ml-[175px] lg:ml-[270px] hover:bg-slate-200 duration-300"
        onClick={reverseCities}
      >
       <div className='scale-110'> <img width="20" height="20" src="https://img.icons8.com/material-sharp/24/sorting-arrows-horizontal.png" alt="sorting-arrows-horizontal"/></div>
      </button>

      {/* To Field */}
      <div className="flex items-center flex-grow pl-8 border-r border-gray-300 bg-slate-100 p-7">
      <img width="20" height="20" src="https://img.icons8.com/small/50/bus.png" alt="bus" className=''/>
        <input
          type="text"
          placeholder="To Station"
          className="w-full text-gray-700 placeholder-gray-800 bg-transparent border-none outline-none placeholder:font-thin placeholder:pl-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      {/* Date Field */}
      <div className="flex items-center bg-slate-100 p-5 lg:w-max w-[100px] cursor-pointer ">
      <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/50/calendar--v1.png" alt="calendar--v1"/>
        
        <DatePicker
        selected={date}
        onChange={handleChange}
        dateFormat="d MMM yyyy"
        className="w-full px-4 py-2 bg-transparent cursor-pointer focus:outline-none caret-transparent placeholder:text-slate-950"
        placeholderText="Date">

        </DatePicker>
      
      </div>

    
      <button className="font-semibold text-white duration-300 bg-gray-500 rounded-r-full p-7 hover:bg-gray-600">
        SEARCH
      </button>
    </div>
  );
};

export default BusSearch;
