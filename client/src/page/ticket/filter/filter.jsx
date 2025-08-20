import React from 'react'
import PriceRangeSlider from '../../home/hero/priceRange';

const Filter = (className) => {
    const [rangeValues, setRangeValues] = React.useState({min: 0, max: 100});

    const handleRangeChange = (values) => {
        setRangeValues({values});
    };
  return (
    <div className={`w-full flex flex-col pb-10 ${className} gap-3`}>
        <h1 className="text-xl font-semibold text-neutral-700">
            Apply Filters
        </h1>

        {/*Range Filter */}
        <div className="w-full p-4 space-y-1 border border-neutral-300 rounded-xl">
            <h2 className="text-lg font-semibold text-neutral-600">Apply Filters</h2>
            <PriceRangeSlider 
                min={1000}
                max={3000}
                onChange={handleRangeChange}
            />
        </div>

        {/*BusType Filter */}
        <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
            <h2 className="text-lg font-semibold text-neutral-600">Bus Type</h2>
            <div className="space-y-2 5">
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='ac' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="ac" className="text-sm font-normal cursor-pointer text-neutral-600">
                        AC Deluxe <span className="text-sm text-neutral-600"> (10)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='ac-sleeper' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="ac-sleeper" className="text-sm font-normal cursor-pointer text-neutral-600">
                        AC Sleeper <span className="text-sm text-neutral-600"> (7)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='ac-sleeper-seater' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="ac-sleeper-seater" className="text-sm font-normal cursor-pointer text-neutral-600">
                        AC Sleeper Seater<span className="text-sm text-neutral-600"> (13)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='non-ac' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="non-ac" className="text-sm font-normal cursor-pointer text-neutral-600">
                        Non AC Deluxe <span className="text-sm text-neutral-600"> (20)</span>
                    </label>
                </div>
                
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='non-ac-sleeper' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="non-ac-sleeper" className="text-sm font-normal cursor-pointer text-neutral-600">
                        Non AC Sleeper <span className="text-sm text-neutral-600"> (5)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='non-ac-sleeper-seater' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="non-ac-sleeper-seater" className="text-sm font-normal cursor-pointer text-neutral-600">
                        Non AC Sleeper Seater <span className="text-sm text-neutral-600"> (10)</span>
                    </label>
                </div>
                
            </div>
        </div>

        {/* Operators Filter */}
        <div className="w-full p-4 space-y-5 border border-neutral-300 rounded-xl">
            <h2 className="text-lg font-semibold text-neutral-600">Bus Operators</h2>
            <div className="space-y-2 5">
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='nuego' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="nuego" className="text-sm font-normal cursor-pointer text-neutral-600">
                        NueGo <span className="text-sm text-neutral-600"> (10)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='rkk-travels' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="rkk-travels" className="text-sm font-normal cursor-pointer text-neutral-600">
                        RKK Travels <span className="text-sm text-neutral-600"> (7)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='srs-travels' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="srs-travels" className="text-sm font-normal cursor-pointer text-neutral-600">
                        SRS Travels<span className="text-sm text-neutral-600"> (13)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='intrcity-smartbus' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="intrcity-smartbus" className="text-sm font-normal cursor-pointer text-neutral-600">
                        IntrCity SmartBus <span className="text-sm text-neutral-600"> (20)</span>
                    </label>
                </div>
                
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='dream-lines-travels' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="dream-lines-travels" className="text-sm font-normal cursor-pointer text-neutral-600">
                        Dream Lines Travels<span className="text-sm text-neutral-600"> (5)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='kmrl-travels' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="kmrl-travels" className="text-sm font-normal cursor-pointer text-neutral-600">
                        KMRL Travels <span className="text-sm text-neutral-600"> (10)</span>
                    </label>
                </div>
                
            </div>
        </div>

        {/* Amenities Filter */}
        <div className="w-full p-4 space-y-5 border border-neutral-300 rounded-xl">
            <h2 className="text-lg font-semibold text-neutral-600">Amenities Type</h2>
            <div className="space-y-2 5">
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='charging-port' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="charging-port" className="text-sm font-normal cursor-pointer text-neutral-600">
                        Charging Port <span className="text-sm text-neutral-600"> (10)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='reading-lamp' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="reading-lamp" className="text-sm font-normal cursor-pointer text-neutral-600">
                        Reading Lamp <span className="text-sm text-neutral-600"> (7)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='internet-wifi' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="internet-wifi" className="text-sm font-normal cursor-pointer text-neutral-600">
                        Internet/Wifi<span className="text-sm text-neutral-600"> (13)</span>
                    </label>
                </div>
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='water-bottles' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="water-bottles" className="text-sm font-normal cursor-pointer text-neutral-600">
                        Water Bottles <span className="text-sm text-neutral-600"> (20)</span>
                    </label> 
                </div>
                
                <div className="flex items-center w-full gap-2">
                    <input type="checkbox" id='fan' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer " />
                    <label htmlFor="fan" className="text-sm font-normal cursor-pointer text-neutral-600">
                        Fan<span className="text-sm text-neutral-600"> (5)</span>
                    </label>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Filter