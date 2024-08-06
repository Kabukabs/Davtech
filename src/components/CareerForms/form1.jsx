import { useState } from 'react'; // Import useState hook for managing component state
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { db, storage } from '../CareerForms/firebaseConfig'; // Import Firebase Firestore and Storage instances
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions

// Initial state for the form
const initialState = {
  name: '',
  email: '',
  phone: '',
  experience: '',
  cv: null,
};

export default function SkillCollab() {
  // State hooks for form data, file name display, and loading status
  const [form, setForm] = useState(initialState);
  const [cvFileName, setCvFileName] = useState('Click To Upload');
  const [loading, setLoading] = useState(false);
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

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      let cvUrl = '';
      if (form.cv) {
        const reader = new FileReader();
        reader.readAsDataURL(form.cv);
        reader.onloadend = async () => {
          const base64data = reader.result.split(',')[1];
          const response = await fetch('https://your-region-your-project-id.cloudfunctions.net/uploadFile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: form.cv.name,
              data: base64data,
            }),
          });
  
          if (response.ok) {
            const data = await response.json();
            cvUrl = data.url;
  
            await addDoc(collection(db, 'skill_collaborators'), {
              name: form.name,
              email: form.email,
              phone: form.phone,
              experience: form.experience,
              cv: cvUrl,
            });
  
            const apiUrl = import.meta.env.VITE_API_URL;
  
            const apiResponse = await fetch(`${apiUrl}/submit-form`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: form.name,
                email: form.email,
                phone: form.phone,
                experience: form.experience,
                cvUrl,
              }),
            });
  
            if (apiResponse.ok) {
              setForm(initialState);
              navigate('/thank-you');
            } else {
              throw new Error('Form submission failed');
            }
          } else {
            throw new Error('File upload failed');
          }
        };
      } else {
        await addDoc(collection(db, 'skill_collaborators'), {
          name: form.name,
          email: form.email,
          phone: form.phone,
          experience: form.experience,
          cv: cvUrl,
        });
  
        const apiUrl = import.meta.env.VITE_API_URL;
  
        const response = await fetch(`${apiUrl}/submit-form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            experience: form.experience,
            cvUrl,
          }),
        });
  
        if (response.ok) {
          setForm(initialState);
          navigate('/thank-you');
        } else {
          throw new Error('Form submission failed');
        }
      }
    } catch (error) {
      console.error('Error submitting form: ', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 bg-babyblue">
      <form
        onSubmit={submitForm} // Handle form submission
        encType="multipart/form-data" // Form encoding type for file uploads
        className="w-full max-w-[800px]"
      >
        <div>
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
        </div>

        {/* Form fields */}
        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-darkblue md:text-right mb-1 md:mb-0 text-[15px]"
            htmlFor="inline-name"
          >
            <span className="text-red-500">*</span>
            Name:
          </label>
          <div className="w-full overflow-hidden">
            <input
              onChange={handleChange} // Handle input changes
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
            htmlFor="inline-email"
          >
            <span className="text-red-500">*</span>
            Email:
          </label>
          <div className="w-full overflow-hidden">
            <input
              onChange={handleChange} // Handle input changes
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
            htmlFor="inline-phone"
          >
            <span className="text-red-500">*</span>
            Phone:
          </label>
          <div className="w-full overflow-hidden">
            <input
              onChange={handleChange} // Handle input changes
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
            htmlFor="inline-experience"
          >
            <span className="text-red-500">*</span>
            Experience:
          </label>
          <div className="w-full overflow-hidden">
            <textarea
              onChange={handleChange} // Handle input changes
              name="experience"
              value={form.experience}
              required
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight ml-6 mt-10 focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-experience"
              rows="5"
              cols="50"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
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
        </div>

        {/* Submit button */}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <input
              type="submit"
              value={loading ? 'Submitting...' : 'Submit'} // Display loading state or submit text
              disabled={loading} // Disable button while loading
              className="shadow bg-blue mt-4 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
