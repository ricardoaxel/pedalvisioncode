import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Konva from "konva";

export default function KonvaComponent() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null); // Specify Konva.Stage type
  const imageRef = useRef<Konva.Image | null>(null); // Specify Konva.Image type
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Track the initial position of the stage
  const initialStagePosition = useRef({ x: 0, y: 0 });

  // Load the image
  useEffect(() => {
    const img = new window.Image();
    img.src = "https://picsum.photos/200/300"; // Replace with your image URL
    img.onload = () => {
      setImage(img);
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-bgSecondary flex-1">
      <Stage
        width={windowSize.width}
        height={windowSize.height}
        draggable
        onDragStart={() => {
          // Store the initial position when dragging starts
          if (stageRef.current) {
            initialStagePosition.current = {
              x: stageRef.current.x(),
              y: stageRef.current.y(),
            };
          }
        }}
        onDragMove={(e) => {
          const position = e.target.position(); // Get new position
          // console.log(position); // Optional: Log the position if needed
        }}
        ref={stageRef}
        dragBoundFunc={(pos) => {
          // Restrict the stage movement within -200 to +200 pixels from the initial position
          if (stageRef.current) {
            const stageWidth = stageRef.current.width();
            const stageHeight = stageRef.current.height();

            const limit = 200;

            const x = Math.min(
              Math.max(pos.x, -stageWidth * 0.5), // Keep x within -200 to +200 of the initial position
              stageWidth * 0.5 // Keep x within +200 of the initial position
            );

            const y = Math.min(
              Math.max(pos.y, -stageHeight * 0.5), // Keep y within -200 to +200 of the initial position
              stageHeight * 0.5 // Keep y within +200 of the initial position
            );

            return { x, y }; // Return the new position
          }

          return pos; // Return the position unchanged if stageRef.current is null
        }}
      >
        <Layer>
          {image && (
            <KonvaImage
              image={image}
              x={100}
              y={100}
              draggable
              ref={imageRef}
              alt=""
              // dragBoundFunc to restrict the movement inside the Stage area
              dragBoundFunc={(pos) => {
                // Check if stageRef.current is not null
                if (stageRef.current) {
                  const stageWidth = stageRef.current.width();
                  const stageHeight = stageRef.current.height();
                  const imageWidth = imageRef.current?.width() ?? 0;
                  const imageHeight = imageRef.current?.height() ?? 0;

                  // Limit the position to the stage area
                  const x = Math.min(
                    Math.max(pos.x, 0), // Keep x within the left boundary (0)
                    stageWidth - imageWidth // Keep x within the right boundary
                  );
                  const y = Math.min(
                    Math.max(pos.y, 0), // Keep y within the top boundary (0)
                    stageHeight - imageHeight // Keep y within the bottom boundary
                  );

                  return { x, y }; // Return the new position
                }

                return pos; // Return the position unchanged if stageRef.current is null
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
