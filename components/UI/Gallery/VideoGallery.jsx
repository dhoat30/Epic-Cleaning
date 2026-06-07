import styles from "./VideoGallery.module.scss";
import React from "react";

export default function VideoGallery({ galleryData }) {
  if (!galleryData) return null;

  return (
    <Section>
      <div className="grid">
        {galleryData.map((item, index) => (
          <div key={index} className="image-container">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtube_id}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0, border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Video ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
