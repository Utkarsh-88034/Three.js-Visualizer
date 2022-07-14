import { useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Select,
  useSelect,
  Sky,
  ContactShadows,
  Edges,
  Environment,
  OrbitControls,
  useCursor,
} from "@react-three/drei";
import { Panel, useControls } from "./MultiLeva";
import { useRef } from "react";

function TestCube({
  color = "white",
  thickness = 2,
  roughness = 0.65,
  envMapIntensity = 1,
  transmission = 0,
  metalness,
  ...props
}) {
  const [hovered, setHover] = useState(false);
  const selected = useSelect().map((sel) => sel.userData.store);
  const [store, materialProps] = useControls(selected, {
    color: { value: color },
    roughness: { value: roughness, min: 0, max: 1 },
    thickness: { value: thickness, min: -10, max: 10 },
    envMapIntensity: { value: envMapIntensity, min: 0, max: 10 },
    transmission: { value: transmission, min: 0, max: 1 },
    ...(metalness !== undefined && {
      metalness: { value: metalness, min: 0, max: 1 },
    }),
  });
  const isSelected = !!selected.find((sel) => sel === store);
  const meshRef = useRef();
  useCursor(hovered);
  useFrame(() => {
    if (meshRef.current) {
      // meshRef.current.updateMatrix();
    }
  });
  return (
    <mesh
      {...props}
      userData={{ store }}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
    >
      <boxGeometry />
      <meshPhysicalMaterial {...materialProps} />
    </mesh>
  );
}
export default TestCube;
