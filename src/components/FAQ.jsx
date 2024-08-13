import React, { useState } from 'react'; // Import React and useState hook for state management
import { motion, AnimatePresence, useAnimation } from 'framer-motion'; // Import framer-motion for animations
import down from '../assets/down.png'; // Importing the down arrow image for closed questions
import up from '../assets/up.png'; // Importing the up arrow image for open questions

const FAQ = () => {
  // State to track which FAQ question is currently open
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);
  const controls = useAnimation(); // Animation controls for introspective effects

  // Function to toggle the open question
  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  // Array of FAQ items with questions and answers
  const faqItems = [
    {
      question: 'What Services Do You Offer?',
      answer: 'DavTechInvest specializes in software development, data collection, data analysis, and business pattern observation. We create investor-focused data to help businesses and investors make informed decisions.',
    },
    {
      question: 'How Does Your Software Development Process Work?',
      answer: 'Our software development process begins with understanding your specific needs. We then design and develop a solution tailored to your requirements, ensuring it aligns with current market trends and future scalability.',
    },
    {
      question: 'Can You Explain Your Data Collection And Analysis Process?',
      answer: 'Yes, we employ advanced analytics tools to collect and analyze data from various sources. Our proprietary algorithms then process this data to uncover patterns and trends, which we present in easily understandable formats.',
    },
    {
      question: 'How Do You Observe Business Patterns?',
      answer: 'We utilize machine learning models to monitor market dynamics and consumer behaviors in real-time. This enables us to provide timely insights into emerging opportunities and risks.',
    },
    {
      question: 'What Kind Of Industries Do You Serve?',
      answer: 'We focus on investable industries such as technology, healthcare, finance, e-commerce, and renewable energy. Each sector benefits from our data-driven approach, helping stakeholders navigate uncertainties and capitalize on opportunities.',
    },
    {
      question: 'How Much Does Your Service Cost?',
      answer: 'Our pricing is customized based on the scope of the project, the complexity of the data involved, and the duration of the engagement. For detailed pricing, please contact us directly.',
    },
    {
      question: 'How Long Does It Take To Complete A Project?',
      answer: 'The timeline for completing a project varies depending on its complexity. We strive to deliver high-quality work efficiently, aiming for a balance between thoroughness and timeliness.',
    },
  ];

  return (
    <div className="flex-col py-12 pt-24 overflow-hidden">
      {/* Background color bar */}
      <div className="absolute bg-cyan-500 w-full z-0 left-0 right-0 h-72"></div>
      <div className="relative z-10">
        {/* FAQ title */}
        <motion.h2
          className="text-white text-3xl font-semibold text-center mb-8 p-11"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          FAQ
        </motion.h2>
        {/* FAQ items container */}
        <motion.div
          className="bg-[linear-gradient(307.39deg,#D1D4D6_4.73%,#C7EEFF_58.6%,#FFFFFF_98.92%)] py-12 rounded-lg shadow-lg p-8 mx-4 md:mx-auto max-w-screen-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
              whileInView={{ scale: 1.02 }} // Introspective scaling effect
              viewport={{ once: true }} // Ensure animation occurs only once
            >
              {/* Button for toggling the question and answer visibility */}
              <motion.button
                className="w-full p-4 rounded-full bg-[rgba(252,254,255,0.65)] shadow-[0px_4px_4px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={() => toggleQuestion(index)} // Toggle question visibility on click
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold w-full text-center">
                    {item.question} {/* Display the question */}
                  </span>
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: openQuestionIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={openQuestionIndex === index ? up : down} alt="arrow" /> {/* Show arrow based on question state */}
                  </motion.span>
                </div>
              </motion.button>
              {/* Answer section, visible only if the question is open */}
              <AnimatePresence>
                {openQuestionIndex === index && (
                  <motion.div
                    className="mt-2 p-4 text-left bg-[rgba(252,254,255,0.65)] shadow-[0px_4px_4px_rgba(0,0,0,0.05)] rounded-full font-semibold"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    whileInView={{ scale: 1.02 }} // Introspective scaling effect
                    viewport={{ once: true }} // Ensure animation occurs only once
                  >
                    {item.answer} {/* Display the answer */}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
