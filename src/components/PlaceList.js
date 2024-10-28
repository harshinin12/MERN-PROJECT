// src/components/PlaceList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PlaceList.css';

function PlaceList() {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  const [newPlace, setNewPlace] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    rating: 0,
    location: '',
    amenities: '',
    details: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/listings')
      .then((response) => response.json())
      .then((data) => setPlaces(data))
      .catch((error) => console.error('Error fetching places:', error));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPlace((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Process amenities as an array by splitting comma-separated values
    const placeData = { ...newPlace, amenities: newPlace.amenities.split(',').map(a => a.trim()) };

    fetch('http://localhost:5000/api/auth/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(placeData)
    })
      .then((response) => response.json())
      .then((newPlaceData) => {
        setPlaces((prevPlaces) => [...prevPlaces, newPlaceData]);
        setShowForm(false);
        setNewPlace({
          name: '',
          image: '',
          description: '',
          price: '',
          rating: 0,
          location: '',
          amenities: '',
          details: ''
        });
      })
      .catch((error) => console.error('Error adding place:', error));
  };

  const filteredPlaces = places
    .filter((place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'price') return a.price - b.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div>
      <h1 className='place-list'>Available Places</h1>
      <button className='place-list-button' onClick={() => setShowForm(!showForm)}>Add New Listing</button>
      
      {showForm && (
        <form onSubmit={handleFormSubmit} className="new-listing-form">
          <input type="text" name="name" placeholder="Name" value={newPlace.name} onChange={handleFormChange} required />
          <input type="text" name="image" placeholder="Image URL" value={newPlace.image} onChange={handleFormChange} required />
          <textarea name="description" placeholder="Description" value={newPlace.description} onChange={handleFormChange} required />
          <input type="number" name="price" placeholder="Price" value={newPlace.price} onChange={handleFormChange} required />
          <input type="number" name="rating" placeholder="Rating" value={newPlace.rating} onChange={handleFormChange} />
          <input type="text" name="location" placeholder="Location" value={newPlace.location} onChange={handleFormChange} required />
          <input type="text" name="amenities" placeholder="Amenities (comma-separated)" value={newPlace.amenities} onChange={handleFormChange} />
          <textarea name="details" placeholder="Details" value={newPlace.details} onChange={handleFormChange} />
          <button type="submit">Submit</button>
        </form>
      )}
      
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="place-list">
        {filteredPlaces.map((place) => (
          <div key={place._id} className="place-item">
            <img src={place.image} alt={place.name} />
            <h2>{place.name}</h2>
            <p>{place.description}</p>
            <Link to={`/listings/${place._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceList;
