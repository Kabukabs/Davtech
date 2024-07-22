import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const initialState = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  cv: null,
};
export default function SkillCollab() {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    setForm(initialState);
    navigate('/thank-you');
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  const handleUpload = (event) => {
    const { name, files } = event.target;
    setForm({ ...form, [name]: files[0] });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <form onSubmit={ submitForm } enctype= "multipart/form-data" className="w-full max-w-lg   space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">SKILLFUL COLLABORATION</h2>
        <p className="text-gray-600 mb-4">
          Embark On A Transformative Journey With DavTechinvest, Where You Can
          Access Personalized Mentorship, Engage In Collaborative Projects, And Build A Standout Portfolio. Turn Your Ideas Into Reality And Gain Hands-On Experience While Potentially Becoming A Startup Owner. Ready To Elevate Your Career? Join Our Dynamic Community Today!
        </p>
        <p className="text-gray-600 mb-4">
          fill out the form below to express your interest and help cultivate
          talent and drive innovation.
        </p>
      </div>
      <div className="space-y-4">
        <label className="block text-gray-700">
        <span className="text-red-500">*</span>
          Name
          <input
            onChange={(event) => handleChange(event)}
            type="text"
            name="name"
            value={form.name}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block text-gray-700">
        <span className="text-red-500">*</span>
          Email
          <input
            onChange={(event) => handleChange(event)}
            type="email"
            name="email"
            value={form.email}
            required
             className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block text-gray-700">
        <span className="text-red-500">*</span>
          Phone
          <input
            onChange={(event) => handleChange(event)}
            type="number"
            name="phone"
            value={form.phone}
            required
             className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block text-gray-700">
        <span className="text-red-500">*</span>
          Experience
          <textarea
            onChange={(event) => handleChange(event)}
            name="experience"
            value={form.experience}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
          />
        </label>
        <label>CV Upload
        <input
            onChange={handleUpload}
            type="file"
            name="cv"
            className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm"
          />
        </label>
      </div>

      <input type="submit" value="Submit" className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"/>
    </form>
    </div>
  );
}
