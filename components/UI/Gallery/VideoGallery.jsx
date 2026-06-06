"use client";
import styles from "./VideoGallery.module.scss";
import React, { useState, useEffect } from "react";
import BeforeAfterMasonry from "../BeforeAfterSlider/BeforeAfterMasonry";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ReactPlayer from "react-player/youtube";

export default function VideoGallery({ galleryData }) {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  if (!galleryData) return null;

  return (
    <Section>
      <div className="grid">
        {galleryData.map((item, index) => (
          <div key={index} className="image-container">
            {hasWindow && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${item.youtube_id}`}
                width="100%"
                height="100%"
                controls={true}
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            )}
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
