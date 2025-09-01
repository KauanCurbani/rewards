"use client";
import { Reward } from "@/domain/entities/reward";
import { RewardUseCase } from "@/domain/useCases/rewardUseCase";
import { ApiRewardRepository } from "@/infra/api/repositories/apiRewardRepository";
import { Search, Star, StarBorderRounded, StarBorderTwoTone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Skeleton,
  Slider,
  TextField,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ca } from "zod/locales";

interface RewardsFilter {
  searchTerm: string;
  minPoints: number;
  maxPoints: number;
}

export default function Home() {
  const useCase = new RewardUseCase(new ApiRewardRepository());
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await useCase.getRewards();
        setRewards(data);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{}}>
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

        <div style={{ display: "flex" }}>
          <Box width={250} marginRight={2} display={{ sx: "none", sm: "block" }}>
            <Typography variant="body2">Pesquisa por texto</Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: <Search fontSize="small" />,
                },
              }}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">Pontos</Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption">Min</Typography>
              <Typography variant="caption">Máx</Typography>
            </Box>
            <Slider
              getAriaLabel={() => "points range"}
              min={0}
              max={Math.max(...rewards.map((r) => r.points), 50)}
              defaultValue={[0, Math.max(...rewards.map((r) => r.points), 50)]}
              onChange={(_, newValue) => {}}
              valueLabelDisplay="auto"
              getAriaValueText={() => ""}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">Ordenação</Typography>
          </Box>
          <Grid container columns={12} spacing={2} marginY={2} style={{ flex: 1 }}>
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                    <Card>
                      <Skeleton variant="rectangular" height={140} />
                      <CardContent>
                        <Skeleton variant="text" width="60%" height={32} />
                        <Skeleton variant="text" width="80%" height={24} />
                      </CardContent>
                      <CardActions>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="rectangular" width={60} height={32} />
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : rewards.map((reward) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={reward.id}>
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={reward.imageUrl}
                          alt={reward.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" noWrap>
                            {reward.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {reward.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Chip
                          label={`${reward.points} pts`}
                          icon={<StarBorderTwoTone fontSize={"small"} />}
                          color="primary"
                          size="small"
                        />
                        <Button size="small" color="primary">
                          Share
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
}
