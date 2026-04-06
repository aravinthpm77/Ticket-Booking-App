import React,{ useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { MdDirectionsBus, MdSwapHoriz, MdCalendarToday } from 'react-icons/md';
import { apiUrl } from '../../../config/api';


const BusSearch = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);


  {/* Date constraints to limit date searchingg*/}
  const minBookingDate = new Date();
  minBookingDate.setHours(0, 0, 0, 0);

  const maxBookingDate = new Date(minBookingDate);
  maxBookingDate.setMonth(maxBookingDate.getMonth() + 3);


  const [dbCities, setDbCities] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  
  useEffect(() => {
    const loadCities = async () => {
      try {
        const res = await fetch(apiUrl("/api/schedules/cities"));
        if (!res.ok) {
          throw new Error(`City fetch failed with status ${res.status}`);
        }

        const data = await res.json();
        const cities = Array.isArray(data)
          ? data
          : Array.isArray(data?.cities)
            ? data.cities
            : [];

        setDbCities(cities.filter(Boolean));
      } catch (err) {
        console.error("City fetch error:", err);
        setDbCities([]);
      }
    };

    loadCities();
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

    if (date < minBookingDate || date > maxBookingDate) {
      return alert("Select a date from today up to 3 months ahead");
    }
    
    
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
    <div className="relative mx-auto flex w-full max-w-[450px] flex-col items-stretch rounded-2xl md:max-w-[600px] lg:max-w-[1000px] lg:flex-row lg:items-center lg:overflow-visible lg:rounded-full">
      
      <div ref={fromRef} className="relative flex items-center w-full p-4 border-b border-gray-300 cursor-pointer bg-slate-100 rounded-t-2xl lg:flex-grow lg:border-b-0 lg:border-r lg:p-7 lg:pl-5 lg:rounded-none lg:rounded-l-[9999px]">
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
          <div className="absolute left-0 top-full z-[70] mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <ul className="py-1 overflow-y-auto max-h-60">
              {filteredFrom.length > 0 ? (
                filteredFrom.map(city => (
                  <li
                    key={city}
                    className="px-4 py-3 text-sm transition-colors cursor-pointer text-slate-700 hover:bg-slate-100"
                    onClick={() => { setFrom(city); setShowFromDropdown(false); }}
                  >
                    {city}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-slate-400">No cities found</li>
              )}
            </ul>
          </div>
        )}

        {/* Reverse Button */}
        <button
          className="absolute right-0 top-1/2 z-[80] hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-gray-300 bg-white p-3 align-middle duration-300 hover:bg-slate-200 lg:flex"
          onClick={reverseCities}
        >
         <div className='scale-110'> <img width="20" height="20" src="https://img.icons8.com/material-sharp/24/sorting-arrows-horizontal.png" alt="sorting-arrows-horizontal"/></div>
        </button>
      </div>

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
          <div className="absolute left-0 top-full z-[70] mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <ul className="py-1 overflow-y-auto max-h-60">
              {filteredTo.length > 0 ? (
                filteredTo.map(city => (
                  <li
                    key={city}
                    className="px-4 py-3 text-sm transition-colors cursor-pointer text-slate-700 hover:bg-slate-100"
                    onClick={() => { setTo(city); setShowToDropdown(false); }}
                  >
                    {city}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-slate-400">No cities found</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Date Field */}
      <div className="flex items-center w-full p-4 border-b border-gray-300 cursor-pointer bg-slate-100 lg:flex-grow lg:border-b-0 lg:p-5">
      <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/50/calendar--v1.png" alt="calendar--v1"/>
        
        <DatePicker
        selected={date}
        onChange={handleChange}
        dateFormat="d MMM yyyy"
        minDate={minBookingDate}
        maxDate={maxBookingDate}
        wrapperClassName="w-full"
        className="w-full py-2 pl-2 bg-transparent cursor-pointer focus:outline-none caret-transparent placeholder:text-slate-950"
        placeholderText="Date">

        </DatePicker>
      
      </div>

    
      <button onClick={handleSearch} className="p-4 font-semibold text-white duration-300 bg-gray-500 hover:bg-gray-600 rounded-b-2xl lg:rounded-none lg:rounded-r-[9999px] lg:p-7">
        SEARCH
      </button>
    </div>
  );
};

export default BusSearch;
