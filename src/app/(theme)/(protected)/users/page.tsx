import { Box, Typography } from "@mui/material";

export default async function Home() {
  return (
    <div style={{ width: "100vw" }}>
      <div
        style={{
          background: "url(./bg.webp)",
          height: "50vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
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
          USUÁRIOS_
        </Typography>
      </Box>
    </div>
  );
}
