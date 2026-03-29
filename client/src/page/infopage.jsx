import React from 'react';
import { useParams } from 'react-router-dom';
import { FaCheckCircle, FaInfoCircle, FaShieldAlt, FaBus } from 'react-icons/fa';

// 1. THIS IS YOUR "DATABASE" OF CONTENT
const PAGE_DATA = {
  "agent-registration": {
    title: "Partner with GoBus",
    subtitle: "Grow your business by becoming an authorized GoBus ticket agent.",
    icon: <FaBus className="text-indigo-600" />,
    sections: [
      {
        heading: "Why become a GoBus Agent?",
        content: "Join India's fastest-growing bus booking network. As an agent, you get access to exclusive inventory and the highest commission rates in the industry.",
        list: ["Earn up to 10% commission per seat", "Access to 2000+ bus operators", "Instant cancellation and refunds", "24/7 dedicated agent support team"]
      },
      {
        heading: "Registration Requirements",
        content: "To maintain our high service standards, we require the following documents for verification:",
        list: ["Valid ID Proof (Aadhar/PAN)", "Shop Act License or Business Registration", "Bank Account Details for settlements"]
      }
    ]
  },
  "refund-policy": {
    title: "Refund & Cancellation Policy",
    subtitle: "Simple, transparent, and fair refund process.",
    icon: <FaShieldAlt className="text-emerald-600" />,
    sections: [
      {
        heading: "Cancellation Charges",
        content: "Refund amounts depend on how early you cancel your ticket before the scheduled departure time:",
        list: [
          "Before 24 Hours: 90% Refund (10% deduction)",
          "12 - 24 Hours: 75% Refund (25% deduction)",
          "06 - 12 Hours: 50% Refund (50% deduction)",
          "Less than 6 Hours: No Refund (100% deduction)"
        ]
      },
      {
        heading: "Processing Time",
        content: "Once a refund is initiated, it usually takes 5-7 working days to reflect in your original payment method (Bank/UPI/Wallet)."
      }
    ]
  },
  "about-us": {
    title: "About GoBus",
    subtitle: "Redefining the way India travels by road.",
    icon: <FaInfoCircle className="text-sky-600" />,
    sections: [
      {
        heading: "Our Mission",
        content: "GoBus was founded with one goal: To make bus travel reliable, affordable, and comfortable for everyone. We connect thousands of cities through our partner network of top-tier bus operators."
      },
      {
        heading: "Technology Driven",
        content: "Our platform uses advanced real-time tracking and inventory management to ensure you always get the seat you want at the price you deserve."
      }
    ]
  }
};

const InfoPage = () => {
  const { category, slug } = useParams();

  // Get data for the current slug, or show a fallback if the slug isn't in our data yet
  const page = PAGE_DATA[slug] || {
    title: slug.replace(/-/g, ' ').toUpperCase(),
    subtitle: "Information regarding " + slug,
    sections: [{ heading: "Coming Soon", content: "We are currently updating this page with the latest information." }]
  };

  return (
    <div className="min-h-screen px-4 pb-20 bg-slate-50 pt-28">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="p-8 bg-white border-b border-gray-100 shadow-sm md:p-12 rounded-t-3xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="p-3 text-2xl bg-indigo-50 rounded-2xl">
              {page.icon || <FaInfoCircle className="text-indigo-600" />}
            </span>
            <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">{category}</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-slate-900">{page.title}</h1>
          <p className="text-lg text-slate-500">{page.subtitle}</p>
        </div>

        {/* Content Sections */}
        <div className="p-8 space-y-12 bg-white shadow-sm md:p-12 rounded-b-3xl">
          {page.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                {sec.heading}
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                {sec.content}
              </p>
              
              {sec.list && (
                <ul className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                  {sec.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 border bg-slate-50 rounded-xl border-slate-100">
                      <FaCheckCircle className="mt-1 text-emerald-500 shrink-0" />
                      <span className="font-medium text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action Footer */}
        <div className="p-8 mt-10 text-center text-white bg-indigo-600 shadow-lg rounded-3xl shadow-indigo-200">
          <h3 className="mb-2 text-xl font-bold">Have more questions?</h3>
          <p className="mb-6 text-indigo-100">Our support team is available 24/7 to help you with your journey.</p>
          <button className="px-8 py-3 font-bold text-indigo-600 transition-colors bg-white rounded-xl hover:bg-indigo-50">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;