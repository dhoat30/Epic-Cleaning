import styles from "./OutlinedDarkButton.module.scss";
import React from "react";
import Button from "@mui/material/Button";

export default function OutlinedDarkButton({ children }) {
  return (
    <ButtonStyled size="large" variant="outlined">
      {children}
    </ButtonStyled>
  );
}
const ButtonStyled = ({ className = "", ...props }) =>
  React.createElement(Button, {
    ...props,
    className: `${styles.buttonStyled} ${className}`.trim(),
  });
