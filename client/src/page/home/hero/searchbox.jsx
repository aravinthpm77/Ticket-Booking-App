import React,{ useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { MdDirectionsBus, MdSwapHoriz, MdCalendarToday } from 'react-icons/md';

const BusSearch = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);


  const [dbCities, setDbCities] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  
  useEffect(() => {
    fetch("http://localhost:5000/api/schedules/cities")
      .then(res => res.json())
      .then(data => setDbCities(data))
      .catch(err => console.error("City fetch error:", err));
  }, []);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const reverseCities = () => {
    setFrom(to);
    setTo(from);
  };
  const handleChange = (date) => {
    setDate(date); 
  };

  const handleSearch = () => {
    if (!from || !to || !date) return alert("Select From, To, and Date");
    
    
    const formattedDate = date.toISOString().split('T')[0];
    
   
    navigate(`/bus-ticket?from=${from}&to=${to}&date=${formattedDate}`);
  };

  const clearFromInput = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFrom('');
    setShowFromDropdown(true);
    fromInputRef.current?.focus();
  };

  const clearToInput = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setTo('');
    setShowToDropdown(true);
    toInputRef.current?.focus();
  };


  const filteredFrom = from.trim()
    ? dbCities.filter(c => c.toLowerCase().includes(from.toLowerCase()))
    : dbCities;
  const filteredTo = to.trim()
    ? dbCities.filter(c => c.toLowerCase().includes(to.toLowerCase()))
    : dbCities;

  return (
    <div className="relative mx-auto flex w-full max-w-[450px] flex-col items-stretch rounded-2xl md:max-w-[600px] lg:max-w-[1000px] lg:flex-row lg:items-center lg:rounded-full">
      
      <div ref={fromRef} className="relative flex items-center w-full p-4 border-b border-gray-300 cursor-pointer bg-slate-100 rounded-t-2xl lg:flex-grow lg:border-b-0 lg:border-r lg:p-7 lg:pl-5 lg:rounded-t-none lg:rounded-s-full">
        <div className="relative flex items-center w-full">
        <img width="20" height="20" src="https://img.icons8.com/small/50/bus.png" alt="bus" className='flex-shrink-0 mr-2'/>
        <input
          ref={fromInputRef}
          type="text"
          placeholder="From Station"
          className="w-full pl-2 pr-8 text-gray-700 placeholder-gray-800 bg-transparent border-none outline-none placeholder:text-sm lg:placeholder:text-lg placeholder:font-thin"
          value={from}
          onChange={(e) => { setFrom(e.target.value); setShowFromDropdown(true); }}
          onFocus={() => setShowFromDropdown(true)}
          onClick={() => setShowFromDropdown(true)}
        />
        {from && (
          <button
             type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearFromInput}
            className="absolute text-xl leading-none text-red-500 -translate-y-1/2 right-2 top-1/2 hover:text-red-700"
            aria-label="Clear from station"
          >
            x
          </button>
        )}
        </div>
        {showFromDropdown && (
          <ul className="absolute left-0 z-50 w-full mt-2 overflow-y-auto top-full bg-slate-100 rounded-xl max-h-60">
            {filteredFrom.map(city => (
              <li key={city} className="p-3 pl-5 border-b-2 border-gray-200 cursor-pointer hover:bg-white" 
                  onClick={() => { setFrom(city); setShowFromDropdown(false); }}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Reverse Button */}
      <button
        className="absolute z-[80] hidden h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white p-3 align-middle duration-300 hover:bg-slate-200 lg:flex lg:ml-[270px]"
        onClick={reverseCities}
      >
       <div className='scale-110'> <img width="20" height="20" src="https://img.icons8.com/material-sharp/24/sorting-arrows-horizontal.png" alt="sorting-arrows-horizontal"/></div>
      </button>

      {/* To Field */}
      <div ref={toRef} className="relative flex items-center w-full p-4 border-b border-gray-300 bg-slate-100 lg:flex-grow lg:border-b-0 lg:border-r lg:p-7 lg:pl-8">
      <div className='relative flex items-center w-full'>
        <img width="20" height="20" src="https://img.icons8.com/small/50/bus.png" alt="bus" className='flex-shrink-0 mr-2'/>
          <input
            ref={toInputRef}
            type="text"
            placeholder="To Station"
            className="w-full pl-2 pr-8 text-gray-700 placeholder-gray-800 bg-transparent border-none outline-none placeholder:font-thin"
            value={to}
            onChange={(e) => { setTo(e.target.value); setShowToDropdown(true); }}
            onFocus={() => setShowToDropdown(true)}
            onClick={() => setShowToDropdown(true)}
          />
          {to && (
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={clearToInput}
              className="absolute text-xl leading-none text-red-500 -translate-y-1/2 right-2 top-1/2 hover:text-red-700"
              aria-label="Clear to station"
            >
              x
            </button>
          )}
        </div>
        {showToDropdown && (
          <ul className="absolute left-0 z-50 w-full mt-2 overflow-y-auto top-full bg-slate-100 rounded-xl max-h-60">
            {filteredTo.map(city => (
              <li key={city} className="p-3 pl-5 border-b-2 border-gray-200 cursor-pointer hover:bg-white" 
                  onClick={() => { setTo(city); setShowToDropdown(false); }}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Date Field */}
      <div className="flex items-center w-full p-4 border-b border-gray-300 cursor-pointer bg-slate-100 lg:flex-grow lg:border-b-0 lg:p-5">
      <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/50/calendar--v1.png" alt="calendar--v1"/>
        
        <DatePicker
        selected={date}S
        onChange={handleChange}
        dateFormat="d MMM yyyy"
        className="w-full px-4 py-2 bg-transparent cursor-pointer focus:outline-none caret-transparent placeholder:text-slate-950"
        placeholderText="Date">

        </DatePicker>
      
      </div>

    
      <button onClick={handleSearch} className="p-4 font-semibold text-white duration-300 bg-gray-500 hover:bg-gray-600 rounded-b-2xl lg:rounded-b-none lg:rounded-r-full lg:p-7">
        SEARCH
      </button>
    </div>
  );
};

export default BusSearch;
