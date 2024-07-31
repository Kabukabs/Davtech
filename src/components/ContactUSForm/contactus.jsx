import backgroundImage from "../../../public/imagecontact.jpg";
export default function Contactus(){
    return(
        <div>
            <div  style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '30vh', // Adjust height as needed
        color: 'white', // To make text readable against the background
        padding: '20px', // Adjust padding as needed
      }}  className="flex items-center justify-center text-white p-8">
            <div class="text-center">
                <h2 className="text-4xl font-bold mb-2" >HOW CAN WE HELP YOU?</h2>
                <p className="text-[15px]" >We are revolutionizing the investment landscape with data-driven insights.</p>
                <p className="text-[15px]">Explore how DavTechinvest can elevate your investment strategy.</p>
            </div>
            </div>
        </div>
    )
}