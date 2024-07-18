import { Services } from "../../../lib/constants/home"
import { Text } from "../../ui/text"

export const Service =()=>{
    return(
        <div>
            <Text
                as="h1"
                style="text-4xl font-extrabold text-center mb-8"
                >
                SERVICES
            </Text>
            <div className="service_herobg w-full grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 lg:px-[8rem] md:px-[4rem] md:py-0 p-2">
                {Services.map((info,index)=>(
                    <div key={index} className="flex flex-col items-center justify-center gap-4 p-8 shadow rounded-2xl bg-white">
                        <div className="w-[8rem">
                            <img 
                                src={info.img}
                                alt="object not found"
                                className="w-full"
                            />
                        </div>
                        <Text
                            as="h2"
                            style="text-xl font-semibold text-center"
                            >
                           {info.title}
                        </Text>
                        <Text
                            as="h3"
                            style="text-md text-center"
                            >
                            {info.info} 
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    )
}