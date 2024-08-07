import careerimage from '/careerimage.svg'; // Importing background image for the Career page
import { Link } from 'react-router-dom'; // Importing Link component for navigation

// Careerpage component for displaying career opportunities and navigation options
export const Careerpage = () => {
  return (
    // Background styling with career image
    <div
      style={{ backgroundImage: `url(${careerimage})` }} // Setting background image for the section
      className="bg-cover bg-center h-full w-full bg-no-repeat" // Background styling properties
    >
      <div className="flex items-center justify-center h-full bg-opacity-40"> {/* Centering content with background opacity */}
        <div className="w-full md:w-[70%] px-4 sm:px-6 lg:px-8 text-center text-white my-[10rem]">
          {/* Main content container */}
          <h2 className="text-teal-500 text-[70px] sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold">
            JOIN OUR TEAM
          </h2>
          <p className="text-[17px]">
            DavTechinvest connects ambitious Professionals With Experienced
            Mentors And Advisors For Personalised Guidance And Career Growth.
            Skilled Individuals Can Gain Hands-On Experience Through
            Collaborative Projects.
          </p>
          <h4 className="text-[20px] text-teal-500 py-8 px-4">
            JOIN AS A
          </h4>
          <div className="mb-6">
            {/* Button linking to Skill Collaboration page */}
            <Link to="/skill-collab">
              <button className="bg-white text-blue py-2 px-6 rounded-[30px] font-extrabold w-full sm:w-[200px] md:w-[250px] lg:w-[300px] h-12">
                SKILLFUL COLLABORATION
              </button>
            </Link>
          </div>
          <div>
            {/* Button linking to Mentor/Advisor page */}
            <Link to="/mentor-advisor">
              <button className="bg-white text-blue py-2 px-6 rounded-[30px] font-extrabold w-full sm:w-[200px] md:w-[250px] lg:w-[300px] h-12">
                MENTOR/ADVISOR
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
