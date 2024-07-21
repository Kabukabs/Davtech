import { Text } from "../../ui/text"

export const Specialty =()=>{
    return(
        <div className=" w-full md:gap-8 gap-4 lg:px-[8rem] md:px-[4rem] md:py-[5rem] p-4 py-[3rem]">
            <Text
                as="h4"
                style="text-2xl font-semibold mb-8 md:w-[85%] w-full"
                >
                We specialize in developing software for investable industries 
                across various sectors, including but not limited to:
            </Text>
            <div className="flex flex-col mb-8">
                {["Technology","Transport","Healthcare","Finance","E-Commerce","Renewable Energy","Agriculture and Lots more"].map((info,index)=>(
                    <div key={index} className="flex gap-2 items-center">
                        {"-"}
                        <Text
                            as="h5"
                            style="text-md"
                            >
                           {info}
                        </Text>
                    </div>
                ))}
            </div>
            <Text
                as="h5"
                style="md:text-lg text-md"
                >
                Each sector benefits from our data-driven approach, helping stakeholders navigate uncertainties and capitalize on opportunities.
            </Text>
        </div>
    )
}