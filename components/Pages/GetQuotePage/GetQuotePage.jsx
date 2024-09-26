"use client";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { lightTheme } from "@/utils/themeSettings";

import dynamic from "next/dynamic";

const GetQuoteForm = dynamic(() =>
  import("@/components/UI/Forms/GetQuoteForm")
);

export default function GetQuotePage() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Section>
        <Container maxWidth="lg" className="container">
          <GetQuoteForm className="row-max form-component" />
        </Container>
      </Section>
    </ThemeProvider>
  );
}
const Section = styled.section`
  background: var(--light-surface-container-low);
  padding: 160px 0 160px 0;
  @media (max-width: 600px) {
    padding: 120px 0 80px 0;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    background: var(--light-surface-container-low);
    min-height: 360px;
    @media (max-width: 600px) {
      padding: 0;
    }
  }
`;
