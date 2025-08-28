import React from "react";
import Logo from "../logo";
import { Box } from "@mui/material";
import "./header.css";
import UserButton from "../user-button";

export default function Header() {
  return (
    <div className="header">
      <Logo size={32} />
      <UserButton />
    </div>
  );
}
