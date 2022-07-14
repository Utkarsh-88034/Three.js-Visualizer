import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const BoxHelper = ({ selected, selectAll }) => {
  const boxRef = useRef();
  useFrame(() => {
    boxRef?.current?.update();
  });
  return (
    <>
      {selected?.length > 0 && selectAll ? (
        <boxHelper args={[selectAll, 0xff8657]} ref={boxRef} />
      ) : selected?.length > 0 && !selectAll ? (
        <boxHelper args={[selected[0], 0xff8657]} ref={boxRef} />
      ) : (
        ""
      )}
    </>
  );
};

export default BoxHelper;
