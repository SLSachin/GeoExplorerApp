import React from 'react';

const LocationPreview = ({ location, onClose }) => {
  return (
    <div className="location-preview">
      <div className="preview-header">
        <h2>{location.title}</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <p>{location.address}</p>
      {/* Add more details or customize the preview as needed */}
      <div className="preview-actions">
        {/* Add delete and edit buttons for admin role */}
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default LocationPreview;
