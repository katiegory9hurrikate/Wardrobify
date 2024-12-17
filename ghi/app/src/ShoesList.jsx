import React, { useState, useEffect } from "react";

function ShoesList() {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    // Fetch the shoes from the backend
    fetch("http://localhost:8080/api/shoes")
      .then(response => response.json())
      .then(data => setShoes(data.shoes))
      .catch(error => {
        console.error("There was an error fetching the shoes!", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this shoe?")) {
      // Delete the shoe from the backend
      fetch(`http://localhost:8080/api/shoes/${id}`, { method: "DELETE" })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Remove the shoe from the state
          setShoes(shoes.filter(shoe => shoe.id !== id));
        })
        .catch(error => {
          console.error("There was an error deleting the shoe!", error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Shoes List</h2>
      <div className="row">
        {shoes.map(shoe => (
          <div className="col-md-4" key={shoe.id}>
            <div className="card mb-4">
              <img src={shoe.picture_url} className="card-img-top" alt={shoe.model_name} />
              <div className="card-body">
                <h5 className="card-title">{shoe.model_name}</h5>
                <p className="card-text">Manufacturer: {shoe.manufacturer}</p>
                <p className="card-text">Color: {shoe.shoe_color}</p>
                <p className="card-text">Bin: {shoe.bin.import_href}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger" onClick={() => handleDelete(shoe.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoesList;
