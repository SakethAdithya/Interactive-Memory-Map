import React, { useState, useEffect } from "react";
import MemoryForm from "./MemoryForm";
import MemoryList from "./MemoryList";
import MemoryMap from "./MemoryMap";
import "./HomePage.css";

const HomePage = () => {
  const [memories, setMemories] = useState([]);

  const fetchMemories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/memories"); // ✅ Correct endpoint
      const data = await response.json();
      setMemories(data);
    } catch (error) {
      console.error("Error fetching memories:", error);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <div className="home-container">
      <div className="map-section">
        <MemoryMap memories={memories} />
      </div>

      <div className="content-section">
        <h1>Memories</h1>
        <MemoryForm fetchMemories={fetchMemories} />
        <MemoryList memories={memories} />
      </div>
    </div>
  );
};

export default HomePage;
