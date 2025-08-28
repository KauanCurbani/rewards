import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  Typography,
} from "@mui/material";
import Image from "next/image";

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
          RECOMPENSAS_
        </Typography>
        <Grid container spacing={2} columns={{ xs: 2, sm: 8, md: 12 }} marginTop={2}>
          {new Array(20).fill(null).map((_, i) => (
            <Grid key={i} size={{ xs: 2, sm: 4, md: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height={200}
                  image="https://github.com/kauancurbani.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
