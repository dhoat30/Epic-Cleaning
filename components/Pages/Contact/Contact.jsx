"use client";
import styles from "./Contact.module.scss";
import Paper from "@mui/material/Paper";
import React from "react";

import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/components/UI/Forms/ContactForm"));
export default function Contact() {
  return (
    <>
      <ContainerStyled className="contact-form-wrapper" variant="outlined">
        <ContactForm title="Contact Us" />
      </ContainerStyled>
    </>
  );
}
const ContainerStyled = ({ className = "", ...props }) =>
  React.createElement(Paper, {
    ...props,
    className: `${styles.containerStyled} ${className}`.trim(),
  });
