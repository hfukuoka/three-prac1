import * as React from "react";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { useTweaks } from "use-tweaks";

import "./styles.css";

const Floor = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[100, 100]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};

type BallProps = {
  position: number[];
};

const Ball = ({ position }: BallProps) => {
  const [ref] = useSphere(() => ({ mass: 1, position }));

  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[1, 50, 50]} />
      <meshNormalMaterial />
    </mesh>
  );
};

const Scene = () => {
  const { gridVisible, gridSize, gridDivisions } = useTweaks({
    gridVisible: true,
    gridSize: 50,
    gridDivisions: 50
  });

  return (
    <>
      <gridHelper visible={gridVisible} args={[gridSize, gridDivisions]} />

      <OrbitControls />

      <ambientLight />

      <Floor />

      <Ball position={[-2.5, 5, 0]} />
      <Ball position={[0, 6, 0]} />
      <Ball position={[2.5, 4, 0]} />
    </>
  );
};

ReactDOM.render(
  <StrictMode>
    <Canvas
      shadowMap
      colorManagement
      camera={{ rotation: [Math.PI / 5, 0, 0] }}
    >
      <Physics>
        <color attach="background" args={[0, 0, 0]} />
        <Scene />
      </Physics>
    </Canvas>
  </StrictMode>,
  document.getElementById("root")
);
