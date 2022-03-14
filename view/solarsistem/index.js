
let scene, camera, renderer;
var rotation = 0.01;
var px = 5;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000010);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 5;
    camera.position.y = 15;
    camera.position.Z = 1000;

    hlight = new THREE.AmbientLight (0x404040,2);
    scene.add(hlight);
    
    
    directionalLight = new THREE.DirectionalLight(0xffffff,5);
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    light = new THREE.PointLight(0xc4c4c4,0.001);
    light.position.set(0,200,500);
    scene.add(light);


    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);;
    controls.addEventListener('change', renderer);

    let loader = new THREE.GLTFLoader();
    loader.load('../3d/terra/scene.gltf',function(gltf){
        terra = gltf.scene.children[0];
        terra.scale.set(5,5,5);
        scene.add(gltf.scene);
        animate();
    });

    let loader2 = new THREE.GLTFLoader();
    loader2.load('../3d/terra/scene.gltf',function(gltf){
        lua = gltf.scene.children[0];
        lua.scale.set(0.1,0.1,0.1);
        scene.add(gltf.scene);
        animateLua();
    });
}

function newMaterial(){
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x0fffff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x += 0.01;

}

function animate(){
    renderer.render(scene,camera);
    requestAnimationFrame(animate); 
    // window.document.getElementById('px').innerHTML = terra.rotation.z;
    // window.document.getElementById('py').innerHTML = terra.position.y;
    terra.rotation.z += rotation;
}

function animateLua(){
    renderer.render(scene,camera);
    requestAnimationFrame(animateLua); 
    window.document.getElementById('px').innerHTML = terra.rotation.z;
    window.document.getElementById('py').innerHTML = lua.position.x;
    lua.rotation.z += 0.01;
}

function moreSpeed(){
    rotation += 0.01;
}
function minSpeed(){
    rotation -= 0.01;
}
function moreX(){
    px += 5;    
}

init();