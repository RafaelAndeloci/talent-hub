import { Button } from "@talent-hub/ui";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Button className="font-default">Testando</Button>
      <p className="font-mono text-white">
        Texto<strong className="font-default">Lexend</strong>
      </p>
    </div>
  );
}
