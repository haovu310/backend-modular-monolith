
import React, { useState, useEffect } from 'react';
import { PropertyService } from './service/PropertyService';
import Login from './component/auth/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null); // Auth state
  const [properties, setProperties] = useState([]); // List of properties for the table
  const [formData, setFormData] = useState({ name: "", agentEmail: "", price: "" }); // Form state
  const [editingProperty, setEditingProperty] = useState(null); // State for the property being edited
  const [createErrors, setCreateErrors] = useState({}); // Errors for Create Form
  const [updateErrors, setUpdateErrors] = useState({}); // Errors for Update Modal

  // Level 3 Part III: Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('id'); // Default sort by ID

  // Load properties when the page first opens
  // Load properties when page or sort changes, ONLY if user is logged in
  useEffect(() => {
    if (user) {
      loadProperties();
    }
  }, [user, currentPage, sortBy]);

  const loadProperties = async () => {
    const data = await PropertyService.getAllProperties(currentPage, sortBy);
    if (data && data.content) {
      setProperties(data.content);
      setTotalPages(data.totalPages);
    } else {
      setProperties([]);
      setTotalPages(0);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(0); // Reset to first page on sort change
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };
  const validate = (data) => {
    let tempErrors = {};
    let isValid = true;

    // Price Validation: 0 - 2 billion
    if (data.price < 0 || data.price > 2000000000) {
      tempErrors.price = "The price must range from 0 to 2 billion, e.g., 200,000";
      isValid = false;
    }

    // Email Validation: prefix@domain, domain ends with .com
    // prefix is alphanumeric, period, dash, or underscore
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
    if (!data.agentEmail || !emailRegex.test(data.agentEmail)) {
      tempErrors.agentEmail = "Email must follow the pattern prefix@domain, e.g. me@test.com";
      isValid = false;
    }

    return { isValid, errors: tempErrors };
  };

  const handleCreate = async () => {
    const { isValid, errors } = validate(formData);
    setCreateErrors(errors);
    if (!isValid) return;

    try {
      const result = await PropertyService.createProperty(formData);
      if (result && result.id) { // If the backend returns the new property with an ID
        alert("Property Created Successfully! 🎉");
        loadProperties(); // Refresh the table without a page reload
        setFormData({ name: "", agentEmail: "", price: "" }); // Clear the form
        setCreateErrors({}); // Clear create errors on success
      }
    } catch (error) {
      alert("Failed to create property. Please check input.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) { // Optional confirmation
      try {
        await PropertyService.deleteProperty(id);
        loadProperties();
      } catch (error) {
        alert("Failed to delete property.");
      }
    }
  };

  const handleEditClick = (property) => {
    setEditingProperty({ ...property });
    setUpdateErrors({}); // Clear update errors when opening modal
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditingProperty({ ...editingProperty, [name]: value });
  };

  const handleUpdate = async () => {
    const { isValid, errors } = validate(editingProperty);
    setUpdateErrors(errors);
    if (!isValid) return;

    try {
      await PropertyService.updateProperty(editingProperty.id, editingProperty);
      alert("Successfully update property");
      setEditingProperty(null);
      loadProperties();
    } catch (error) {
      alert("Failed to update property.");
    }
  };

  return (
    <div className="container">
      {/* Auth Gate - Level 3 Part IV */}
      {!user ? (
        <Login onLogin={(userData) => setUser(userData)} />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Property Management</h1>
            <button onClick={() => setUser(null)} style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Logout ({user.email})
            </button>
          </div>

          {/* Creation Panel - Level 1 Layout */}
          <div className="form-panel">
            <input type="text" placeholder="Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

            <input type="email" placeholder="Agent Email" value={formData.agentEmail}
              className={createErrors.agentEmail ? "input-error" : ""}
              onChange={(e) => setFormData({ ...formData, agentEmail: e.target.value })} />
            {createErrors.agentEmail && <small className="error-msg">{createErrors.agentEmail}</small>}

            <input type="number" placeholder="Price" value={formData.price}
              className={createErrors.price ? "input-error" : ""}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            {createErrors.price && <small className="error-msg">{createErrors.price}</small>}

            <button onClick={handleCreate} style={{ marginTop: '10px' }}>Add Property</button>
          </div>

          {/* Sorting Control - Level 3 Part III */}
          <div className="sort-container">
            <label style={{ marginRight: '10px' }}>Sort by: </label>
            <select className="sort-select" value={sortBy} onChange={handleSortChange}>
              <option value="id">ID (Default)</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="agentEmail">Email</option>
            </select>
          </div>

          {/* Data Table - Level 1 Layout */}
          <table className="property-table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Email</th><th>Price</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.agentEmail}</td>
                    <td>${p.price.toLocaleString()}</td>
                    <td>
                      <button className="action-btn edit-btn" onClick={() => handleEditClick(p)}>Update</button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No properties found.</td></tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls - Level 3 Part III */}
          <div className="pagination">
            <button className="page-btn"
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button key={index}
                className={`page-btn ${currentPage === index ? 'active' : ''}`}
                onClick={() => handlePageChange(index)}>
                {index}
              </button>
            ))}

            <button className="page-btn"
              disabled={currentPage === totalPages - 1 || totalPages === 0}
              onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </div>

          {/* Update Modal - Level 2 Layout */}
          {editingProperty && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="modal-header">Update Property {editingProperty.id}</h2>

                <input type="text" name="name" placeholder="Name"
                  value={editingProperty.name} onChange={handleUpdateChange} />

                <input type="email" name="agentEmail" placeholder="Agent Email"
                  className={updateErrors.agentEmail ? "input-error" : ""}
                  value={editingProperty.agentEmail} onChange={handleUpdateChange} />
                {updateErrors.agentEmail && <small className="error-msg">{updateErrors.agentEmail}</small>}

                <input type="number" name="price" placeholder="Price"
                  className={updateErrors.price ? "input-error" : ""}
                  value={editingProperty.price} onChange={handleUpdateChange} />
                {updateErrors.price && <small className="error-msg">{updateErrors.price}</small>}

                <div className="modal-actions">
                  <button className="cancel-btn" onClick={() => setEditingProperty(null)}>Cancel</button>
                  <button className="update-btn" onClick={handleUpdate}>Update</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div >
  )
}

export default App;