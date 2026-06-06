import styles from "./CenterAlignHeadings.module.scss";
import React from "react";
import Typography from "@mui/material/Typography";
export default function CenterAlignHeadings({ title, subtitle }) {
  return (
    <>
      <Div className="title-wrapper">
        <Typography
          variant="h6"
          component="h3"
          className="subtitle"
          align="center"
          color="primary"
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          className="title"
          align="center"
        >
          {title}
        </Typography>
      </Div>
    </>
  );
}
const Div = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.div} ${className}`.trim(),
  });
