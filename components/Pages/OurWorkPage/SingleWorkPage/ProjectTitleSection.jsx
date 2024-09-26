import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import styled from "@emotion/styled";

export default function ProjectTitleSection({ title, services }) {
  return (
    <ContainerStyled className="row " maxWidth="xl">
      <Typography component="h1" variant="h2" color="white" className="title">
        {title}
      </Typography>
      <Box className="services-wrapper">
        {services?.map((item, index) => (
          //   <Typography
          //     key={index}
          //     component="span"
          //     variant="body1"
          //     color="secondary.main"
          //     className="service"
          //   >
          //     {item.label}
          //   </Typography>
          <Chip
            key={index}
            label={`${item.label}`}
            sx={{ margin: "0 8px 8px 0" }}
            variant="outlined"
            color="secondary"
          />
        ))}
      </Box>
    </ContainerStyled>
  );
}

const ContainerStyled = styled(Container)`
  margin: 80px auto;
  @media (max-width: 600px) {
    margin: 40px 0;
  }
  .services-wrapper {
    margin-top: 16px;
  }
`;
