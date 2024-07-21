import { Text } from "../../ui/text"
import { Button } from "@/components/ui/button"

export const Introsection =()=>{
    return(
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[10rem] gap-4 md:py-[2arem] md:px-[4rem] px-4 py-[3rem]">
            <div className="w-full">
                <img 
                    src="/intro-hero.svg"
                    alt="object not found"
                    className="w-full"
                />
            </div>
            <div className="flex flex-col md:gap-[3rem] gap-[2rem]">
                <div>
                    <Text
                        as="h2"
                        style="md:text-5xl text-4xl font-extrabold"
                        >
                        EMPOWERING 
                    </Text>
                    <Text
                        as="h2"
                        style="md:text-5xl text-4xl font-extrabold text-blue"
                        >
                        INVESTMENT
                    </Text>
                    <Text
                        as="h2"
                        style="md:text-5xl text-4xl font-extrabold"
                        >
                        THROUGH
                    </Text>
                    <Text
                        as="h2"
                        style="md:text-5xl text-4xl font-extrabold text-blue"
                        >
                        DATA-DRIVEN
                    </Text>
                    <Text
                        as="h2"
                        style="md:text-5xl text-4xl font-extrabold"
                        >
                        SOLUTIONS
                    </Text>
                    </div>
                    <div>
                        <Text
                            as="h4"
                            style="md:text-xl text-lg font-semibold md:w-[50%] w-full"
                            >
                            Leveraging Web2 & Web3 
                            Technologies For Investable 
                            Industry Success
                        </Text>
                    </div>
                <div className="grid grid-cols-2">
                    <Button className="text-black border border-blue md:text-xl text-md font-semibold bg-white py-[1.5rem] rounded mr-[-0.3rem]">
                        Sign Up
                    </Button>
                    <Button className="text-white border bg-blue border border-blue md:text-xl text-md font-semibold py-[1.5rem] rounded mr-[-0.3rem]">
                        Contact Us
                    </Button>
                </div>
            </div>
        </div>
    )
}