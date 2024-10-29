// src/components/PlaceDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PlaceDetail.css';

function PlaceDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/listings/${id}`)
      .then((response) => response.json())
      .then((data) => setPlace(data))
      .catch((error) => console.error('Error fetching place details:', error));
  }, [id]);

  if (!place) return <div>Loading...</div>;

  const handleBooking = () => {
    navigate('/booking', { state: { place } });
  };

  return (
    <div className="place-detail">
      <h1>{place.name}</h1>
      <img src={place.image} alt={place.name} />
      <p>{place.description}</p>
      <p><strong>Price:</strong> ${place.price}</p>
      <p><strong>Rating:</strong> {place.rating}</p>
      <p><strong>Location:</strong> {place.location}</p>
      <h3>Amenities</h3>
      <ul>
        {place.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      <p><strong>Details:</strong> {place.details}</p>

      <button className="sumbit-btn" onClick={handleBooking}>Book Now</button>
      <hr></hr>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default PlaceDetail;
