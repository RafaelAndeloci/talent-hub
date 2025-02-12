import { Button } from "@/components";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Button size="lg">Testando</Button>
      <p className="font-mono text-white">
        Texto<strong>Lexend</strong>
      </p>
    </div>
  );
}
