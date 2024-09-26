"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Script from "next/script";
import TechLogos from "@/components/UI/TechLogos/TechLogos";

export default function BookConsultation({ techLogos }) {
  const [key, setKey] = useState(Date.now);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <ContainerStyled maxWidth="xl" className="row">
        <Box>
          <Typography variant="h2" component="h1" color="white">
            Book Your Free Consultation
          </Typography>
          <Typography variant="h6" component="h2" sx={{ marginTop: "16px" }}>
            We are here to make your digital dreams a reality. When you book
            your free consultation with us, you are signing up for a
            complimentary half-hour session with our expert.
          </Typography>
          <Typography variant="h6" component="h2" sx={{ marginTop: "16px" }}>
            During this session, we will ask you a series of questions to
            understand your unique needs, goals, and challenges.
          </Typography>
        </Box>
        <div className="hubspot-wrapper ">
          <div
            className="meetings-iframe-container"
            data-src="https://meetings.hubspot.com/gurpreet-dhoat?embed=true"
          ></div>
        </div>
        <Script
          type="text/javascript"
          src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        />
      </ContainerStyled>
      <TechLogos data={techLogos} />
    </>
  );
}

const ContainerStyled = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding-top: 80px;
    padding-bottom: 40px;
  }
  gap: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
  .contact-form-wrapper {
    padding: 0 16px;
  }
  .hubspot-wrapper {
    min-height: 690px;
  }
`;
