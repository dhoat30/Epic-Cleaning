"use client";
import styles from "./Video.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import PlayIcon from "../Icons/PlayIcon";

export default function Video({ videoID, placeholderImage, className, showCompressedImage }) {
  const imageURL = showCompressedImage
    ? placeholderImage.sizes.large
    : placeholderImage.url;
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <ContainerStyled className={className}>
      <div className="video-wrapper">
        {!videoLoaded && (
          <>
            <div className="video-overlay" />
            <Image
              onClick={() => setVideoLoaded(true)}
              src={imageURL}
              fill
              alt={placeholderImage.alt}
              style={{ objectFit: "cover" }}
            />
            <ButtonStyled onClick={() => setVideoLoaded(true)}>
              <PlayIcon />
            </ButtonStyled>
          </>
        )}
        {videoLoaded && (
          <iframe
            src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
            style={{ position: "absolute", top: 0, left: 0, border: 0 }}
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video player"
          />
        )}
      </div>
    </ContainerStyled>
  );
}

const ContainerStyled = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.containerStyled} ${className}`.trim(),
  });

const ButtonStyled = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.buttonStyled} ${className}`.trim(),
  });
