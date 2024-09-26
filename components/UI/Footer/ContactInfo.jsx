import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import EmailCircleIcon from "../Icons/EmailCircleIcon";
import PhoneCircleIcon from "../Icons/PhoneCircleIcon";
import LocationCircleIcon from "../Icons/LocationCircleIcon";
export default function ContactInfo() {
  return (
    <Container>
      <div className="info-wrapper">
        <PhoneCircleIcon />
        <Link href="tel: 07 572 2255">
          <Typography variant="body1" component="span">
            07 572 2255
          </Typography>
        </Link>
      </div>
      <div className="info-wrapper">
        <EmailCircleIcon />
        <Link href="mailto: info@webduel.co.nz">
          <Typography variant="body1" component="span">
            info@webduel.co.nz
          </Typography>
        </Link>
      </div>
      <div className="info-wrapper">
        <LocationCircleIcon />
        <Link
          href="https://www.google.com/search?q=webduel&oq=webduel+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABiABBiiBDIGCAIQRRg9MgYIAxBFGDwyBggEEEUYPDIGCAUQRRg8MgYIBhBFGD0yBggHEEUYQdIBCDEzNjNqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8"
          target="_blank"
        >
          <Typography variant="body1" component="span">
            <span>558D Papamoa Beach Road</span> <br />
            <span>Papamoa, Tauranga 3118</span>
          </Typography>
        </Link>
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  .info-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    &:hover {
      svg {
        circle {
          fill: var(--dark-secondary);
        }
      }
      span,
      div {
        color: var(--dark-secondary);
      }
    }
  }
`;
