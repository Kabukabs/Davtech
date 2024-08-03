const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const { config } = require('dotenv');

// Load environment variables from custom file
config({ path: './sample.env' });

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`
});

const db = admin.firestore();

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins (adjust as needed)
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  try {
    // Determine the collection based on form type
    const collectionName = formData.mentor || formData.advisor ? 'mentors_advisors' : 'skill_collaborators';

    // Save form data to Firestore
    const docRef = await db.collection(collectionName).add(formData);
    console.log('Document written with ID: ', docRef.id);

    // Generate PDF from form data
    const pdfBuffer = await generatePDF(formData);

    // Send PDF via email
    await sendEmail(formData, pdfBuffer);

    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).send('Error submitting form');
  }
});

// Function to generate PDF
const generatePDF = (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.text('Form Submission');
    doc.moveDown();
    for (let key in data) {
      doc.text(`${key}: ${data[key]}`);
      doc.moveDown();
    }

    doc.end();
  });
};

// Function to send email
const sendEmail = async (data, pdfBuffer) => {
  try {
    console.log('Setting up email transporter...');
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: process.env.VITE_EMAIL_USER, // Use environment variable
        pass: process.env.VITE_EMAIL_PASS  // Use environment variable
      }
    });

    console.log('Sending email...');
    let info = await transporter.sendMail({
      from: `"Form Submission" <${process.env.VITE_EMAIL_USER}>`, // Replace with your email
      to: process.env.VITE_EMAIL_USER, // Replace with admin's email
      subject: 'New Form Submission',
      text: `New form submission:\n\n${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')}`,
      attachments: [
        {
          filename: 'form_submission.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email: ', error.message);
    throw error;
  }
};

// Start server
const PORT = process.env.VITE_PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
