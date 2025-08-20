import React from "react";
// import { assets } from "../assets/assets";
// import { NavLink } from "react-router-dom";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Doctors", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Appointment Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Appointment",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];
  return (

    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white  border border-amber-400 mt-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
            <p className="text-3xl font-bold text-amber-600">FOOD</p>
          <p className="max-w-[410px] mt-6">
            Have questions or need assistance? We're here to help! Feel free to
            reach out to us anytime, and we'll get back to you as soon as
            possible.?
          </p>
          <div className="flex items-center gap-4 mt-2">
            <input className="py-2 px-3 w-full outline-none focus:border-amber-500/60 transition max-w-64 border border-gray-500/30 rounded-md" type="text" placeholder="Enter you email"/>
            <button className="bg-amber-400 hover:bg-amber-300 transition-all px-6 py-2 rounded text-white font-medium">Subscribe</button>
        </div>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © PrebuiltUI All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
