import styles from "./AnchorLink.module.scss";
import React from "react";
import Link from "next/link";
import ArrowIcon from "../Icons/ArrowIcon";
function AnchorLink({ href, children, align }) {
  return (
    <LinkStyle href={href} align={align}>
      {children}
      {/* <ArrowIcon /> */}
    </LinkStyle>
  );
}

export default AnchorLink;
const LinkStyle = ({ className = "", ...props }) =>
  React.createElement(Link, {
    ...props,
    className: `${styles.linkStyle} ${className}`.trim(),
  });
