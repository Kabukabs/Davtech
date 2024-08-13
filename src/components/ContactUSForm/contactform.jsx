import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from 'framer-motion';

const initialState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactUsForm() {
  const [form, setForm] = useState(initialState);
  const [captchaValue, setCaptchaValue] = useState(null);
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
      .then(
        (result) => {
          setSuccess(true);
          setError(false);
          setForm(initialState);
          setCaptchaValue(null);
        },
        (error) => {
          setError(true);
          setSuccess(false);
          console.error("EmailJS error:", error.text);
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.form
        onSubmit={sendEmail}
        ref={formRef}
        className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <motion.input
            onChange={handleChange}
            type="text"
            value={form.name}
            name="name"
            required
            placeholder="Name"
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            initial={{ scale: 1 }}
            whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)' }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          />
        </div>
        <div className="mb-6">
          <motion.input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            required
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            initial={{ scale: 1 }}
            whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)' }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          />
        </div>
        <div className="mb-6">
          <p className="text-sm">
            <strong>
              Please enter the email address where you wish to receive our answer. If you are a registered member of DavTechinvest, please include the email address you used when you registered to help us locate your account as soon as possible.
            </strong>
          </p>
        </div>
        <div className="mb-6">
          <motion.textarea
            onChange={handleChange}
            name="message"
            placeholder="Message"
            value={form.message}
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            rows="5"
            required
            initial={{ scale: 1 }}
            whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)' }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          />
        </div>
        <div className="mb-6">
          <ReCAPTCHA
            sitekey="6LftdhwqAAAAADcfG8owy9QpSc-B6yoKmbmLpLeA"
            onChange={handleCaptchaChange}
          />
        </div>
        <div className="text-center">
          <motion.input
            type="submit"
            value="Submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          />
          {error && <p className="text-red-500 mt-2">Error occurred while sending the message. Please try again.</p>}
          {success && <p className="text-green-500 mt-2">Message sent successfully!</p>}
        </div>
      </motion.form>
    </div>
  );
}
