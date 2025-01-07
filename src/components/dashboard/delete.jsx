/*
 * This React component, DeleteModal, handles the deletion of a project from a Firebase Firestore database.
 * It prompts the user for confirmation before deleting the project and provides feedback on whether the deletion was successful.
 * If the deletion is confirmed, the project is removed from Firestore and the modal is closed.
 */

import { useState } from 'react';
import { Button } from '../ui/button'; // Custom Button component
import { db } from '/src/components/CareerForms/firebaseConfig'; // Firestore configuration
import { doc, deleteDoc } from 'firebase/firestore'; // Firestore functions for document handling

export const DeleteModal = ({ projectId, onClose }) => {
  // State to manage the visibility of the form
  const [isFormVisible] = useState(true); // Default to showing the delete confirmation form

  // Function to handle the delete operation
  const handleDelete = async () => {
    // Confirm the deletion with the user
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (confirmed) {
      try {
        // Reference to the specific project document in Firestore
        const projectRef = doc(db, 'projects', projectId);
        
        // Delete the project from Firestore
        await deleteDoc(projectRef);
        
        // Close the modal after successful deletion
        onClose();
      } catch (error) {
        // Log any errors that occur during the deletion process
        console.error("Error deleting project: ", error);
      }
    }
  };

  return (
    <div className="p-4">
      {/* Display the confirmation form if the form is visible */}
      {isFormVisible ? (
        <div>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this project? This process cannot be undone.</p>
          
          {/* Button to confirm the deletion */}
          <Button onClick={handleDelete} className="bg-red-500 mt-4">
            Confirm Delete
          </Button>
        </div>
      ) : (
        // If the form is no longer visible, display a message indicating success
        <div>
          <h2>Deleted Successfully</h2>
          
          {/* Button to close the modal */}
          <Button type="button" onClick={() => onClose()} className="bg-gray-500 mt-4">
            Close
          </Button>
        </div>
      )}
    </div>
  );
};
