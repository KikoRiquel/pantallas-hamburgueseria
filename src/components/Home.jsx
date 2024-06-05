import { Input, Button   } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-between h-dvh p-6 bg-orange-500">
        <h1 className="text-5xl font-bold">¡Encantados de tenerte aquí!</h1>
        <div>
          <h2 className="text-3xl font-bold">¿Cómo te llamas?</h2>
          <Input type="email" variant="underlined" label="Tu nombre" />
        </div>

        <div>
          <h2 className="text-3xl font-bold">¿En qué mesa estás sentad@?</h2>
          <Input type="text" variant="underlined" label="Nº de mesa"></Input>
        </div>
        <Button size="lg" className="w-full">¡Adelante!</Button>
      </div>
    </>
  );
}