import React, { useState } from 'react';
import down from '../assets/down.png'
import up from '../assets/up.png'

const FAQ = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'What Services Do You Offer?',
      answer: 'DavTechInvest Specializes In Software Development, Data Collection, Data Analysis, And Business Pattern Observation. We Create Investor-Focused Data To Help Businesses And Investors Make Informed Decisions.',
    },
    {
      question: 'How Does Your Software Development Process Work?',
      answer: 'Our software development process involves...',
    },
    {
      question: 'Can You Explain Your Data Collection And Analysis Process?',
      answer: 'We collect and analyze data by...',
    },
    {
      question: 'How Do You Observe Business Patterns?',
      answer: 'We observe business patterns through...',
    },
    {
      question: 'What Kind Of Industries Do You Serve?',
      answer: 'We serve a variety of industries including...',
    },
    {
      question: 'How Much Does Your Service Cost?',
      answer: 'Our service costs vary depending on...',
    },
    {
      question: 'How Long Does It Take To Complete A Project?',
      answer: 'The project completion time depends on...',
    },
  ];

  return (
    <div className="flex-col py-12 pt-24 overflow-hidden">
      <div className="absolute bg-cyan-500 w-full z-0 left-0 right-0 h-72">
      </div>
      <div className="relative z-10">
      <h2 className="text-white text-3xl font-semibold text-center mb-8 p-11">FAQ</h2>
      <div className="bg-[linear-gradient(307.39deg,#D1D4D6_4.73%,#C7EEFF_58.6%,#FFFFFF_98.92%)] py-12 rounded-lg shadow-lg p-8 mx-4 md:mx-auto max-w-screen-md">
        {faqItems.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full text-left p-4 rounded-full shadow-md bg-[linear-gradient(307.39deg,#D1D4D6_4.73%,#C7EEFF_58.6%,#FFFFFF_98.92%)] focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{item.question}</span>
                <span>{openQuestionIndex === index ? <img src={up}/> : <img src={down}/>}</span>
              </div>
            </button>
            {openQuestionIndex === index && (
              <div className="mt-2 p-4 bg-[linear-gradient(307.39deg,#D1D4D6_4.73%,#C7EEFF_58.6%,#FFFFFF_98.92%)] rounded-full shadow-inner">
                {item.answer}
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
