import React, { useEffect, useState } from 'react';

function HatForm() {
  const [hat, setHat] = useState({
    fabric: '',
    style: '',
    color: '',
    picture: '',
    location: '',
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try{
        const response = await fetch ('http://localhost:8100/api/locations/');
    if (!response.ok) {
        throw new Error('failure');
    }
      const data = await response.json();
      setLocations(data.locations);
    } catch (error) {
        console.error('whoopsie', error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHat({ ...hat, [name]: value });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setHat({ ...hat, location: value }); // Update the selected bin ID
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = await fetch ('http://localhost:8090/api/hats/', {
        method: "POST",
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(hat),
    });
    if (!response.ok) {
        throw new Error('Failed to create hat entry');
      }
      setHat({
        fabric: '',
        style: '',
        color: '',
        picture: '',
        location: '',
      });
    } catch (error) {
      console.error('Error creating hat entry:', error);
    }
  }

    return (
        <div className="container mt-5">
          <h2>Add a hat</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="picture" className="form-label">Picture</label>
              <input
                type="text"
                className="form-control"
                id="picture"
                name="picture"
                value={hat.picture}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fabric" className="form-label">Fabric</label>
              <input
                type="text"
                className="form-control"
                id="fabric"
                name="fabric"
                value={hat.fabric}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="style" className="form-label">Style</label>
              <input
                type="text"
                className="form-control"
                id="style"
                name="style"
                value={hat.style}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="color" className="form-label">Color</label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                value={hat.color}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <select className="form-control" id="location" name="location" value={hat.location} onChange={handleChange} required>
                <option value="" disabled>Select a location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.closet_name} - {location.section_number}/{location.shelf_number}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add helmet</button>
          </form>
        </div>
      );
    }
    
    export default HatForm;