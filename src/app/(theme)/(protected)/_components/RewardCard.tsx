"use client";
import { Reward } from "@/domain/entities/reward";
import { StarBorderTwoTone, Edit, Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface RewardCardProps {
  reward: Reward;
}

export function RewardCard({ reward }: RewardCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/rewards/${reward.id}/edit`);
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir esta recompensa?")) {
      try {
        const response = await fetch(`https://api.mock.com/rewards/${reward.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao excluir recompensa");
        }

        window.location.reload();
      } catch (error) {
        console.error("Erro ao excluir recompensa:", error);
        alert("Erro ao excluir recompensa");
      }
    }
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="140" image={reward.imageUrl} alt={reward.name} />
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
        <Chip label={reward.category} color="default" size="small" />
      </CardActions>
      <CardActions>
        <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
          <Box>
            <Chip
              label={`${reward.points} pts`}
              icon={<StarBorderTwoTone fontSize="small" />}
              color="primary"
              size="small"
              sx={{ mr: 1 }}
            />
          </Box>

          <Box>
            <IconButton size="small" onClick={handleEdit} color="primary" title="Editar">
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleDelete} color="error" title="Excluir">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
}
