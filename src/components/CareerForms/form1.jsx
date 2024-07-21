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
    <form onSubmit={ submitForm } enctype= "multipart/form-data">
      <div>
        <h2>SKILLFUL COLLABORATION</h2>
        <p>
          Embark On A Transformative Journey With DavTechinvest, Where You Can
          Access Personalized Mentorship, Engage In Collaborative Projects, And Build A Standout Portfolio. Turn Your Ideas Into Reality And Gain Hands-On Experience While Potentially Becoming A Startup Owner. Ready To Elevate Your Career? Join Our Dynamic Community Today!
        </p>
        <p>
          fill out the form below to express your interest and help cultivate
          talent and drive innovation.
        </p>
      </div>
      <div>
        <label>
          *Name
          <input
            onChange={(event) => handleChange(event)}
            type="text"
            name="name"
            value={form.name}
            required
          />
        </label>
        <label>
          *Email
          <input
            onChange={(event) => handleChange(event)}
            type="email"
            name="email"
            value={form.email}
            required
          />
        </label>
        <label>
          *Phone
          <input
            onChange={(event) => handleChange(event)}
            type="number"
            name="phone"
            value={form.phone}
            required
          />
        </label>
        <label>
          *Experience
          <textarea
            onChange={(event) => handleChange(event)}
            name="experience"
            value={form.experience}
            required
          />
        </label>
        <label>CV Upload
        <input
            onChange={handleUpload}
            type="file"
            name="cv"
          />
        </label>
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
}
