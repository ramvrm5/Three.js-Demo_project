import * as THREE from 'three';
/* import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
camera.position.set(-10, 30 , 30);
orbit.update();


const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side:THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;


const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate); */


/* CAR 3D DESIGN */
const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

directionalLight.position.set(200, 500, 300);

scene.add(directionalLight);

// Setting up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
    cameraWidth / -2, // left
    cameraWidth / 2, // right
    cameraHeight / 2, // top
    cameraHeight / -2, // bottom
    0, // near plane
    1000 // far plane
);
camera.position.set(200, 200, 200);
camera.lookAt(0, 10, 0);

function createWheels() {
    const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
    const material = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
}

function createCar() {
    const car = new THREE.Group();

    const backWheel = createWheels();
    backWheel.position.y = 6;
    backWheel.position.x = -18;
    car.add(backWheel);

    const frontWheel = createWheels();
    frontWheel.position.y = 6;
    frontWheel.position.x = 18;
    car.add(frontWheel);

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(70, 15, 30),
        new THREE.MeshPhongMaterial({ color: 0x78b14b })
    );
    main.position.y = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture();

    const carBackTexture = getCarFrontTexture();

    const carRightSideTexture = getCarSideTexture();

    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33, 12, 24),
        [
            new THREE.MeshPhongMaterial({ map: carFrontTexture }),
            new THREE.MeshPhongMaterial({ map: carBackTexture }),
            new THREE.MeshPhongMaterial({ color: 0xffffff }), // top
            new THREE.MeshPhongMaterial({ color: 0xffffff }), // bottom
            new THREE.MeshPhongMaterial({ map: carRightSideTexture }),
            new THREE.MeshPhongMaterial({ map: carLeftSideTexture }),
        ]
    );
    cabin.position.x = -6;
    cabin.position.y = 25.5;
    car.add(cabin);

    return car;
}

function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);

    return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);

    return new THREE.CanvasTexture(canvas);
}

const car = createCar();
scene.add(car);


// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

renderer.setAnimationLoop(() => {
    car.rotation.y += 0.007;
    renderer.render(scene, camera);
});

document.body.appendChild(renderer.domElement);
