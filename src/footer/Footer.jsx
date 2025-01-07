import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { subSchema } from '../lib/schemas';
import { FooterLinks } from '../lib/constants/footer';
import { Text } from '../components/ui/custom-ui/text';
import { motion } from 'framer-motion';
import { db } from '../components/CareerForms/firebaseConfig'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';

export const Footer = () => {
  const form = useForm({
    resolver: zodResolver(subSchema),
    defaultValues: {
      mail: '',
    },
  });

  const { reset, handleSubmit, control } = form;

  async function onSubmit(values) {
    try {
      // Add the email to the Firestore collection
      const docRef = await addDoc(collection(db, 'subscribers'), {
        email: values.mail,
      });
      console.log('Document written with ID: ', docRef.id);
      
      // Reset form fields after successful submission
      reset();
      // Optionally, you can show a success message here
    } catch (e) {
      console.error('Error adding document: ', e);
      // Optionally, you can show an error message here
    }
  }

  return (
    <footer className="mt-auto lg:px-[8rem] xl:px-[14rem] md:px-[4rem] md:p-12 p-4 py-8 bg-mediumgrey w-full">
      <div className="max-w-[1540px] flex flex-col gap-4">
        <motion.nav
          className="grid md:grid-cols-3 grid-cols-1 md:gap-12 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {FooterLinks.map((links, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Text
                as="h3"
                style="md:text-lg text-md font-semibold w-fit"
              >
                {links.Header}
              </Text>
              {links.links.map((item, index) =>
                item.routes ? (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="md:text-md text-sm w-fit"
                  >
                    <Link
                      to={item.routes}
                      className="hover:text-teal-600 transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ) : (
                  <Text
                    key={index}
                    as="h4"
                    style="md:text-md text-sm"
                  >
                    {item.title}
                  </Text>
                )
              )}
            </motion.div>
          ))}
        </motion.nav>

        <Form {...form}>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 md:w-[50%] w-full flex gap-2 items-end mt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <FormField
              control={control}
              name="mail"
              render={({ field }) => (
                <motion.div
                  className="flex-grow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FormItem>
                    <FormLabel className="md:text-lg text-sm">
                      Subscribe to our newsletter
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="xyz@gmail.com"
                        {...field}
                        type="email"
                        required
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button type="submit" className="border border-black text-white">
                Submit
              </Button>
            </motion.div>
          </motion.form>
        </Form>
      </div>
    </footer>
  );
};
