import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
 import { Drawer,PageHeader, Image, Typography, Button} from "antd";
import "antd/dist/antd.css";
import "../components/style.css";

let draggableModel;

export default class SceneInit {


    constructor(canvasId) {
        // NOTE: Core components to initialize Three.js app.
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;
        this.objects = undefined;

        // NOTE: Camera params;
        this.fov = 40;
        this.nearPlane = 1;
        this.farPlane = 1000;
        this.canvasId = canvasId;
        this.pointer = new THREE.Vector2();
        this.raycaster = undefined;

        // NOTE: Additional components.
        this.clock = undefined;
        this.stats = undefined;
        this.controls = undefined;

        // NOTE: Lighting is basically required.
        this.ambientLight = undefined;
        this.directionalLight = undefined;
    }

    initialize() {
        // let container;
        // container = document.getElementById("container");
        // container.innerHTML = "";
        this.scene = new THREE.Scene();
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.clickMouse = new THREE.Vector2();
        this.moveMouse = new THREE.Vector2();
        this.objects = [];
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        this.camera.position.set(35, 3, -30);
        // this.camera.position.z = 40;

        // NOTE: Specify a canvas which is already created in the HTML.
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            // NOTE: Anti-aliasing smooths out the edges.
            antialias: false,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);
        //canvas.addEventListener("pointerdown", this.onPointerDown);

        this.clock = new THREE.Clock();
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.target.set(0, 0.5, 0);
        this.controls.enablePan = false;
        this.controls.enableDamping = true;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.stats = Stats();
        // document.body.appendChild(this.stats.dom);

        // ambient light which is for the whole scene
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        this.ambientLight.castShadow = true;
        this.scene.add(this.ambientLight);

        // directional light - parallel sun rays
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        // this.directionalLight.castShadow = true;
        this.directionalLight.position.set(0, 32, 64);
        this.scene.add(this.directionalLight);

        // Grid
        const grid = new THREE.GridHelper(500, 10, "yellow", "blue");
        grid.material.opacity = 0.5;
        grid.material.depthWrite = false;
        grid.material.transparent = true;
        this.scene.add(grid);
        this.objects.push(grid);

        // if window resizes
        window.addEventListener("resize", () => this.onWindowResize(), false);

        // add window event listener
        canvas.addEventListener(
            "pointerup",
            this.onPointerUp.bind(this),
            false,
        );


        //NOTE: Load space background.        
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            '../assets/sky.jpg',
            '../assets/sky.jpg',
            '../assets/skyTop.jpg',
            '../assets/grass.jpg',
            '../assets/sky.jpg',
            '../assets/sky.jpg',
        ]);
        this.scene.background = texture;

        // NOTE: Declare uniforms to pass into glsl shaders.
        // this.uniforms = {
        //   u_time: { type: 'f', value: 1.0 },
        //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
        //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
        // };
    }

    onPointerUp(event) {
        let debounce = false;
        event.preventDefault();
        if(!debounce) {
            
            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(
                {
                    x: (event.clientX / window.innerWidth) * 2 - 1,
                    y: -(event.clientY / window.innerHeight) * 2 + 1,
                },
                this.camera
            );
            console.log("I've been clicked!");
            ReactDOM.render(<ViewDrawer />,document.getElementById("view"));
        };
    }

    animate() {
        // NOTE: Window is implied.
        // requestAnimationFrame(this.animate.bind(this));
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats.update();
        this.controls.update();
    }

    render() {
        // NOTE: Update uniform data on each render.
        // this.uniforms.u_time.value += this.clock.getDelta();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

function ViewDrawer() {

    //Right one the useState should be always false first
    const [open, setOpen] = useState(true);
    
    //Need the clicker to actually call showDrawer everytime clicked
    const showDrawer = () => {
        setOpen(true);
        console.log("I have been opened!");
    };

    const onClose = () => {
        setOpen(false);
        console.log("I have been closed!");
    };


    return (
        <div>
            <>
                <Drawer
                    title="SKYLARK 3 (SK3)"
                    placement="right"
                    onClose={onClose}
                    open={open}
                >
                <Image src="../assets/skylark.jpg"></Image>
                <PageHeader style={{backgroundColor:'whitesmoke'}} title="Building Information"/>
                <Typography style={{color:"black", fontSize:14}}>Opening Hours: Monday - Friday (8am - 5pm)</Typography>
                <Typography style={{color:"black", fontSize:14}}>Tel: +60 85 630 100</Typography>
                <Typography style={{color:"black", fontSize:14}}>Fax: +60 85 630 088</Typography>
                <Typography style={{color:"black", fontSize:14}}>Email: <a>foes.admin@curtin.edu.my</a></Typography>
                <PageHeader style={{backgroundColor:'whitesmoke'}} title="Services Offered"/>
                <div id="services">
                <Button>
                    <a href="https://foeslab.curtin.edu.my/lab" target="_blank" rel="noopener noreferrer">
                    FOES Lab Service Request
                    </a>
                </Button>
                <Button>
                    <a href="https://foeslab.curtin.edu.my/hesk" target="_blank" rel="noopener noreferrer">
                    FOES Lab Software Request
                    </a>
                </Button>
                <Button>
                    <a href="https://foeslab.curtin.edu.my/booked/Web" target="_blank" rel="noopener noreferrer">
                    FOES Lab Equipment Booking
                    </a>
                </Button>
                <Button>
                    <a href="https://foeslab.curtin.edu.my/labroom/" target="_blank" rel="noopener noreferrer">
                    FOES Lab Online Booking
                    </a>
                </Button>
                <Button>
                    <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=_cYZkiv0eUWTSs0Kb2Wu-1UcrJgbLSFFjd0z5gBDhc9URU1WUjNXTkZINlpJSk5VSU1CMUhXNk5YOC4u&fsw=0" target="_blank" rel="noopener noreferrer">
                    FOES Lab Safety Declaration
                    </a>
                </Button>
                <Button>
                    <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=_cYZkiv0eUWTSs0Kb2Wu-575WPMCrI9LnEP0s0klHQhURFlJTTZEOVNLMFlBSDA0QklQMEU1Q1lMSC4u" target="_blank" rel="noopener noreferrer">
                    FOES Lab Health Declaration
                    </a>
                </Button>
                <Button>
                    <a href="https://foesoffice.curtin.edu.my/foesAdmin" target="_blank" rel="noopener noreferrer">
                    FOES Admin Online Helpdesk
                    </a>
                </Button>
                </div>
                </Drawer>
            </>
        </div>
    );
}