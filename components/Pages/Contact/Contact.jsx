"use client";
import Paper from "@mui/material/Paper";
import React from "react";
import styled from "@emotion/styled";

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
const ContainerStyled = styled(Paper)`
  padding: 0 16px 0 16px;
  border-radius: 16px;
  background: var(--light-surface-container-lowest);
  min-height: 440px;
`;
