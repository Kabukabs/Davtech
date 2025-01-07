/**
 * The ApplyForJob component renders a form for users to apply for a job.
 * It allows users to enter their name, email, and upload a CV.
 * The component uses React Hook Form for form management, React Spring for animations, and Firebase for data storage.
 */

import React, { useState } from 'react';
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
import { Text } from '@/components/ui/custom-ui/text'; 
import { ApplySchema } from '../../lib/schemas'; 
import { useSpring, animated } from 'react-spring'; 
import { db, storage } from '/src/components/CareerForms/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

export const ApplyForJob = ({ jobTitle }) => {
  // State for tracking the file upload status and the selected CV file
  const [uploadStatus, setUploadStatus] = useState(null); 
  const [cvFile, setCvFile] = useState(null); 

  // Initialize React Hook Form with validation schema
  const form = useForm({
    resolver: zodResolver(ApplySchema), 
    defaultValues: {
      name: '',
      email: '',
    },
  });

  // Animation for fade-in effect
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  // Animation for button bounce effect
  const bounceProps = useSpring({
    transform: 'scale(1.1)',
    from: { transform: 'scale(1)' },
    config: { tension: 200, friction: 10 },
    reset: true,
  });

  /**
   * Handles file input change event and sets the selected CV file.
   * @param {Event} e - The event object.
   */
  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]); 
  };

  /**
   * Uploads the CV file to Firebase Storage and returns the file URL.
   * @param {File} file - The CV file to upload.
   * @returns {Promise<string>} - The URL of the uploaded CV.
   */
  const uploadCv = async (file) => {
    const storageRef = ref(storage, `applicationCV/${file.name}`); 
    await uploadBytes(storageRef, file); 
    const url = await getDownloadURL(storageRef); 
    return url; 
  };

  /**
   * Handles form submission, including uploading the CV and saving form data to Firebase Firestore.
   * @param {Object} values - The form data.
   */
  async function onSubmit(values) {
    try {
      let cvUrl = null;

      if (cvFile) {
        cvUrl = await uploadCv(cvFile); 
      }

      // Save form data to Firebase Firestore
      const docRef = await addDoc(collection(db, 'jobApplications'), {
        name: values.name,
        email: values.email,
        jobTitle: jobTitle, 
        cvUrl: cvUrl || '', 
      });
      console.log('Document written with ID: ', docRef.id);

      setUploadStatus('Document uploaded successfully!'); 
      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      console.error('Error adding document: ', error);
      setUploadStatus('Failed to upload document.'); 
    }
  }

  return (
    <animated.div style={fadeInProps} className="max-w-[1540px] flex flex-col gap-4">
      <Text
        as="h6"
        style="text-center text-blue md:text-2xl font-extrabold border-b-2 border-blue mb-8 w-fit m-auto"
      >
        APPLY FOR {jobTitle} 
      </Text>
      {uploadStatus && <p className="text-center text-red-600">{uploadStatus}</p>} 
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col mt-4 gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <div className="flex gap-2">
                  <FormLabel className="md:text-md text-sm w-[7rem]">
                    Name:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your name"
                      {...field}
                      type="text"
                      required
                      className="w-full"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <div className="flex gap-2">
                  <FormLabel className="md:text-md text-sm w-[7rem]">
                    Email:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your email"
                      {...field}
                      type="email"
                      required
                      className="w-full"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cv"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <div className="flex gap-2">
                  <FormLabel className="md:text-md text-sm w-[7rem]">
                    CV:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <animated.div style={bounceProps}>
            <Button type="submit" className="bg-blue text-white w-full">
              Submit
            </Button>
          </animated.div>
        </form>
      </Form>
    </animated.div>
  );
};
