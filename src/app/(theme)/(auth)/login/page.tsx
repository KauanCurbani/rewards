import { Metadata } from "next";
import Login from "./_components/login";

export const metadata: Metadata = {
  title: "Entrar | Be Sistemas",
  description: "Faça login na sua conta",
};

export default function Page() {
  return <Login />;
}
