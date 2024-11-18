"use client";

import React from "react";
import { MovingCards } from "../../../components/ui/Moving-card/moving-cards";

export function MovingCard() {
  return (
    (<div
      className=" h-[50rem] rounded-md flex flex-col antialiased bg-zinc-100  items-center justify-center relative overflow-hidden">
      <h1 className="text-6xl font-bold text-slate-900 my-5">Trending Services</h1>  
      <MovingCards items={testimonials} direction="right" speed="slow" />
      <MovingCards items={testimonials} direction="left" speed="slow" />
    </div>)
  );
}

const testimonials = [
  {
    from: "Hosur",
    to:"Chennai",
    fromtime:23.45,
    totime:5.45,
    fulltime:6.00,
    price:"850",
    TravelsName:"KMRL Travels",
    
    type:"AC Sleeper",
    facility:['Tracking','Bed Sheet','Water Bottle','Pillow','Reading Lamp','CCTV']
  },
  {
    from: "Bangalore",
    to:"Coimbatore",
    fromtime:15.35,
    totime:9.45,
    fulltime:7.00,
    price:"675",
    TravelsName:"Dream Lines Travels",
    
    type:"Volvo Multi Axle A/C Sleeper I-Shift B11R (2+1)",
    facility:['Tracking','Blankets','LegRest','Reading Lamp','CCTV','Charging Port']
  },
  {
    from: "Bangalore",
    to:"Chennai",
    fromtime:5.35,
    totime:11.35,
    fulltime:6.00,
    price:"1050",
    TravelsName:"IntrCity SmartBus",
    
    type:"A/C Seater / Sleeper (2+1)",
    facility:['Tracking','Bed Sheet','Water Bottle','Pillow','Reading Lamp','CCTV']
  },
  {
    from: "Hosur",
    to:"Chennai",
    fromtime:23.45,
    totime:5.45,
    fulltime:6.00,
    price:"850",
    TravelsName:"KMRL Travels",
    
    type:"AC Sleeper",
    facility:['Tracking','Bed Sheet','Water Bottle','Pillow','Reading Lamp','CCTV']
  },
  {
    from: "Hyderabad",
    to:"Kochi",
    fromtime:5.45,
    totime:23.45,
    fulltime:16.00,
    price:"1850",
    TravelsName:"RKK Travels",
    
    type:"Volvo A/C B11R Multi Axle Semi Sleeper (2+2)",
    facility:['Tracking','Bed Sheet','Water Bottle','Pillow','Reading Lamp','CCTV']
  },
];
