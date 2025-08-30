"use client";

import Header from "@/components/header/header";
import LoaderScreen from "@/components/loader-screen";
import { useAuth } from "@/contexts/auth-context";
import { Home, HomeOutlined, People, PeopleOutline } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { redirect, usePathname, useRouter } from "next/navigation";

export type Route = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (isLoading) return <LoaderScreen />;
  if (!isAuthenticated) return redirect("/login");

  const routes: Route[] = [
    {
      path: "/",
      label: "Início",
      icon: <HomeOutlined />,
    },
    {
      path: "/users",
      label: "Usuários",
      icon: <PeopleOutline />,
    },
  ];

  const activeIndex = routes.findIndex((route) => route.path === pathname);

  return (
    <section>
      <Header routes={routes} />
      {children}
      <Box display={{ xs: "block", md: "none" }} marginTop={4}>
        <BottomNavigation
          style={{ position: "fixed", bottom: 0, width: "100%" }}
          value={activeIndex}
          onChange={(event, newValue) => {
            const newPath = routes[newValue].path;
            if (newPath) router.push(newPath);
          }}
        >
          {routes.map((route) => (
            <BottomNavigationAction key={route.path} label={route.label} icon={route.icon} />
          ))}
        </BottomNavigation>
      </Box>
    </section>
  );
}
