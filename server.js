const express = require('express'); // Express framework for building web applications
const cors = require('cors');       // Middleware for handling CORS (Cross-Origin Resource Sharing)
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const admin = require('firebase-admin'); // Firebase Admin SDK for interacting with Firebase
const PDFDocument = require('pdfkit'); // Library for generating PDFs
const nodemailer = require('nodemailer'); // Library for sending emails
const { config } = require('dotenv'); // Library for loading environment variables

// Load environment variables from a custom file
config({ path: './sample.env' }); // Use the .env file for environment configuration

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Path to Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Use the service account credentials
  databaseURL: `https://${process.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com` // Firebase database URL
});

const db = admin.firestore(); // Get Firestore database instance

// Initialize Express app
const app = express(); // Create an instance of Express

// Enable CORS
app.use(cors({
  origin: ['http://localhost:9000'], // Update with your localhost URL if different
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600
}));

// Middleware to parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
  const formData = req.body; // Get the form data from the request body
  console.log('Received form data:', formData); // Log the received data for debugging

  try {
    // Determine the collection based on form type
    const collectionName = formData.mentor || formData.advisor ? 'mentors_advisors' : 'skill_collaborators';

    // Save form data to Firestore
    const docRef = await db.collection(collectionName).add(formData); // Add document to the Firestore collection
    console.log('Document written with ID: ', docRef.id); // Log the document ID

    // Generate PDF from form data
    const pdfBuffer = await generatePDF(formData); // Generate PDF and get it as a buffer
    console.log('PDF generated'); // Log PDF generation

    // Send PDF via email
    await sendEmail(formData, pdfBuffer); // Send email with the form data and PDF attachment
    console.log('Email sent'); // Log email sending

    res.status(200).send('Form submitted successfully!'); // Send success response
  } catch (error) {
    console.error('Error submitting form:', error); // Log any errors
    res.status(500).send('Error submitting form'); // Send error response
  }
});

// Function to generate PDF from form data
const generatePDF = (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument(); // Create a new PDF document
    let buffers = []; // Array to collect PDF data

    doc.on('data', buffers.push.bind(buffers)); // Collect PDF data
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers); // Concatenate buffers into a single PDF buffer
      resolve(pdfData); // Resolve the promise with the PDF buffer
    });

    doc.text('Form Submission'); // Add title to the PDF
    doc.moveDown(); // Move down to create spacing
    for (let key in data) {
      doc.text(`${key}: ${data[key]}`); // Add form data to the PDF
      doc.moveDown(); // Move down to create spacing
    }

    doc.end(); // End the PDF document
  });
};

// Function to send email with form data and PDF attachment
const sendEmail = async (data, pdfBuffer) => {
  try {
    console.log('Setting up email transporter...'); // Log email setup
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Email service to use
      auth: {
        user: process.env.VITE_EMAIL_USER, // Email address for authentication
        pass: process.env.VITE_EMAIL_PASS  // Password for authentication
      }
    });

    console.log('Sending email...'); // Log email sending
    let info = await transporter.sendMail({
      from: `"Form Submission" <${process.env.VITE_EMAIL_USER}>`, // Sender's email
      to: process.env.VITE_EMAIL_USER, // Recipient's email
      subject: 'New Form Submission', // Subject of the email
      text: `New form submission:\n\n${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')}`, // Email body text
      attachments: [
        {
          filename: 'form_submission.pdf', // Name of the attachment
          content: pdfBuffer, // PDF buffer as the content
          contentType: 'application/pdf' // Content type for the attachment
        }
      ]
    });

    console.log('Message sent: %s', info.messageId); // Log the email message ID
  } catch (error) {
    console.error('Error sending email: ', error.message); // Log any email sending errors
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Start the server
const PORT = process.env.VITE_PORT || 5174 || 5173 || 9000; // Port to listen on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the server start
});
