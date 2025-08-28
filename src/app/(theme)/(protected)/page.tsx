import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <div
        style={{
          background: "url(./bg.webp)",
          height: "50vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      OI
      <div style={{ height: "200dvh" }} />
    </div>
  );
}
