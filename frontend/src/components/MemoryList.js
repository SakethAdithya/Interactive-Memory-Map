import React, { useEffect, useState } from "react";

const MemoryList = ({ memories }) => {
  return (
    <div>
      <h2>Memories</h2>
      {memories.length === 0 ? (
        <p>No memories yet.</p>
      ) : (
        <ul>
          {memories.map((memory) => (
            <li key={memory._id}>
              <h3>{memory.title}</h3>
              <p>{memory.description}</p>
              <p>📍 {memory.country}</p>
              {memory.images && memory.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000${img}`}
                  alt="memory"
                  style={{ width: "100px", margin: "5px" }}
                />
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemoryList;
