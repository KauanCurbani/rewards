import Image from "next/image";

export default async function Home() {
  const res = await fetch("https://api.example.com/user");
  const user = await res.json();
  console.log("User from API:", user);


  return (
    <div>
      {user.firstName} {user.lastName}
    </div>
  );
}
