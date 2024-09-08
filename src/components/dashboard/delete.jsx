import { useState } from 'react';
import { Button } from '../ui/button';
import { db } from '/src/components/CareerForms/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

export const DeleteModal = ({ projectId, onClose }) => {
  const [isFormVisible, setFormVisible] = useState(true); // Default to showing the form

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (confirmed) {
      try {
        const projectRef = doc(db, 'projects', projectId);
        await deleteDoc(projectRef);
        onClose();
      } catch (error) {
        console.error("Error deleting project: ", error);
      }
    }
  };

  return (
    <div className="p-4">
      {isFormVisible ? (
        <div>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this project? This process cannot be undone.</p>
          <Button onClick={handleDelete} className="bg-red-500 mt-4">
            Confirm Delete
          </Button>
        </div>
      ) : (
        <div>
          <h2>Deleted Successfully</h2>
          <Button type="button" onClick={() => onClose()} className="bg-gray-500 mt-4">
            Close
          </Button>
        </div>
      )}
    </div>
  );
};
