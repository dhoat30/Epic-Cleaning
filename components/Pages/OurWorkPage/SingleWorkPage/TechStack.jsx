import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function TechStack({ dataArr, techLogos }) {
  // merge two arrays
  //use title in tech logos and use value in dataArr
  const combinedArray = dataArr.map((item1) => {
    const item2 = techLogos.find((item2) => item2.title === item1.value);
    return {
      ...item1,
      ...item2,
    };
  });
  const logos = combinedArray.map((data, index) => {
    return (
      <div
        className="image-wrapper"
        key={index}
        // style={{
        //   paddingBottom: `calc(${(data.height / data.width) * 100}% - 120px`,
        // }}
      >
        <Image src={data.url} alt={data.alt} width="140" height="50" />
      </div>
    );
  });
  return (
    <Container>
      <Typography component="h5" variant="h5" className="title" color="white">
        CRAFTED WITH THESE TOOLS
      </Typography>
      <div className="tech-logo-wrapper">{logos}</div>
    </Container>
  );
}
const Container = styled.div`
  .title {
    margin-top: 80px;
    border-bottom: 1px solid #47464f;
    padding: 0 0 24px 80px;
  }

  .tech-logo-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 32px;
    padding: 0 0 16px 80px;
  }
  .image-wrapper {
    position: relative;
  }
  @media (max-width: 1080px) {
    .title {
      padding: 0 0 24px 0;
    }

    .tech-logo-wrapper {
      padding: 0 0 16px 0;
    }
  }
`;
