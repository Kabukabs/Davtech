import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { subSchema } from "../lib/schemas/subscribe"
import { FooterLinks } from "../lib/constants/footer"
import { Text } from "../components/ui/text"


export const Footer =()=>{

    const form = useForm({
        resolver: zodResolver(subSchema),
        defaultValues: {
            mail: "",
        },
    })

    function onSubmit(values) {
        console.log(values)
    }

    return(
        <footer className="lg:px-[8rem] md:px-[4rem] md:p-12 p-4 py-8 flex flex-col gap-4 bg-mediumgrey w-full">
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-12 gap-8 ">
                {FooterLinks.map((links,index)=>(
                    <div key={index} className="flex flex-col gap-2">
                        <Text key={index} as="h3" style="md:text-lg text-md font-semibold w-fit">{links.Header}</Text>
                        {links.links.map((item,index)=>item.routes?<Link key={index} to={item.routes} className="md:text-lg text-sm w-fit">{item.title}</Link>:<Text key={index} as="h4" style="md:text-lg text-sm">{item.title}</Text>)}
                    </div>
                ))}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:w-[50%] w-full flex gap-2 items-end">
                    <FormField
                    control={form.control}
                    name="mail"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                        <FormLabel className="md:text-lg text-sm">Subscribe to our news letter</FormLabel>
                        <FormControl>
                            <Input placeholder="xyz@gmail.com" {...field} type="email" required className="w-full"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="border border-black text-white">Submit</Button>
                </form>
            </Form>
        </footer>
    )
}