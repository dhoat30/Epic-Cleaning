"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
export default function NotFoundPage() {
  return (
    <Section maxWidth="lg">
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          padding: "80px 0",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          className="image-text"
          align="center"
        >
          404
        </Typography>
        <Typography
          variant="h6"
          component="h1"
          className="image-text"
          align="center"
        >
          This page could not be found.
        </Typography>
        <Link href="/">
          <Button size="large" variant="contained" align="center">
            Back to Home
          </Button>
        </Link>
      </Box>
    </Section>
  );
}

const Section = styled(Container)`
  display: flex;
  align-items: center;

  min-height: 90vh;
`;
