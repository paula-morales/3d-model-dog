import "./App.css";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { TextureLoader } from "three";
import {
  Environment,
  Html,
  useProgress,
  OrbitControls,
} from "@react-three/drei";

import Shiva from "./models/Shiva";

function Sphere(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const colorMap = useLoader(TextureLoader, "texture01.jpg");
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1 : 0.5}
      onClick={(event) => click(!clicked)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Environment preset="sunset" background />
          <ambientLight intensity={0.2} />
          <directionalLight />
          <OrbitControls />
          <Shiva position={[0, 0, 0]} scale={2} />
          <Sphere position={[3, -3, -5]}></Sphere>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
