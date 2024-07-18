import { Introsection } from "../components/section/home/introsection";
import { Partnership } from "../components/section/home/partnership";
import { Service } from "../components/section/home/service";
import { Specialty } from "../components/section/home/specialty";
import { Technology } from "../components/section/home/technology";

export const Home =()=>{
    return(
        <>
            <Introsection/>
            <Service/>
            <Specialty/>
            <Partnership/>
            <Technology/>
        </>
    )
}