import React from 'react'; // Import React
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for routing
import { motion } from 'framer-motion'; // Import framer-motion for animations
import img1 from '../../assets/img1.png'; // Importing images for the hero section
import FAQ from '../../components/FAQ.jsx'; // Importing FAQ component
import app from '../../assets/app.png'; // Importing images for service items
import cloud from '../../assets/cloud.png';
import analytics from '../../assets/analytics.png';
import analysis from '../../assets/analysis.png';
import development from '../../assets/development.png';
import career from '../../assets/career.png';

export default function AboutUsPage() {
  const navigate = useNavigate(); // Hook for navigation

  // Handle click event for the 'Contact Us' button
  const handleClick = () => {
    navigate('/contact us'); // Navigate to the contact us page
  };

  return (
    <>
      <div className="px-4 py-8 md:px-8 md:py-16 lg:px-16 lg:py-24 overflow-hidden">
        {/* Hero section */}
        <section className="flex flex-col items-center md:flex-row md:items-start">
  <div className="w-full md:w-1/2 mb-6 md:mb-0">
    <motion.img
      src={img1}
      alt="Tech Illustration"
       className="w-full h-auto object-cover rounded-full"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
    />
  </div>
  <div className="w-full md:w-1/2">
    <motion.div className="p-6">
      <motion.h1
        className="text-4xl font-extrabold md:text-3xl lg:text-4xl text-sky-800 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        At DavTechInvest
      </motion.h1>
      <motion.p
        className="text-base md:text-lg lg:text-xl mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        We Harness The Power Of Cutting-Edge Technology To Transform The Way Businesses Understand And Engage 
        With Their Customers. Our Team Of Experts Specializes In Software Development, Data Collection, Analysis,
         And Observing Business Patterns To Create Actionable Insights For Investors. With A Focus On Investable 
         Industries, We Bridge The Gap Between Technological Innovation And Investment Strategies.
      </motion.p>
      <div className="flex justify-center md:justify-start space-x-4 font-semibold text-2xl">
        <motion.button
          onClick={handleClick}
          className="bg-blue text-white px-4 py-2"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, backgroundColor: '#1d4ed8' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          Contact Us
        </motion.button>
      </div>
    </motion.div>
  </div>
</section>


        {/* Other services section */}
        <section className="mt-12">
          <motion.h2
            className="md:text-2xl lg:text-3xl font-bold text-5xl pt-24 text-center mb-8 underline text-cyan-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            OTHER SERVICES
          </motion.h2>
          <div className="flex flex-wrap justify-center space-x-4 space-y-4 md:space-x-6 lg:space-x-8 gap-12">
            {/* Service items */}
            {[
              { src: app, alt: 'App Development', text: 'App Development' },
              { src: cloud, alt: 'Cloud Based Solution', text: 'Cloud Based Solution' },
              { src: analytics, alt: 'Data Analytics', text: 'Data Analytics' },
              { src: development, alt: 'Web 3 Development', text: 'Web 3 Development' },
              { src: analysis, alt: 'Industrial Analysis', text: 'Industrial Analysis' },
              { src: career, alt: 'Career Development', text: 'Career Development' }
            ].map((item, index) => (
              <motion.span
                key={index}
                className="bg-white text-cyan-700 shadow-lg px-4 py-2 rounded-full font-semibold w-96 h-32 flex flex-col items-center justify-center text-3xl flex-shrink-0 mt-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, scale: 1.02 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }} // Ensure animation occurs only once
              >
                <motion.img
                  src={item.src}
                  alt={item.alt}
                  className="h-12 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                {item.text}
              </motion.span>
            ))}
          </div>
        </section>

        <FAQ /> {/* Including the FAQ component */}
      </div>
    </>
  );
}
