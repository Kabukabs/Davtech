import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
const initialState = {
  name: "",
  email: "",
  message: "",
};
const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
export default function ContactUsForm() {
  const [form, setForm] = useState(initialState);
  const [captchaValue, setCaptchaValue] = useState(null);
  const formRef = useRef();
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const sendEmail = (event) => {
    event.preventDefault();
    if (!captchaValue) {
      alert("Please verify that you are a human!");
      return;
    }

    emailjs
      .sendForm('service_cjx0wxe', 'template_evb8bo7', formRef.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then((result) => {
          setSuccess(true);
          setError(false);
          setForm(initialState);
          setCaptchaValue(null);
        },
        (error) => {
          setError(true);
          setSuccess(false);
        },
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit ={sendEmail} ref={formRef}className="w-full max-w-[600px] mt-10">
       <div className="mb-4">
        <input 
        onChange={(event) => handleChange(event)}
        type="text"
        value = {form.name}
        name="name"
        required
        placeholder="Name"
        class=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-black-500"
        />
        </div> 
        <div className="mb-6 mt-10">
            <input
            onChange={(event) => handleChange(event)}
            name = "email"
            type="email"
            placeholder="Email Address"
            value = {form.email}
            required
            class=" appearance-none border-2 border-black-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-black-500"/>
        </div>
        <div className="mb-4 mt-10 ml-10">
            <p className="text-[15px] ml-4"> <strong>Please enter the email address where you wish to receive our answer. If you are a registered member of DavTechinvest, please include the email address you used when you registered if possible to help us locate your account as soon as possible. </strong></p>
        </div>
        <div className="ml-8">
            <textarea
            onChange={(event) => handleChange(event)}
            name = "message"
            placeholder="Message"
            value = {form.message}
            className="   appearance-none border-2 border-black-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-6 mt-10 focus:outline-none focus:bg-white focus:border-black-500"
              id="inline-experience"
              rows="8"
              cols="50"
              required/>
        </div>
        <div className="mb-4 ml-14 flex">
          <ReCAPTCHA className="mt-10"
            sitekey= {recaptchaKey}// Replace with your reCAPTCHA site key
            onChange={handleCaptchaChange}
          />
        </div>
        <div className="mb-4 flex justify-end">
            <input
            type="submit"
            value="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white  py-2 px-4 "></input>
            {error && <p className="text-red-500 mt-2">Error occured while sending the message. Please try again</p>}
            {success && <p className="text-green-500 mt-2">Message sent successfully!</p>}
        </div>
      </form>
    </div>
  );
}
