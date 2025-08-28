import { Typography } from "@mui/material";
import React from "react";

export default function GradientText({
  text,
  gradient,
  ...props
}: { text: string; gradient?: string } & React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      style={{
        background: gradient || "linear-gradient(to right, #1E7BF4, #dc004e)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      {...props}
    >
      {text}
    </Typography>
  );
}
