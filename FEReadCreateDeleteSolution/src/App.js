import React, { useState, useEffect } from 'react';
import { PropertyService } from './service/PropertyService';
import './App.css';

function App() {
  const [properties, setProperties] = useState([]); // List of properties for the table
  const [formData, setFormData] = useState({ name: "", agentEmail: "", price: "" }); // Form state

  // Load properties when the page first opens
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const data = await PropertyService.getAllProperties();
    setProperties(data);
  };

  const handleCreate = async () => {
    try {
      const result = await PropertyService.createProperty(formData);
      if (result && result.id) { // If the backend returns the new property with an ID
        alert("Property Created Successfully! 🎉");
        loadProperties(); // Refresh the table without a page reload
        setFormData({ name: "", agentEmail: "", price: "" }); // Clear the form
      }
    } catch (error) {
      alert("Failed to create property. Please check input.");
    }
  };

  return (
    <div className="container">
      <h1>Property Management</h1>

      {/* Creation Panel - Level 1 Layout */}
      <div className="form-panel">
        <input type="text" placeholder="Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Agent Email" value={formData.agentEmail}
          onChange={(e) => setFormData({ ...formData, agentEmail: e.target.value })} />
        <input type="number" placeholder="Price" value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        <button onClick={handleCreate}>Add Property</button>
      </div>

      {/* Data Table - Level 1 Layout */}
      <table className="property-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Price</th></tr>
        </thead>
        <tbody>
          {properties.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.agentEmail}</td>
              <td>${p.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;