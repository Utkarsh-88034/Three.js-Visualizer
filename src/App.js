import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewport,
  useHelper,
  Edges,
} from "@react-three/drei/core";
import { Suspense, useState } from "react";
import { OrbitControls, Stats, Select } from "@react-three/drei";
import * as THREE from "three";
import Grid from "./Grid";
import Menu from "./UI/Menu";
import LoadGLTF from "./Loaders/LoadGLTF";
import Directional from "./Lights/Directional";
import Keen from "./Defaults/Controls/Controls";
import { Panel } from "./Defaults/MultiLeva";
import TestCube from "./Defaults/Test";
import { useControls } from "leva";
import BoxHelper from "./Defaults/BoxHelper";
import UIPanel from "./UI/UIPanel";

// import Seat from "./Assets/Seat";

function App() {
  const [selected, setSelected] = useState();
  const [itemList, setItmeList] = useState();
  const [multiSelect, setMultiSelect] = useState(true);
  const [mode, setMode] = useState("translate");
  const [importScene, setImportScene] = useState();
  const [updateMatrix, setUpdateMatrix] = useState();
  let selectAll;

  const find = (object) => {
    if (object.parent.parent.isScene) {
      selectAll = object;
    } else {
      find(object.parent);
    }
  };
  const updatePosCube = (pos) => {
    setUpdateMatrix(pos);
  };
  const load = (list) => {
    setItmeList(list);
  };
  const importObj = (list) => {
    setImportScene(list);
  };
  const getControlMode = (mode) => {
    setMode(mode);
  };
  const { showLighting, showStats } = useControls("My folder", {
    showLighting: true,
    showStats: false,
  });
  const getMultiSelect = (state) => {
    setMultiSelect(state);
  };
  if (multiSelect && selected?.length > 0) {
    find(selected[0]);
  }
  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          style={{ width: "100%", height: "100vh" }}
          shadows={{ type: THREE.VSMShadowMap }}
          color={"0x1a1818"}
          gl={{ antialias: true }}
          frameloop="demand"
        >
          <color attach={"background"} args={[0x85858585]} />
          <GizmoHelper
            alignment="bottom-right" // widget alignment within scene
            margin={[80, 80]} // widget margins (X, Y)
          >
            <GizmoViewport
              axisColors={["red", "green", "blue"]}
              labelColor="black"
            />
          </GizmoHelper>
          <ambientLight intensity={0.1} />
          <Directional pos={[2, 3, -2]} intensity={1} />
          {showStats && <Stats />}
          <Grid />

          <fog attach="fog" color={0x858585} near={1} far={650} />

          <Keen mode={mode} selected={selected} multiSelect={multiSelect} />

          <OrbitControls makeDefault={true} />
          <BoxHelper selected={selected} selectAll={selectAll} />

          <Select multiple box onChange={setSelected}>
            {importScene && importScene.length > 0 && importScene[0] ? (
              <>
                <LoadGLTF itemList={itemList} />

                <primitive object={importScene[1]} />
              </>
            ) : (
              <>
                <LoadGLTF itemList={itemList} />

                <TestCube
                  updatePos={updateMatrix}
                  scale={0.9}
                  position={[5, 0, 0]}
                  color="orange"
                  transmission={1}
                  thickness={-2}
                  envMapIntensity={5}
                />
              </>
            )}
          </Select>
          {/* <UIPanel object={selected} updatePosCube={updatePosCube} /> */}
        </Canvas>
      </Suspense>
      {/* <Panel selected={selected} /> */}
      <Menu
        load={load}
        getControlMode={getControlMode}
        selected={selected}
        multiselect={getMultiSelect}
        importObj={importObj}
      />
    </>
  );
}

export default App;
