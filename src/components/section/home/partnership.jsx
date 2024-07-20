import { Text } from "../../ui/text"
export const Partnership =()=>{
    return(
        <div className=" w-full md:gap-8 gap-4 lg:px-[8rem] md:px-[4rem] md:pb-[4rem] p-4">
            <Text
                as="h2"
                style="text-4xl font-extrabold mb-8 text-blue"
                >
                PARTNERSHIP
            </Text>
            <Text
                as="h4"
                style="md:text-lg text-md mb-8"
                >
                At DavTechInvest, we believe in the strength of collaboration and are proud to partner with leading organizations that share our commitment to innovation and excellence. Our partnerships span across technology providers, industry associations, and academic institutions, fostering a rich ecosystem of knowledge and resources.
            </Text>
            <ul className="list-disc md:text-lg text-sm">
                {["Technology Partners: We collaborate closely with top-tier technology providers to stay at the forefront of Web2 and Web3 advancements, ensuring our solutions remain cutting-edge.","Industry Associations: Our memberships in key industry associations enable us to stay abreast of the latest trends and best practices, enhancing our ability to deliver superior services.","Academic Institutions: Collaborations with renowned academic institutions fuel our continuous learning and innovation, allowing us to incorporate the latest research findings into our services."].map((info,index)=>(
                    <li key={index}>
                        {info}
                    </li>
                ))}
            </ul>
        </div>
    )
}