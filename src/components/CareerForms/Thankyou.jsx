import careerimage from '/careerimage.svg'; // Importing background image for the Thank You page

export default function Thankyou() {
  const telegramNumber = +111111111111; // Telegram contact number

  return (
    <div className="relative h-screen flex flex-col"> {/* Container for full screen height and vertical flex layout */}
      <div
        style={{ backgroundImage: `url(${careerimage})` }} // Setting background image
        className="bg-cover bg-center w-full p-24 h-[70vh]" // Background styling with cover and center properties
      >
        <div className="w-full max-w-[800px] flex-row justify-center items-center">
          {/* Content container with maximum width */}
          <h2 className="text-teal-500 text-[70px] sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold">
            JOIN OUR TEAM
          </h2>
          <p className="text-white text-[15px]">
            DavTechinvest connects ambitious Professionals With Experienced
            Mentors And Advisors For Personalised Guidance And Career Growth.
            Skilled Individuals Can Gain Hands-On Experience Through
            Collaborative Projects.
          </p>
        </div>
        <div className="bg-white w-[600px] rounded-lg shadow-lg mt-12 h-[300px]">
          {/* Thank You message container */}
          <img
            src="/Thankyou.jpg" // Image displaying the thank you message
            alt="Thank You"
            className="w-64 mt-2 object-cover"
          />
          <p className="">Thank You For Joining!</p>
          <a
            href={`https://wa.me/${telegramNumber}`} // Link to connect on Telegram
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-500 underline text-[10px]"
          >
            Click Here To Connect With Us On Telegram And Stay Updated On All
            Our Latest News And Opportunities
          </a>
        </div>
      </div>
    </div>
  );
}
