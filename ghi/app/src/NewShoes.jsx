import React, { useState, useEffect } from 'react';

function NewShoes() {
  const [shoe, setShoe] = useState({
    manufacturer: '',
    model_name: '',
    shoe_color: '',
    picture_url: '',
    bin: '', // This should store the ID of the selected bin
  });

  const [bins, setBins] = useState([]);

  useEffect(() => {
    fetchBins();
  }, []);

  const fetchBins = async () => {
    try {
      const response = await fetch('http://localhost:8100/api/bins/');
      if (!response.ok) {
        throw new Error('Failed to fetch bins');
      }
      const data = await response.json();
      console.log('Fetched bins:', data); // Log fetched data for debugging
      setBins(data.bins);
    } catch (error) {
      console.error('Error fetching bins:', error);
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShoe({ ...shoe, [name]: value });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setShoe({ ...shoe, bin: value }); // Update the selected bin ID
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/shoes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoe),
      });
      if (!response.ok) {
        throw new Error('Failed to create shoe entry');
      }
      // Optionally handle success, clear form, show confirmation, etc.
      setShoe({
        manufacturer: '',
        model_name: '',
        shoe_color: '',
        picture_url: '',
        bin: '',
      });
    } catch (error) {
      console.error('Error creating shoe entry:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Shoe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="picture_url" className="form-label">Photo URL</label>
          <input
            type="text"
            className="form-control"
            id="picture_url"
            name="picture_url"
            value={shoe.picture_url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
          <input
            type="text"
            className="form-control"
            id="manufacturer"
            name="manufacturer"
            value={shoe.manufacturer}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="model_name" className="form-label">Model Name</label>
          <input
            type="text"
            className="form-control"
            id="model_name"
            name="model_name"
            value={shoe.model_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shoe_color" className="form-label">Color</label>
          <input
            type="text"
            className="form-control"
            id="shoe_color"
            name="shoe_color"
            value={shoe.shoe_color}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bin" className="form-label">Bin</label>
          <select className="form-control" id="bin" name="bin" value={shoe.bin} onChange={handleChange} required>
            <option value="" disabled>Select a bin</option>
            {bins.map(bin => (
              <option key={bin.id} value={bin.id}>{bin.closet_name} - {bin.bin_number}/{bin.bin_size}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Kicks</button>
      </form>
    </div>
  );
}

export default NewShoes;
