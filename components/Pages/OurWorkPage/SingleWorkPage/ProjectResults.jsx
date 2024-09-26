import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import React from "react";

export default function ProjectResults({ data }) {
  return (
    <Container>
      <Typography component="h5" variant="h5" className="title" color="white">
        Results
      </Typography>
      <div className="result-wrapper">
        {data.decrease_in_bounce_rate && (
          <div className="result">
            <Typography component="div" variant="h1" color="white">
              {data.decrease_in_bounce_rate}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Decrease In Bounce Rate
            </Typography>
          </div>
        )}
        {data.increase_in_conversion_rate && (
          <div className="result">
            <Typography component="div" variant="h1" color="white">
              {data.increase_in_conversion_rate}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Increase In Conversion Rate
            </Typography>
          </div>
        )}
        {data.loading_speed && (
          <div className="result">
            <Typography component="div" variant="h1" color="white">
              {data.loading_speed}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Loading Speed
            </Typography>
          </div>
        )}

        {data.google_page_speed_insight && (
          <div className="result">
            <Typography component="div" variant="h1" color="white">
              {data.google_page_speed_insight}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Google Page Speed Insight
            </Typography>
          </div>
        )}
        {data.user_retention_time && (
          <div className="result">
            <Typography component="div" variant="h1" color="white">
              {data.user_retention_time}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Increase In Session Duration
            </Typography>
          </div>
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  .title {
    margin-top: 40px;
    border-bottom: 1px solid #47464f;
    padding: 0 0 24px 80px;
  }
  .result {
    margin-top: 32px;
    padding: 0 0 16px 80px;
  }
  @media (max-width: 1080px) {
    .title {
      padding: 0 0 24px 0;
    }
    .result-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    .result {
      padding: 0 0 16px 0;
    }
  }
`;
