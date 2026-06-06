"use client";
import styles from "./BlogTableOfContent.module.scss";
import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { lightTheme } from "@/utils/themeSettings";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

export default function BlogTableOfContent({ data }) {
  if (!data) return null;
  return (
    <ThemeProvider theme={lightTheme}>
      <Section variant="outlined">
        <Typography variant="h5" component="div" className="title">
          Table of Content
        </Typography>
        <ul className="parent-list">
          {data.map((item, index) => (
            <li key={index}>
              <a href={`#${item.id}`}>{item.text}</a>
              {item.subitems.length > 0 &&
                item.subitems.map((subitem, index) => {
                  return (
                    <ul key={index} className="sub-items">
                      <li>
                        <a href={`#${subitem.id}`}>{subitem.text}</a>
                      </li>
                    </ul>
                  );
                })}
            </li>
          ))}
        </ul>
      </Section>
    </ThemeProvider>
  );
}
const Section = ({ className = "", ...props }) =>
  React.createElement(Paper, {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
