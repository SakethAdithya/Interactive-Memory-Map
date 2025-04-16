import React, { useState } from "react";

const MemoryForm = ({ fetchMemories }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [images, setImages] = useState([]);

  const getCoordinates = async (location, state, country) => {
    const query = `${location}, ${state}, ${country}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        return { lat: data[0].lat, lng: data[0].lon };
      } else {
        alert("Location not found! Please enter a valid location.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("Error fetching location data.");
      return null;
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocationName("");
    setState("");
    setCountry("");
    setImages([]);
    document.querySelector('input[type="file"]').value = null; // Clear file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coordinates = await getCoordinates(locationName, state, country);
    if (!coordinates) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", JSON.stringify(coordinates));
    formData.append("country", country);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:5000/api/memories/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Memory added successfully!");
        setTimeout(() => {
          fetchMemories();
          resetForm(); // 🧼 Clear form fields
        }, 300);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding memory:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  return (
    <div>
      <h2>Add Memory</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Location Name (e.g., Eiffel Tower)" value={locationName} onChange={(e) => setLocationName(e.target.value)} required />
        <input type="text" placeholder="State (e.g., California)" value={state} onChange={(e) => setState(e.target.value)} required />
        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        <button type="submit">Add Memory</button>
      </form>
    </div>
  );
};

export default MemoryForm;
