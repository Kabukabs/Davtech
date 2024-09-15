import React from 'react'; // Import React
import { motion } from 'framer-motion'; // Import framer-motion for animations
import careerimage from '/careerimage.svg'; // Importing background image for the Career page
import { Link } from 'react-router-dom'; // Importing Link component for navigation

export const Careerpage = () => {
  return (
    <motion.div
      style={{ backgroundImage: `url(${careerimage})` }} // Setting background image for the section
      className="bg-cover bg-center h-full w-full bg-no-repeat" // Background styling properties
      initial={{ opacity: 0 }} // Initial state for animation
      animate={{ opacity: 1 }} // Animate to full opacity
      transition={{ duration: 1, ease: 'easeInOut' }} // Animation duration and easing
    >
      <div className="flex items-center justify-center h-full bg-opacity-40"> {/* Centering content with background opacity */}
        <motion.div
          className="w-full md:w-[70%] px-4 sm:px-6 lg:px-8 text-center text-white my-[10rem]"
          initial={{ y: -50, opacity: 0 }} // Initial state for text animation
          animate={{ y: 0, opacity: 1 }} // Animate to final state
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }} // Animation duration and type
        >
          {/* Main content container */}
          <motion.h2
            className="text-teal-500 text-[70px] sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold"
            initial={{ opacity: 0, scale: 0.9 }} // Initial state for heading animation
            animate={{ opacity: 1, scale: 1 }} // Animate to final state
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }} // Animation duration and type
          >
            JOIN OUR TEAM
          </motion.h2>
          <motion.p
            className="text-[17px]"
            initial={{ opacity: 0, y: 20 }} // Initial state for paragraph animation
            animate={{ opacity: 1, y: 0 }} // Animate to final state
            transition={{ duration: 0.6, delay: 0.2 }} // Animation duration and delay
          >
            DavTechinvest connects ambitious Professionals With Experienced
            Mentors And Advisors For Personalised Guidance And Career Growth.
            Skilled Individuals Can Gain Hands-On Experience Through
            Collaborative Projects.
          </motion.p>
          <motion.h4
            className="text-[20px] text-teal-500 py-8 px-4"
            initial={{ opacity: 0, scale: 0.9 }} // Initial state for subheading animation
            animate={{ opacity: 1, scale: 1 }} // Animate to final state
            transition={{ duration: 0.6, delay: 0.4 }} // Animation duration and delay
          >
            JOIN AS A
          </motion.h4>
          <div className="mb-6">
            {/* Button linking to Skill Collaboration page */}
            <Link to="/skill-collab">
              <motion.button
                className="bg-white text-blue py-2 px-6 rounded-[30px] font-extrabold w-full sm:w-[200px] md:w-[250px] lg:w-[300px] h-12"
                initial={{ opacity: 0, scale: 0.9 }} // Initial state for button animation
                whileHover={{ scale: 1.05 }} // Scale up on hover
                whileTap={{ scale: 0.95 }} // Scale down on tap
                animate={{ opacity: 1, scale: 1 }} // Animate to final state
                transition={{ duration: 0.4, type: 'spring', stiffness: 100 }} // Animation duration and type
              >
                SKILLFUL COLLABORATOR
              </motion.button>
            </Link>
          </div>
          <div>
            {/* Button linking to Mentor/Advisor page */}
            <Link to="/mentor-advisor">
              <motion.button
                className="bg-white text-blue py-2 px-6 rounded-[30px] font-extrabold w-full sm:w-[200px] md:w-[250px] lg:w-[300px] h-12"
                initial={{ opacity: 0, scale: 0.9 }} // Initial state for button animation
                whileHover={{ scale: 1.05 }} // Scale up on hover
                whileTap={{ scale: 0.95 }} // Scale down on tap
                animate={{ opacity: 1, scale: 1 }} // Animate to final state
                transition={{ duration: 0.4, type: 'spring', stiffness: 100 }} // Animation duration and type
              >
                MENTOR/ADVISOR
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
