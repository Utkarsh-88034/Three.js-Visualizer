import React, { useEffect, useRef, useState } from "react";
import { Edges, useCursor, useGLTF, useSelect } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { Color, DirectionalLightHelper } from "three";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { useControls } from "../Defaults/MultiLeva";
import useStore from "../store";

const material = new THREE.MeshLambertMaterial({ color: "grey" });
const sphereGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
const boxGeometry = new THREE.BoxBufferGeometry(1, 1);
const planeGeometry = new THREE.PlaneBufferGeometry(2, 2);
const ringGeometry = new THREE.RingBufferGeometry(1, 1.5, 30, 1);
const octaGeometry = new THREE.OctahedronBufferGeometry(1, 0);
const icosahedronGeometry = new THREE.IcosahedronBufferGeometry(1, 0);
const torusGrometry = new THREE.TorusBufferGeometry(1, 0.5, 12, 64);
const torusKnotGeometry = new THREE.TorusKnotBufferGeometry(
  1,
  0.2,
  64,
  8,
  2,
  3
);
const circleGeomtry = new THREE.CircleBufferGeometry(1, 32, 0);
const capsuleGeomtry = new THREE.CapsuleBufferGeometry(1, 1, 10, 20);
const cylinderGeometry = new THREE.CylinderBufferGeometry(1, 1, 2, 16, 1);
const coneGeometry = new THREE.ConeBufferGeometry(1, 2, 16, 1);

const LoadGLTF = ({ itemList, ...props }) => {
  const ObjectList = useStore((state) => state.ObjectList);
  const addToObjectList = useStore((state) => state.addToObjectList);
  const { scene } = useThree();
  const [currentObj, setCurrentObj] = useState();

  const SceneGraph = useStore((state) => state.SceneGraph);
  const addToSceneGraph = useStore((state) => state.addToSceneGraph);
  let loader;

  useEffect(() => {
    if (itemList) {
      if (itemList[itemList.length - 1][2] == "file") {
        const type = itemList[itemList.length - 1][1];
        if (type.toLowerCase() == "glb" || type.toLowerCase() == "gltf") {
          loader = new GLTFLoader();
          loader.load(itemList[itemList.length - 1][0], (gltf) => {
            addToObjectList(gltf.scene);
            setCurrentObj(gltf.scene);
          });
        } else if (type.toLowerCase() == "fbx") {
          loader = new FBXLoader();
          loader.load(itemList[itemList.length - 1][0], (fbx) => {
            console.log(fbx);
            addToObjectList(fbx);
            setCurrentObj(fbx);
          });
        } else if (type.toLowerCase() == "obj") {
          loader = new OBJLoader();
          loader.load(itemList[itemList.length - 1][0], (obj) => {
            console.log(obj);
            addToObjectList(obj);
            setCurrentObj(obj);
          });
        }
      } else if (itemList[itemList.length - 1][1] == "preset") {
        if (itemList[itemList.length - 1][0] == "sphere") {
          const mesh = new THREE.Mesh(sphereGeometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "box") {
          const mesh = new THREE.Mesh(boxGeometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "plane") {
          const mesh = new THREE.Mesh(planeGeometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "ring") {
          const mesh = new THREE.Mesh(ringGeometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "octa") {
          const mesh = new THREE.Mesh(octaGeometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "ico") {
          const mesh = new THREE.Mesh(icosahedronGeometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "torus") {
          const mesh = new THREE.Mesh(torusGrometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "knot") {
          const mesh = new THREE.Mesh(torusKnotGeometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "circle") {
          const mesh = new THREE.Mesh(circleGeomtry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "capsule") {
          const mesh = new THREE.Mesh(capsuleGeomtry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "cylinder") {
          const mesh = new THREE.Mesh(cylinderGeometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        } else if (itemList[itemList.length - 1][0] == "cone") {
          const mesh = new THREE.Mesh(coneGeometry, material);
          addToObjectList(mesh);
          setCurrentObj(mesh);
        }
      }
    }
  }, [itemList]);

  return (
    <>
      {ObjectList?.map((item, index) => (
        <>
          {item && (
            <>
              {" "}
              <primitive object={item} />
            </>
          )}
        </>
      ))}
    </>
  );
};

export default LoadGLTF;
