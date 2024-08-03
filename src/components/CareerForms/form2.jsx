import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from '../CareerForms/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const initialState = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  cv: null,
  mentor: false,
  advisor: false,
};

export default function MentorAdvisor() {
  const [form, setForm] = useState(initialState);
  const [cvFileName, setCvFileName] = useState("Click To Upload");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleUpload = (event) => {
    const { name, files } = event.target;
    setForm({ ...form, [name]: files[0] });
    setCvFileName(files[0] ? files[0].name : "Click To Upload");
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let cvUrl = '';
      if (form.cv) {
        const cvRef = ref(storage, `cv/${form.cv.name}`);
        console.log('Uploading CV:', form.cv.name);
        await uploadBytes(cvRef, form.cv);
        console.log('CV uploaded successfully');
        cvUrl = await getDownloadURL(cvRef);
        console.log('CV download URL:', cvUrl);
      }

      const formData = {
        name: form.name || "",
        email: form.email || "",
        phone: form.phone || "",
        experience: form.experience || "",
        cv: cvUrl || "",
        mentor: form.mentor || false,
        advisor: form.advisor || false,
      };

      console.log('Submitting form data:', formData);

      await addDoc(collection(db, 'mentors_advisors'), formData);
      console.log('Form data added to Firestore');

      // Send form data to the server using fetch
      const response = await fetch('http://localhost:5174/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Form data sent to server');

      setForm(initialState);
      setCvFileName("Click To Upload");
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert(`There was an error submitting the form: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 bg-babyblue">
      <form
        onSubmit={submitForm}
        encType="multipart/form-data"
        className="w-full max-w-[800px]"
      >
        <div>
          <h2 className="font-bold text-darkblue mb-6 text-[40px]">
            MENTOR/ADVISOR
          </h2>
          <p className="text-darkblue text-[20px] mb-6">
            Join DavTechinvest As A Mentor Or Advisor To Shape The Future Of
            Technology And Careers By Sharing Your Expertise With Aspiring Tech
            Professionals. You’ll Empower The Next Generation Of Leaders, Expand
            Your Network, Stay Updated On Industry Trends, And Play A Pivotal
            Role In Transforming Ideas Into Successful Ventures. Fill Out The
            Form Below To Express Your Interest And Help Cultivate Talent And
            Drive Innovation.
          </p>
          <p className="text-darkblue text-[20px] mb-5">
            Fill out the form below to express your interest and help cultivate
            talent and drive innovation.
          </p>
        </div>

        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-darkblue md:text-right mb-1 md:mb-0 text-[15px]"
            htmlFor="name"
          >
            <span className="text-red-500">*</span>
            Name
          </label>
          <div className="w-full overflow-hidden">
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={form.name}
              required
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-darkblue md:text-right mb-1 md:mb-0 text-[15px]"
            htmlFor="email"
          >
            <span className="text-red-500">*</span>
            Email
          </label>
          <div className="w-full overflow-hidden">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={form.email}
              required
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-16 focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-10">
          <label
            className="block text-darkblue md:text-right mb-1 md:mb-0 text-[15px]"
            htmlFor="phone"
          >
            <span className="text-red-500">*</span>
            Phone
          </label>
          <div className="w-full overflow-hidden">
            <input
              onChange={handleChange}
              type="number"
              name="phone"
              value={form.phone}
              required
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-darkblue md:text-right mb-2 text-[15px]"
            htmlFor="experience"
          >
            <span className="text-red-500">*</span>
            Experience
          </label>
          <div className="w-full overflow-hidden">
            <textarea
              onChange={handleChange}
              name="experience"
              value={form.experience}
              required
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-6 mt-10 focus:outline-none focus:bg-white focus:border-purple-500"
              id="experience"
              rows="5"
              cols="50"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-darkblue md:text-right mb-1 md:mb-0 text-[15px]"
            htmlFor="cv"
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
              className="bg-gray-200 border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ml-10 cursor-pointer"
            >
              {cvFileName}
            </label>
          </label>
        </div>

        <div className="md:flex md:items-center mb-6">
          <h3 className="block text-darkblue md:text-right mb-2 text-[15px]">Join As</h3>
          <div className="flex flex-col md:flex-row items-start mb-2 bg-gray-100 p-2 rounded">
            <label className="text-darkblue flex items-center mb-2">
              <input
                onChange={handleChange}
                checked={form.mentor}
                type="checkbox"
                name="mentor"
                className="ml-2 bg-blue"
              />
              Mentor
            </label>
            <label className="text-darkblue flex items-center">
              <input
                onChange={handleChange}
                checked={form.advisor}
                type="checkbox"
                name="advisor"
                className="ml-2 bg-blue"
              />
              Advisor
            </label>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <input
              type="submit"
              value={loading ? "Submitting..." : "Submit"}
              disabled={loading}
              className="shadow bg-blue mt-4 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
