import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
const initialState = {
  name: "",
  email: "",
  message: "",
};
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
      .sendForm('service_cjx0wxe', 'template_evb8bo7', formRef.current, {
        publicKey: 'DPzMJ9yxiCT6adfIN',
      })
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
    <div>
      <form onSubmit ={sendEmail} ref={formRef}class="w-full max-w-[800px]">
       <div>
        <input 
        onChange={(event) => handleChange(event)}
        type="text"
        value = {form.name}
        name="name"
        placeholder="Name"
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-purple-500"
        />
        </div> 
        <div>
            <input
            onChange={(event) => handleChange(event)}
            name = "email"
            type="email"
            placeholder="Email Address"
            value = {form.email}
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-purple-500"/>
        </div>
        <div>
            <p>Please enter the email address where you wish to receive our answer. If you are a registered member of DavTechinvest, please include the email address you used when you registered if possible to help us locate your account as soon as possible</p>
        </div>
        <div>
            <textarea
            onChange={(event) => handleChange(event)}
            name = "message"
            value = {form.message}
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-6 mt-10 focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-experience"
              rows="5"
              cols="50"/>
        </div>
        <div>
          <ReCAPTCHA
            sitekey="6LftdhwqAAAAADcfG8owy9QpSc-B6yoKmbmLpLeA" // Replace with your reCAPTCHA site key
            onChange={handleCaptchaChange}
          />
        </div>
        <div>
            <input
            type="submit"
            value="submit"></input>
            {error && <p>Error occured while sending the message. Please try again</p>}
            {success && <p>Message sent successfully!</p>}
        </div>
      </form>
    </div>
  );
}
