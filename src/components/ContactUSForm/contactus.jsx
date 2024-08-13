import { motion } from 'framer-motion';
import backgroundImage from "/imagecontact.jpg";

export default function Contactus() {
  return (
    <div
      className="flex items-center justify-center text-white p-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '30vh', // Adjust height as needed
      }}
    >
      <motion.div
        className="text-center bg-black bg-opacity-50 p-4 rounded-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          HOW CAN WE HELP YOU?
        </motion.h2>
        <motion.p
          className="text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          We are revolutionizing the investment landscape with data-driven insights.
        </motion.p>
        <motion.p
          className="text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        >
          Explore how DavTechinvest can elevate your investment strategy.
        </motion.p>
      </motion.div>
    </div>
  );
}
