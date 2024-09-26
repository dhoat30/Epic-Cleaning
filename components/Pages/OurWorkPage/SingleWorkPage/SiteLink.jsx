import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
export default function SiteLink({ data }) {
  if (data.link === "") return null;
  return (
    <Container>
      <Typography
        component="h5"
        variant="subtitle1"
        className="title"
        color="white"
      >
        Website Link:
      </Typography>
      <Link href={data.link} className="link" target="_blank">
        <Typography
          component="h5"
          variant="subtitle1"
          className="title"
          color="secondary"
        >
          {data.label}
          <EastOutlinedIcon sx={{ marginLeft: "4px" }} />
        </Typography>
      </Link>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  .link {
    position: relative;
    svg {
      position: absolute;
      top: 2px;
    }
  }
`;
