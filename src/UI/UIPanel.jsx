import { useControls } from "leva";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Vector3 } from "three";

const UIPanel = ({ object, updatePosCube }) => {
  const [pos, setPos] = useState({ x: 10, y: 0, z: 0 });
  useEffect(() => {
    if (object) {
      updatePosCube(pos);
      object[0]?.position?.set(pos.x, pos.y, pos.z);
    }
  });

  const [, set] = useControls(() => ({
    position: {
      value: object ? object[0]?.position : new Vector3(0, 0, 0),
      onChange: (value) => {
        console.log(object);
        setPos({ x: value.x, y: value.y, z: value.z });
      },
      transient: false,
    },
  }));

  //   console.log(position);
  return null;
};

export default UIPanel;
