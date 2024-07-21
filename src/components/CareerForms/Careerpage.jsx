import careerimage  from "/careerimage.svg";
import { Link } from 'react-router-dom';
export const Careerpage = () => {
   
  return (
    <div className="relative h-screen flex flex-col">
    <div
      style={{ backgroundImage: `url(${careerimage})` }}
      className="bg-cover bg-center h-[80vh] w-full bg-no-repeat"
    >
      <div className="flex items-center justify-center h-full bg-black bg-opacity-40">
      <div className="w-full max-w-md px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-teal-500 text-5xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
          JOIN OUR TEAM
        </h2>
        <p className="text-sm xsm:text-base md:text-lg lg:text-xl mb-4">
          DavTechinvest connects ambitious Professionals With Experienced
          Mentors And Advisors For Personalised Guidance And Career Growth.
          Skilled Individuals Can Gain Hands-On Experience Through Collaborative
          Projects.{" "}
        </p>
        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">JOIN AS A</h4>
        <div className="mb-2">
        <Link to="/skill-collab">
            <button className="bg-teal-500 text-blue py-2 px-4 rounded text-sm sm:text-base md:text-lg lg:text-xl">SKILLFUL COLLABORATION</button>
          </Link>
        </div>
        <div>
        <Link to="/mentor-advisor">
            <button className="bg-teal-500 text-blue py-2 px-4 rounded text-sm sm:text-base md:text-lg lg:text-xl">MENTOR/ADVISOR</button>
          </Link>
        </div>
      </div>
      </div>
    </div>
    <div className="flex-grow bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      </div>
    </div>
  );
};
