import React, { useState } from "react";
import axios from "axios";

const DeleteTag = ({ tagId, onDelete }: any) => {
  const handleDelete = async () => {
    try {
      // Log before sending the request
      console.log('Deleting tag with ID:', tagId);
  
      // Make the delete request
      const response = await axios.delete(`/api/tags/${tagId}`);
  
      // Log the response from the server
      console.log('Server response:', response.data);
  
      // If successful, trigger the onDelete callback
      if (onDelete) {
        onDelete();
      }
    } catch (error:any) {
      console.error("Error deleting tag:", error);
  
      // Log the error response if available
      if (error.response) {
        console.error('Server error response:', error.response.data);
      }
    }
  };
  
  return (
    <div>
      <p>Are you sure you want to delete this tag?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteTag;
