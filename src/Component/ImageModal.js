import React from 'react';
import '../style/imageModal.css';

function ImageModal({ image, closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={closeModal}>&times;</span>
        <img src={image.urls.regular} alt={image.alt_description} />
        <h2>User: {image.user.username}</h2>
        <p>Likes: {image.likes}</p>
      </div>
    </div>
  );
}

export default ImageModal;
