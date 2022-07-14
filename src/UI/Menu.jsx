import {
  ArrowsAltOutlined,
  DeleteOutlined,
  DragOutlined,
  FileAddOutlined,
  FileAddTwoTone,
  PlusOutlined,
  RotateRightOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useStore from "../store";
import { ImSphere } from "react-icons/im";
import { GiPlainSquare } from "react-icons/gi";
import { GiPlainCircle } from "react-icons/gi";
import { BiCapsule } from "react-icons/bi";
import { TbCone } from "react-icons/tb";
import { BiCylinder } from "react-icons/bi";
import { BsFillOctagonFill } from "react-icons/bs";
import { BsFillPentagonFill } from "react-icons/bs";
import { BsFillCircleFill } from "react-icons/bs";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";
import { GiKnot } from "react-icons/gi";
import { FaMousePointer } from "react-icons/fa";
import { MdSelectAll } from "react-icons/md";
import { BsBox } from "react-icons/bs";
import { AiOutlineExport } from "react-icons/ai";
import { AiOutlineImport } from "react-icons/ai";
import * as THREE from "three";
import { saveAs } from "file-saver";

const Input = styled.input`
  position: relative;
  top: 10px;
  cursor: pointer;
  visibility: hidden;
`;
const MenuContainer = styled.div`
position: absolute;
top: 50px;
left: 10px;
// border: 1px solid black;
height: 500px;
width: 45px;
background-color:#262a36};
border-radius:10px;
box-shadow:0px 0px 10px 0px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  padding: 5px;
  border-radius: 8px;
  margin: 2px;
  transition: all 0.15s;
  &: hover {
    background-color: #0083ff;
  }
`;
const SideMenuAppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  padding: 5px;
  border-radius: 8px;
  margin: 2px;
  visibility: hiddden;
  font-size: 20px;
  color: #ffffff;
  transition: all 0s;
  cursor: pointer;
  &: hover {
    background-color: #0083ff;
  }
  // & .icon {
  //   // visibility: visible;
  // }
`;
const SideMenuAddShapes = styled.div`
position: absolute;
top: 200px;
left: 55px;
// border: 1px solid black;
height: 100px;
width: 200px;
background-color:#262a36};
border-radius:10px;
box-shadow:0px 0px 10px 0px;
display:flex;
flex-wrap:wrap;
align-items:center;
visibility:hidden;
transition: all 0.2s;
&:hover{
  visibility: visible;
}

`;
const SideMenuOpener = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  padding: 5px;
  border-radius: 8px;
  margin: 2px;
  transition: all 0.5s;
  &: hover {
    background-color: #0083ff;
  }
  &:hover ~ ${SideMenuAddShapes} {
    visibility: visible;
  }
  &:hover ~ ${SideMenuAppContainer} {
    // visibility: visible;
  }
  &:hover .icon {
    visibility: visible;
  }
`;
const Menu = ({ load, getControlMode, selected, multiselect, importObj }) => {
  const colors = useControls({
    myFooColor: "#262a36",
    myBarColor: { r: 200, b: 125, g: 106, a: 0.4 },
  });
  const fileUpload = useRef();
  const removeFromScene = useStore((state) => state.removeFromSceneGraph);

  const ItemList = [];
  const SceneGraph = useStore((state) => state.SceneGraph);

  // setTimeout(() => {
  //   // console.log(exportScene);
  //   const loader = new THREE.ObjectLoader();

  //   loader.parse(exportScene, (obj) => {
  //     console.log(obj);
  //   });
  // }, 6000);

  function setJSONForDownload() {
    let exportScene;
    if (selected.length > 0) {
      exportScene = SceneGraph.children[6].toJSON();
    } else {
      exportScene = SceneGraph.children[3].toJSON();
    }

    const str = JSON.stringify(exportScene);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8",
    });

    saveAs(blob, "scene.json");
  }

  const sceneUpload = useRef();
  return (
    <>
      <MenuContainer>
        <Input
          ref={fileUpload}
          type={"file"}
          onChange={(e) => {
            const type = e.target.files[0].name.split(".")[1];

            const url = URL.createObjectURL(e.target.files[0]);
            ItemList.push([url, type, "file"]);
            load(ItemList);
          }}
        />
        <Input
          ref={sceneUpload}
          type={"file"}
          onChange={(e) => {
            const type = e.target.files[0].name.split(".")[1];

            const url = URL.createObjectURL(e.target.files[0]);
            const loader = new THREE.ObjectLoader();
            loader.load(url, (obj) => {
              console.log(obj);
              importObj([true, obj]);
            });
          }}
        />

        <Container>
          <FileAddOutlined
            onClick={() => {
              fileUpload.current.click();
            }}
            style={{
              fontSize: "20px",
              color: "#ffffff",

              cursor: "pointer",
            }}
          />
        </Container>
        <Container>
          <AiOutlineExport
            style={{
              fontSize: "20px",
              color: "#ffffff",

              cursor: "pointer",
            }}
            onClick={() => {
              setJSONForDownload();
            }}
          />
        </Container>
        <Container>
          <AiOutlineImport
            style={{
              fontSize: "20px",
              color: "#ffffff",

              cursor: "pointer",
            }}
            onClick={() => {
              sceneUpload.current.click();
            }}
          />
        </Container>
        <Container>
          <MdSelectAll
            style={{
              fontSize: "25px",
              color: "#ffffff",
              cursor: "pointer",
            }}
            onClick={() => {
              multiselect(true);
            }}
          />
        </Container>
        <Container>
          <FaMousePointer
            style={{
              fontSize: "20px",
              color: "#ffffff",

              cursor: "pointer",
            }}
            onClick={() => {
              multiselect(false);
            }}
          />
        </Container>
        <Container>
          <ArrowsAltOutlined
            style={{
              fontSize: "20px",
              color: "#ffffff",

              cursor: "pointer",
            }}
            onClick={() => {
              getControlMode("scale");
            }}
          />
        </Container>
        <Container>
          <RotateRightOutlined
            style={{
              fontSize: "20px",
              color: "#ffffff",

              cursor: "pointer",
            }}
            onClick={() => {
              getControlMode("rotate");
            }}
          />
        </Container>
        <Container>
          <DragOutlined
            style={{
              fontSize: "20px",
              color: "#ffffff",

              cursor: "pointer",
            }}
            onClick={() => {
              getControlMode("translate");
            }}
          />
        </Container>
        <Container>
          <DeleteOutlined
            style={{
              fontSize: "20px",
              color: "#ffffff",

              cursor: "pointer",
            }}
            onClick={() => {
              let deletableObj;
              const find = (object) => {
                if (object.parent.parent.isScene) {
                  deletableObj = object;
                } else {
                  find(object.parent);
                }
              };
              find(selected[0]);
              removeFromScene(deletableObj);
              console.log(SceneGraph);
              console.log(deletableObj);
            }}
          />
        </Container>

        <SideMenuOpener>
          <PlusOutlined
            style={{
              fontSize: "20px",
              color: "#ffffff",

              cursor: "pointer",
            }}
          />
        </SideMenuOpener>
        <SideMenuAddShapes>
          <SideMenuAppContainer>
            <ImSphere
              className="icon"
              onClick={() => {
                ItemList.push(["sphere", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <BsBox
              onClick={() => {
                ItemList.push(["box", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <GiPlainSquare
              onClick={() => {
                ItemList.push(["plain", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <BsCircle
              onClick={() => {
                ItemList.push(["ring", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>

          <SideMenuAppContainer>
            <BsFillOctagonFill
              onClick={() => {
                ItemList.push(["octa", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <BsFillPentagonFill
              onClick={() => {
                ItemList.push(["ico", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <BsFillRecordCircleFill
              onClick={() => {
                ItemList.push(["torus", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <GiKnot
              onClick={() => {
                ItemList.push(["knot", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <GiPlainCircle
              onClick={() => {
                ItemList.push(["circle", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <BiCapsule
              onClick={() => {
                ItemList.push(["capsule", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <BiCylinder
              onClick={() => {
                ItemList.push(["cylinder", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
          <SideMenuAppContainer>
            <TbCone
              onClick={() => {
                ItemList.push(["cone", "preset"]);
                load(ItemList);
              }}
            />
          </SideMenuAppContainer>
        </SideMenuAddShapes>
      </MenuContainer>
    </>
  );
};

export default Menu;
