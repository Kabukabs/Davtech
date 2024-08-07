import React, { useState } from 'react'; // Import React and useState hook for state management
import down from '../assets/down.png'; // Importing the down arrow image for closed questions
import up from '../assets/up.png'; // Importing the up arrow image for open questions

const FAQ = () => {
  // State to track which FAQ question is currently open
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  // Function to toggle the open question
  // If the clicked question is already open, close it; otherwise, open the clicked question
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
        <h2 className="text-white text-3xl font-semibold text-center mb-8 p-11">
          FAQ
        </h2>
        {/* FAQ items container */}
        <div className="bg-[linear-gradient(307.39deg,#D1D4D6_4.73%,#C7EEFF_58.6%,#FFFFFF_98.92%)] py-12 rounded-lg shadow-lg p-8 mx-4 md:mx-auto max-w-screen-md">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4">
              {/* Button for toggling the question and answer visibility */}
              <button
                className="w-full p-4 rounded-full bg-[rgba(252,254,255,0.65)] shadow-[0px_4px_4px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={() => toggleQuestion(index)} // Toggle question visibility on click
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold w-full text-center">
                    {item.question} {/* Display the question */}
                  </span>
                  <span>
                    {openQuestionIndex === index ? (
                      <img src={up} alt="up arrow" /> // Show up arrow if the question is open
                    ) : (
                      <img src={down} alt="down arrow" /> // Show down arrow if the question is closed
                    )}
                  </span>
                </div>
              </button>
              {/* Answer section, visible only if the question is open */}
              {openQuestionIndex === index && (
                <div className="mt-2 p-4 text-left bg-[rgba(252,254,255,0.65)] shadow-[0px_4px_4px_rgba(0,0,0,0.05)] rounded-full font-semibold">
                  {item.answer} {/* Display the answer */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;