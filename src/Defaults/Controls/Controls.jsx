import ReactDOM from "react-dom";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Controls, useControl } from "react-three-gui";
import {
  OrbitControls,
  TransformControls,
  StandardEffects,
  Edges,
} from "@react-three/drei";
import UndoManager from "undo-manager";
import { Scene } from "three";
import { useThree } from "@react-three/fiber";

function Keen({ mode, selected, multiSelect }) {
  const { scene } = useThree();
  const [stateUpdate, setStateUpdate] = useState(true);
  let selectAll;
  var editorHistory = new UndoManager();
  const find = (object) => {
    if (object.parent.parent.isScene) {
      selectAll = object;
    } else {
      find(object.parent);
    }
  };
  if (multiSelect && selected?.length > 0) {
    find(selected[0]);
  }
  var oldObjData = null;
  var newObjData = null;
  const transform = useRef();

  useEffect(() => {
    if (transform.current) {
      const controls = transform.current;
      controls.setMode(mode);

      function resetObject(data) {
        var nowObj = scene.getObjectByProperty("uuid", data.uuid);
        nowObj.position.x = data.position.x;
        nowObj.position.y = data.position.y;
        nowObj.position.z = data.position.z;
        nowObj.rotation.x = data.rotation.x;
        nowObj.rotation.y = data.rotation.y;
        nowObj.rotation.z = data.rotation.z;
        nowObj.scale.x = data.scale.x;
        nowObj.scale.y = data.scale.y;
        nowObj.scale.z = data.scale.z;
      }
      function getObjectData(obj) {
        var data = {
          uuid: obj.uuid, // !Important, used in addHistory.
          position: {
            x: obj.position.x,
            y: obj.position.y,
            z: obj.position.z,
          },
          rotation: {
            x: obj.rotation.x,
            y: obj.rotation.y,
            z: obj.rotation.z,
          },
          scale: { x: obj.scale.x, y: obj.scale.y, z: obj.scale.z },
          opacity: Number(obj.userData.opacity),
        };
        return data;
      }

      function addHistory(oldObjData, newObjData) {
        if (oldObjData && newObjData && oldObjData.uuid == newObjData.uuid) {
          editorHistory.add({
            undo: function () {
              resetObject(oldObjData);
            },
            redo: function () {
              resetObject(newObjData);
            },
          });
        }
      }

      controls.addEventListener("mouseDown", function (e) {
        oldObjData = getObjectData(selectAll);
      });

      controls.addEventListener("dragging-changed", function (e) {
        if (e.value === false) {
          newObjData = getObjectData(selectAll);
          // End dragging
          addHistory(oldObjData, newObjData); // Store undo/redo
        }
      });
    }
  });
  const keyControl = {
    undo: false,
    redo: false,
  };
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.keyCode == 90 && e.ctrlKey) {
        editorHistory.undo();
      }
      if (e.keyCode == 89 && e.ctrlKey) {
        editorHistory.redo();
      }
    },
    []
  );

  return (
    <>
      {selected?.length > 0 && !multiSelect ? (
        <TransformControls object={selected[0]} ref={transform} />
      ) : selectAll ? (
        <TransformControls object={selectAll} ref={transform} />
      ) : (
        ""
      )}
    </>
  );
}
export default Keen;
