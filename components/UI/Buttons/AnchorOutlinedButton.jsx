import styles from "./AnchorOutlinedButton.module.scss";
import React from "react";
import Link from "next/link";
function AnchorOutlinedButton({ href, children }) {
  return <LinkStyle href={href}>{children}</LinkStyle>;
}

export default AnchorOutlinedButton;
const LinkStyle = ({ className = "", ...props }) =>
  React.createElement(Link, {
    ...props,
    className: `${styles.linkStyle} ${className}`.trim(),
  });
