import styles from "./AnchorButton.module.scss";
import React from "react";
import Link from "next/link";
function AnchorButton({ href, children }) {
  return (
    <LinkStyle href={href} size="small">
      {children}
    </LinkStyle>
  );
}

export default AnchorButton;
const LinkStyle = ({ className = "", ...props }) =>
  React.createElement(Link, {
    ...props,
    className: `${styles.linkStyle} ${className}`.trim(),
  });
