import create from "zustand";
import * as THREE from "three";
let useStore = (set) => ({
  ObjectList: [],
  SceneGraph: new THREE.Scene(),
  addToObjectList: (object) => {
    set((state) => {
      ObjectList: state.ObjectList.push(object);
    });
  },
  addToSceneGraph: (object) => {
    set((state) => {
      state.SceneGraph.add(object);
    });
  },
  removeFromSceneGraph: (object) => {
    set((state) => {
      state.SceneGraph.children[6].remove(object);
    });
  },
  setSceneGraph: (scene) => {
    set({ SceneGraph: scene });
  },
});
export default useStore = create(useStore);
