import React from "react";
import { Carousel, Card } from "../../../components/ui/Apple-card/applecard";

export function Service() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    (<div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 ">
        Get to know about Service.
      </h2>
      <Carousel items={cards} />
    </div>)
  );
}

const DummyContent = () => {
  return (<>
    {[...new Array(1).fill(1)].map((_, index) => {
      return (
        (<div
          key={"dummy-content" + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p
            className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl  max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Online Bus Booking Services.
            </span>{" "}<br/><br/>
            India`s leading online bus ticket booking service provider. Check out budget friendly offers and save big with discount coupons to book bus tickets. You can check the bus schedules, compare prices.
GoBus has simplified the online bus booking process for your travel planning. You can cancel the ticket or change the dates. Book now!!!
          </p>
          
        </div>)
      );
    })}
  </>);
};

const data = [
  {
    category: "On Timely Connections",
    title: "Minimized delays for seamless travel.",
    src: "https://images.pexels.com/photos/3796308/pexels-photo-3796308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },
  {
    category: "Affordable Ride Service",
    title: "Low-cost fares for all passengers.",
    src: "https://images.pexels.com/photos/20107508/pexels-photo-20107508/free-photo-of-woman-standing-in-bus.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },
  {
    category: "Eco-Friendly Transport",
    title: "Introducing E-Buses for Reducing emissions.",
    src: "https://images.pexels.com/photos/6686275/pexels-photo-6686275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },

  {
    category: "Real-Time Tracking",
    title: "Live updates on bus location.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Express Routes",
    title: "Faster travel with limited stops.",
    src: "https://images.pexels.com/photos/11787611/pexels-photo-11787611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },
  {
    category: "Flexible Ticketing",
    title: "Online booking and mobile payments.",
    src: "https://images.pexels.com/photos/17786528/pexels-photo-17786528/free-photo-of-interior-of-an-empty-public-means-of-transport.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },
];
