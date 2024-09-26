import Container from "@mui/material/Container";
import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import LocationCircleIcon from "@/components/UI/Icons/LocationCircleIcon";

export default function TeamSection({ data }) {
  return (
    <Section>
      <Container maxWidth="xl">
        <div className="title-wrapper">
          <Typography variant="h1" component="h2" className="title">
            {data.title}
          </Typography>
          <Typography variant="body1" component="p" className="subtitle">
            {data.description}
          </Typography>
        </div>
        <div className="team-members-wrapper">
          <div className="team-members">
            {data.teamMembersArr.map((member, index) => {
              return (
                <div key={index} className="team-member">
                  <div className="team-member-image">
                    <Image src={member.image.url} alt={member.name} fill />
                  </div>
                  <div className="team-member-info">
                    <Typography
                      variant="h6"
                      component="div"
                      className="team-member-name"
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      className="team-member-role"
                    >
                      {member.position}
                    </Typography>
                    <div className="team-member-location">
                      <LocationCircleIcon />
                      <Typography variant="body1" component="span">
                        {member.location}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
const Section = styled.section`
  border-top: 1px solid var(--dark-outline-variant);
  border-bottom: 1px solid var(--dark-outline-variant);
  padding-top: 80px;
  padding-bottom: 80px;
  @media (max-width: 1120px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .title-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 1120px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    align-items: center;
    .title {
    }
  }
  .team-members-wrapper {
    padding: 80px 0;
    @media (max-width: 1120px) {
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .team-members {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 24px;
      justify-content: center;
      @media (max-width: 1120px) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
      .team-member {
        border: 1px solid var(--dark-outline-variant);
        background: var(--dark-surface-container-low);
        border-radius: 12px;
        overflow: hidden !important;
        &:hover {
          background: var(--dark-surface-container);
        }
        .team-member-image {
          position: relative;
          padding-bottom: 100%;
          overflow: hidden !important;

          img {
            border-radius: 12px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.5s ease;
            object-position: center;
            &:hover {
              transform: scale(1.1);
            }
          }
        }
        .team-member-info {
          padding: 16px;
          .team-member-location {
            margin-top: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
            svg {
              circle {
                fill: var(--dark-secondary);
              }
              path {
                fill: var(--dark-on-secondary);
              }
            }
          }
        }
      }
    }
  }
`;
