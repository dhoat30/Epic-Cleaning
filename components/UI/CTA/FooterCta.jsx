import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";

export default function FooterCta() {
  return (
    <Section component="section">
      <Container maxWidth="lg">
        <Box className="wrapper">
          <Typography
            component="h6"
            variant="h1"
            sx={{ fontWeight: 700 }}
            align="center"
            color="white"
            className="title"
          >
            Start your journey with webduel
          </Typography>
          <div className="button-wrapper">
            <Link href="/book-consultation">
              <Button
                size="large"
                variant="contained"
                sx={{
                  background: "white",
                  color: "#0000ee",
                  "&:hover": {
                    background: "#eaeaea",
                  },
                }}
              >
                Book free consultation
              </Button>
            </Link>

            <Link href="/get-a-quote">
              <Button
                size="large"
                variant="outlined"
                sx={{
                  border: "1px solid white",
                  color: "white",
                  "&:hover": {
                    border: "1px solid #eaeaea",
                  },
                }}
              >
                Get instant quote
              </Button>
            </Link>
          </div>
        </Box>
      </Container>
    </Section>
  );
}
const Section = styled(Box)`
  padding: 120px 0;
  @media (max-width: 900px) {
    padding: 56px 0;
  }
  .wrapper {
    padding: 120px 0;
    background: rgb(85, 24, 167);
    background: radial-gradient(
      circle,
      rgba(85, 24, 167, 1) 0%,
      rgba(139, 49, 198, 1) 100%
    );
    border-radius: 32px;
    @media (max-width: 900px) {
      padding: 56px 16px;
    }
    .title {
      @media (max-width: 900px) {
        font-size: 3rem;
      }
    }
    .button-wrapper {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 32px;
      flex-wrap: wrap;
    }
  }
`;
