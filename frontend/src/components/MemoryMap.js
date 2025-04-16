import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const BASE_URL = "http://localhost:5000";

const MemoryMap = ({ memories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openGallery = (images) => {
    setCurrentImages(images.map((img) => `${BASE_URL}${img}`));
    setPhotoIndex(0);
    setIsOpen(true);
  };

  return (
    <>
      <MapContainer center={[20, 0]} zoom={2} style={{ width: "100%", height: "100vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {memories.map((memory, index) => (
          <Marker
            key={index}
            position={[
              parseFloat(memory.location.lat),
              parseFloat(memory.location.lng),
            ]}
          >
            <Popup>
              <div onClick={() => openGallery(memory.images)} style={{ cursor: "pointer" }}>
                <img
                  src={`${BASE_URL}${memory.images[0]}`}
                  alt="Memory"
                  style={{ width: "100px", height: "100px" }}
                />
                <p>Click to view all images</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {isOpen && (
        <Lightbox
          mainSrc={currentImages[photoIndex]}
          nextSrc={currentImages[(photoIndex + 1) % currentImages.length]}
          prevSrc={currentImages[(photoIndex + currentImages.length - 1) % currentImages.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + currentImages.length - 1) % currentImages.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % currentImages.length)
          }
        />
      )}
    </>
  );
};

export default MemoryMap;