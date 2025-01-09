import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Konva from "konva";

export default function KonvaComponent() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null); // Specify Konva.Stage type
  const imageRef = useRef<Konva.Image | null>(null); // Specify Konva.Image type
  const imageRef2 = useRef<Konva.Image | null>(null); // Specify Konva.Image type

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [scale, setScale] = useState(1); // Scale factor for zooming

  // Load the image
  useEffect(() => {
    const img = new window.Image();
    img.src = "https://picsum.photos/200/300"; // Replace with your image URL
    img.onload = () => {
      setImage(img);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //    TODO: AFTER TRYING DIFFERENT METHODS, the best approach its to use the position that the elements have
  //    this will be different from the Stage visible area dimensions (the only purpose of these it's to
  //   to stablish the visible area of the canvas but its content can have more dimensions inside it)
  // The iamge position will be saved based on thi, we onluy have to see the scalar propertires relation between images al real relation

  const getImagePosition = () => {
    if (imageRef.current) {
      const xPosition = imageRef.current.x(); // Get the x position
      const yPosition = imageRef.current.y(); // Get the y position
      console.log(`Image Position: x = ${xPosition}, y = ${yPosition}`);
    }
  };

  const getImagePosition2 = () => {
    if (imageRef2.current) {
      const xPosition = imageRef2.current.x(); // Get the x position
      const yPosition = imageRef2.current.y(); // Get the y position
      console.log(`Image2 Position: x = ${xPosition}, y = ${yPosition}`);
    }
  };

  // Handle zooming on wheel event
  const handleWheel = (e: React.WheelEvent) => {
    // e.preventDefault(); // Prevent default scrolling behavior

    const newScale = e.deltaY > 0 ? scale * 1.1 : scale / 1.1; // Zoom in or out
    setScale(newScale); // Update scale state

    if (stageRef.current) {
      // Get the mouse position in the stage
      const pointer = stageRef.current.getPointerPosition();
      if (pointer) {
        stageRef.current.scale({ x: newScale, y: newScale });

        const mousePointTo = {
          x: (pointer.x - stageRef.current.x()) / stageRef.current.scaleX(),
          y: (pointer.y - stageRef.current.y()) / stageRef.current.scaleY(),
        };

        stageRef.current.position({
          x: pointer.x - mousePointTo.x * stageRef.current.scaleX(),
          y: pointer.y - mousePointTo.y * stageRef.current.scaleY(),
        });

        stageRef.current.batchDraw();
      }
    }
  };

  return (
    <div className="bg-bgSecondary flex-1" onWheel={handleWheel}>
      <Stage
        width={windowSize.width}
        height={windowSize.height}
        draggable
        ref={stageRef}
        scaleX={scale}
        scaleY={scale}
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
              onDragEnd={() => {
                getImagePosition();
              }}
            />
          )}

          {image && (
            <KonvaImage
              image={image}
              x={100}
              y={100}
              draggable
              ref={imageRef2}
              alt=""
              onDragEnd={() => {
                getImagePosition2();
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
