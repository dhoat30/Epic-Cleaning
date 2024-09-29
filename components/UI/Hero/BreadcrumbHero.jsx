"use client";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
export default function BreadcrumbHero({ title }) {
  return (
    <TitleWrapper className="title-wrapper ">
      <Container maxWidth="xl  container">
        <BreadCrumb />
        <div className="title">
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
        </div>
      </Container>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  text-align: center;
  background: var(--light-surface-container);
  border-bottom: 1px solid var(--light-outline);
  padding-top: 120px;
  padding-bottom: 24px;
  @media (max-width: 900px) {
    padding-top: 72px;
  }
  .container {
    flex-direction: column;
    display: flex;
    align-items: center;
  }
`;
