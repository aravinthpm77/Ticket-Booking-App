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
      
      <div className="flex items-center bg-slate-100 p-7 rounded-s-full pl-3 lg:pl-5  flex-grow ml-1 border-r border-gray-300">
        <img width="20" height="20" src="https://img.icons8.com/small/50/bus.png" alt="bus" className=''/>
        <input
          type="text"
          placeholder="From Station"
          className="w-full border-none outline-none text-gray-700 bg-transparent placeholder-gray-800 placeholder:text-sm lg:placeholder:text-lg placeholder:font-thin placeholder:pl-2"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>

      {/* Reverse Button */}
      <button
        className="bg-white border border-gray-300 w-12 h-12 justify-center items-center align-middle p-3 rounded-full absolute ml-[105px] md:ml-[175px] lg:ml-[280px] hover:bg-slate-200 duration-300"
        onClick={reverseCities}
      >
       <div className='scale-110'> <img width="20" height="20" src="https://img.icons8.com/material-sharp/24/sorting-arrows-horizontal.png" alt="sorting-arrows-horizontal"/></div>
      </button>

      {/* To Field */}
      <div className="flex items-center  bg-slate-100 p-7  pl-8 flex-grow border-r border-gray-300">
      <img width="20" height="20" src="https://img.icons8.com/small/50/bus.png" alt="bus" className=''/>
        <input
          type="text"
          placeholder="To Station"
          className="w-full border-none outline-none text-gray-700   bg-transparent placeholder-gray-800 placeholder:font-thin placeholder:pl-2"
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
        className="w-full  px-4 py-2  focus:outline-none bg-transparent caret-transparent  cursor-pointer placeholder:text-slate-950"
        placeholderText="Date">

        </DatePicker>
      
      </div>

    
      <button className="bg-gray-500 text-white font-semibold rounded-r-full p-7 hover:bg-gray-600 duration-300">
        SEARCH
      </button>
    </div>
  );
};

export default BusSearch;
