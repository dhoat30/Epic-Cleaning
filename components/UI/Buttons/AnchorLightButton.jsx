import styles from "./AnchorLightButton.module.scss";
import React from "react";
import Link from "next/link";
function AnchorLightButton({ href, children }) {
  return <LinkStyle href={href}>{children}</LinkStyle>;
}

export default AnchorLightButton;
const LinkStyle = ({ className = "", ...props }) =>
  React.createElement(Link, {
    ...props,
    className: `${styles.linkStyle} ${className}`.trim(),
  });
