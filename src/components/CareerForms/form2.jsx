import { useState } from "react";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  cv: null,
  joinas1: false,
  joinas2: false,
}
export default function MentorAdvisor() {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const [cvFileName, setCvFileName] = useState("Click To Upload");
  const submitForm = (event) => {
    event.preventDefault();
    setForm(initialState);
    navigate("/thank-you");
  };
  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleUpload = (event) => {
    const { name, files } = event.target;
    setForm({ ...form, [name]: files[0] });
    setCvFileName(files[0] ? files[0].name : "Click To Upload");
  };
  return (
    <div className="flex items-center justify-center min-h-screen w-full  p-4 bg-babyblue">
      <form
        onSubmit={ submitForm}
        enctype="multipart/form-data"
        className="w-full max-w-[800px]"
      >
        <div>
          <h2 className="font-bold text-darkblue mb-6 text-[40px]">
            MENTOR/ADVISOR
          </h2>
          <p className="text-darkblue text-[20px] mb-6">
            Join DavTechinvest As A Mentor Or Advisor To Shape The Future Of
            Technology And Careers By Sharing Your Expertise With Aspiring Tech
            Professionals. You`ll Empower The next Generation Of Leaders, Expand
            Your Network , Stay Updated On Industry Trends, And Play A Pivotal
            Role In Transforming Ideas Into Successful Ventures. Fill Out The
            Form Below To Express Your Interest And Help Cultivate Talent And
            Drive Innovation.
          </p>
          <p className=" text-darkblue text-[20px] mb-5">
            fill out the form below to express your interest and help cultivate
            talent and drive innovation.
          </p>
        </div>
        <div class="md:flex md:items-center mb-6">
          <label
            class="block text-darkblue  md:text-right mb-1 md:mb-0 text-[15px] "
            for="inline-name"
          >
            <span className="text-red-500">*</span>
            Name
          </label>
          <div class="w-full overflow-hidden">
            <input
              onChange={(event) => handleChange(event)}
              type="text"
              name="name"
              value={form.name}
              required
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <label
            class="block text-darkblue  md:text-right mb-1 md:mb-0 text-[15px] "
            for="inline-email"
          >
            <span className="text-red-500">*</span>
            Email
          </label>
          <div class="w-full overflow-hidden">
            <input
              onChange={(event) => handleChange(event)}
              type="email"
              name="email"
              value={form.email}
              required
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-16 focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-10">
          <label
            class="block text-darkblue  md:text-right mb-1 md:mb-0 text-[15px] "
            for="inline-phone"
          >
            <span className="text-red-500">*</span>
            Phone
          </label>
          <div class="w-full overflow-hidden">
            <input
              onChange={(event) => handleChange(event)}
              type="number"
              name="phone"
              value={form.phone}
              required
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <label
            class="block text-darkblue  md:text-right  mb-2 text-[15px] "
            for="inline-experience"
          >
            <span className="text-red-500">*</span>
            Experience
          </label>
          <div class="w-full overflow-hidden">
            <textarea
              onChange={(event) => handleChange(event)}
              name="experience"
              value={form.experience}
              required
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-6 mt-10 focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-experience"
              rows="5"
              cols="50"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <label
            class="block text-darkblue  md:text-right mb-1 md:mb-0 text-[15px] "
            for="inline-cv"
          >
            CV Upload
            <input
              onChange={handleUpload}
              type="file"
              name="cv"
              className="hidden"
              id="cvUpload"
            />
            <label
              htmlFor="cvUpload"
              className="bg-gray-200 border-2 border-gray-200  w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ml-10 cursor-pointer"
            >
              {cvFileName}
            </label>
          </label>
        </div>

       <div class="md:flex md:items-center mb-6">
  <h3 class="block text-darkblue md:text-right mb-2 text-[15px]" for="inline-experience">Join As</h3>
  <div class="flex flex-col md:flex-row items-start mb-2 bg-gray-100 p-2 rounded">
    <label class="text-darkblue flex items-center mb-2">
      <input
        onChange={(event) => handleChange(event)}
        checked={form.mentor}
        type="checkbox"
        name="joinas1"
        value="mentor"
        class="ml-2 bg-blue"
      /> Mentor
    </label>
    <label class="text-darkblue flex items-center">
      <input
        onChange={(event) => handleChange(event)}
        checked={form.advisor}
        type="checkbox"
        name="joinas2"
        value="advisor"
        class="ml-2 bg-blue"
      /> Advisor
    </label>
  </div>
</div>

        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <input
              type="submit"
              value="Submit"
              class="shadow bg-blue  mt-4 text-white font-bold py-2 px-4 rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
