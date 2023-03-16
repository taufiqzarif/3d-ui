import React, { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "../lib/SceneInit";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "../App.css";
import "./AppBar";
import "antd/dist/antd.css";

function MapLoader() {

    useEffect(() => {
        const map = new SceneInit("curtin3dmap");
        let loadedModel;
        map.initialize();
        map.animate();
        const gltfLoader = new GLTFLoader();

        //Load the Map
        gltfLoader.load("./assets/CurtinCut.gltf", (gltfScene) => {
            loadedModel = gltfScene;

            // gltfScene.scene.rotation.y = Math.PI / 8;
            gltfScene.scene.position.x = -20;
            gltfScene.scene.position.y = 12;
            gltfScene.scene.position.z = -20;
            gltfScene.scene.rotation.x = Math.PI / -2;
            gltfScene.scene.scale.set(10, 10, 10);
            map.scene.add(gltfScene.scene);
        });
        
        //Load the pin
        gltfLoader.load("./assets/Marker.gltf", (gltfScene) => {
            loadedModel = gltfScene;

            // gltfScene.scene.rotation.y = Math.PI / 8;
            gltfScene.scene.position.x = 20;
            gltfScene.scene.position.y = 5.5;
            gltfScene.scene.position.z = -9;
            gltfScene.scene.rotation.x = Math.PI / 0.000001;

            gltfScene.scene.scale.set(0.3, 0.3, 0.3);
            map.scene.add(gltfScene.scene);
        });
    }, []);

    return (
        <div >
            <canvas id="curtin3dmap" />
        </div>
    );
}

export default MapLoader;

