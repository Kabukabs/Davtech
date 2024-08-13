import { useState } from "react"; // Import useState hook for managing component state
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { db, storage } from '../CareerForms/firebaseConfig'; // Import Firebase Firestore and Storage instances
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { motion } from 'framer-motion'; // Import framer-motion for animations

// Initial state for the form
const initialState = {
  name: "", // User's name
  email: "", // User's email address
  phone: "", // User's phone number
  experience: "", // User's experience description
  cv: null, // User's CV file
  mentor: false, // Boolean indicating if the user wants to be a mentor
  advisor: false, // Boolean indicating if the user wants to be an advisor
};

export default function MentorAdvisor() {
  // State hooks for form data, file name display, and loading status
  const [form, setForm] = useState(initialState); // State to manage form data
  const [cvFileName, setCvFileName] = useState("Click To Upload"); // State for displaying the CV file name
  const [loading, setLoading] = useState(false); // State to manage loading status
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle changes to form fields
  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Handle file upload input changes
  const handleUpload = (event) => {
    const { name, files } = event.target;
    setForm({ ...form, [name]: files[0] });
    setCvFileName(files[0] ? files[0].name : "Click To Upload");
  };

  // Handle form submission
  const submitForm = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true

    try {
      let cvUrl = ''; // Variable to store CV download URL
      // Upload CV file if provided
      if (form.cv) {
        const cvRef = ref(storage, `cv/${form.cv.name}`); // Reference to Firebase Storage
        console.log('Uploading CV:', form.cv.name);
        await uploadBytes(cvRef, form.cv); // Upload file to Firebase Storage
        console.log('CV uploaded successfully');
        cvUrl = await getDownloadURL(cvRef); // Get the download URL for the uploaded file
        console.log('CV download URL:', cvUrl);
      }

      // Prepare form data for Firestore
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

      // Add form data to Firestore collection
      await addDoc(collection(db, 'mentors_advisors'), formData);
      console.log('Form data added to Firestore');

      // Reset form state and navigate to thank-you page
      setForm(initialState);
      setCvFileName("Click To Upload");
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert(`There was an error submitting the form: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 bg-babyblue">
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Initial state for form animation
        animate={{ opacity: 1, y: 0 }} // Animate to final state
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }} // Animation duration and type
        className="w-full max-w-[800px]"
      >
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

        {/* Form fields */}
        <form onSubmit={submitForm}>
          {[
            { name: 'name', type: 'text', label: 'Name' },
            { name: 'email', type: 'email', label: 'Email' },
            { name: 'phone', type: 'number', label: 'Phone' }
          ].map((field, index) => (
            <motion.div
              key={field.name}
              className="md:flex md:items-center mb-6"
              initial={{ opacity: 0, y: 20 }} // Initial state for field animation
              animate={{ opacity: 1, y: 0 }} // Animate to final state
              transition={{ duration: 0.6, delay: index * 0.2 }} // Animation duration and delay
            >
              <label
                className="block text-darkblue md:text-right mb-1 md:mb-0 text-[15px]"
                htmlFor={field.name}
              >
                <span className="text-red-500">*</span>
                {field.label}
              </label>
              <div className="w-full overflow-hidden">
                <input
                  onChange={handleChange} // Handle input changes
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-purple-500"
                />
              </div>
            </motion.div>
          ))}

          <motion.div
            className="md:flex md:items-center mb-6"
            initial={{ opacity: 0, y: 20 }} // Initial state for textarea animation
            animate={{ opacity: 1, y: 0 }} // Animate to final state
            transition={{ duration: 0.6, delay: 0.6 }} // Animation duration and delay
          >
            <label
              className="block text-darkblue md:text-right mb-2 text-[15px]"
              htmlFor="experience"
            >
              <span className="text-red-500">*</span>
              Experience
            </label>
            <div className="w-full overflow-hidden">
              <textarea
                onChange={handleChange} // Handle input changes
                name="experience"
                value={form.experience}
                required
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-6 mt-10 focus:outline-none focus:bg-white focus:border-purple-500"
                id="experience"
                rows="5"
                cols="50"
              />
            </div>
          </motion.div>

          <motion.div
            className="md:flex md:items-center mb-6"
            initial={{ opacity: 0, y: 20 }} // Initial state for file upload animation
            animate={{ opacity: 1, y: 0 }} // Animate to final state
            transition={{ duration: 0.6, delay: 0.8 }} // Animation duration and delay
          >
            <label
              className="block text-darkblue md:text-right mb-1 md:mb-0 text-[15px]"
              htmlFor="cv"
            >
              CV Upload
              <input
                onChange={handleUpload} // Handle file upload
                type="file"
                name="cv"
                className="hidden"
                id="cvUpload"
              />
              <label
                htmlFor="cvUpload"
                className="bg-gray-200 border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ml-10 cursor-pointer"
              >
                {cvFileName} {/* Display the file name or default text */}
              </label>
            </label>
          </motion.div>

          <motion.div
            className="md:flex md:items-center mb-6"
            initial={{ opacity: 0, y: 20 }} // Initial state for checkboxes animation
            animate={{ opacity: 1, y: 0 }} // Animate to final state
            transition={{ duration: 0.6, delay: 1 }} // Animation duration and delay
          >
            <h3 className="block text-darkblue md:text-right mb-2 text-[15px]">Join As</h3>
            <div className="flex flex-col md:flex-row items-start mb-2 bg-gray-100 p-2 rounded">
              <label className="text-darkblue flex items-center mb-2">
                <input
                  onChange={handleChange} // Handle checkbox change
                  checked={form.mentor}
                  type="checkbox"
                  name="mentor"
                  className="ml-2 bg-blue"
                />
                Mentor
              </label>
              <label className="text-darkblue flex items-center">
                <input
                  onChange={handleChange} // Handle checkbox change
                  checked={form.advisor}
                  type="checkbox"
                  name="advisor"
                  className="ml-2 bg-blue"
                />
                Advisor
              </label>
            </div>
          </motion.div>

          {/* Submit button */}
          <motion.div
            className="md:flex md:items-center"
            initial={{ opacity: 0, y: 20 }} // Initial state for button animation
            animate={{ opacity: 1, y: 0 }} // Animate to final state
            transition={{ duration: 0.6, delay: 1.2 }} // Animation duration and delay
          >
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <motion.button
                type="submit"
                disabled={loading} // Disable button while loading
                className="shadow bg-blue mt-4 text-white font-bold py-2 px-4 rounded cursor-pointer"
                whileHover={{ scale: 1.05 }} // Scale on hover
                whileTap={{ scale: 0.95 }} // Scale on click
              >
                {loading ? "Submitting..." : "Submit"} {/* Display loading state or submit text */}
              </motion.button>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
