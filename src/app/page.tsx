import { Canvas } from "@pedalboard/components/Canvas";

export default function Home() {
  return (
    <div className="bg-bgPrimary flex-1 flex ">
      <h1 className="absolute p-general z-10">Pedalvision</h1>
      {/* KonvaWrapper will be rendered on the client side */}
      <Canvas />
    </div>
  );
}
