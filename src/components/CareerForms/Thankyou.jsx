import careerimage  from "/careerimage.svg";

export default function Thankyou(){
   
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
       
      </div>
      <div>
      <img src="/Thankyou.jpg" alt="Thank You" />
      <p>Thank You For Joining!</p>
      <p>Click Here To Connect With Us On Telegram And Stay Updated On All Our Latest News And Opportunities</p>

      </div>
    </div>
  );
};
