"use client";

import dynamic from "next/dynamic";

// Dynamically import the Konva component with client-side rendering only
const CanvasComponent = dynamic(() => import("./Canvas"), {
  ssr: false, // Disable SSR for Konva
});

export default function CanvasWrapper() {
  return <CanvasComponent />;
}
