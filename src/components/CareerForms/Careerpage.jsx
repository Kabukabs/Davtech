import careerimage  from "/careerimage.svg";
import { Link } from 'react-router-dom';
export const Careerpage = () => {
   
  return (
    <div
      style={{ backgroundImage: `url(${careerimage})` }}
      className="bg-cover h-screen flex items-center justify-center"
    >
      <div className="w-full max-w-md ">
        <h2 className="text-teal-500 font-size: 8rem; text-5xl">
          JOIN OUR TEAM
        </h2>
        <p>
          DavTechinvest connects ambitious Professionals With Experienced
          Mentors And Advisors For Personalised Guidance And Career Growth.
          Skilled Individuals Can Gain Hands-On ExperienceThrough Collaborative
          Projects.{" "}
        </p>
        <h4>JOIN AS A</h4>
        <div>
        <Link to="/skill-collab">
            <button>SKILLFUL COLLABORATION</button>
          </Link>
        </div>
        <div>
        <Link to="/mentor-advisor">
            <button>MENTOR/ADVISOR</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
