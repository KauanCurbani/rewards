import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default async function Home() {
  return (
    <div style={{ width: "100vw" }}>
      <Image
        src="/bg.webp"
        alt="background"
        width={1920}
        height={1080}
        style={{
          width: "100%",
          height: "50vh",
          objectFit: "cover",
        }}
      />
      <Box
        paddingInline={{ xs: 2, sm: 4, md: "auto" }}
        maxWidth={{ md: 1200 }}
        marginInline={{ md: "auto" }}
        paddingBlock={2}
      >
        <Typography
          color="primary"
          fontWeight={600}
          fontSize={{ xs: "h6.fontSize", sm: "h5.fontSize", md: "h4.fontSize" }}
        >
          RECOMPENSAS_
        </Typography>
      </Box>
    </div>
  );
}
