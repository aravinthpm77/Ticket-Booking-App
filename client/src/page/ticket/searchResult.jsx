import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TicketCard from '../../components/ticket/ticketcard';
import { apiUrl } from '../../config/api';

const SearchResult = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // Get search parameters from URL
  const fromCity = searchParams.get('from') || "";
  const toCity = searchParams.get('to') || "";
  const travelDate = searchParams.get('date') || "";

  useEffect(() => {
    const fetchBusResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(apiUrl('/api/schedules/all'));
        const data = await res.json();

        // 1. Filter results based on search inputs
        const filtered = data.filter(item => {
          const matchFrom = fromCity ? item.from_city.toLowerCase().includes(fromCity.toLowerCase()) : true;
          const matchTo = toCity ? item.to_city.toLowerCase().includes(toCity.toLowerCase()) : true;
          
          // Date check (DB date usually includes time, so we split)
          const dbDate = item.travel_date.split('T')[0];
          const matchDate = travelDate ? dbDate === travelDate : true;

          return matchFrom && matchTo && matchDate;
        });

        // 2. Map Database columns to TicketCard component props
        const formatted = filtered.map(item => ({
          id: item.id,
          from: item.from_city,
          to: item.to_city,
          fromtime: formatTime(item.departure_time),
          totime: formatTime(item.arrival_time),
          fulltime: "6:00", 
          AvailableSeats: 10, 
          totalSeats: item.total_seats || 40,
          price: Math.floor(item.price), // Remove decimals for display
          TravelsName: item.travels_name,
          type: item.bus_type || "NON AC Seater",
          facility: ['Tracking','Bed Sheet','Water Bottle','Pillow','Reading Lamp','CCTV']
        }));

        setSchedules(formatted);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusResults();
  }, [fromCity, toCity, travelDate]);

  // Formats "20:30:00" into "20.30"
  function formatTime(timeStr) {
    if (!timeStr) return "00.00";
    const parts = timeStr.split(':');
    return `${parts[0]}.${parts[1]}`;
  }

  if (loading) return <div className="p-20 text-center text-gray-500">Searching for buses...</div>;

  return (
    <div className='w-full col-span-3 space-y-10 pt-11'>
      <div className="space-y-6">
        {schedules.length > 0 ? (
          <TicketCard items={schedules} />
        ) : (
          <div className="p-16 text-center bg-white border border-gray-100 shadow-sm rounded-3xl">
            <h3 className="text-xl font-semibold text-gray-400">No buses found</h3>
            <p className="mt-2 text-gray-400">Try changing your search city or date.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;