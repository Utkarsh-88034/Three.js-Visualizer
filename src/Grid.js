import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useEffect } from "react";
import { Sky } from "@react-three/drei";
import useStore from "./store";

const Grid = () => {
  const { scene } = useThree();
  const SceneGraph = useStore((state) => state.SceneGraph);
  const setSceneGraph = useStore((state) => state.setSceneGraph);

  useEffect(() => {
    setSceneGraph(scene);
  }, [scene]);
  // scene.background = new THREE.Color(0x85858585);
  return (
    <>
      <gridHelper args={[2500, 2500, 0x888888, 0x484848]} />
      {/* <Sky distance={4500} /> */}
    </>
  );
};

export default Grid;
