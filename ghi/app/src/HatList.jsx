import React, { useState, useEffect } from "react";

function HatsList() {
  const [hats, setHats] = useState([]);

  useEffect(() => {
    // Fetch the hats from the backend
    fetch("http://localhost:8090/api/hats")
      .then(response => response.json())
      .then(data => {
        if (data && data.Hats) {
          setHats(data.Hats);
        } else {
          console.error("Invalid data structure returned from API:", data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the hats!", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hat?")) {
      // Delete the hat from the backend
      fetch(`http://localhost:8090/api/hats/${id}`, { method: "DELETE" })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Remove the hat from the state
          setHats(hats.filter(hat => hat.id !== id));
        })
        .catch(error => {
          console.error("There was an error deleting the hat!", error);
        });
    }
  };

  // Conditional rendering to handle case when hats is still empty
  if (hats.length === 0) {
    return <p>Loading hats...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Hat List</h2>
      <div className="row">
        {hats.map(hat => (
          <div className="col-md-4" key={hat.id} value={hat.id}>
            <div className="card mb-4">
              <img src={hat.picture} className="card-img-top" alt={hat.style} />
              <div className="card-body">
                <h5 className="card-title">{hat.style}</h5>
                <p className="card-text">Fabric: {hat.fabric}</p>
                <p className="card-text">Color: {hat.color}</p>
                <p className="card-text">Location: {hat.location.import_href}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger" onClick={() => handleDelete(hat.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HatsList;