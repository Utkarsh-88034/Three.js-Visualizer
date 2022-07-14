import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ControlMenu = ({ getControlMode }) => {
  const Button1 = styled.div`
    position: absolute;
    top: 100px;
    left: 50px;
    border: 1px solid black;
    cursor: pointer;
  `;
  const Button2 = styled.div`
    position: absolute;
    top: 140px;
    border: 1px solid black;
    cursor: pointer;
    left: 50px;
  `;
  const Button3 = styled.div`
    position: absolute;
    top: 180px;
    border: 1px solid black;
    cursor: pointer;
    left: 50px;
  `;
  return (
    <>
      <Button1
        onClick={() => {
          getControlMode("scale");
        }}
      >
        Scale
      </Button1>
      <Button2
        onClick={() => {
          getControlMode("rotate");
        }}
      >
        Rotate
      </Button2>
      <Button3
        onClick={() => {
          getControlMode("translate");
        }}
      >
        Translate
      </Button3>
    </>
  );
};

export default ControlMenu;
