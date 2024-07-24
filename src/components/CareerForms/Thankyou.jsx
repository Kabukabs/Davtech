import careerimage from "/careerimage.svg";

export default function Thankyou() {
  const telegramNumber = +111111111111;
  return (
    <div className="relative h-screen flex flex-col">
    <div 
      style={{ backgroundImage: `url(${careerimage})` }}
      class="bg-cover bg-center  w-full p-24 h-[70vh] "
    >
      <div class=" w-full max-w-[800px] flex-row justify-center items-center">
      
      <h2 className="text-teal-500 text-[70px] sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold">
          JOIN OUR TEAM
        </h2>
        <p className="text-white text-lg ">
          DavTechinvest connects ambitious Professionals With Experienced
          Mentors And Advisors For Personalised Guidance And Career Growth.
          Skilled Individuals Can Gain Hands-On ExperienceThrough Collaborative
          Projects.{" "}
        </p>
        </div>
        <img src="/Thankyou.jpg" alt="Thank You" 
         className="w-64 h-auto object-cover rounded-lg shadow-lg"/>
         <p className="">Thank You For Joining!</p>
         <a
          href={`https://wa.me/${telegramNumber}`}
          target="_blank"
          rel="noopener noreferrer"
           className="text-teal-500 underline"
        >
          Click Here To Connect With Us On Telegram And Stay Updated On All Our
          Latest News And Opportunities
        </a>
    
    </div>
    </div>
   
  );
}
