import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper, Vector3 } from "three";
const Directional = ({ pos, intensity }) => {
  const defaultLightRef = useRef();

  // useHelper(defaultLightRef, DirectionalLightHelper, "cyan");

  return (
    <>
      <directionalLight
        position={new Vector3(pos[0], pos[1], pos[2])}
        intensity={intensity}
        ref={defaultLightRef}
      />
    </>
  );
};

export default Directional;
