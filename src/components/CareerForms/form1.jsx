import { useState } from 'react'; // Import useState hook for managing component state
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation
import { db, storage } from '../CareerForms/firebaseConfig'; // Import Firebase Firestore and Storage instances
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { motion } from 'framer-motion'; // Import framer-motion for animations

// Initial state for the form
const initialState = {
  name: '', // User's name
  email: '', // User's email address
  phone: '', // User's phone number
  experience: '', // User's experience description
  cv: null, // User's CV file
};

export default function SkillCollab() {
  // State hooks for form data, file name display, and loading status
  const [form, setForm] = useState(initialState); // State to manage form data
  const [cvFileName, setCvFileName] = useState('Click To Upload'); // State for displaying the CV file name
  const [loading, setLoading] = useState(false); // State to manage loading status
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle changes to form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Handle file upload input changes
  const handleUpload = (event) => {
    const { name, files } = event.target;
    setForm({ ...form, [name]: files[0] });
    setCvFileName(files[0] ? files[0].name : 'Click To Upload');
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
        cv: cvUrl || "", // Include CV URL if available
      };

      console.log('Submitting form data:', formData);

      // Add form data to Firestore collection
      await addDoc(collection(db, 'skill_collab'), formData);
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
      <motion.form
        onSubmit={submitForm} // Handle form submission
        encType="multipart/form-data" // Form encoding type for file uploads
        className="w-full max-w-[800px]"
        initial={{ opacity: 0, y: 20 }} // Initial state for form animation
        animate={{ opacity: 1, y: 0 }} // Animate to final state
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }} // Animation duration and type
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }} // Initial state for header animation
          animate={{ opacity: 1, y: 0 }} // Animate to final state
          transition={{ duration: 0.6, delay: 0.2 }} // Animation duration and delay
        >
          <h2 className="font-bold text-darkblue mb-6 text-[40px]">
            SKILLFUL COLLABORATION
          </h2>
          <p className="text-darkblue text-[20px] mb-6">
            Embark on a transformative journey with DavTechinvest, where you can
            access personalized mentorship, engage in collaborative projects,
            and build a standout portfolio. Turn your ideas into reality and
            gain hands-on experience while potentially becoming a startup owner.
            Ready to elevate your career? Join our dynamic community today!
          </p>
          <p className="text-darkblue text-[20px] mb-5">
            Fill out the form below to express your interest and help cultivate
            talent and drive innovation.
          </p>
        </motion.div>

        {/* Form fields */}
        {['name', 'email', 'phone', 'experience'].map((field, index) => (
          <motion.div
            key={field}
            className="md:flex md:items-center mb-6"
            initial={{ opacity: 0, y: 20 }} // Initial state for field animation
            animate={{ opacity: 1, y: 0 }} // Animate to final state
            transition={{ duration: 0.6, delay: index * 0.2 }} // Animation duration and delay
          >
            <label
              className="block text-darkblue md:text-right mb-1 md:mb-0 text-[15px]"
              htmlFor={`inline-${field}`}
            >
              <span className="text-red-500">*</span>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <div className="w-full overflow-hidden">
              {field === 'experience' ? (
                <textarea
                  onChange={handleChange} // Handle input changes
                  name={field}
                  value={form[field]}
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-6 mt-10 focus:outline-none focus:bg-white focus:border-purple-500"
                  id={`inline-${field}`}
                  rows="5"
                  cols="50"
                />
              ) : (
                <input
                  onChange={handleChange} // Handle input changes
                  type={field === 'phone' ? 'number' : 'text'}
                  name={field}
                  value={form[field]}
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-14 focus:outline-none focus:bg-white focus:border-purple-500"
                />
              )}
            </div>
          </motion.div>
        ))}

        <motion.div
          className="md:flex md:items-center mb-6"
          initial={{ opacity: 0, y: 20 }} // Initial state for file upload animation
          animate={{ opacity: 1, y: 0 }} // Animate to final state
          transition={{ duration: 0.6, delay: 0.6 }} // Animation duration and delay
        >
          <label
            className="block text-darkblue md:text-right mb-1 md:mb-0 text-[15px]"
            htmlFor="inline-cv"
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

        {/* Submit button */}
        <motion.div
          className="md:flex md:items-center"
          initial={{ opacity: 0, y: 20 }} // Initial state for submit button animation
          animate={{ opacity: 1, y: 0 }} // Animate to final state
          transition={{ duration: 0.6, delay: 0.8 }} // Animation duration and delay
        >
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <motion.input
              type="submit"
              value={loading ? 'Submitting...' : 'Submit'} // Display loading state or submit text
              disabled={loading} // Disable button while loading
              className="shadow bg-blue mt-4 text-white font-bold py-2 px-4 rounded cursor-pointer"
              whileHover={{ scale: 1.05 }} // Scale on hover
              whileTap={{ scale: 0.95 }} // Scale on click
            />
          </div>
        </motion.div>
      </motion.form>
    </div>
  );
}
