import React from "react";
import Logo from "../logo";
import { Box } from "@mui/material";
import "./header.css";
import UserButton from "../user-button";
import { Route } from "@/app/(theme)/(protected)/layout";
import Link from "next/link";

export default function Header({ routes }: { routes: Route[] }) {
  return (
    <div className="header">
      <div className="header__logo">
        <Logo size={32} />
        <ul className="header__nav">
          {routes.map((route) => (
            <Link key={route.path} href={route.path} className="header__nav-item">
              {route.icon}
              {route.label}
            </Link>
          ))}
        </ul>
      </div>
      <UserButton />
    </div>
  );
}
