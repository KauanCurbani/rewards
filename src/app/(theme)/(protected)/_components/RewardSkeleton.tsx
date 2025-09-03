"use client";
import { Card, CardActions, CardContent, Skeleton } from "@mui/material";
import { Grid } from "@mui/material";

interface RewardSkeletonProps {
  count?: number;
}

export function RewardSkeleton({ count = 6 }: RewardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
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
      ))}
    </>
  );
}
