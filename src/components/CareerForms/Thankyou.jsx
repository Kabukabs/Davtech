import React from 'react';
import { motion } from 'framer-motion'; // Import motion for animations
import careerimage from '/careerimage.svg'; // Importing background image for the Thank You page

export default function Thankyou() {
  const telegramNumber = "+tIPtupHU3r1kNGQ0"; // Telegram contact number as a string
  
  return (
    <div className="relative h-screen flex flex-col items-center justify-center"> {/* Container for full screen height, centered layout */}
      <motion.div
        style={{ backgroundImage: `url(${careerimage})` }} // Setting background image
        className="bg-cover bg-center w-full h-full absolute top-0 left-0 z-0" // Full-screen background image with absolute positioning
        initial={{ opacity: 0 }} // Initial opacity for animation
        animate={{ opacity: 1 }} // Animate opacity to 1
        transition={{ duration: 1 }} // Duration of the animation
      >
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg text-center"
        initial={{ scale: 0.9, opacity: 0 }} // Initial scale and opacity for animation
        animate={{ scale: 1, opacity: 1 }} // Animate scale and opacity to visible
        transition={{ duration: 1, type: 'spring' }} // Duration and spring effect for animation
      >
        <img
          src="/Thankyou.jpg" // Image displaying the thank you message
          alt="Thank You"
          className="w-64 mb-4 object-cover rounded-lg shadow-md"
        />
        <h2 className="text-teal-500 text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold">
          JOIN OUR TEAM
        </h2>
        <p className="text-gray-700 text-lg mb-4">
          DavTechinvest connects ambitious Professionals With Experienced
          Mentors And Advisors For Personalized Guidance And Career Growth.
          Skilled Individuals Can Gain Hands-On Experience Through
          Collaborative Projects.
        </p>
        <a
          href={`https://wa.me/${telegramNumber}`} // Link to connect on Telegram
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal-500 text-white rounded-full py-2 px-4 font-medium shadow-md hover:bg-teal-600 transition-colors duration-300"
        >
          Connect With Us on Telegram
        </a>
      </motion.div>
    </div>
  );
}
