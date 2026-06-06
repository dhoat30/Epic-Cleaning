import styles from "./Button.module.scss";
import React from "react";
import Link from "next/link";
function Button({ onClick, children, align }) {
  return (
    <Container onClick={onClick} align={align}>
      {children}
    </Container>
  );
}

export default Button;
const Container = ({ className = "", ...props }) =>
  React.createElement("button", {
    ...props,
    className: `${styles.container} ${className}`.trim(),
  });
