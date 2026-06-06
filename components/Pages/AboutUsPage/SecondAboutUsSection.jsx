import styles from "./SecondAboutUsSection.module.scss";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
export default function SecondAboutUsSection({ data }) {
  return (
    <ContainerStyle maxWidth="xl">
      <div className="grid">
        <div className="history-wrapper">
          <Typography variant="h5" component="p" className="history-title">
            {data.content}
          </Typography>
        </div>
        <div
          className="image-wrapper"
          style={{
            paddingBottom: `${(data.image.height / data.image.width) * 100}%`,
          }}
        >
          <Image src={data.image.url} alt={data.image.alt} fill />
        </div>
        <div className="stats-wrapper">
          {data.statsArr.map((stat, index) => {
            return (
              <div key={index} className="stat">
                <Typography variant="h1" component="h3" className="stat-title">
                  {stat.value}
                </Typography>
                <Typography variant="h5" component="p" className="stat-desc">
                  {stat.label}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </ContainerStyle>
  );
}

const ContainerStyle = ({ className = "", ...props }) =>
  React.createElement(Container, {
    ...props,
    className: `${styles.containerStyle} ${className}`.trim(),
  });
