import { Input, Button } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-between h-screen p-6 pt-32 bg-orange-500 text-white">
        <h1 className="text-5xl font-bold">¡Encantados de tenerte aquí!</h1>
        <div className="flex flex-col gap-8 mt-12">
          <div>
            <h2 className="text-3xl font-bold">¿Cómo te llamas?</h2>
            <Input type="email" variant="underlined" label="Tu nombre" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">¿En qué mesa estás sentad@?</h2>
            <Input type="text" variant="underlined" label="Nº de mesa"></Input>
          </div>
        </div>
        <div className="mt-auto">
          <Button size="lg" className="w-full bg-white text-orange-500">
            ¡Adelante!
          </Button>
        </div>
      </div>
    </>
  );
}
