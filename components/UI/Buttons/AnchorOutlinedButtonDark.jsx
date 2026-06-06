import styles from "./AnchorOutlinedButtonDark.module.scss";
import React from "react";
import Link from "next/link";
function AnchorOutlinedButtonDark({ href, children, align }) {
  return (
    <LinkStyle align={align} href={href}>
      {children}
    </LinkStyle>
  );
}

export default AnchorOutlinedButtonDark;
const LinkStyle = ({ className = "", ...props }) =>
  React.createElement(Link, {
    ...props,
    className: `${styles.linkStyle} ${className}`.trim(),
  });
