import React from 'react';
import img1 from '../assets/img1.png';
import FAQ from '../components/FAQ.jsx';
import app from '../assets/app.png'
import cloud from '../assets/cloud.png'
import analytics from '../assets/analytics.png'
import analysis from '../assets/analysis.png'
import development from '../assets/development.png'
import career from '../assets/career.png'

export const AboutUs = () => (
  <>
    <div className="px-4 py-8 md:px-8 md:py-16 lg:px-16 lg:py-24 overflow-hidden">
      <section className="flex flex-col items-center md:flex-row md:items-start">
        <img
          src={img1}
          alt="Tech Illustration"
          className="w-3/4 md:w-1/2 lg:w-1/3 mb-6 md:mb-0"
        />
        <div className="md:ml-6 lg:ml-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold md:text-3xl lg:text-4xl text-sky-800 mb-4">
            At DavTechInvest,
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-4">
            We Harness The Power Of Cutting-Edge Technology To Transform The Way
            Businesses Understand And Engage With Their Customers. Our Team Of
            Experts Specializes In Software Development, Data Collection,
            Analysis, And Observing Business Patterns To Create Actionable
            Insights For Investors. With A Focus On Investable Industries, We
            Bridge The Gap Between Technological Innovation And Investment
            Strategies.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 font-semibold text-2xl">
            <button className="bg-blue text-white px-4 py-2">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="md:text-2xl lg:text-3xl font-bold text-5xl pt-24 text-center mb-8 underline text-cyan-700">
          OTHER SERVICES
        </h2> 
        <div className="flex flex-wrap justify-center space-x-4 space-y-4 md:space-x-6 lg:space-x-8 gap-12">
        <span className="bg-white text-cyan-700 shadow-lg px-4 py-2 rounded-full font-semibold w-96 h-32 flex flex-col items-center justify-center text-3xl flex-shrink-0 mt-4">
            <img src={app} alt="App Development" className="h-12 mb-2"/>
            App Development
          </span>
          <span className="bg-white text-cyan-700 shadow-lg px-4 py-2 rounded-full font-semibold w-96 h-32 flex flex-col items-center justify-center text-3xl">
            <img src={cloud} alt="Cloud Based Solution" className="h-12 mb-2"/>
            Cloud Based Solution
          </span>
          <span className="bg-white text-cyan-700 shadow-lg px-4 py-2 rounded-full font-semibold w-96 h-32 flex flex-col items-center justify-center text-3xl">
            <img src={analytics} alt="Data Analytics" className="h-12 mb-2"/>
            Data Analytics
          </span>
          <span className="bg-white text-cyan-700 shadow-lg px-4 py-2 rounded-full font-semibold w-96 h-32 flex flex-col items-center justify-center text-3xl">
            <img src={development} alt="Web 3 Development" className="h-12 mb-2"/>
            Web 3 Development
          </span>
          <span className="bg-white text-cyan-700 shadow-lg px-4 py-2 rounded-full font-semibold w-96 h-32 flex flex-col items-center justify-center text-3xl">
            <img src={analysis} alt="Industrial Analysis" className="h-12 mb-2"/>
            Industrial Analysis
          </span>
          <span className="bg-white text-cyan-700 shadow-lg px-4 py-2 rounded-full font-semibold w-96 h-32 flex flex-col items-center justify-center text-3xl">
            <img src={career} alt="Career Development" className="h-12 mb-2"/>
            Career Development
          </span>
        </div>
      </section>

      <FAQ />
    </div>
  </>
);

export default AboutUs;
