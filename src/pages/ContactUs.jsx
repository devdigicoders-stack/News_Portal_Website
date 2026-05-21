import React from 'react';

export default function ContactUs() {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 bg-white p-8 border-t-4 border-red-600 shadow-sm">
        <h1 className="text-4xl font-black text-gray-900 mb-6 uppercase">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-6">Have a news tip, feedback, or a general inquiry? Reach out to us using the details below.</p>
            <div className="space-y-3 font-medium text-gray-800">
              <p>📍 Film City, Sector 16A, Noida, Uttar Pradesh 201301</p>
              <p>📞 +91-120-1234567</p>
              <p>✉️ contact@newsportal.mock</p>
            </div>
          </div>
          <div>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Your Name" className="border border-gray-300 p-2 focus:border-red-600 outline-none" required />
              <input type="email" placeholder="Your Email" className="border border-gray-300 p-2 focus:border-red-600 outline-none" required />
              <textarea placeholder="Your Message" rows="5" className="border border-gray-300 p-2 focus:border-red-600 outline-none" required></textarea>
              <button className="bg-red-600 text-white font-bold py-2 hover:bg-red-700 transition">SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
