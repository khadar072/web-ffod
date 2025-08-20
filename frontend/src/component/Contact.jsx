import React from 'react'
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
const Contact = () => {
    return (
        <div className=''>
            <section

                className="py-2 px-4   bg-gray-50 flex flex-col items-center"
            >
                {/* Heading */}
                <div data-aos="zoom-in" className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-amber-400">Get in Touch</h1>
                    <p className="text-gray-600 mt-2 max-w-xl">
                        Have a project in mind or just want to say hello?
                        Let’s connect and turn your ideas into reality.
                    </p>
                </div>

                {/* Contact Info + Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">

                    {/* Left - Contact Info */}
                    <div data-aos="fade-right" className="flex shadow-md shadow-amber-400 p-2 flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-amber-400 text-2xl" />
                            <span className="text-gray-700">your@email.com</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaPhoneAlt className="text-amber-400 text-2xl" />
                            <span className="text-gray-700">+123 456 7890</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaMapMarkerAlt className="text-amber-400 text-2xl" />
                            <span className="text-gray-700">
                                Your City, Country
                            </span>
                        </div>

                        {/* Optional Google Map */}
                        <iframe
                            data-aos="zoom-in"
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.244737335168!2d47.42442321504986!3d6.772699394247132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d9e411f72c04fdb%3A0xf742e3f35c9e92d3!2sGalkacyo%2C%20Somalia!5e0!3m2!1sen!2sus!4v1689435700546!5m2!1sen!2sus"
                            className="w-full mt-4  h-48 rounded-lg   "
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />


                    </div>

                    {/* Right - Contact Form */}
                    <form data-aos="zoom-in" className="bg-white p-6 rounded-lg  shadow-md  shadow-amber-400 flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-amber-400 hover:bg-amber-400 text-white font-semibold py-2 rounded-lg transition-all"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Contact