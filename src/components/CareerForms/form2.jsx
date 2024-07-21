import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const initialState = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  cv: "",
  joinas1: false,
  joinas2: false,
};
export default function MentorAdvisor() {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    setForm(initialState);
    navigate('/thank-you');
  };
  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  return (
    <form onSubmit={{ submitForm }}>
      <div>
        <h2>MENTOR/ADVISOR</h2>
        <p>
          Join DavTechinvest As A Mentor Or Advisor To Shape The Future Of Technology And Careers By Sharing Your Expertise With Aspiring Tech Professionals. You`ll Empower The next Generation Of Leaders, Expand Your Network , Stay Updated On Industry Trends, And Play A Pivotal Role In Transforming Ideas Into Successful Ventures. Fill Out The Form Below To Express Your Interest And Help Cultivate
          Talent And Drive Innovation.
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
        <label>CV Upload</label>
      </div>
      <div>
         <h3>Join As</h3>
        <label>Mentor
        <input
               onChange= {(event) =>
                  handleChange(event)
               }
               checked = {form.mentor}
               type = "checkbox"
               name = "joinas1"
               value= "Mentor"/>
        </label>
        <label>Advisor
        <input
               onChange= {(event) =>
                  handleChange(event)
               }
               checked = {form.mentor}
               type = "checkbox"
               name = "joinas2"
               value= "Advisor"/>
        </label>

      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}
