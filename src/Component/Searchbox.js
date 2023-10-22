import React, { useState } from 'react';
import ImageModal from './ImageModal';
import '../style/searchbox.css';

function Searchbox() {
  const [imageName, setImageName] = useState('');
  const [selectedImage,setSelectedImage] = useState('');
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getImages = async () => {
    try {
      const key = process.env.REACT_APP_API_SECRET_KEY;
      const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${imageName}&client_id=${key}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const results = await response.json();
      setInfo(results.results);
      setError(null);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    }
  }

  const handleInput = (e) => {
    setImageName(e.target.value);
  }

  return (
    <div className='searchbox'>
      <div className='header'>
        <h1>Find Images</h1>
        <div className='search'>
            <input type='text' onChange={handleInput} placeholder='Search Anything...' />
            <button onClick={getImages}>Search</button>
        </div>
      </div> 
      {error && <div className="error">{error}</div>}
      <div className='search-result'>
        {info.map((item, index) => (
          <div key={index} onClick={() => openModal(item)}>
            <img src={item.urls.small} alt={item.alt_description} />
            <div className='img-info'>
                <h3>{item.user.username}</h3>
                <h3>{item.likes}❤️</h3>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageModal image={selectedImage} closeModal={closeModal} />
      )}
    </div>
  );
}

export default Searchbox;
