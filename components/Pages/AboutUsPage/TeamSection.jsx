import styles from "./TeamSection.module.scss";
import Container from "@mui/material/Container";
import React from "react";
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
const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
