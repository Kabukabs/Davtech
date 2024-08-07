const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { Storage } = require('@google-cloud/storage');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize Google Cloud Storage client
const storage = new Storage();

// Cloud Function to handle file uploads
exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Extract name and data from the request body
      const { name, data } = req.body;

      // Define the bucket and file path
      const bucket = storage.bucket('davtech-firebase.appspot.com'); // Update with your bucket name
      const file = bucket.file(`cv/${name}`);

      // Convert base64 data to buffer
      const buffer = Buffer.from(data, 'base64');

      // Save the file to the bucket
      await file.save(buffer, {
        metadata: {
          contentType: 'application/pdf', // Update as necessary
        },
        public: true, // Make the file publicly accessible
      });

      // Generate the public URL for the uploaded file
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      // Send the URL in the response
      res.status(200).send({ url: publicUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send({ error: 'Failed to upload file' });
    }
  });
});
